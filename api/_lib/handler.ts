import { invokeDemoAdapter, AdapterError } from './demoService';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { analyzeDisruption, chat, dispatchNotification, dispatchOperation, getHistory, getPerformanceMetrics, ServiceError } from './sentinel';
const methods: Record<string, string> = { 'analyze-disruption': 'POST', chat: 'POST', operations: 'POST', history: 'GET', 'notify-sns': 'POST', 'performance-metrics': 'GET', data: 'GET' };
export async function handleApi(route: string, req: any, res: any) {
  try {
    if (!methods[route]) throw new ServiceError(404, 'Unknown API endpoint.');
    if (req.method !== methods[route]) { res.setHeader('Allow', methods[route]); throw new ServiceError(405, 'Method not allowed.'); }
    if (route === 'performance-metrics') return res.json(getPerformanceMetrics());
    const userPoolId = process.env.COGNITO_USER_POOL_ID || process.env.VITE_COGNITO_USER_POOL_ID;
    const clientId = process.env.COGNITO_CLIENT_ID || process.env.VITE_COGNITO_CLIENT_ID;
    if (!userPoolId || !clientId) throw new ServiceError(503, 'Cognito is not configured on the server.');
    const token = req.headers.authorization?.replace(/^Bearer /i, '');
    if (!token) throw new ServiceError(401, 'Sign in to continue.');
    let identity;
    try { identity = await CognitoJwtVerifier.create({ userPoolId, clientId, tokenUse: 'id' }).verify(token); }
    catch { throw new ServiceError(401, 'Session expired or invalid. Sign in again.'); }
    if (['operations','notify-sns'].includes(route) && !(identity['cognito:groups'] ?? []).some((g: string) => ['Admin','SupplyChainManager','LogisticsExecutive'].includes(g)))
      throw new ServiceError(403, 'Your Cognito group cannot dispatch operational changes.');
    const body = req.body ?? {};
    if (JSON.stringify(body).length > 32768) throw new ServiceError(413, "Request body exceeds 32KB.");
    switch (route) {
      case 'analyze-disruption': return res.json(await analyzeDisruption(body.text, identity.sub, String(identity.email ?? '')));
      case 'chat': return res.json(await chat(body.message, body.context));
      case 'notify-sns': return res.json(await dispatchNotification(body.channel, body.message, body.severity));
      case 'operations': return res.json(await dispatchOperation(body, identity.sub));
      case 'history': return res.json(await getHistory(identity.sub));
      case 'data': {
        if (process.env.DEMO_ADAPTER_FUNCTION_NAME) return res.json(await invokeDemoAdapter('data', { userId: identity.sub }));
        if (!process.env.DATA_SOURCE_URL) throw new ServiceError(503, 'Live operational data source is not configured.');
        const response = await fetch(process.env.DATA_SOURCE_URL, { headers: process.env.DATA_SOURCE_TOKEN ? { Authorization: `Bearer ${process.env.DATA_SOURCE_TOKEN}` } : {}, signal: AbortSignal.timeout(15000) });
        if (!response.ok) throw new ServiceError(502, 'Operational data source is unavailable.');
        return res.json(await response.json());
      }
    }
  } catch (error) {
    const status = (error instanceof ServiceError || error instanceof AdapterError) ? error.status : 502;
    return res.status(status).json({ error: (error instanceof ServiceError || error instanceof AdapterError) ? error.message : 'Upstream service failed. Please retry or check server configuration.' });
  }
}
