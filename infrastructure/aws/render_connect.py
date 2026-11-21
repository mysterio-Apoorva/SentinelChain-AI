"""Optional Render connection: token stays in memory, individual env vars are updated."""
import getpass
import json
import time
from urllib.request import Request, urlopen
from urllib.error import HTTPError


def connect(env):
    token = getpass.getpass('Render API key (hidden, optional): ').strip()
    if not token:
        print('AWS is ready. Import render.env in the existing Render service Environment page, then save and rebuild/deploy.'); return

    def request(path, method='GET', body=None):
        req = Request('https://api.render.com/v1' + path, method=method,
            headers={'Authorization':'Bearer ' + token, 'Content-Type':'application/json'},
            data=json.dumps(body).encode() if body is not None else None)
        try:
            with urlopen(req, timeout=60) as response:
                raw = response.read()
                return json.loads(raw) if raw else None
        except HTTPError as error:
            # Never log response bodies: they can contain environment values.
            raise RuntimeError(f'Render API returned HTTP {error.code}. AWS setup is preserved; rerun to reconnect.') from None

    service_id = input('Existing Render service ID (srv-..., from its dashboard URL): ').strip()
    if not service_id.startswith('srv-') or not service_id[4:].isalnum():
        raise RuntimeError('Invalid Render service ID.')
    service = request('/services/' + service_id)
    print('Render service:', service.get('name'), '| repo:', service.get('repo'), '| ID:', service_id)
    if input('Type CONNECT to update this service environment and deploy the current repository revision: ').strip() != 'CONNECT':
        print('Render unchanged.'); return
    for key, value in env.items():
        request(f'/services/{service_id}/env-vars/{key}', 'PUT', {'value':value})
    deployment = request(f'/services/{service_id}/deploys', 'POST', {'clearCache':'clear'})
    deploy_id = deployment['id']
    print('Render deploy started:', deploy_id)
    for _ in range(80):
        status = request(f'/services/{service_id}/deploys/{deploy_id}')['status']
        print('Render:', status, flush=True)
        if status == 'live':
            print('Render is live. Sign in with your email and new SentinelChain app password.'); return
        if status in ('build_failed','update_failed','canceled','pre_deploy_failed','deactivated'):
            raise RuntimeError('Render deployment did not become live. Review its deployment logs.')
        time.sleep(15)
    print('Render still deploying. Check its dashboard for the final result.')
