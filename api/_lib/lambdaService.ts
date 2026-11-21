import {
  LambdaClient,
  InvokeCommand,
} from "@aws-sdk/client-lambda";

const lambda = new LambdaClient({
  region: process.env.AWS_REGION,
});

export async function invokeAnalysisLambda(payload: any) {
  const command = new InvokeCommand({
    FunctionName: process.env.LAMBDA_FUNCTION_NAME,
    Payload: Buffer.from(JSON.stringify({ action: "audit", ...payload })),
  });

  const response = await lambda.send(command);

  if (response.FunctionError) throw new Error("Lambda execution failed");
  if (!response.Payload) {
    throw new Error("Lambda returned no response");
  }

  const result = JSON.parse(Buffer.from(response.Payload).toString());
  if (result.error) throw new Error(result.error);
  return result;
}