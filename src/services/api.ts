import { fetchAuthSession } from 'aws-amplify/auth';
export async function apiRequest<T = any>(route: string, body?: unknown): Promise<T> {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();
  const response = await fetch(`/api/${route}`, {
    method: body === undefined ? 'GET' : 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }), signal: AbortSignal.timeout(60000),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || `Request failed (${response.status}).`);
  return result;
}
export async function runOperation(type: string, target: string, parameters: unknown = {}) {
  const key = `sentinel_action_${JSON.stringify({type,target,parameters})}`;
  const idempotencyKey = sessionStorage.getItem(key) || crypto.randomUUID();
  sessionStorage.setItem(key, idempotencyKey);
  const result = await apiRequest('operations', { type, target, parameters, idempotencyKey });
  window.dispatchEvent(new Event('sentinel:data-changed'));
  sessionStorage.removeItem(key);
  return result;
}
