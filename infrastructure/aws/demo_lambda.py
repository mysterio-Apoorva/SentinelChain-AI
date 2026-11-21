"""Private IAM-invoked adapter. All records and mutations are explicitly DEMO data."""
import copy
import hashlib
import json
import os
from datetime import datetime, timezone
from decimal import Decimal

import boto3
from boto3.dynamodb.types import TypeSerializer
from botocore.exceptions import ClientError

_serializer = TypeSerializer()

def encode(item):
    return {k: _serializer.serialize(v) for k, v in item.items()}

def plain(value):
    return json.loads(json.dumps(value, default=lambda n: int(n) if isinstance(n, Decimal) and n % 1 == 0 else float(n)))

def now():
    return datetime.now(timezone.utc).isoformat()

def action_fingerprint(body):
    return hashlib.sha256(json.dumps({k: body.get(k) for k in ('type', 'target', 'parameters')}, sort_keys=True, separators=(',', ':')).encode()).hexdigest()

def apply_operation(dataset, body, incident=None):
    """Pure, validated state transition; never contacts a carrier or places an order."""
    data = copy.deepcopy(dataset)
    kind, target, params = body.get('type'), body.get('target'), body.get('parameters') or {}
    if not isinstance(target, str) or not target.strip() or len(target) > 300 or not isinstance(params, dict):
        raise ValueError('Invalid operation target or parameters.')
    if kind == 'supplier':
        row = next((r for r in data['backups'] if r['backup'] == target), None)
        if not row or row['onboarding'] != 'Ready' or not isinstance(params.get('activate'), bool):
            raise ValueError('Supplier is not ready or activation is invalid.')
        row['active'] = params['activate']
        for supplier in data['suppliers']:
            if supplier['name'] == row['target']:
                supplier['backupActive'] = row['active']
    elif kind == 'inventory':
        row = next((r for r in data['suggestions'] if r['component'] == target), None)
        if not row or params.get('recommended') != row['recommended']:
            raise ValueError('Inventory target or recommendation has changed. Refresh first.')
        row.update(current=row['recommended'], adjustment='0 Days', status='Optimal', approved=True)
    elif kind == 'playbook':
        if not incident or target not in [r['title'] for r in incident.get('recommendations', [])]:
            raise ValueError('Playbook must match a saved analysis owned by this user.')
        for key, low, high in [('transitSpeedBuffer', 50, 120), ('budgetCap', 50, 300)]:
            value = params.get(key)
            if isinstance(value, bool) or not isinstance(value, (int, float, Decimal)) or not low <= value <= high:
                raise ValueError('Playbook control is outside its allowed range.')
        controls = {key: Decimal(str(params[key])) for key in ('transitSpeedBuffer', 'budgetCap')}
        controls['incidentId'] = params['incidentId']
        plan = {'incidentId': params['incidentId'], 'title': target, 'parameters': controls, 'status': 'demo_plan_saved', 'createdAt': now()}
        plans = [p for p in data.get('playbooks', []) if (p['incidentId'], p['title']) != (params['incidentId'], target)]
        data['playbooks'] = (plans + [plan])[-50:]
    else:
        raise ValueError('Unsupported operation type.')
    data['updatedAt'] = now()
    return data

