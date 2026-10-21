#!/usr/bin/env node
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
export function isoWeek(date = new Date()) {
  const day = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay() || 7));
  const year = day.getUTCFullYear();
  const start = new Date(Date.UTC(year, 0, 1));
  return `${year}-W${String(Math.ceil(((day - start) / 86400000 + 1) / 7)).padStart(2, '0')}`;
}
export async function createReview({ env = process.env, fetchImpl = fetch, now = new Date(), log = console.log } = {}) {
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(env.GITHUB_REPOSITORY || '') || !env.GITHUB_TOKEN) throw new Error('Faltan GITHUB_REPOSITORY o GITHUB_TOKEN de GitHub Actions.');
  const title = `Pipeline Review — ${isoWeek(now)}`;
  const base = `https://api.github.com/repos/${env.GITHUB_REPOSITORY}/issues`;
  const headers = { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json' };
  // Check all issue pages, including closed issues, to avoid duplicates on reruns.
  for (let page = 1; ; page++) {
    const response = await fetchImpl(`${base}?state=all&per_page=100&page=${page}`, { headers, signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`GitHub devolvió HTTP ${response.status} al buscar recordatorios.`);
    const issues = await response.json();
    if (issues.some(issue => !issue.pull_request && issue.title === title)) { log('El recordatorio de esta semana ya existe.'); return { created: false }; }
    if (issues.length < 100) break;
    if (page === 100) throw new Error('Demasiadas Issues para comprobar duplicados con este ejemplo.');
  }
  const response = await fetchImpl(base, { method: 'POST', headers, signal: AbortSignal.timeout(30000), body: JSON.stringify({ title, body: '## Revisión semanal\n\n- [ ] Revisar oportunidades estancadas y próximos contactos\n- [ ] Actualizar fases y probabilidades\n- [ ] Elegir tres prioridades\n- [ ] Usar los prompts de pipeline y reporting\n- [ ] Revisar el informe antes de compartirlo\n\nRecursos: public/repo/ en tu repositorio. No añadas datos personales a esta Issue si el repositorio es público.' }) });
  if (!response.ok) throw new Error(`GitHub devolvió HTTP ${response.status} al crear el recordatorio. Comprueba Issues y permissions: issues: write.`);
  log('Recordatorio semanal creado.'); return { created: true };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) createReview().catch(error => { console.error(error.message); process.exitCode = 1; });
