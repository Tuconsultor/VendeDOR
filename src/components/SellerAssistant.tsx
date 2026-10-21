import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { buildMessage, demoBusiness, demoProspect, downloadFile, filename, initialAssistant, localDate, parseSaved, storageKey, tasks, currencyLabel, hasForeignCurrency, phases, validateBusiness, validateProspect, type Business, type Prospect, type SavedAssistant } from '../lib/assistant';
import { createWorkbook } from '../lib/workbook';
import { resourceUrl } from '../lib/resources';

const inputClass = 'mt-2 w-full rounded-xl border border-gray-600 bg-gray-950 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400';
const primaryClass = 'rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300';
const secondaryClass = 'rounded-xl border border-gray-600 px-5 py-3 text-gray-200 hover:bg-gray-800 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-300';
const steps = ['Mi negocio', 'Mi hoja', 'Mi primer cliente', 'Mi primera acción'];
function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return <label className="block text-sm font-medium text-gray-200">{label}{children}{hint && <span className="block mt-2 text-sm font-normal text-gray-400">{hint}</span>}</label>;
}
function initialState() {
  try { return parseSaved(localStorage.getItem(storageKey)); } catch { return null; }
}
export default function SellerAssistant() {
  const [initial] = useState(initialState);
  const [data, setData] = useState<SavedAssistant>(initial || initialAssistant);
  const [remember, setRemember] = useState(!!initial);
  const [notice, setNotice] = useState(initial?.currencyReviewRequired ? 'Revisa la moneda de tu avance y captura los importes en pesos mexicanos (MXN). No se aplicó ninguna conversión.' : '');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    heading.current?.focus();
  }, [data.step]);
  useEffect(() => {
    try {
      if (remember) localStorage.setItem(storageKey, JSON.stringify({ version: 1, state: data }));
      else localStorage.removeItem(storageKey);
    } catch { setError('Este navegador no permite guardar el avance. Puedes continuar y descargar tu hoja; mantén esta pestaña abierta.'); }
  }, [data, remember]);

  const patch = (changes: Partial<SavedAssistant>) => setData(previous => ({ ...previous, ...changes }));
  const businessChange = (name: keyof Business, value: string) => {
    setData(previous => ({ ...previous, business: { ...previous.business, [name]: value }, businessReady: false, sheetDownloaded: false, sheetConfirmed: false, usedQwen: false, reviewed: false, actionSaved: false, finalDownloaded: false }));
  };
  const prospectChange = (name: keyof Prospect, value: string) => {
    setData(previous => ({ ...previous, prospect: { ...previous.prospect, [name]: value, ...(name === 'phase' && value.startsWith('Cerrado') ? { probability: value === 'Cerrado Ganado' ? '100' : '0' } : {}) }, prospectReady: false, usedQwen: false, reviewed: false, actionSaved: false, finalDownloaded: false }));
  };
  const go = (step: number) => { setNotice(''); setError(''); patch({ step }); };
  const businessSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validateBusiness(data.business)) { setError('Completa el nombre de tu negocio, qué vendes y a quién quieres vender. Expresa los importes exclusivamente en pesos mexicanos (MXN).'); return; }
    setError(''); patch({ businessReady: true, step: 1, currencyReviewRequired: false });
  };
  const prospectSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validateProspect(data.prospect)) { setError('Indica un cliente, un importe en pesos mexicanos (MXN) o vacío y una probabilidad entre 0 y 100. Revisa también la moneda en tus textos.'); return; }
    setError(''); patch({ prospectReady: true, step: 3 });
  };
  const currencyConflict = hasForeignCurrency(JSON.stringify([data.business, data.prospect, data.action]));
  const message = currencyConflict ? 'Revisa los importes de tus textos y notas: deben expresarse exclusivamente en pesos mexicanos (MXN).' : buildMessage(data.business, data.prospect, data.task);
  const copy = async () => {
    setError(''); setNotice('');
    try { await navigator.clipboard.writeText(message); setCopiedMessage(message); setNotice('Mensaje copiado. Abre Qwen, inicia un chat nuevo y pégalo.'); }
    catch { setError('No se pudo copiar. Selecciona el texto del mensaje y usa Copiar, o descarga el mensaje.'); }
  };
  const downloadSheet = async (withProspect: boolean) => {
    setBusy(true); setError(''); setNotice('');
    try {
      const buffer = await createWorkbook(data.business, withProspect ? data.prospect : undefined, withProspect && data.actionSaved ? data.action : undefined);
      downloadFile(new Uint8Array(buffer), filename(data.business.company), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      patch(withProspect ? { finalDownloaded: true } : { sheetDownloaded: true });
      setNotice(withProspect ? 'Archivo preparado con tu cliente y siguiente acción. Revisa la carpeta de descargas. Esta copia no modifica tu hoja de Google.' : 'Archivo preparado. Busca tu hoja en Descargas y sigue las instrucciones para abrirla.');
    } catch { setError('No se pudo preparar la hoja. Inténtalo de nuevo con conexión a Internet para cargar el generador. Tus datos del formulario siguen aquí.'); }
    finally { setBusy(false); }
  };
  const actionSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (currencyConflict) { setError('Revisa los importes en tus textos y notas: usa exclusivamente pesos mexicanos (MXN).'); return; }
    if (!data.action.description.trim() || !data.action.date || !data.reviewed || !data.usedQwen) { setError('Confirma que usaste el mensaje, revisa la respuesta y registra una acción con fecha.'); return; }
    setError(''); patch({ actionSaved: true, finalDownloaded: false }); setNotice('Siguiente acción registrada en este asistente. Descarga la hoja actualizada para conservarla.');
  };
  const checklist = [
    ['Negocio configurado', data.businessReady], ['Hoja abierta por ti', data.sheetConfirmed], ['Cliente registrado', data.prospectReady],
    ['Mensaje usado y respuesta revisada', data.usedQwen && data.reviewed], ['Siguiente acción con fecha', data.actionSaved], ['Copia actualizada preparada', data.finalDownloaded],
  ] as const;
  const progress = checklist.filter(([, done]) => done).length;
  const activeTask = tasks.find(task => task.id === data.task)!;
  const canVisit = [true, data.businessReady, data.businessReady && data.sheetConfirmed, data.businessReady && data.sheetConfirmed && data.prospectReady];

  return <section id="guia" className="scroll-mt-20 px-4 py-16 bg-violet-950/20">
    <div className="max-w-6xl mx-auto">
      <p className="text-sm uppercase tracking-widest text-violet-300 mb-3">Tu asistente de puesta en marcha</p>
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">De tu negocio a tu primer seguimiento</h2>
      <p className="max-w-3xl text-gray-300 mb-8">Te guiamos para preparar tu hoja y tu primer seguimiento. Ten a mano Google Sheets o Excel y Qwen Chat.</p>
      <div className="rounded-xl border border-gray-700 bg-gray-900/70 p-4 mb-6 max-w-3xl">
          <label className="flex items-start gap-3 text-sm text-gray-300 "><input type="checkbox" className="mt-1 accent-violet-500" checked={remember} onChange={event => { setRemember(event.target.checked); setNotice(event.target.checked ? 'Se guardará tu avance en este navegador.' : 'Se borró la copia guardada en el navegador. El formulario sigue disponible en esta pestaña.'); }} />Guardar mi avance en este navegador</label>
          <p className="text-xs leading-5 text-gray-400 mt-2">Incluye tu cliente y tus notas en este equipo. Sin activarlo, se pierden al recargar. Úsalo solo en un dispositivo de confianza.</p>
      </div>
      <p className="text-xs text-gray-400 mb-4">Tú eliges qué compartir con Qwen y Google. Los materiales son gratuitos; esos servicios tienen sus propias condiciones.</p>
      <p className="lg:hidden text-sm text-violet-200 mb-4">Mi avance: {progress} de {checklist.length} completados</p>
      <div className="grid lg:grid-cols-[240px_minmax(0,1fr)] gap-6 items-start">
        <aside className="order-2 lg:order-1 lg:sticky lg:top-20 rounded-2xl border border-gray-700 bg-gray-900 p-5">
          <h3 className="font-semibold mb-2">Mi avance</h3>
          <p className="text-sm text-gray-400 mb-3">{progress} de {checklist.length} completados</p>
          <progress aria-label="Avance de puesta en marcha" className="w-full h-2 accent-violet-500" value={progress} max={checklist.length} />
          <ul className="mt-4 space-y-3 text-sm">{checklist.map(([label, done]) => <li key={label} className={done ? 'text-emerald-300' : 'text-gray-400'}><span aria-hidden="true">{done ? '✓ ' : '○ '}</span><span className="sr-only">{done ? 'Completado: ' : 'Pendiente: '}</span>{label}</li>)}</ul>
          <button className="text-sm text-gray-400 underline mt-4 disabled:opacity-40" disabled={busy} onClick={() => setConfirmReset(true)}>Borrar mis datos de este asistente</button>
          {confirmReset && <div className="mt-3 text-sm text-gray-300"><p>Se borrará el formulario y el avance guardado aquí. Tus archivos descargados seguirán en tu equipo.</p><div className="flex flex-wrap gap-3 mt-3"><button className="text-amber-200 underline" onClick={() => { setRemember(false); setData(initialAssistant()); setCopiedMessage(''); setConfirmReset(false); setError(''); setNotice('Datos del asistente borrados.'); }}>Sí, borrar</button><button className="underline" onClick={() => setConfirmReset(false)}>Cancelar</button></div></div>}
        </aside>
        <div className="order-1 lg:order-2 min-w-0">
          <nav aria-label="Pasos de puesta en marcha" className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {steps.map((step, index) => <button key={step} aria-current={data.step === index ? 'step' : undefined} disabled={!canVisit[index] || busy} onClick={() => go(index)} className={`rounded-xl p-3 text-left text-sm border disabled:opacity-40 ${data.step === index ? 'bg-violet-900/50 border-violet-500 text-white' : 'bg-gray-900 border-gray-700 text-gray-300'}`}><span className="block text-xs text-violet-300 mb-1">Paso {index + 1}</span>{step}</button>)}
          </nav>
          <div className="rounded-2xl border border-gray-700 bg-gray-900 p-5 sm:p-8">
            <h3 ref={heading} tabIndex={-1} className="scroll-mt-24 text-2xl font-semibold mb-3 outline-none">{steps[data.step]}</h3>
            {data.step === 0 && <form onSubmit={businessSubmit} className="space-y-5">
              <p className="text-gray-400">Usaremos estas respuestas para preparar tus mensajes. No necesitas saber escribir instrucciones para una IA.</p>
              <button type="button" className="text-violet-300 underline text-sm" onClick={() => { setData({ ...initialAssistant(), business: { ...demoBusiness }, prospect: { ...demoProspect } }); setNotice('Ejemplo ficticio cargado. Puedes cambiarlo por tus datos cuando quieras.'); }}>Quiero practicar con un ejemplo ficticio</button>
              <Field label="Nombre de mi negocio"><input name="business-name" className={inputClass} autoComplete="organization" value={data.business.company} onChange={event => businessChange('company', event.target.value)} required maxLength={150} placeholder="Ej. Muebles Rivera" /></Field>
              <Field label="¿Qué vendo?" hint="Explica tu producto o servicio como se lo contarías a un cliente."><textarea name="business-product" className={inputClass} rows={2} value={data.business.product} onChange={event => businessChange('product', event.target.value)} required maxLength={1500} placeholder="Ej. Mobiliario y diseño de oficinas para empresas" /></Field>
              <Field label="¿A quién quiero vender?" hint="Tipo de cliente, tamaño, zona o necesidad."><textarea name="business-target" className={inputClass} rows={2} value={data.business.target} onChange={event => businessChange('target', event.target.value)} required maxLength={1500} placeholder="Ej. Empresas de 10–50 empleados que abren oficina en Monterrey" /></Field>
              <div className="grid sm:grid-cols-2 gap-5"><Field label="Mi sector (opcional)"><input name="business-sector" className={inputClass} value={data.business.sector} onChange={event => businessChange('sector', event.target.value)} maxLength={150} placeholder="Ej. Equipamiento de oficinas" /></Field><Field label="Moneda de trabajo"><input name="business-currency" className={inputClass} value={currencyLabel} readOnly /></Field></div>
              <Field label="¿Qué quiero conseguir primero?"><select name="business-objective" className={inputClass} value={data.business.objective} onChange={event => businessChange('objective', event.target.value)}>{['Conseguir reuniones con posibles clientes', 'Conseguir una reunión de diagnóstico', 'Dar seguimiento a oportunidades', 'Preparar mejores propuestas', 'Organizar mi actividad comercial'].map(objective => <option key={objective}>{objective}</option>)}</select></Field>
              <button className={primaryClass} type="submit">Preparar mi hoja →</button>
            </form>}
            {data.step === 1 && <div className="space-y-5">
              <p className="text-gray-300">Prepararemos una hoja para <strong>{data.business.company}</strong> en <strong>{currencyLabel}</strong>, con fases desplegables, fórmulas y un resumen. Puedes trabajar en Google Sheets o Excel.</p>
              <button className={primaryClass} disabled={busy} onClick={() => downloadSheet(false)}>{busy ? 'Preparando archivo…' : 'Descargar mi hoja preparada'}</button>
              <ol className="list-decimal list-inside space-y-3 text-gray-300"><li>Busca el archivo <strong className="break-all">{filename(data.business.company)}</strong> en Descargas.</li><li>Abre <a className="text-violet-300 underline" href="https://sheets.google.com" target="_blank" rel="noopener noreferrer">Google Sheets ↗</a> y crea una hoja en blanco. Ve a <strong>Archivo → Importar → Subir</strong> y selecciona el archivo descargado. Elige crear una hoja de cálculo nueva.</li><li>Revisa las pestañas <strong>Empieza aquí</strong>, <strong>Pipeline Principal</strong>, <strong>Dashboard</strong> y <strong>Actividad</strong>. En Excel puedes abrir el archivo directamente.</li></ol>
              <p className="rounded-xl bg-gray-800 p-4 text-sm text-gray-300">La hoja inicial está vacía para tus propios datos. Al terminar el recorrido podrás descargar otra copia con tu primer cliente y su siguiente acción. Las descargas no modifican lo que ya guardaste en Google.</p>
              <label className="flex gap-3 items-start text-gray-200"><input type="checkbox" name="sheet-confirmed" className="mt-1 accent-violet-500" disabled={!data.sheetDownloaded} checked={data.sheetConfirmed} onChange={event => patch({ sheetConfirmed: event.target.checked })} />Ya abrí mi hoja en Google Sheets o Excel y veo sus pestañas.</label>
              <button className={primaryClass} disabled={!data.sheetDownloaded || !data.sheetConfirmed || busy} onClick={() => go(2)}>Registrar mi primer cliente →</button>
              {!data.sheetDownloaded && <p className="text-sm text-gray-400">Descarga el archivo para habilitar la confirmación y continuar.</p>}
            </div>}
            {data.step === 2 && <form onSubmit={prospectSubmit} className="space-y-5">
              <p className="text-gray-400">Elige un cliente posible o practica con uno ficticio. Basta con lo que sabes hoy; la IA te ayudará a preparar preguntas para lo que falte.</p>
              <button type="button" className="text-violet-300 underline text-sm" onClick={() => { patch({ prospect: { ...demoProspect }, prospectReady: false, usedQwen: false, reviewed: false, actionSaved: false, finalDownloaded: false }); setNotice('Cliente ficticio cargado. El negocio que configuraste se mantiene.'); }}>Usar un cliente ficticio de ejemplo</button>
              <Field label="Empresa o cliente al que quiero vender"><input name="prospect-company" className={inputClass} value={data.prospect.company} onChange={event => prospectChange('company', event.target.value)} required maxLength={200} placeholder="Ej. Distribuidora del Norte" /></Field>
              <Field label="¿Qué sé sobre su necesidad? (opcional)" hint="Evita información sensible. Si no lo sabes, prepararemos preguntas para averiguarlo."><textarea name="prospect-need" className={inputClass} rows={3} value={data.prospect.need} onChange={event => prospectChange('need', event.target.value)} maxLength={3000} placeholder="Ej. Está ampliando su equipo y necesita equipar una oficina" /></Field>
              <Field label="Nombre del contacto (opcional)"><input name="prospect-contact" className={inputClass} value={data.prospect.contact} onChange={event => prospectChange('contact', event.target.value)} maxLength={150} placeholder="Puedes dejarlo vacío" /></Field>
              <div className="grid sm:grid-cols-2 gap-5"><Field label={`Valor estimado en ${currencyLabel} (opcional)`} hint="Déjalo vacío si aún no lo sabes."><input name="prospect-amount" className={inputClass} type="number" min="0" max="1000000000000" step="0.01" value={data.prospect.amount} onChange={event => prospectChange('amount', event.target.value)} /></Field><Field label="Probabilidad orientativa (%)" hint="Una estimación tuya entre 0 y 100; puedes revisarla después."><input name="prospect-probability" className={inputClass} type="number" min="0" max="100" step="any" required value={data.prospect.probability} onChange={event => prospectChange('probability', event.target.value)} /></Field></div>
              <Field label="¿En qué punto está la oportunidad?"><select name="prospect-phase" className={inputClass} value={data.prospect.phase} onChange={event => prospectChange('phase', event.target.value)}>{phases.map(phase => <option key={phase}>{phase}</option>)}</select></Field>
              <button className={primaryClass} type="submit">Preparar mi primera acción →</button>
            </form>}
            {data.step === 3 && <div className="space-y-6">
              <p className="text-gray-300">Vamos a trabajar con <strong>{data.prospect.company}</strong> para <strong>{data.business.company}</strong>. Elige lo que necesitas hacer hoy.</p>
              <div className="grid sm:grid-cols-2 gap-3" role="group" aria-label="Tareas comerciales">{tasks.map(task => <button key={task.id} aria-pressed={data.task === task.id} onClick={() => { patch({ task: task.id, usedQwen: false, reviewed: false, actionSaved: false, finalDownloaded: false }); setNotice(''); setError(''); }} className={`rounded-xl border p-4 text-left ${data.task === task.id ? 'border-violet-400 bg-violet-950/60' : 'border-gray-700 hover:bg-gray-800'}`}><span className="font-semibold block">{task.title}</span><span className="text-sm text-gray-400 block mt-1">{task.description}</span></button>)}</div>
              {data.task === 'objection' && <Field label="¿Qué objeción te puso el cliente?"><textarea name="prospect-objection" className={inputClass} rows={2} value={data.prospect.objection} onChange={event => { patch({ prospect: { ...data.prospect, objection: event.target.value }, usedQwen: false, reviewed: false, actionSaved: false, finalDownloaded: false }); }} maxLength={2000} placeholder="Ej. Me parece caro frente a otras opciones" /></Field>}
              <div className="rounded-xl bg-gray-950 border border-gray-700 p-4 sm:p-5">
                <h4 className="font-semibold mb-2">1. Usa tu mensaje personalizado</h4>
                <p className="text-sm text-gray-400 mb-4">Ya incorporamos tus datos para «{activeTask.title}». Copia el mensaje, abre una conversación nueva en Qwen y pégalo. La respuesta la generará Qwen cuando lo envíes allí.</p>
                <label className="block text-sm text-gray-300" htmlFor="seller-message">Mensaje listo para Qwen</label>
                <textarea id="seller-message" className={`${inputClass} text-sm leading-6`} rows={8} readOnly value={message} />
                <div className="flex flex-wrap gap-3 mt-4"><button className={primaryClass} disabled={currencyConflict} onClick={copy}>{copiedMessage === message ? '✓ Mensaje copiado' : 'Copiar mensaje'}</button><a href="https://qwen.ai" target="_blank" rel="noopener noreferrer" className={secondaryClass}>Abrir Qwen ↗</a><button className="text-sm text-violet-300 underline" disabled={currencyConflict} onClick={() => downloadFile(message, 'mi-mensaje-para-qwen.txt', 'text/plain;charset=utf-8')}>Descargar mensaje</button></div>
                <label className="flex gap-3 mt-5 items-start text-sm text-gray-200"><input type="checkbox" name="qwen-used" className="mt-1 accent-violet-500" checked={data.usedQwen} onChange={event => patch({ usedQwen: event.target.checked, reviewed: event.target.checked ? data.reviewed : false, actionSaved: false, finalDownloaded: false })} />Ya pegué y envié este mensaje en Qwen.</label>
              </div>
              <form onSubmit={actionSubmit} className="space-y-5">
                <h4 className="font-semibold">2. Revisa y registra qué harás después</h4>
                <Field label="Mis notas del cliente o de la respuesta (opcional)" hint="Conserva solo lo que necesitas y comprueba los hechos antes de usarlo."><textarea name="action-notes" className={inputClass} rows={3} maxLength={5000} value={data.action.notes} onChange={event => patch({ action: { ...data.action, notes: event.target.value }, actionSaved: false, finalDownloaded: false })} /></Field>
                <Field label="Mi siguiente acción" hint="Una tarea concreta que dependa de ti."><input name="action-description" className={inputClass} required maxLength={500} placeholder="Ej. Enviar un mensaje para proponer una llamada de 15 minutos" value={data.action.description} onChange={event => patch({ action: { ...data.action, description: event.target.value }, actionSaved: false, finalDownloaded: false })} /></Field>
                <Field label="¿Cuándo la haré?"><input name="action-date" className={inputClass} type="date" required min={localDate()} value={data.action.date} onChange={event => patch({ action: { ...data.action, date: event.target.value }, actionSaved: false, finalDownloaded: false })} /></Field>
                <label className="flex gap-3 items-start text-sm text-gray-200"><input type="checkbox" name="answer-reviewed" className="mt-1 accent-violet-500" checked={data.reviewed} onChange={event => patch({ reviewed: event.target.checked, actionSaved: false, finalDownloaded: false })} />Revisé los datos y las recomendaciones antes de usarlos.</label>
                <button className={primaryClass} type="submit" disabled={!data.usedQwen || !data.reviewed}>Registrar mi siguiente acción</button>
              </form>
              {data.actionSaved && <div className="rounded-xl border border-emerald-700 bg-emerald-950/30 p-5">
                <h4 className="font-semibold text-emerald-200">3. Conserva tu primer seguimiento</h4>
                <p className="text-gray-300 text-sm my-3">Tu hoja incluirá el cliente, los datos conocidos, tus notas y la acción con fecha. Ábrela o impórtala como <strong>una hoja nueva</strong>; no reemplaces una hoja de Google donde ya añadiste otras oportunidades.</p>
                <button className={primaryClass} disabled={busy} onClick={() => downloadSheet(true)}>{busy ? 'Preparando archivo…' : 'Descargar mi hoja con el primer seguimiento'}</button>
                {data.finalDownloaded && <p className="mt-4 text-emerald-200">Tu copia está preparada. Comprueba que el archivo se descargó y que aparecen tu cliente y la siguiente acción. Continúa añadiendo oportunidades en esa hoja.</p>}
              </div>}
              <details className="text-sm text-gray-400"><summary className="cursor-pointer text-gray-200">¿Cómo sigo trabajando después?</summary><p className="mt-3">Añade nuevos clientes directamente en tu hoja, actualiza su fase y próxima acción, y vuelve aquí para preparar mensajes. El asistente trabaja con un cliente de referencia por vez. Google Sheets y este formulario se editan por separado.</p><a className="inline-block mt-3 text-violet-300 underline" href={resourceUrl('guias/inicio-manual.md')} download>Descargar guía completa</a></details>
            </div>}
            <p role="status" aria-live="polite" className="mt-5 text-sm text-emerald-300">{notice}</p>
            {currencyConflict && <p role="alert" className="mt-4 text-amber-200 text-sm">Revisa los importes de tus textos y notas: usa exclusivamente pesos mexicanos (MXN). No se realizará ninguna conversión.</p>}
            {error && <p role="alert" className="mt-4 rounded-xl border border-amber-700 p-3 text-amber-200 text-sm">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  </section>;
}
