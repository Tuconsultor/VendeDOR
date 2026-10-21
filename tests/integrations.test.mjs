import test from 'node:test';
import assert from 'node:assert/strict';
import { generateKeyPairSync, verify } from 'node:crypto';
import { headers, metrics, parseRows, parseScore, run, googleToken, requestJson } from '../public/repo/scripts/sales.mjs';
import { createReview, isoWeek } from '../public/repo/scripts/review.mjs';

const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const credentials = JSON.stringify({ type: 'service_account', client_email: 'demo@example.invalid', private_key: privateKey.export({ type: 'pkcs8', format: 'pem' }) });
const env = { GOOGLE_CREDENTIALS: credentials, GOOGLE_SHEET_ID: 'demo_sheet', QWEN_API_KEY: 'test-key', QWEN_MODEL: 'test-model', BUSINESS_CONTEXT: 'Negocio ficticio' };
const now = () => Date.UTC(2026, 9, 21, 12);
const row = (id, phase, amount, probability) => {
  const cells = Array(24).fill('');
  cells[0] = id; cells[2] = 'Empresa Demo'; cells[3] = 'Distribución';
  cells[4] = 'NO_ENVIAR_CONTACTO'; cells[5] = 'NO_ENVIAR_EMAIL';
  cells[7] = amount; cells[8] = phase; cells[9] = probability;
  return cells;
};
const fixture = () => [headers, row('D001', 'Prospección', 12000, 25), row('D002', 'Propuesta', 8000, 60), row('D003', 'Cerrado Ganado', 5000, 100), row('D004', 'Cerrado Perdido', 3000, 0)];
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });
function service({ values = fixture(), invalidScore = false, editDuringRun = false, docFailure = false } = {}) {
  const calls = []; const files = {}; let reads = 0; let qwenCalls = 0;
  const fetchImpl = async (url, options = {}) => {
    calls.push({ url, ...options });
    if (url === 'https://oauth2.googleapis.com/token') {
      const jwt = new URLSearchParams(options.body).get('assertion');
      const [head, body, signature] = jwt.split('.');
      assert.ok(verify('RSA-SHA256', Buffer.from(`${head}.${body}`), publicKey, Buffer.from(signature, 'base64url')));
      const claims = JSON.parse(Buffer.from(body, 'base64url').toString());
      assert.equal(claims.aud, url); assert.equal(claims.iss, 'demo@example.invalid');
      assert.equal(claims.exp - claims.iat, 3600);
      return json({ access_token: 'test-google-access' });
    }
    if (url.includes('sheets.googleapis.com') && !options.method) {
      reads++;
      if (editDuringRun && reads > 1) { const changed = structuredClone(values); changed[1][0] = 'OTHER'; return json({ values: changed }); }
      return json({ values });
    }
    if (url.includes('sheets.googleapis.com') && options.method === 'POST') {
      const update = JSON.parse(options.body);
      assert.equal(update.valueInputOption, 'RAW');
      for (const data of update.data) {
        const match = data.range.match(/!(?:Q(\d+):R\d+|V(\d+))$/);
        assert.ok(match, `Unsafe write range: ${data.range}`);
        const index = Number(match[1] || match[2]) - 1;
        if (match[1]) { values[index][16] = data.values[0][0]; values[index][17] = data.values[0][1]; }
        else values[index][21] = data.values[0][0];
      }
      return json({ totalUpdatedCells: update.data.length });
    }
    if (url.includes('dashscope-intl.aliyuncs.com')) {
      const body = JSON.parse(options.body); qwenCalls++;
      assert.equal(body.model, 'test-model');
      assert.ok(!options.body.includes('NO_ENVIAR_EMAIL')); assert.ok(!options.body.includes('NO_ENVIAR_CONTACTO'));
      return json({ choices: [{ finish_reason: 'stop', message: { content: body.response_format ? JSON.stringify({ score: invalidScore ? 15 : 8, priority: 'Alta', reason: 'Encaje hipotético' }) : '# Análisis de prueba' } }] });
    }
    if (url.includes('docs.googleapis.com')) return json({ documentId: 'demo_doc' }, docFailure ? 403 : 200);
    throw new Error(`Unexpected request: ${url}`);
  };
  return { calls, files, fetchImpl, get qwenCalls() { return qwenCalls; }, options: { env, fetchImpl, now, save: async (name, content) => { files[name] = content; }, makeDir: async () => {}, log: () => {} } };
}

