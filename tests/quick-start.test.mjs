import test from 'node:test';
import assert from 'node:assert/strict';
import { buildQuickPrompt, quickTasks } from '../src/lib/quickStart.ts';

test('cada tarea usa el negocio y establece límites sobre datos y acciones', () => {
  for (const { id } of quickTasks) {
    const prompt = buildQuickPrompt(id, { product: 'Reparación de celulares', customer: 'Mi colonia en León', price: '450', details: 'Revisar disponibilidad' });
    for (const value of ['Reparación de celulares', 'Mi colonia en León', '450 MXN', 'Revisar disponibilidad', 'No inventes', 'no envíes mensajes']) assert.ok(prompt.includes(value));
    assert.ok(!prompt.includes('undefined'));
  }
});
test('precio desconocido no se confunde con cero y cotización no inventa totales', () => {
  const business = { product: 'Comida', customer: 'León', price: '', details: '' };
  assert.match(buildQuickPrompt('quote', business), /Precio: Pendiente de confirmar/);
  assert.match(buildQuickPrompt('quote', { ...business, price: '0' }), /Precio: 0 MXN/);
  assert.match(buildQuickPrompt('quote', business), /No calcules un total sin cantidades/);
});
test('respuestas y pendientes piden contexto y seguimiento evita presión', () => {
  const business = { product: 'Calzado', customer: 'México', price: '', details: '' };
  assert.match(buildQuickPrompt('reply', business), /pídemela antes de redactar/);
  assert.match(buildQuickPrompt('organize', business), /No inventes fechas/);
  assert.match(buildQuickPrompt('follow', business), /sin insistencia ni presión/);
});