def handle(event, state, incidents, client):
    action = event.get('action')
    if action == 'data':
        row = state.get_item(Key={'id': 'dataset'}, ConsistentRead=True).get('Item')
        if not row:
            return {'error': 'Demo dataset has not been seeded.', 'statusCode': 503}
        data = plain(row['data'])
        data['playbooks'] = [p for p in data.get('playbooks', []) if p.get('userId') == event.get('userId')]
        return data
    if action == 'quota':
        key = 'ai-quota#' + datetime.now(timezone.utc).strftime('%Y-%m')
        limit = int(os.environ.get('AI_MONTHLY_LIMIT', '1000'))
        try:
            state.update_item(Key={'id': key}, UpdateExpression='ADD #count :one',
                ConditionExpression='attribute_not_exists(#count) OR #count < :limit',
                ExpressionAttributeNames={'#count': 'count'}, ExpressionAttributeValues={':one': 1, ':limit': limit})
            return {'accepted': True}
        except ClientError as error:
            if error.response['Error']['Code'] == 'ConditionalCheckFailedException':
                return {'error': 'Monthly demo AI request limit reached. Ask the administrator to review usage.', 'statusCode': 429}
            raise
    if action == 'audit':
        analysis = event.get('analysis') or {}
        if not analysis.get('id') or not event.get('userId'):
            raise ValueError('Analysis ID and user are required.')
        state.put_item(Item={'id': 'analysis#' + analysis['id'], 'userId': event['userId'], 'createdAt': now(), 'headline': analysis.get('headline'), 'source': 'bedrock'})
        return {'status': 'recorded'}
    if action != 'operation':
        raise ValueError('Unsupported adapter action.')
    body, user = event.get('body') or {}, event.get('userId')
    key = body.get('idempotencyKey')
    if not isinstance(user, str) or not user or not isinstance(key, str) or not 1 <= len(key) <= 100:
        raise ValueError('User and idempotency key are required.')
    ledger_key = 'operation#' + hashlib.sha256((user + ':' + key).encode()).hexdigest()
    fingerprint = action_fingerprint(body)
    for _ in range(4):
        previous = state.get_item(Key={'id': ledger_key}, ConsistentRead=True).get('Item')
        if previous:
            if previous['fingerprint'] != fingerprint:
                return {'error': 'Idempotency key reused for a different action.', 'statusCode': 409}
            return plain(previous['result'])
        row = state.get_item(Key={'id': 'dataset'}, ConsistentRead=True).get('Item')
        if not row:
            return {'error': 'Demo dataset has not been seeded.', 'statusCode': 503}
        incident = None
        if body.get('type') == 'playbook':
            incident_id = (body.get('parameters') or {}).get('incidentId')
            if not isinstance(incident_id, str) or not incident_id:
                raise ValueError('Incident ID is required.')
            saved = incidents.get_item(Key={'id': incident_id}, ConsistentRead=True).get('Item', {})
            if saved.get('userId') != user:
                return {'error': 'Incident is not accessible to this user.', 'statusCode': 403}
            incident = saved.get('analysis')
        updated = apply_operation(row['data'], body, incident)
        if body.get('type') == 'playbook':
            updated['playbooks'][-1]['userId'] = user
        result = {'id': key, 'status': 'completed', 'reference': ledger_key, 'timestamp': now(), 'mode': 'demo', 'description': 'Demo records updated; no real-world order or route changed.'}
        try:
            client.transact_write_items(TransactItems=[
                {'Put': {'TableName': state.name, 'Item': encode({'id': 'dataset', 'version': row['version'] + 1, 'data': updated}), 'ConditionExpression': '#version = :version', 'ExpressionAttributeNames': {'#version': 'version'}, 'ExpressionAttributeValues': encode({':version': row['version']})}},
                {'Put': {'TableName': state.name, 'Item': encode({'id': ledger_key, 'userId': user, 'fingerprint': fingerprint, 'result': result}), 'ConditionExpression': 'attribute_not_exists(id)'}}
            ])
            return result
        except ClientError as error:
            if error.response['Error']['Code'] != 'TransactionCanceledException':
                raise
    return {'error': 'Concurrent update. Retry using the same action ID.', 'statusCode': 409}

def handler(event, context):
    db = boto3.resource('dynamodb')
    try:
        return handle(event, db.Table(os.environ['STATE_TABLE']), db.Table(os.environ['INCIDENT_TABLE']), boto3.client('dynamodb'))
    except (ValueError, KeyError, TypeError) as error:
        return {'error': str(error), 'statusCode': 400}
