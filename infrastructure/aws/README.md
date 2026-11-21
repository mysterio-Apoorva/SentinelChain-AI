# AWS backend for the existing Render app

This package creates Cognito, Bedrock access through a scoped runtime IAM user, two on-demand DynamoDB tables, a private Lambda adapter, EventBridge, SNS email and seven-day CloudWatch logs. Render continues hosting the application. There are no EC2 instances, NAT gateways, public Lambda URLs or always-on AWS servers.

Shipments, suppliers, hotspots and trends are **fictional demo records**, clearly labelled in the UI. Supplier activation, inventory approvals and saved playbooks persist in DynamoDB. They do not place purchases or change real carrier routes. Bedrock analysis and email delivery use actual AWS services. SMS, Slack and PagerDuty require their own subscriptions; this package configures email only.

## Cost estimate before deployment

Plan on **US$1–$3/month for light demo usage**, excluding Render, tax and data transfer. This is a planning allowance, not a fixed quote or spending cap. Current region, retries, token lengths and usage affect billing. No free-tier credit is assumed. The following US East (N. Virginia) reference workload totals approximately **$0.53/month**:

| Service | Monthly reference usage | Approximate USD |
| --- | --- | ---: |
| Nova Lite | 1,000 calls, each 2,000 input and 1,000 output tokens | 0.36 |
| Cognito Lite | 5 monthly active direct users before free tier | 0.03 |
| DynamoDB | 10,000 write units, 100,000 read units, 10MB data | 0.02 |
| Lambda | 10,000 invocations, total 2,500 GB-seconds | 0.04 |
| EventBridge | 1,000 custom events | 0.001 |
| SNS | 1,000 publishes and email deliveries | 0.02 |
| CloudWatch | 100MB logs, seven-day retention | 0.05 |

DynamoDB units are **not API request counts**: document size and transactions multiply consumption. Full dataset updates cost more than small item writes. The app limits combined AI analysis/chat attempts to 1,000 per UTC calendar month through an atomic DynamoDB counter. Failed attempts also consume quota; SDK retries may cause multiple model invocations per attempt. Other services are not capped. Keep the invite-only app small and monitor AWS Billing. Seven-day logs expire automatically; records and user pools are retained on stack deletion, so retained storage must be cleaned separately when retiring the demo.

Sources: [Bedrock pricing](https://aws.amazon.com/bedrock/pricing/), [Nova Lite token rate example](https://aws.amazon.com/blogs/machine-learning/customizing-text-content-moderation-with-amazon-nova/), [Cognito](https://aws.amazon.com/cognito/pricing/), [DynamoDB](https://aws.amazon.com/dynamodb/pricing/on-demand/), [Lambda](https://aws.amazon.com/lambda/pricing/), [EventBridge](https://aws.amazon.com/eventbridge/pricing/), [SNS](https://aws.amazon.com/sns/pricing/), [CloudWatch](https://aws.amazon.com/cloudwatch/pricing/). Check your selected region in these pages before approval.

## Run in AWS CloudShell

Open CloudShell from your usual signed-in AWS console, in your preferred region. It uses that session's credentials; do not share your AWS password or root access keys. Your session must be allowed to create the listed resources and IAM roles/policies. Run:

```bash
git clone https://github.com/mysterio-Apoorva/SentinelChain-AI.git sentinelchain-setup
cd sentinelchain-setup
python3 -m pip install --user boto3
python3 infrastructure/aws/deploy.py
```

If already cloned, enter that directory and `git pull --ff-only` before running. To preview without any changes use `python3 infrastructure/aws/deploy.py --plan`.

The script displays your actual account/region and estimate, then waits for **DEPLOY**. It performs a tiny paid model smoke call only after approval. It refuses unsupported direct Nova Lite regions, resource deletion and resource replacement; it never silently selects another region. Review failed model availability/permissions in the console before retrying.

It seeds records only if absent, creates an app admin at `apoorvajha1209@gmail.com`, and asks for a **new SentinelChain app password**, hidden while typing. This is not your AWS password. Existing confirmed app passwords are preserved. Confirm the SNS subscription email to receive alerts. The pool is invite-only; add future users through Cognito admin tools.

For automatic Render connection, enter a Render API key at the hidden prompt, then your existing `srv-...` service ID from its dashboard URL. The script displays the service name/repository and asks for **CONNECT** before updating individual environment variables and starting a fresh build. The API key stays in memory. It never replaces the entire Render environment. A partially failed update can be safely resumed by rerunning.

Alternatively leave the API key blank: use CloudShell Actions → Download file to download the generated `render.env`, then import it in the existing Render service's Environment page and save/rebuild/deploy. Build-time Cognito variables require a rebuild. The exact protected file path is printed by the script. Never paste or commit that file; it contains the scoped IAM user's secret access key. Credentials are kept under `~/.sentinelchain/<account>/<region>/<stack>/`, outside this checkout, with restricted Linux permissions. Rotate the runtime access key periodically through IAM and update Render; lost local credentials may require manually retiring an old key before rerunning because IAM permits only two keys per user.

## What gets verified

Before changes: CloudFormation template validation, caller account/region and direct model availability. After approval: a real Bedrock response, successful stack creation, dataset seed and Lambda dataset read. Render's deploy state is polled if connected. These checks do not prove browser sign-in or inbox delivery: after deployment sign in, check six demo shipments, activate/deactivate a backup and reload, approve an inventory adjustment, analyze a scenario, save its plan, reload history, and send an email after confirming the subscription. No AWS deployment or live delivery is claimed from local tests.

Local tests (no AWS credentials required):

```bash
python3 -m pip install 'moto[dynamodb]>=5,<6' 'cfn-lint>=1,<2'
python3 infrastructure/aws/build_template.py
cfn-lint infrastructure/aws/template.json
python3 -m unittest discover -s infrastructure/aws -p 'test_*.py'
npm run lint
npm test
npm run build
```
