export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Clona el repositorio',
      description: 'Accede a las plantillas, scripts y frameworks del sistema de ventas en GitHub.',
      detail: 'Descarga los recursos desde esta página o clona el repositorio.',
    },
    {
      step: '02',
      title: 'Conecta Google Drive',
      description: 'Crea tus hojas y documentos; empieza copiando los datos manualmente.',
      detail: 'Usa Google Sheets como tu CRM ligero y Docs para propuestas.',
    },
    {
      step: '03',
      title: 'Configura Qwen',
      description: 'Define los prompts del sistema para cada fase del proceso de ventas.',
      detail: 'Los prompts están versionados en GitHub y se adaptan a tu sector.',
    },
    {
      step: '04',
      title: 'Automatiza con GitHub Actions',
      description: 'Programa tareas recurrentes: seguimiento de deals, generación de reportes, enriquecimiento de datos.',
      detail: 'Consulta la guía de automatización y valida las conexiones antes de programarlos.',
    },
  ];

  return (
    <section id="como-funciona" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Cómo se pone en marcha?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Recorrido manual disponible; integraciones opcionales con configuración propia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((item, index) => (
            <div key={index} className="relative group">
              <div className="p-6 bg-gray-900/50 border border-gray-800/50 rounded-xl hover:border-violet-700/30 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold bg-gradient-to-br from-violet-500 to-cyan-500 bg-clip-text text-transparent">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-gray-400 mb-3">{item.description}</p>
                <p className="text-sm text-gray-500 italic">{item.detail}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 text-gray-700 text-xl">→</div>
              )}
            </div>
          ))}
        </div>

        {/* Example workflow */}
        <div className="mt-12 p-6 bg-gray-900/50 border border-gray-800/50 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>⚡</span> Ejemplo: Flujo completo de un deal
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Qwen analiza prospecto',
              '→',
              'GitHub: template de email',
              '→',
              'Drive: registra en Sheet',
              '→',
              'Qwen: prepara demo',
              '→',
              'GitHub: playbook de cierre',
              '→',
              'Drive: genera propuesta',
              '→',
              'Qwen: resume para dirección',
            ].map((item, i) => (
              <span
                key={i}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  item === '→'
                    ? 'text-gray-600'
                    : item.includes('Qwen')
                    ? 'bg-violet-950/50 text-violet-300 border border-violet-800/30'
                    : item.includes('GitHub')
                    ? 'bg-gray-800/50 text-gray-300 border border-gray-700/30'
                    : 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/30'
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
