export default function BenefitsSection() {
  const benefits = [
    {
      icon: '🔗',
      title: 'Proceso conectado',
      description: 'Las 8 fases trabajan juntas. La salida de una es la entrada de la siguiente.',
    },
    {
      icon: '🧠',
      title: 'IA que entiende tu negocio',
      description: 'Qwen se adapta a tu sector, tu cliente ideal y tu forma de vender.',
    },
    {
      icon: '📋',
      title: 'Templates listos',
      description: 'No empiezas de cero. Cada fase tiene plantillas probadas en GitHub.',
    },
    {
      icon: '🔄',
      title: 'Automatización real',
      description: 'GitHub Actions ejecuta tareas recurrentes sin intervención manual.',
    },
    {
      icon: '💰',
      title: '100% gratuito',
      description: 'GitHub, Google Drive y Qwen tienen planes gratuitos suficientes para empezar.',
    },
    {
      icon: '🔒',
      title: 'Tus datos, tuyos',
      description: 'Todo vive en tus cuentas. Sin depender de un SaaS de terceros.',
    },
    {
      icon: '📈',
      title: 'Escalable',
      description: 'Empieza con una fase y ve añadiendo las demás según tu madurez comercial.',
    },
    {
      icon: '👥',
      title: 'Colaborativo',
      description: 'El equipo accede a las mismas plantillas, datos y respuestas en Drive.',
    },
  ];

  return (
    <section id="beneficios" className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Lo que la mayoría NO entiende
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            No se trata de usar IA en una fase. Se trata de <strong className="text-white">conectar las 8</strong>.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl">
            <span className="text-gray-500">Un prompt suelto = una tarea resuelta.</span>
            <span className="text-violet-400 font-medium">Un sistema conectado = ventas que funcionan.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-5 bg-gray-900/50 border border-gray-800/50 rounded-xl hover:border-violet-700/30 transition-all group"
            >
              <span className="text-3xl mb-3 block">{benefit.icon}</span>
              <h3 className="text-base font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-500">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Key insight */}
        <div className="mt-12 p-6 bg-gradient-to-r from-violet-950/40 to-cyan-950/40 border border-violet-800/20 rounded-2xl text-center">
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Y no sustituye al comercial.{' '}
            <strong className="text-white">
              Hace que llegue a cada conversación con el contexto correcto.
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}
