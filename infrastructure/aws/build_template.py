"""Generate the reviewable CloudFormation JSON without third-party build dependencies."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parent

def ref(name): return {'Ref':name}
def sub(value): return {'Fn::Sub':value}
def arn(name): return {'Fn::GetAtt':[name,'Arn']}
def resource(kind, properties, **extra): return {'Type':'AWS::'+kind,'Properties':properties,**extra}
def statement(actions, resources): return {'Effect':'Allow','Action':actions,'Resource':resources}

def build_template():
    r={}
    for key in ['IncidentTable','StateTable']:
        r[key]=resource('DynamoDB::Table',{'BillingMode':'PAY_PER_REQUEST','AttributeDefinitions':[{'AttributeName':'id','AttributeType':'S'}],
            'KeySchema':[{'AttributeName':'id','KeyType':'HASH'}],'SSESpecification':{'SSEEnabled':True}},DeletionPolicy='Retain',UpdateReplacePolicy='Retain')
    r['UserPool']=resource('Cognito::UserPool',{'UserPoolName':sub('${AWS::StackName}-users'),'UserPoolTier':'LITE',
        'UsernameAttributes':['email'],'UsernameConfiguration':{'CaseSensitive':False},'AutoVerifiedAttributes':['email'],
        'AdminCreateUserConfig':{'AllowAdminCreateUserOnly':True},'MfaConfiguration':'OFF',
        'Policies':{'PasswordPolicy':{'MinimumLength':12,'RequireLowercase':True,'RequireUppercase':True,'RequireNumbers':True,'RequireSymbols':True}},
        'AccountRecoverySetting':{'RecoveryMechanisms':[{'Name':'verified_email','Priority':1}]}},DeletionPolicy='Retain',UpdateReplacePolicy='Retain')
    r['AppClient']=resource('Cognito::UserPoolClient',{'UserPoolId':ref('UserPool'),'ClientName':'SentinelChain Render','GenerateSecret':False,
        'ExplicitAuthFlows':['ALLOW_USER_SRP_AUTH','ALLOW_REFRESH_TOKEN_AUTH'],'PreventUserExistenceErrors':'ENABLED',
        'EnableTokenRevocation':True,'AccessTokenValidity':60,'IdTokenValidity':60,'RefreshTokenValidity':7,
        'TokenValidityUnits':{'AccessToken':'minutes','IdToken':'minutes','RefreshToken':'days'}})
    for logical,name in [('AdminGroup','Admin'),('ManagerGroup','SupplyChainManager'),('LogisticsGroup','LogisticsExecutive'),('AnalystGroup','Analyst')]:
        r[logical]=resource('Cognito::UserPoolGroup',{'UserPoolId':ref('UserPool'),'GroupName':name})
    r['Alerts']=resource('SNS::Topic',{'DisplayName':'SentinelChain Demo Alerts'})
    r['EmailSubscription']=resource('SNS::Subscription',{'TopicArn':ref('Alerts'),'Protocol':'email','Endpoint':ref('AlertEmail')})
    r['EventBus']=resource('Events::EventBus',{'Name':sub('${AWS::StackName}-events')})
    r['AnalysisRule']=resource('Events::Rule',{'EventBusName':ref('EventBus'),'EventPattern':{'source':['sentinel.ai'],'detail-type':['AIAnalysisCompleted']},
        'State':'ENABLED','Targets':[{'Id':'EmailAlerts','Arn':ref('Alerts'),'InputTransformer':{'InputPathsMap':{'headline':'$.detail.headline','severity':'$.detail.severity'},
        'InputTemplate':'"SentinelChain demo analysis: <headline> (severity: <severity>). Model estimates require review; no real-world action executed."'}}]})
    r['AlertsPolicy']=resource('SNS::TopicPolicy',{'Topics':[ref('Alerts')],'PolicyDocument':{'Version':'2012-10-17','Statement':[{
        'Effect':'Allow','Principal':{'Service':'events.amazonaws.com'},'Action':'sns:Publish','Resource':ref('Alerts'),
        'Condition':{'ArnEquals':{'aws:SourceArn':arn('AnalysisRule')}}}]}})
    r['AdapterRole']=resource('IAM::Role',{'AssumeRolePolicyDocument':{'Version':'2012-10-17','Statement':[{'Effect':'Allow','Principal':{'Service':'lambda.amazonaws.com'},'Action':'sts:AssumeRole'}]},
        'Policies':[{'PolicyName':'DemoAdapter','PolicyDocument':{'Version':'2012-10-17','Statement':[
            statement(['dynamodb:GetItem','dynamodb:PutItem','dynamodb:UpdateItem'],arn('StateTable')),
            statement(['dynamodb:GetItem'],arn('IncidentTable')),
            statement(['logs:CreateLogStream','logs:PutLogEvents'],sub('arn:${AWS::Partition}:logs:${AWS::Region}:${AWS::AccountId}:log-group:/aws/lambda/${AWS::StackName}-adapter:*'))]}}]})
    r['AdapterLogs']=resource('Logs::LogGroup',{'LogGroupName':sub('/aws/lambda/${AWS::StackName}-adapter'),'RetentionInDays':7})
    r['Adapter']=resource('Lambda::Function',{'FunctionName':sub('${AWS::StackName}-adapter'),'Runtime':'python3.13','Handler':'index.handler',
        'Role':arn('AdapterRole'),'MemorySize':256,'Timeout':20,'Environment':{'Variables':{'STATE_TABLE':ref('StateTable'),'INCIDENT_TABLE':ref('IncidentTable'),'AI_MONTHLY_LIMIT':'1000'}},
        'Code':{'ZipFile':(ROOT/'demo_lambda.py').read_text(encoding='utf-8-sig')}},DependsOn='AdapterLogs')
    r['RuntimeUser']=resource('IAM::User',{'Policies':[{'PolicyName':'SentinelChainRuntime','PolicyDocument':{'Version':'2012-10-17','Statement':[
        statement(['bedrock:InvokeModel'],sub('arn:${AWS::Partition}:bedrock:${AWS::Region}::foundation-model/${BedrockModelId}')),
        statement(['dynamodb:PutItem','dynamodb:Scan'],arn('IncidentTable')),
        statement(['lambda:InvokeFunction'],arn('Adapter')),
        statement(['events:PutEvents'],arn('EventBus')),
        statement(['sns:Publish'],ref('Alerts'))]}}]})
    return {'AWSTemplateFormatVersion':'2010-09-09','Description':'SentinelChain demo backend for existing Render hosting. No public Lambda URL; scoped IAM access.',
        'Parameters':{'AlertEmail':{'Type':'String','AllowedPattern':r'[^\s@]+@[^\s@]+\.[^\s@]+'},'BedrockModelId':{'Type':'String','Default':'amazon.nova-lite-v1:0','AllowedValues':['amazon.nova-lite-v1:0']}},
        'Resources':r,'Outputs':{k:{'Value':v} for k,v in {'Region':ref('AWS::Region'),'UserPoolId':ref('UserPool'),'AppClientId':ref('AppClient'),
            'IncidentTableName':ref('IncidentTable'),'StateTableName':ref('StateTable'),'AdapterName':ref('Adapter'),'EventBusName':ref('EventBus'),'EmailTopicArn':ref('Alerts'),'RuntimeUserName':ref('RuntimeUser')}.items()}}

if __name__=='__main__':
    (ROOT/'template.json').write_text(json.dumps(build_template(),indent=2)+'\n',encoding='utf-8')