test('el caso guiado calcula métricas sin mezclar cerradas con forecast abierto', () => {
  assert.deepEqual(metrics(parseRows(fixture())), { openDeals: 2, openPipeline: 20000, weightedForecast: 7800, wonTotal: 5000, wonDeals: 1, lostDeals: 1, winRate: 50 });
  assert.equal(metrics([]).winRate, null);
});
test('rechaza cabeceras, IDs duplicados, valores y fases inválidas antes de escribir', () => {
  for (const mutate of [x => { x[0] = ['Incorrecto']; }, x => { x[2][0] = x[1][0]; }, x => { x[1][7] = '12.000 EUR'; }, x => { x[1][9] = 150; }, x => { x[1][8] = 'Desconocida'; }]) {
    const values = structuredClone(fixture()); mutate(values); assert.throws(() => parseRows(values));
  }
});
test('check verifica OAuth firmado, lectura y Qwen sin escrituras', async () => {
  const mock = service(); assert.deepEqual(await run('check', mock.options), { rows: 4 });
  assert.equal(mock.qwenCalls, 1);
  assert.equal(mock.calls.filter(x => x.url.includes('sheets.googleapis.com') && x.method === 'POST').length, 0);
});
test('enrich escribe solo Q/R/V de filas abiertas y repetir no vuelve a procesarlas', async () => {
  const mock = service();
  assert.deepEqual(await run('enrich', mock.options), { processed: 2 });
  assert.equal(mock.qwenCalls, 2);
  const update = JSON.parse(mock.calls.find(x => x.url.endsWith('/values:batchUpdate')).body);
  assert.deepEqual(update.data.map(x => x.range), ["'Pipeline Principal'!Q2:R2", "'Pipeline Principal'!V2", "'Pipeline Principal'!Q3:R3", "'Pipeline Principal'!V3"]);
  assert.equal(JSON.parse(mock.files['output/enrichment.json']).processed, 2);
  assert.deepEqual(await run('enrich', mock.options), { processed: 0 });
  assert.equal(mock.qwenCalls, 2);
});
test('score inválido y edición concurrente impiden escribir resultados', async () => {
  for (const config of [{ invalidScore: true }, { editDuringRun: true }]) {
    const mock = service(config); await assert.rejects(run('enrich', mock.options));
    assert.equal(mock.calls.some(x => x.url.endsWith('/values:batchUpdate')), false);
  }
  for (const text of ['no json', '{}', '{"score":8,"priority":"Urgente","reason":"x"}']) assert.throws(() => parseScore(text));
});
test('report genera archivos verificables y añade al Doc solo si se configura', async () => {
  const mock = service();
  await run('report', { ...mock.options, env: { ...env, GOOGLE_REPORT_DOC_ID: 'demo_doc' } });
  assert.equal(JSON.parse(mock.files['output/metrics.json']).weightedForecast, 7800);
  assert.match(mock.files['output/report.md'], /no mide solo esta semana/);
  assert.match(mock.files['output/report.md'], /Análisis de prueba/);
  const docCall = mock.calls.find(x => x.url.includes('documents/demo_doc:batchUpdate'));
  const body = JSON.parse(docCall.body);
  assert.equal(body.requests.length, 1); assert.ok(body.requests[0].insertText.endOfSegmentLocation);
  const without = service(); await run('report', without.options);
  assert.equal(without.calls.some(x => x.url.includes('docs.googleapis.com')), false);
});
test('fallos reales de proveedor no se convierten en éxito ni filtran cuerpos', async () => {
  await assert.rejects(requestJson('https://example.invalid/api', {}, async () => json({ secret: 'NO_LOG' }, 403)), error => error.message.includes('HTTP 403') && !error.message.includes('NO_LOG'));
  const mock = service({ docFailure: true });
  await assert.rejects(run('report', { ...mock.options, env: { ...env, GOOGLE_REPORT_DOC_ID: 'demo_doc' } }), /HTTP 403/);
  await assert.rejects(googleToken('{}'), /cuenta de servicio válida/);
  await assert.rejects(run('enrich', { ...mock.options, env: { ...env, MAX_PROSPECTS: '0' } }), /MAX_PROSPECTS/);
  await assert.rejects(run('check', { ...mock.options, env: { ...env, QWEN_BASE_URL: 'https://untrusted.invalid/v1' } }), /oficial/);
});
test('semana ISO correcta en límites de año y recordatorio sin duplicados', async () => {
  assert.equal(isoWeek(new Date('2021-01-01T12:00:00Z')), '2020-W53');
  assert.equal(isoWeek(new Date('2026-12-31T12:00:00Z')), '2026-W53');
  const issues = []; let created = 0;
  const config = { env: { GITHUB_REPOSITORY: 'demo/sales', GITHUB_TOKEN: 'fake' }, now: new Date(now()), log: () => {}, fetchImpl: async (url, options) => {
    if (options.method === 'POST') { created++; issues.push(JSON.parse(options.body)); return json({ number: 1 }, 201); }
    return json(issues);
  } };
  assert.deepEqual(await createReview(config), { created: true });
  assert.deepEqual(await createReview(config), { created: false }); assert.equal(created, 1);
});

test('no reintenta una inserción no idempotente de Docs tras un error', async () => {
  let attempts = 0;
  await assert.rejects(requestJson('https://docs.googleapis.com/v1/documents/demo:batchUpdate', { method: 'POST' }, async () => { attempts++; return json({}, 503); }, false), /HTTP 503/);
  assert.equal(attempts, 1);
});
test('errores de formato del proveedor no exponen el cuerpo recibido', async () => {
  await assert.rejects(requestJson('https://example.invalid/api', {}, async () => new Response('sensitive-body', { status: 200 })), error => error.message.includes('no era JSON válido') && !error.message.includes('sensitive-body'));
});
