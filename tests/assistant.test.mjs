import test from 'node:test';
import assert from 'node:assert/strict';
import ExcelJS from 'exceljs';
import JSZip from 'jszip';
import { buildMessage, crmHeaders, demoBusiness, demoProspect, emptyProspect, filename, initialAssistant, parseSaved, tasks, validateBusiness, validateProspect, localDate } from '../src/lib/assistant.ts';
import { createWorkbook } from '../src/lib/workbook.ts';
import { headers, parseRows, metrics } from '../public/repo/scripts/sales.mjs';

test('las seis tareas usan el negocio y cliente sin variables pendientes', () => {
  const business = { ...demoBusiness, company: 'Muebles Rivera', product: 'Oficinas ergonómicas', currency: 'MXN' };
  const client = { ...demoProspect, company: 'Cliente Norte', need: 'Necesita nuevas oficinas', objection: 'No hay presupuesto' };
  for (const task of tasks) {
    const message = buildMessage(business, client, task.id);
    for (const value of ['Muebles Rivera', 'Oficinas ergonómicas', 'MXN', 'Cliente Norte', 'Necesita nuevas oficinas']) assert.ok(message.includes(value));
    assert.ok(!message.includes('{{')); assert.match(message, /No envíes mensajes/);
  }
  const withoutUnknowns = buildMessage(business, { ...emptyProspect, company: 'Nuevo cliente' }, 'proposal');
  assert.match(withoutUnknowns, /No confirmado/); assert.ok(!withoutUnknowns.includes('undefined'));
});
test('el asistente valida campos requeridos y distingue importe desconocido de cero', () => {
  assert.ok(validateBusiness(demoBusiness)); assert.ok(!validateBusiness({ ...demoBusiness, target: ' ' }));
  assert.ok(validateProspect({ ...demoProspect, amount: '' })); assert.ok(validateProspect({ ...demoProspect, amount: '0' }));
  for (const change of [{ probability: '' }, { probability: '101' }, { amount: '-5' }, { amount: 'No sé' }, { company: ' ' }, { phase: 'Incorrecta' }]) assert.ok(!validateProspect({ ...demoProspect, ...change }));
});
test('recupera un avance válido y descarta datos dañados o incompatibles', () => {
  const state = { ...initialAssistant(), business: { ...demoBusiness }, businessReady: true, sheetDownloaded: true, sheetConfirmed: true, prospect: { ...demoProspect }, prospectReady: true, step: 3 };
  assert.deepEqual(parseSaved(JSON.stringify({ version: 1, state })), state);
  for (const raw of [null, '', '{', '{}', JSON.stringify({ version: 2, state }), JSON.stringify({ version: 1, state: { ...state, step: 6 } }), JSON.stringify({ version: 1, state: { ...state, businessReady: false } }), JSON.stringify({ version: 1, state: { ...state, action: null } })]) assert.equal(parseSaved(raw), null);
  assert.equal(localDate(new Date(2026, 9, 21, 23)), '2026-10-21');
  assert.match(filename('Diseño / Rivera'), /^mis-oportunidades-diseno-rivera\.xlsx$/);
});
async function load(buffer) { const book = new ExcelJS.Workbook(); await book.xlsx.load(buffer); return book; }
const today = new Date('2026-10-21T12:00:00Z');
test('el archivo preparado contiene fases, validaciones y fórmulas hasta 500 oportunidades', async () => {
  const buffer = await createWorkbook(demoBusiness, undefined, undefined, today);
  const book = await load(buffer);
  assert.deepEqual(book.worksheets.map(sheet => sheet.name), ['Empieza aquí', 'Pipeline Principal', 'Dashboard', 'Actividad']);
  const pipeline = book.getWorksheet('Pipeline Principal');
  assert.deepEqual(pipeline.getRow(1).values.slice(1), headers);
  assert.deepEqual(crmHeaders, headers);
  assert.equal(pipeline.getCell('C2').value, null);
  assert.equal(pipeline.getCell('I2').dataValidation.type, 'list');
  assert.match(pipeline.getCell('I2').dataValidation.formulae[0], /Cerrado Ganado/);
  assert.deepEqual(pipeline.getCell('J501').dataValidation.formulae, [0, 100]);
  assert.match(pipeline.getCell('M501').value.formula, /TODAY\(\)-W501/);
  assert.match(book.getWorksheet('Dashboard').getCell('B4').value.formula, /SUMPRODUCT/);
  // ExcelJS does not parse calcPr attributes back; inspect the persisted OOXML.
  const archive = await JSZip.loadAsync(buffer);
  assert.match(await archive.file('xl/workbook.xml').async('string'), /fullCalcOnLoad="1"/);
});
test('la copia final conserva cliente, moneda, próxima acción y cifras compatibles con las integraciones', async () => {
  const action = { description: 'Proponer una llamada de diagnóstico', date: '2026-10-24', notes: 'Presupuesto sin confirmar' };
  const book = await load(await createWorkbook(demoBusiness, demoProspect, action, today));
  const sheet = book.getWorksheet('Pipeline Principal');
  assert.equal(sheet.getCell('C2').value, demoProspect.company); assert.equal(sheet.getCell('H2').value, 12000);
  assert.equal(sheet.getCell('N2').value, action.description); assert.equal(sheet.getCell('O2').value.toISOString().slice(0, 10), action.date);
  assert.match(sheet.getCell('U2').value, /Presupuesto sin confirmar/);
  assert.equal(book.getWorksheet('Empieza aquí').getCell('B4').value, 'pesos mexicanos (MXN)');
  const cells = sheet.getRow(2).values.slice(1).map(value => value instanceof Date ? value.toISOString() : value && typeof value === 'object' ? '' : value ?? '');
  const summary = metrics(parseRows([headers, cells]));
  assert.equal(summary.openPipeline, 12000); assert.equal(summary.weightedForecast, 3000);
});
test('exporta texto como texto y conserva valores desconocidos sin inventar un importe', async () => {
  const book = await load(await createWorkbook({ ...demoBusiness, company: '=HYPERLINK("bad")' }, { ...demoProspect, company: '=1+1', amount: '' }, undefined, today));
  const sheet = book.getWorksheet('Pipeline Principal');
  assert.equal(sheet.getCell('C2').value, '=1+1'); assert.equal(sheet.getCell('C2').type, ExcelJS.ValueType.String);
  assert.equal(sheet.getCell('H2').value, null);
  assert.equal(book.getWorksheet('Empieza aquí').getCell('B1').type, ExcelJS.ValueType.String);
});

