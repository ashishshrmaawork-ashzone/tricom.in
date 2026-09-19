/* Local browser smoke checks; requires an available Playwright installation. */
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const standards = require('../src/standards.json');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || path.resolve(root, '../.browser-review-tools/playwright/driver/package'));
const base = (process.env.TRICOM_BASE_URL || 'http://127.0.0.1:8095').replace(/\/$/, '');
const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
(async () => {
 const browser = await chromium.launch({headless:true, ...(fs.existsSync(chrome) ? {executablePath:chrome} : {})});
 try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type() === 'error') errors.push(m.text()); });
  page.on('response', r => { if(r.status() >= 400) errors.push(r.status()+' '+r.url()); });
  const titles = new Set(), descriptions = new Set();
  for (const name of ['index','about','services','industries','contact','awards',...standards.map(s=>s.slug)]) {
   await page.goto(base+'/'+name+'.html');
   await page.waitForLoadState('networkidle');
   assert.equal(await page.locator('h1').count(),1,name+': h1');
   const ids = await page.locator('[id]').evaluateAll(nodes=>nodes.map(n=>n.id));
   assert.equal(new Set(ids).size,ids.length,name+': duplicate IDs');
   const refs = await page.locator('a[href],img[src],script[src],link[href]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')||n.getAttribute('src')));
   for (const ref of refs) {
    if(/^(mailto:|https?:|tel:)/.test(ref)) continue;
    const [file,hash] = ref.split('#');
    const target = path.resolve(root, decodeURIComponent(file.split('?')[0] || name+'.html'));
    assert.ok(fs.existsSync(target), name+': missing '+ref);
    if(hash) assert.ok(fs.readFileSync(target,'utf8').includes('id="'+hash+'"'),name+': broken anchor '+ref);
   }
   for (const width of [320,768,1440]) {
    await page.setViewportSize({width,height:950});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,name+': overflow '+width);
   }
   const standard = standards.find(s=>s.slug===name);
   if(standard) {
    const title=await page.title(), description=await page.locator('meta[name="description"]').getAttribute('content');
    assert.ok(!titles.has(title) && !descriptions.has(description),'Duplicate detail metadata');
    titles.add(title); descriptions.add(description);
    assert.match(await page.locator('h1').innerText(),new RegExp(standard.code));
    assert.equal(await page.locator('#standard').inputValue(),standard.code);
    assert.equal(await page.locator('.detail-nav [aria-current="page"]').getAttribute('href'),name+'.html');
    await page.getByRole('button',{name:standard.question,exact:true}).click();
    await page.waitForTimeout(350);
    assert.equal(await page.locator('#detail-answer-0').isVisible(),false);
   }
   console.log(name+': assets, anchors, content and 3 viewports OK');
  }
  for(const [i,standard] of standards.entries()) {
   await page.goto(base+'/services.html');
   assert.equal(await page.locator('.standard-details').nth(i).getAttribute('href'),standard.slug+'.html');
   await page.locator('[data-standard="'+i+'"]').click();
   await page.locator('#standardModal').waitFor({state:'visible'});
   assert.equal(await page.locator('#standard-details').getAttribute('href'),standard.slug+'.html');
   await page.locator('#standard-details').click();
   assert.ok(page.url().endsWith(standard.slug+'.html'));
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto(base+'/');
  await page.getByRole('button',{name:'Open navigation'}).click();
  await page.waitForTimeout(350);
  assert.equal(await page.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded'),'true');
  await page.locator('#mainNav').getByRole('link',{name:'ISO certifications',exact:true}).click();
  await page.getByRole('button',{name:'Information security',exact:true}).click();
  assert.equal(await page.locator('.standard-column:visible').count(),1);
  await page.locator('[data-standard="3"]').click();
  await page.locator('#standard-enquire').click();
  assert.equal(await page.locator('#standard').inputValue(),'ISO 27001');
  await page.locator('#enquiry-form button[type="submit"]').click();
  assert.equal(await page.locator('#enquiryModal').isVisible(),false);
  await page.locator('#full-name').fill('Preview User');
  await page.locator('#email').fill('preview@example.com');
  await page.locator('#phone').fill('9876543210');
  await page.locator('#enquiry-form button[type="submit"]').click();
  await page.locator('#enquiryModal').waitFor({state:'visible'});
  assert.match(await page.locator('#enquiry-status').textContent(),/has not been sent/);
  const downloadPromise=page.waitForEvent('download');
  await page.locator('#download-enquiry').click();
  assert.equal((await downloadPromise).suggestedFilename(),'tricom-consultation-enquiry.txt');
  await page.locator('#enquiryModal [aria-label="Close"]').click();
  await page.waitForTimeout(350);
  await page.locator('.floating-contact').click();
  await page.locator('#whatsappModal').waitFor({state:'visible'});
  await page.goto(base+'/iso-9001.html');
  await page.screenshot({path:path.join(os.tmpdir(),'tricom-iso-mobile.png')});
  await page.setViewportSize({width:1440,height:1000});
  await page.screenshot({path:path.join(os.tmpdir(),'tricom-iso-desktop.png')});
  assert.deepEqual(errors,[]);
  console.log('All 6 popup-to-detail journeys, direct links, mobile navigation, filters and enquiry flow passed.');
  console.log('Review screenshots saved outside the project: '+os.tmpdir());
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1});
