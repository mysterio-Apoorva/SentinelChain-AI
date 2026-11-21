import { test, expect } from '@playwright/test';
const sections = ['dashboard','live-risk-map','global-threat-feed','active-disruptions','incident-details','live-shipment-tracking','delayed-shipments','supplier-health','alternative-suppliers','recovery-actions','route-optimization','inventory-suggestions','risk-trends','business-impact','reports','voice-assistant','ai-chat','notifications','profile','cognito-login','team-roles'];
test('all 21 screens render at desktop and mobile widths with unavailable services', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.route('**/api/**', route => route.fulfill({ status:503, contentType:'application/json', body:JSON.stringify({error:'Integration not configured'}) }));
  await page.goto('http://localhost:3000/tests/ui.html');
  for (const width of [1440,390]) {
    await page.setViewportSize({width,height:900});
    for (const section of sections) {
      await page.evaluate(s => { location.hash = s; }, section);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('main h1, main h2').first()).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    }
  }
  expect(errors).toEqual([]);
  await page.screenshot({ path:'test-results/mobile.png',fullPage:true });
});
test('report downloads a real PDF and notifications show provider errors', async ({ page }) => {
  await page.route('**/api/**', route => route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:'Integration not configured'})}));
  await page.goto('http://localhost:3000/tests/ui.html#reports');
  const download = page.waitForEvent('download');
  await page.getByRole('button',{name:'Download Executive PDF'}).click();
  expect((await download).suggestedFilename()).toBe('sentinelchain-executive-posture.pdf');
  await page.evaluate(() => { location.hash='notifications'; });
  await page.locator('textarea').fill('Acceptance test');
  await page.getByRole('button',{name:'Transmit SNS Payload'}).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByText('ACCEPTED:')).toHaveCount(0);
});
test('login has no fake prefilled credentials', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('input[type="email"]').first()).toHaveValue('');
  await expect(page.locator('input[type="password"]').first()).toHaveValue('');
});
test('connected records and analysis drive the existing screens', async ({ page }) => {
  const incident = { id:'incident-test', headline:'Test port closure', category:'Port', severity:'High', probability:80, affectedNodes:['Test port'], impactInventory:-20, impactDeliveries:'Estimated delay of two days', impactCost:15, reasoning:['Closure','Backlog','Stock shortage'], recommendations:[{title:'Review alternate port',reduction:20,cost:'Unknown',description:'Check capacity'},{title:'Review stock',reduction:10,cost:'Unknown',description:'Check stock'}], integrations:{storage:'saved'}, source:'bedrock' };
  await page.route('**/api/**', route => {
    const name = new URL(route.request().url()).pathname;
    const body = name.endsWith('/data') ? {shipments:[{id:'REAL-001',vessel:'Connected vessel',carrier:'Carrier',route:'Port A to B',cargo:'Components',eta:'2026-12-01',status:'Transit',delay:'None'}]} : name.endsWith('/history') ? [] : name.endsWith('/analyze-disruption') ? incident : name.endsWith('/chat') ? {reply:'Context-based answer'} : {error:'Not configured'};
    return route.fulfill({contentType:'application/json',body:JSON.stringify(body)});
  });
  await page.goto('http://localhost:3000/tests/ui.html#live-shipment-tracking');
  await expect(page.getByText('REAL-001')).toBeVisible();
  await page.evaluate(() => { location.hash='active-disruptions'; });
  const request = page.waitForRequest('**/api/analyze-disruption');
  await page.getByRole('button', {name:'Run AWS Bedrock Analysis'}).click();
  await request;
  await expect(page).toHaveURL(/incident-details/);
  await expect(page.getByText('Test port closure').first()).toBeVisible();
  await page.evaluate(() => { location.hash='ai-chat'; });
  await page.locator('main input').fill('Explain the incident');
  await page.getByRole('button',{name:'Send message'}).click();
  await expect(page.getByText('Context-based answer')).toBeVisible();
  await page.setViewportSize({width:1440,height:1000});
  await page.evaluate(() => { location.hash='dashboard'; });
  await expect(page.locator('main h1')).toBeVisible();
  await page.screenshot({path:'test-results/dashboard.png',fullPage:true});
});
