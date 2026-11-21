"""Run inside AWS CloudShell. No resource mutations occur before typed approval."""
import argparse
import getpass
import json
import os
from pathlib import Path
import re
import time

import boto3
from botocore.exceptions import ClientError
from build_template import build_template
from seed_data import build_dataset

MODEL = 'amazon.nova-lite-v1:0'


def private_json(path, value):
    # Create with restrictive permissions from the first write, including reruns.
    fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    os.fchmod(fd, 0o600)
    with os.fdopen(fd, 'w') as stream:
        json.dump(value, stream, indent=2)


def wait_stack(cf, name):
    while True:
        stack = cf.describe_stacks(StackName=name)['Stacks'][0]
        status = stack['StackStatus']
        print('CloudFormation:', status, flush=True)
        if status in ('CREATE_COMPLETE', 'UPDATE_COMPLETE'):
            return {v['OutputKey']: v['OutputValue'] for v in stack['Outputs']}
        if not status.endswith('_IN_PROGRESS'):
            for event in cf.describe_stack_events(StackName=name)['StackEvents'][:15]:
                if 'FAILED' in event['ResourceStatus']:
                    print(event['LogicalResourceId'], event.get('ResourceStatusReason', ''))
            raise RuntimeError('Stack did not complete. Review CloudFormation events; retained data is not deleted.')
        time.sleep(15)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--stack', default='sentinelchain-demo')
    parser.add_argument('--email', default='apoorvajha1209@gmail.com')
    parser.add_argument('--plan', action='store_true', help='Read-only validation and estimate; never deploy.')
    args = parser.parse_args()
    if not re.fullmatch(r'[A-Za-z][A-Za-z0-9-]{0,99}', args.stack):
        parser.error('Invalid stack name.')
    session = boto3.Session()
    region = session.region_name
    if not region:
        raise RuntimeError('Open CloudShell in your chosen AWS console region first.')
    account = session.client('sts').get_caller_identity()['Account']
    cf = session.client('cloudformation')
    template = json.dumps(build_template())
    cf.validate_template(TemplateBody=template)
    model = session.client('bedrock').get_foundation_model(modelIdentifier=MODEL)['modelDetails']
    if 'ON_DEMAND' not in model.get('inferenceTypesSupported', []):
        raise RuntimeError('Nova Lite direct on-demand inference is unavailable in this region. Nothing was created. Choose a supported region explicitly before retrying.')
    print(f'Account: {account}\nRegion: {region}\nStack: {args.stack}\nAlert recipient: {args.email}')
    print('Plan: Cognito login, two on-demand DynamoDB tables, private Lambda, EventBridge, SNS email, 7-day logs, scoped IAM user for Render.')
    print('Data: fictional, labelled demo shipments/suppliers. Actions persist but never place real orders.')
    print('Estimate: US$1–$3/month for light demo use. Reference us-east-1: about $0.53 before free tiers at 1,000 AI calls (2k input/1k output tokens each), 5 users, 10k write units, 100k read units, 10k short Lambda calls, 1k events/emails and 100MB logs.')
    print('Region prices and actual usage vary. Render, taxes and transfer excluded. 1,000 monthly AI attempts are enforced; this is NOT an AWS spending cap. No always-on compute or paid VPC/NAT.')
    print('Pricing and assumptions: infrastructure/aws/README.md')
    if args.plan or input('Type DEPLOY to approve this account, region and estimated cost: ').strip() != 'DEPLOY':
        print('No changes made.'); return
    # Small billable preflight, after approval, before infrastructure provisioning.
    session.client('bedrock-runtime').converse(modelId=MODEL,
        messages=[{'role': 'user', 'content': [{'text': 'Reply OK.'}]}], inferenceConfig={'maxTokens': 8})
    try:
        cf.describe_stacks(StackName=args.stack)
        change_type = 'UPDATE'
    except ClientError as error:
        if error.response['Error']['Code'] != 'ValidationError' or 'does not exist' not in error.response['Error']['Message']:
            raise
        change_type = 'CREATE'
    change = cf.create_change_set(StackName=args.stack, ChangeSetName='setup-' + str(int(time.time())), ChangeSetType=change_type,
        TemplateBody=template, Parameters=[{'ParameterKey':'AlertEmail','ParameterValue':args.email}], Capabilities=['CAPABILITY_IAM'])
    while True:
        details = cf.describe_change_set(ChangeSetName=change['Id'])
        if details['Status'] not in ('CREATE_PENDING', 'CREATE_IN_PROGRESS'):
            break
        time.sleep(3)
    if details['Status'] == 'FAILED':
        reason = details.get('StatusReason', '')
        if change_type == 'UPDATE' and ("didn't contain changes" in reason or 'No updates' in reason):
            print('Infrastructure already current.')
        else:
            raise RuntimeError('Change set failed: ' + reason)
    else:
        for entry in details.get('Changes', []):
            resource = entry['ResourceChange']
            print(resource['Action'], resource['LogicalResourceId'])
            if resource['Action'] == 'Remove' or resource.get('Replacement') in ('True', 'Conditional'):
                raise RuntimeError('Change set includes removal/replacement. It was NOT executed; review it in CloudFormation.')
        cf.execute_change_set(ChangeSetName=change['Id'])
    outputs = wait_stack(cf, args.stack)
    table = session.resource('dynamodb').Table(outputs['StateTableName'])
    try:
        table.put_item(Item={'id':'dataset','version':1,'data':build_dataset()}, ConditionExpression='attribute_not_exists(id)')
        print('Demo dataset seeded.')
    except ClientError as error:
        if error.response['Error']['Code'] != 'ConditionalCheckFailedException':
            raise
        print('Existing dataset preserved.')
    cognito = session.client('cognito-idp')
    pool = outputs['UserPoolId']
    try:
        cognito.admin_get_user(UserPoolId=pool, Username=args.email)
        print('Existing app user preserved.')
    except cognito.exceptions.UserNotFoundException:
        cognito.admin_create_user(UserPoolId=pool, Username=args.email, MessageAction='SUPPRESS',
            UserAttributes=[{'Name':'email','Value':args.email},{'Name':'email_verified','Value':'true'}])
    user = cognito.admin_get_user(UserPoolId=pool, Username=args.email)
    if user['UserStatus'] == 'FORCE_CHANGE_PASSWORD':
        while True:
            password = getpass.getpass('Choose a NEW SentinelChain app password (not your AWS password), 12+ characters, upper/lower/number/symbol: ')
            if len(password) < 12 or not all(re.search(pattern, password) for pattern in ('[A-Z]', '[a-z]', '[0-9]', r'[^A-Za-z0-9]')):
                print('Password does not meet requirements.'); continue
            if password != getpass.getpass('Repeat app password: '):
                print('Passwords differ.'); continue
            cognito.admin_set_user_password(UserPoolId=pool, Username=args.email, Password=password, Permanent=True)
            del password
            break
    cognito.admin_add_user_to_group(UserPoolId=pool, Username=args.email, GroupName='Admin')
    folder = Path.home()/'.sentinelchain'/account/region/args.stack
    folder.mkdir(parents=True, exist_ok=True, mode=0o700)
    os.chmod(folder, 0o700)
    iam = session.client('iam')
    key_path = folder/'credentials.json'
    existing_ids = {k['AccessKeyId'] for k in iam.list_access_keys(UserName=outputs['RuntimeUserName'])['AccessKeyMetadata'] if k['Status'] == 'Active'}
    key = json.loads(key_path.read_text()) if key_path.exists() else None
    if key and key['AccessKeyId'] not in existing_ids:
        key = None
    if not key:
        key = iam.create_access_key(UserName=outputs['RuntimeUserName'])['AccessKey']
        key = {k:key[k] for k in ('AccessKeyId','SecretAccessKey')}
        private_json(key_path, key)
    env = {'AWS_REGION':region,'AWS_ACCESS_KEY_ID':key['AccessKeyId'],'AWS_SECRET_ACCESS_KEY':key['SecretAccessKey'],
        'AWS_SESSION_TOKEN':'','BEDROCK_MODEL_ID':MODEL,'VITE_COGNITO_USER_POOL_ID':pool,'VITE_COGNITO_CLIENT_ID':outputs['AppClientId'],
        'COGNITO_USER_POOL_ID':pool,'COGNITO_CLIENT_ID':outputs['AppClientId'],'VITE_ALLOW_SIGNUP':'false','DYNAMODB_TABLE':outputs['IncidentTableName'],
        'LAMBDA_FUNCTION_NAME':outputs['AdapterName'],'DEMO_ADAPTER_FUNCTION_NAME':outputs['AdapterName'],
        'EVENT_BUS_NAME':outputs['EventBusName'],'SNS_EMAIL_TOPIC_ARN':outputs['EmailTopicArn']}
    private_json(folder/'render-env.json', env)
    fd = os.open(folder/'render.env', os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    os.fchmod(fd, 0o600)
    with os.fdopen(fd, 'w') as stream:
        stream.write('\n'.join(f'{k}={v}' for k,v in env.items()) + '\n')
    result = session.client('lambda').invoke(FunctionName=outputs['AdapterName'], Payload=b'{"action":"data"}')
    payload = json.loads(result['Payload'].read())
    if result.get('FunctionError') or payload.get('mode') != 'demo':
        raise RuntimeError('Dataset smoke check failed. Review Lambda logs.')
    print('AWS adapter verified; demo shipments:', len(payload.get('shipments', [])))
    print('Confirm the Amazon SNS subscription email sent to ' + args.email + ' to receive alerts.')
    print('Secret environment files saved locally in ' + str(folder) + '; do not paste or commit them.')
    print('Connecting Render requires a Render API key, entered hidden (leave blank to import render.env manually).')
    from render_connect import connect
    connect(env)


if __name__ == '__main__':
    try:
        main()
    except ClientError as error:
        print('AWS error:', error.response['Error']['Code'], error.response['Error'].get('Message', ''))
        raise SystemExit(1)
    except (RuntimeError, KeyboardInterrupt) as error:
        print(str(error) or 'Stopped. Rerun to resume; existing data is preserved.')
        raise SystemExit(1)
