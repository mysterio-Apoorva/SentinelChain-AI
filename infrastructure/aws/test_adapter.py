import json
import os
import unittest
from unittest.mock import patch

import boto3
from moto import mock_aws
from demo_lambda import handle
from seed_data import build_dataset
from build_template import build_template


@mock_aws
class AdapterTests(unittest.TestCase):
    def setUp(self):
        self.db = boto3.resource('dynamodb', region_name='us-east-1')
        self.client = boto3.client('dynamodb', region_name='us-east-1')
        self.tables = []
        for name in ('state', 'incidents'):
            self.tables.append(self.db.create_table(TableName=name, BillingMode='PAY_PER_REQUEST',
                KeySchema=[{'AttributeName':'id','KeyType':'HASH'}], AttributeDefinitions=[{'AttributeName':'id','AttributeType':'S'}]))
        self.state, self.incidents = self.tables
        self.state.put_item(Item={'id':'dataset','version':1,'data':build_dataset()})

    def call(self, action, **values):
        return handle({'action':action, **values}, self.state, self.incidents, self.client)

    def operation(self, kind, target, params, key='operation-1', user='alice'):
        return self.call('operation', userId=user, body={'type':kind,'target':target,'parameters':params,'idempotencyKey':key})

    def test_activation_persists_and_retry_is_idempotent(self):
        target = build_dataset()['backups'][0]['backup']
        first = self.operation('supplier',target,{'activate':True})
        self.assertEqual(first, self.operation('supplier',target,{'activate':True}))
        row = self.state.get_item(Key={'id':'dataset'})['Item']
        self.assertEqual(row['version'], 2)
        self.assertTrue(self.call('data')['backups'][0]['active'])
        self.assertEqual(self.operation('supplier',target,{'activate':False})['statusCode'],409)
        self.operation('supplier',target,{'activate':False},key='operation-2')
        self.assertFalse(self.call('data')['backups'][0]['active'])

    def test_inventory_validates_then_persists(self):
        with self.assertRaises(ValueError):
            self.operation('inventory','Microcontrollers',{'recommended':'999 Days'})
        self.operation('inventory','Microcontrollers',{'recommended':'45 Days'})
        row = self.call('data')['suggestions'][0]
        self.assertEqual(row['current'],'45 Days')
        self.assertEqual(row['status'],'Optimal')

    def test_playbook_requires_owned_saved_analysis_and_private_read(self):
        self.incidents.put_item(Item={'id':'incident-1','userId':'alice','analysis':{'recommendations':[{'title':'Reroute'}]}})
        params = {'incidentId':'incident-1','transitSpeedBuffer':85,'budgetCap':120}
        self.assertEqual(self.operation('playbook','Reroute',params,user='bob')['statusCode'],403)
        self.operation('playbook','Reroute',params)
        self.assertEqual(len(self.call('data',userId='alice')['playbooks']),1)
        self.assertEqual(self.call('data',userId='bob')['playbooks'],[])
        with self.assertRaises(ValueError):
            self.operation('playbook','Buy anything',params,key='other')

    def test_quota_stops_requests_at_limit(self):
        with patch.dict(os.environ, {'AI_MONTHLY_LIMIT':'2'}):
            self.assertTrue(self.call('quota')['accepted'])
            self.assertTrue(self.call('quota')['accepted'])
            self.assertEqual(self.call('quota')['statusCode'],429)

    def test_audit_and_unseeded_error(self):
        self.assertEqual(self.call('audit',userId='alice',analysis={'id':'a1','headline':'Demo'})['status'],'recorded')
        self.state.delete_item(Key={'id':'dataset'})
        self.assertEqual(self.call('data')['statusCode'],503)


class TemplateTests(unittest.TestCase):
    def test_template_is_inline_and_has_no_public_function_or_unscoped_runtime_policy(self):
        template = build_template()
        self.assertLess(len(json.dumps(template).encode()),51200)
        self.assertFalse(any(r['Type'] in ('AWS::Lambda::Url','AWS::IAM::AccessKey') for r in template['Resources'].values()))
        runtime = template['Resources']['RuntimeUser']['Properties']['Policies'][0]['PolicyDocument']['Statement']
        self.assertTrue(all(s['Resource'] != '*' for s in runtime))


if __name__ == '__main__':
    unittest.main()
