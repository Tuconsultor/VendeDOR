const benefits = [
  ['Para lo que vendes', 'Calzado, comida, ropa, belleza, reparaciones, oficios y otros productos o servicios. Tú describes tu negocio.'],
  ['Desde tu celular', 'Elige una tarea, completa unas respuestas y copia tu instrucción. No necesitas descargar una hoja para empezar.'],
  ['Sin palabras complicadas', 'No necesitas saber qué es un prompt. Te ayudamos a pedir lo que necesitas con instrucciones claras.'],
  ['Con tu presupuesto', 'Los materiales de VendeDOR son gratuitos. Las herramientas de IA externas tienen sus propios límites, condiciones y opciones de pago.'],
];
export default function BenefitsSection() {
  return <section id="beneficios" className="scroll-mt-20 py-16 px-4 bg-gray-900/30"><div className="max-w-5xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tú conoces tu negocio. Empieza con lo que sabes.</h2>
    <p className="text-gray-300 mb-8">Si trabajas por tu cuenta, con tu familia o con un equipo pequeño, puedes usar la IA para preparar el trabajo de cada día.</p>
    <div className="grid sm:grid-cols-2 gap-4">{benefits.map(([title, description]) => <div key={title} className="rounded-xl border border-gray-700 bg-gray-900 p-5"><h3 className="font-semibold mb-2">{title}</h3><p className="text-gray-300 text-sm leading-6">{description}</p></div>)}</div>
    <p className="mt-6 text-gray-400 text-sm">La IA puede ayudarte a redactar y ordenar ideas. Las ventas también dependen de tu producto, precio, demanda y atención. Revisa cada respuesta antes de usarla.</p>
  </div></section>;
}

