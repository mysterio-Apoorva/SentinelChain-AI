import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

export class AdapterError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export async function invokeDemoAdapter(action: string, payload: Record<string, unknown> = {}) {
  const name = process.env.DEMO_ADAPTER_FUNCTION_NAME;
  if (!name) throw new AdapterError(503, 'Demo adapter is not configured.');
  const response = await new LambdaClient({ region: process.env.AWS_REGION, maxAttempts: 2 }).send(new InvokeCommand({
    FunctionName: name, Payload: Buffer.from(JSON.stringify({ action, ...payload })),
  }), { abortSignal: AbortSignal.timeout(25000) });
  if (response.FunctionError || !response.Payload) throw new AdapterError(502, 'AWS demo adapter failed. Retry with the same action ID.');
  const result = JSON.parse(Buffer.from(response.Payload).toString());
  if (result.error) throw new AdapterError(result.statusCode || 502, result.error);
  return result;
}