test('la moneda está fijada en MXN en mensajes, datos guardados y hojas', async () => {
  const incompatible = { ...demoBusiness, currency: 'EUR' };
  assert.equal(validateBusiness(incompatible), false);
  assert.throws(() => buildMessage(incompatible, demoProspect, 'proposal'), /pesos mexicanos/);
  await assert.rejects(createWorkbook(incompatible), /pesos mexicanos/);
  const legacy = { ...initialAssistant(), business: incompatible, businessReady: true, sheetDownloaded: true, sheetConfirmed: true, prospect: { ...demoProspect, amount: '12000' }, prospectReady: true, step: 3, actionSaved: true, finalDownloaded: true };
  const restored = parseSaved(JSON.stringify({ version: 1, state: legacy }));
  assert.equal(restored.business.currency, 'MXN'); assert.equal(restored.prospect.company, demoProspect.company);
  assert.equal(restored.prospect.amount, ''); assert.equal(restored.step, 0);
  assert.equal(restored.finalDownloaded, false); assert.equal(restored.currencyReviewRequired, true);
  const message = buildMessage(demoBusiness, demoProspect, 'proposal');
  assert.match(message, /pesos mexicanos \(MXN\)/); assert.match(message, /MXN.*12,000.00/);
  const book = await load(await createWorkbook(demoBusiness, demoProspect));
  assert.match(book.getWorksheet('Pipeline Principal').getCell('H2').numFmt, /MXN/);
  for (const address of ['B3', 'B4', 'B5']) assert.match(book.getWorksheet('Dashboard').getCell(address).numFmt, /MXN/);
});

test('los importes en otra moneda dentro del texto libre no pasan a mensajes ni hojas', async () => {
  const prospect = { ...demoProspect, need: 'Presupuesto: 100 USD' };
  assert.equal(validateProspect(prospect), false);
  assert.throws(() => buildMessage(demoBusiness, prospect, 'proposal'), /pesos mexicanos/);
  await assert.rejects(createWorkbook(demoBusiness, prospect), /pesos mexicanos/);
});

test('conserva las notas anteriores pendientes de revisión sin publicarlas como importes en MXN', () => {
  const state = { ...initialAssistant(), business: { ...demoBusiness }, businessReady: true, prospect: { ...demoProspect, need: 'Referencia anterior: 100 USD' }, prospectReady: true, sheetConfirmed: true, step: 3 };
  const restored = parseSaved(JSON.stringify({ version: 1, state }));
  assert.equal(restored.prospect.need, state.prospect.need); assert.equal(restored.prospect.amount, state.prospect.amount);
  assert.equal(restored.step, 0); assert.equal(restored.currencyReviewRequired, true);
});
