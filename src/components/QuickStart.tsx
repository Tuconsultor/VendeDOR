import { useRef, useState, type FormEvent } from 'react';
import { buildQuickPrompt, quickTasks, type QuickBusiness, type QuickTask } from '../lib/quickStart';

const fieldClass = 'mt-2 w-full rounded-xl border border-gray-600 bg-gray-950 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400';
const buttonClass = 'rounded-xl bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300';
export default function QuickStart() {
  const [task, setTask] = useState<QuickTask>('publish');
  const [business, setBusiness] = useState<QuickBusiness>({ product: '', customer: '', price: '', details: '' });
  const [prompt, setPrompt] = useState('');
  const [notice, setNotice] = useState('');
  const result = useRef<HTMLTextAreaElement>(null);
  const change = (key: keyof QuickBusiness, value: string) => { setBusiness(previous => ({ ...previous, [key]: value })); setPrompt(''); setNotice(''); };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setPrompt(buildQuickPrompt(task, business)); setNotice('Tu instrucción está lista. Cópiala y pégala en la IA que uses.');
    requestAnimationFrame(() => { result.current?.focus(); result.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }); });
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(prompt); setNotice('Copiado. Pégalo en una conversación nueva con tu IA.'); }
    catch { result.current?.focus(); result.current?.select(); setNotice('Usa la opción Copiar de tu celular sobre el texto seleccionado.'); }
  };
  return <section id="hoy" className="scroll-mt-20 px-4 py-12 bg-violet-950/20">
    <div className="max-w-4xl mx-auto">
      <p className="text-violet-300 text-sm mb-3">Para tu negocio, a tu ritmo</p>
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">¿Qué necesitas hacer hoy?</h2>
      <p className="text-gray-300 mb-6">Elige una tarea. Te ayudamos a pedirle a la IA un texto para tu negocio. Puedes empezar sin descargar archivos ni crear una cuenta en VendeDOR.</p>
      <div role="group" aria-label="Elige una tarea" className="grid sm:grid-cols-2 gap-3 mb-6">{quickTasks.map(item => <button type="button" key={item.id} aria-pressed={task === item.id} onClick={() => { setTask(item.id); setPrompt(''); setNotice(''); }} className={`text-left p-4 rounded-xl border focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-300 ${task === item.id ? 'bg-violet-950 border-violet-400' : 'bg-gray-900 border-gray-700 hover:bg-gray-800'}`}><span className="block font-semibold">{item.title}</span><span className="block text-sm text-gray-300 mt-1">{item.help}</span></button>)}</div>
      <form onSubmit={submit} className="rounded-2xl border border-gray-700 bg-gray-900 p-5 sm:p-8 space-y-5">
        <button type="button" className="text-violet-300 underline min-h-11" onClick={() => { setBusiness({ product: 'Calzado casual por pedido', customer: 'Personas de León, Guanajuato, que compran por WhatsApp', price: '450', details: task === 'reply' ? 'El cliente pregunta qué tallas manejo. Aún debo revisar cuáles están disponibles.' : task === 'organize' ? 'Revisar tallas disponibles y confirmar con un cliente su pedido; todavía no acordamos fecha.' : 'Ejemplo ficticio. Confirmo talla y disponibilidad antes de aceptar el pedido.' }); setPrompt(''); setNotice('Ejemplo ficticio cargado. Puedes cambiarlo por tu producto o servicio.'); }}>Probar con un ejemplo de León</button>
        <label className="block">¿Qué vendes u ofreces?<input className={fieldClass} name="quick-product" required maxLength={1200} value={business.product} onChange={e => change('product', e.target.value)} placeholder="Ej. Comida por encargo, reparación de celulares, calzado…" /></label>
        <label className="block">¿A quién y en qué zona?<input className={fieldClass} name="quick-customer" required maxLength={1200} value={business.customer} onChange={e => change('customer', e.target.value)} placeholder="Ej. Familias de mi colonia en León" /></label>
        <label className="block">Precio en pesos mexicanos (opcional)<input className={fieldClass} name="quick-price" type="number" inputMode="decimal" min="0" max="1000000000000" step="0.01" value={business.price} onChange={e => change('price', e.target.value)} placeholder="Ej. 450" /><span className="block text-sm text-gray-400 mt-2">Déjalo vacío si depende del pedido. No hacemos conversiones de moneda.</span></label>
        <label className="block">{task === 'reply' ? '¿Qué preguntó tu cliente?' : task === 'organize' ? '¿Qué pedidos o pendientes necesitas ordenar?' : '¿Qué más necesita saber tu cliente? (opcional)'}<textarea className={fieldClass} name="quick-details" rows={3} required={task === 'reply' || task === 'organize'} maxLength={3000} value={business.details} onChange={e => change('details', e.target.value)} placeholder="Escribe lo que sabes: qué incluye, disponibilidad o condiciones. Evita nombres, teléfonos y datos de pago." /></label>
        <p className="text-sm text-gray-400">Estos datos se mantienen en esta pestaña y se pierden al recargar. Se compartirán con el servicio de IA solo cuando tú los pegues y envíes allí.</p>
        <button className={buttonClass} type="submit">Preparar mi instrucción para la IA →</button>
      </form>
      {prompt && <div className="mt-6 rounded-2xl border border-violet-600 bg-gray-900 p-5 sm:p-8">
        <h3 className="text-xl font-semibold mb-3">Tu siguiente paso</h3>
        <ol className="list-decimal pl-5 text-gray-300 space-y-2 mb-4"><li>Copia la instrucción de abajo.</li><li>Abre tu IA y pégala en una conversación nueva. Puedes probar con Qwen o ChatGPT; sus opciones gratuitas tienen límites y pueden requerir cuenta.</li><li>Revisa la respuesta, corrige precios y condiciones y copia el texto que quieras usar en WhatsApp o Facebook.</li></ol>
        <label className="block" htmlFor="quick-prompt">Instrucción preparada con tus respuestas</label>
        <textarea ref={result} id="quick-prompt" readOnly className={`${fieldClass} text-sm leading-6`} rows={9} value={prompt} />
        <div className="flex flex-wrap gap-3 mt-4"><button type="button" className={buttonClass} onClick={copy}>Copiar instrucción</button><a className="rounded-xl border border-gray-600 px-5 py-3 underline" href="https://qwen.ai" target="_blank" rel="noopener noreferrer">Abrir Qwen ↗</a><a className="rounded-xl border border-gray-600 px-5 py-3 underline" href="https://chatgpt.com" target="_blank" rel="noopener noreferrer">Abrir ChatGPT ↗</a></div>
        <p className="text-sm text-gray-300 mt-4">VendeDOR prepara la instrucción; la respuesta la genera el servicio que elijas. Comprueba los datos antes de publicar o enviar.</p>
      </div>}
      <p role="status" aria-live="polite" className="text-emerald-300 text-sm mt-4">{notice}</p>
    </div>
  </section>;
}
