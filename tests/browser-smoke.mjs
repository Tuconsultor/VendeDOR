// Optional browser check. Start the production preview first; see README.md.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, readdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import ExcelJS from 'exceljs';

const site = process.argv[2] || 'http://127.0.0.1:4173/VendeDOR/';
const origin = new URL(site).origin;
const directory = await mkdtemp(join(tmpdir(), 'vendedor-smoke-'));
const downloads = join(directory, 'downloads');
const { mkdir } = await import('node:fs/promises'); await mkdir(downloads);
const chrome = spawn(process.env.CHROMIUM_PATH || 'chromium', ['--headless', '--no-sandbox', '--no-zygote', '--single-process', '--disable-dev-shm-usage', '--disable-gpu', `--user-data-dir=${join(directory, 'profile')}`, '--remote-debugging-port=9223', 'about:blank'], { stdio: 'ignore' });
let ws;
try {
  let page;
  for (let n = 0; n < 60; n++) {
    try { page = (await (await fetch('http://127.0.0.1:9223/json')).json()).find(item => item.type === 'page'); } catch {}
    if (page) break; await new Promise(r => setTimeout(r, 100));
  }
  assert.ok(page, 'Chromium did not start');
  ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let id = 0; const pending = new Map(); const exceptions = []; const posts = [];
  ws.onmessage = event => {
    const msg = JSON.parse(event.data);
    if (msg.id) { const request = pending.get(msg.id); msg.error ? request.reject(new Error(JSON.stringify(msg.error))) : request.resolve(msg.result); pending.delete(msg.id); }
    if (msg.method === 'Runtime.exceptionThrown') exceptions.push(msg.params.exceptionDetails.text);
    if (msg.method === 'Network.requestWillBeSent' && msg.params.request.postData) posts.push(msg.params.request.url);
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => { const n = ++id; pending.set(n, { resolve, reject }); ws.send(JSON.stringify({ id: n, method, params })); });
  const evaluate = async expression => {
    const response = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true, userGesture: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text);
    return response.result.value;
  };
  const waitFor = async expression => {
    for (let n = 0; n < 120; n++) { if (await evaluate(expression)) return; await new Promise(r => setTimeout(r, 100)); }
    throw new Error(`Timed out: ${expression}; alert=${await evaluate("document.querySelector('#guia [role=alert]')?.textContent")}`);
  };
  const fill = async (name, value) => evaluate(`(() => {const el=document.querySelector('[name=${JSON.stringify(name)}]');const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:el.tagName==='SELECT'?HTMLSelectElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,${JSON.stringify(value)});el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));})()`);
  const button = async text => evaluate(`Array.from(document.querySelectorAll('#guia button')).find(b=>b.textContent===${JSON.stringify(text)}).click()`);
  const step = title => waitFor(`document.querySelector('#guia h3[tabindex]')?.textContent===${JSON.stringify(title)}`);
  await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable'); await call('Page.bringToFront');
  await call('Browser.grantPermissions', { origin, permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'] });
  await call('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloads });
  await call('Emulation.setTimezoneOverride', { timezoneId: 'America/Mexico_City' });
  await call('Page.navigate', { url: site }); await step('Mi negocio');
  assert.equal(await evaluate(`document.querySelector('nav[aria-label="Pasos de puesta en marcha"] button:nth-child(4)').disabled`), true);
  assert.equal(await evaluate(`localStorage.getItem('vendedor-assistant-v1')`), null);
  if (await evaluate(`!!document.querySelector('[name=business-currency]')`)) assert.deepEqual(await evaluate(`({value:document.querySelector('[name=business-currency]').value, readOnly:document.querySelector('[name=business-currency]').readOnly})`), {value:'pesos mexicanos (MXN)',readOnly:true});
  assert.equal(await evaluate(`document.querySelector('#avanzado details').open`), false);
  assert.equal(await evaluate(`document.querySelectorAll('nav[aria-label="Carpetas de recursos"] button').length`), 5);
  await evaluate(`document.querySelector('[name="business-name"]').form.requestSubmit()`); await step('Mi negocio');
  for (const [name, value] of Object.entries({ 'business-name': 'Muebles Rivera', 'business-product': 'Mobiliario para oficinas', 'business-target': 'Empresas que abren oficina', 'business-sector': 'Mobiliario' })) await fill(name, value);
  await evaluate(`document.querySelector('[name="business-name"]').form.requestSubmit()`); await step('Mi hoja');
  await button('Descargar mi hoja preparada'); await waitFor(`!document.querySelector('[name="sheet-confirmed"]').disabled`);
  await evaluate(`document.querySelector('[name="sheet-confirmed"]').click()`); await button('Registrar mi primer cliente →'); await step('Mi primer cliente');
  await fill('prospect-company', 'Distribuidora del Norte'); await fill('prospect-need', 'Abre una oficina para 20 personas'); await fill('prospect-amount', '50000');
  await evaluate(`document.querySelector('[name="prospect-company"]').form.requestSubmit()`); await step('Mi primera acción');
  const prompt = await evaluate(`document.querySelector('#seller-message').value`);
  assert.match(prompt, /Muebles Rivera/); assert.match(prompt, /Distribuidora del Norte/); assert.ok(!prompt.includes('{{')); assert.match(prompt, /pesos mexicanos \(MXN\)/); assert.match(prompt, /MXN.*50,000.00/);
  assert.equal(await evaluate(`localStorage.getItem('vendedor-assistant-v1')`), null);
  // User explicitly consents to storage, then a reload must restore the same step.
  await evaluate(`Array.from(document.querySelectorAll('#guia input[type=checkbox]')).find(el=>el.parentElement.textContent.includes('Guardar mi avance')).click()`);
  await waitFor(`!!localStorage.getItem('vendedor-assistant-v1')`);
  await call('Page.reload'); await step('Mi primera acción');
  assert.match(await evaluate(`document.querySelector('#seller-message').value`), /Muebles Rivera/);
  await evaluate(`Array.from(document.querySelectorAll('[role="group"][aria-label="Tareas comerciales"] button')).find(b=>b.textContent.startsWith('Responder una objeción')).click()`);
  await fill('prospect-objection', 'El presupuesto es 100 USD');
  await waitFor(`!!document.querySelector('#guia [role=alert]') && document.querySelector('#seller-message').value.includes('pesos mexicanos')`);
  assert.equal(await evaluate(`Array.from(document.querySelectorAll('#guia button')).find(b=>b.textContent==='Copiar mensaje').disabled`), true);
  await fill('prospect-objection', 'Me parece caro');
  await waitFor(`document.querySelector('#seller-message').value.includes('Me parece caro')`);
  await button('Copiar mensaje'); await waitFor(`document.querySelector('#guia [role="status"]').textContent.includes('Mensaje copiado')`);
  assert.match(await evaluate('navigator.clipboard.readText()'), /Me parece caro/);
  assert.equal(await evaluate(`Array.from(document.querySelectorAll('#guia a')).find(a=>a.textContent.includes('Abrir Qwen')).href`), 'https://qwen.ai/');
  await evaluate(`document.querySelector('[name="qwen-used"]').click()`);
  await fill('action-description', 'Proponer una llamada de diagnóstico'); await fill('action-date', '2099-01-02'); await fill('action-notes', 'Pendiente de confirmar alcance');
  await evaluate(`document.querySelector('[name="answer-reviewed"]').click()`);
  await button('Registrar mi siguiente acción');
  await waitFor(`!!Array.from(document.querySelectorAll('#guia button')).find(b=>b.textContent==='Descargar mi hoja con el primer seguimiento')`);
  await button('Descargar mi hoja con el primer seguimiento');
  await waitFor(`document.querySelector('#guia progress').value===6`);
  let finalBook;
  for (let n = 0; n < 50; n++) {
    for (const file of await readdir(downloads)) {
      if (!file.endsWith('.xlsx')) continue;
      const book = new ExcelJS.Workbook(); await book.xlsx.load(await readFile(join(downloads, file)));
      if (book.getWorksheet('Pipeline Principal').getCell('C2').value === 'Distribuidora del Norte') finalBook = book;
    }
    if (finalBook) break; await new Promise(r=>setTimeout(r,100));
  }
  assert.ok(finalBook, 'Final spreadsheet was not downloaded');
  const sheet = finalBook.getWorksheet('Pipeline Principal');
  assert.equal(sheet.getCell('H2').value, 50000); assert.match(sheet.getCell('H2').numFmt,/MXN/); assert.equal(sheet.getCell('N2').value, 'Proponer una llamada de diagnóstico'); assert.equal(sheet.getCell('O2').value.toISOString().slice(0,10), '2099-01-02');
  assert.match(sheet.getCell('U2').value, /Pendiente de confirmar alcance/);
  assert.ok(finalBook.getWorksheet('Dashboard').getCell('B4').value.formula.includes('SUMPRODUCT'));
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate(`document.querySelector('#guia').scrollIntoView()`);
  assert.ok(await evaluate(`document.documentElement.scrollWidth<=window.innerWidth`));
  const screenshot = await call('Page.captureScreenshot', { format: 'png' });
  await writeFile('/tmp/vendedor-assistant-mobile.png', Buffer.from(screenshot.data, 'base64'));
  await evaluate(`Array.from(document.querySelectorAll('#guia button')).find(b=>b.textContent==='Borrar mis datos de este asistente').click()`);
  await button('Sí, borrar'); await step('Mi negocio');
  assert.equal(await evaluate(`localStorage.getItem('vendedor-assistant-v1')`), null);
  assert.equal(await evaluate(`document.querySelector('[name="business-name"]').value`), '');
  assert.deepEqual(exceptions, []); assert.deepEqual(posts, []);
  console.log('PASS: 4 pasos, validación, 2 descargas reales, contenido XLSX, personalización, portapapeles, consentimiento, restauración, borrado y móvil. Sin envíos de formulario por red.');
  await call('Browser.close');
} finally {
  ws?.close(); chrome.kill();
  // Let Chromium release its profile before cleaning the temporary directory.
  await new Promise(r => setTimeout(r, 300));
  await rm(directory, { recursive: true, force: true }).catch(() => {});
}
