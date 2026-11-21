import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime';
import { SNSClient } from '@aws-sdk/client-sns';
import { LambdaClient } from '@aws-sdk/client-lambda';
import { analyzeDisruption, dispatchNotification, dispatchOperation, getPerformanceMetrics, requiredText, validateAnalysis } from '../api/_lib/sentinel';
import { handleApi } from '../api/_lib/handler';
const analysis = { headline: 'Reported port closure', category: 'Port', severity: 'High', probability: 80, affectedNodes: ['Reported port'], impactInventory: -20, impactDeliveries: 'Estimated delay', impactCost: 15, reasoning: ['Closure','Delay','Stock depletion'], recommendations: [{title:'Review reroute',reduction:20,cost:'Unknown',description:'Verify alternate capacity'},{title:'Review stock',reduction:10,cost:'Unknown',description:'Check stock'}] };
test('input and AI schema validation reject malformed and unsafe values', () => {
  for (const input of [null, '', '   ', 22, 'x'.repeat(12001)]) assert.throws(() => requiredText(input,'Report'));
  assert.throws(() => validateAnalysis({ ...analysis, probability: 101 }));
  assert.throws(() => validateAnalysis({ ...analysis, recommendations: [] }));
  assert.throws(() => validateAnalysis({ ...analysis, impactInventory: 10 }));
  assert.equal(validateAnalysis(analysis).headline, analysis.headline);
});
test('unconfigured services never return fabricated success', async () => {
  const keys = ['BEDROCK_MODEL_ID','SNS_EMAIL_TOPIC_ARN','OPERATIONS_WEBHOOK_URL'];
  keys.forEach(k => delete process.env[k]);
  await assert.rejects(analyzeDisruption('Port closure'), /not configured/);
  await assert.rejects(dispatchNotification('Email','Test'), /not configured/);
  await assert.rejects(dispatchNotification('unknown','Test'), /Unsupported/);
  await assert.rejects(dispatchOperation({type:'playbook',target:'Reroute',idempotencyKey:'test'},'user'), /not configured/);
  assert.equal(getPerformanceMetrics().awsLambdaLatencyMs, null);
});
test('valid AI result survives downstream Lambda failure', async () => {
  process.env.BEDROCK_MODEL_ID = 'test'; process.env.LAMBDA_FUNCTION_NAME = 'test';
  delete process.env.EVENT_BUS_NAME; delete process.env.DYNAMODB_TABLE;
  const ai = mock.method(BedrockRuntimeClient.prototype, 'send', async () => ({output:{message:{content:[{text:JSON.stringify(analysis)}]}}}));
  const lambda = mock.method(LambdaClient.prototype, 'send', async () => { throw new Error('Unavailable'); });
  try {
    const result = await analyzeDisruption('Reported port closure','user');
    assert.equal(result.headline,analysis.headline); assert.equal(result.integrations?.lambda,'failed'); assert.equal(result.integrations?.storage,'not_configured');
  } finally { ai.mock.restore(); lambda.mock.restore(); delete process.env.BEDROCK_MODEL_ID; delete process.env.LAMBDA_FUNCTION_NAME; }
});
test('SNS acceptance is not misreported as delivery', async () => {
  process.env.SNS_EMAIL_TOPIC_ARN = 'test-topic';
  const sns = mock.method(SNSClient.prototype,'send',async () => ({MessageId:'provider-id'}));
  try { const result = await dispatchNotification('Email','Test'); assert.equal(result.status,'ACCEPTED'); assert.equal(result.messageId,'provider-id'); }
  finally { sns.mock.restore(); delete process.env.SNS_EMAIL_TOPIC_ARN; }
});
test('operations require explicit provider completion and pass idempotency key', async () => {
  process.env.OPERATIONS_WEBHOOK_URL = 'https://connector.invalid';
  let sent: any;
  const fetchMock = mock.method(globalThis,'fetch',async (_url, init) => { sent = init; return new Response(JSON.stringify({status:'queued'})); });
  try {
    await assert.rejects(dispatchOperation({type:'inventory',target:'Component',idempotencyKey:'stable-key'},'user'), /not confirmed/);
    assert.equal(sent.headers['Idempotency-Key'],'stable-key');
    fetchMock.mock.mockImplementation(async () => new Response(JSON.stringify({status:'completed',reference:'external-123'})));
    assert.equal((await dispatchOperation({type:'inventory',target:'Component',idempotencyKey:'stable-key'},'user')).reference,'external-123');
  } finally { fetchMock.mock.restore(); delete process.env.OPERATIONS_WEBHOOK_URL; }
});
test('shared API checks methods, missing auth configuration and missing tokens', async () => {
  const response = () => ({code:200,body:null as any,setHeader(){},status(code:number){this.code=code;return this;},json(body:any){this.body=body;return this;}});
  let res = response(); await handleApi('chat',{method:'GET'},res); assert.equal(res.code,405);
  delete process.env.COGNITO_USER_POOL_ID; delete process.env.VITE_COGNITO_USER_POOL_ID;
  res=response();await handleApi('chat',{method:'POST',headers:{}},res); assert.equal(res.code,503);
  process.env.COGNITO_USER_POOL_ID='us-east-1_test';process.env.COGNITO_CLIENT_ID='test';
  res=response();await handleApi('operations',{method:'POST',headers:{},body:{role:'Admin'}},res);assert.equal(res.code,401);
  delete process.env.COGNITO_USER_POOL_ID;delete process.env.COGNITO_CLIENT_ID;
});
