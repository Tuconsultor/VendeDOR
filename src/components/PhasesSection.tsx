interface PhasesSectionProps {
  activePhase: number;
  setActivePhase: (index: number) => void;
}

const phases = [
  {
    number: '1',
    title: 'Prospección',
    subtitle: 'Define tu cliente ideal',
    description: 'Busca en LinkedIn, analiza competidores y enriquece tus listas de contactos con IA.',
    tools: {
      qwen: 'Genera perfiles de cliente ideal (ICP), analiza cuentas objetivo y crea listas segmentadas',
      github: 'Plantillas de scripts de outreach, secuencias de email y criterios de cualificación',
      drive: 'Bases de datos de prospectos, listas enriquecidas y tracking de actividad',
    },
    color: 'from-violet-500 to-purple-600',
    icon: '🔍',
  },
  {
    number: '2',
    title: 'Demos y presentaciones',
    subtitle: 'Guiones de demo adaptados',
    description: 'Storytelling comercial y casos de éxito personalizados para cada cliente.',
    tools: {
      qwen: 'Crea guiones de demo personalizados, storytelling adaptado al sector del cliente',
      github: 'Templates de presentaciones, casos de éxito por industria, scripts de demo',
      drive: 'Deck de presentaciones, videos de demo, documentos de casos de éxito',
    },
    color: 'from-purple-500 to-pink-600',
    icon: '🎬',
  },
  {
    number: '3',
    title: 'Gestión del pipeline',
    subtitle: 'Seguimiento inteligente',
    description: 'Seguimiento de oportunidades, priorización de deals y forecast de ingresos.',
    tools: {
      qwen: 'Analiza el estado de cada deal, sugiere prioridades y genera forecasts',
      github: 'Workflows de seguimiento, criterios de priorización, templates de forecast',
      drive: 'Pipeline tracker, reportes de forecast, historial de interacciones',
    },
    color: 'from-pink-500 to-rose-600',
    icon: '📊',
  },
  {
    number: '4',
    title: 'Expansión de clientes',
    subtitle: 'Upselling y cross-selling',
    description: 'Análisis de cuentas, upselling y cross-selling con un plan de crecimiento.',
    tools: {
      qwen: 'Identifica oportunidades de expansión, sugiere productos complementarios',
      github: 'Plays de expansión, análisis de uso, criterios de upselling',
      drive: 'Planes de crecimiento por cuenta, métricas de uso, propuestas de expansión',
    },
    color: 'from-rose-500 to-orange-600',
    icon: '🚀',
  },
  {
    number: '5',
    title: 'Descubrimiento y cualificación',
    subtitle: 'Preguntas por sector',
    description: 'Preguntas de descubrimiento, análisis de presupuesto y mapa de decisores.',
    tools: {
      qwen: 'Genera preguntas de descubrimiento por sector, analiza respuestas del cliente',
      github: 'Frameworks de cualificación (BANT, MEDDIC), mapas de decisores',
      drive: 'Notas de descubrimiento, grabaciones, análisis de necesidades',
    },
    color: 'from-orange-500 to-amber-600',
    icon: '🧭',
  },
  {
    number: '6',
    title: 'Gestión de objeciones',
    subtitle: 'Base de conocimiento',
    description: 'Una base de objeciones comunes con respuestas y argumentarios de valor.',
    tools: {
      qwen: 'Genera respuestas a objeciones, argumentarios de valor, contra-argumentos',
      github: 'Base de datos de objeciones, respuestas probadas, playbooks',
      drive: 'Documentos de respuestas, casos de éxito como prueba social, ROI calculators',
    },
    color: 'from-amber-500 to-yellow-600',
    icon: '🛡️',
  },
  {
    number: '7',
    title: 'Negociación y cierre',
    subtitle: 'Guiones de cierre',
    description: 'Guiones de cierre, manejo de descuentos y revisión de propuestas.',
    tools: {
      qwen: 'Simula escenarios de negociación, sugiere estrategias de cierre, revisa propuestas',
      github: 'Templates de propuestas, matrices de descuento, guiones de cierre',
      drive: 'Propuestas comerciales, contratos, términos y condiciones',
    },
    color: 'from-yellow-500 to-lime-600',
    icon: '🤝',
  },
  {
    number: '8',
    title: 'Reporting y comunicación',
    subtitle: 'Dashboards de ventas',
    description: 'Resúmenes de reunión, informes para dirección y dashboards de ventas.',
    tools: {
      qwen: 'Genera resúmenes de reuniones, crea informes ejecutivos, analiza métricas',
      github: 'Templates de reportes, dashboards, formatos de comunicación interna',
      drive: 'Informes semanales, dashboards, actas de reunión, KPIs',
    },
    color: 'from-lime-500 to-emerald-600',
    icon: '📈',
  },
];

export default function PhasesSection({ activePhase, setActivePhase }: PhasesSectionProps) {
  const phase = phases[activePhase];

  return (
    <section id="fases" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Las 8 fases del proceso de ventas
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Cada fase conectada con las demás. No son prompts sueltos, es un <strong className="text-white">sistema completo</strong>.
          </p>
        </div>

        {/* Phase selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {phases.map((p, index) => (
            <button
              key={index}
              onClick={() => setActivePhase(index)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activePhase === index
                  ? `bg-gradient-to-r ${p.color} text-white shadow-lg`
                  : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span className="mr-1">{p.icon}</span>
              <span className="hidden sm:inline">{p.title}</span>
              <span className="sm:hidden">{p.number}</span>
            </button>
          ))}
        </div>

        {/* Active phase detail */}
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-2xl`}>
              {phase.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                {phase.number}. {phase.title}
              </h3>
              <p className="text-gray-400">{phase.subtitle}</p>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8">{phase.description}</p>

          {/* Tools breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-violet-950/30 border border-violet-800/30 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-violet-600/30 flex items-center justify-center">
                  <span className="text-xs font-bold text-violet-300">Q</span>
                </div>
                <span className="text-sm font-semibold text-violet-300">Qwen IA</span>
              </div>
              <p className="text-sm text-gray-400">{phase.tools.qwen}</p>
            </div>

            <div className="p-4 bg-gray-800/30 border border-gray-700/30 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-gray-600/30 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-300">GitHub</span>
              </div>
              <p className="text-sm text-gray-400">{phase.tools.github}</p>
            </div>

            <div className="p-4 bg-emerald-950/30 border border-emerald-800/30 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-emerald-600/30 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-emerald-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-emerald-300">Google Drive</span>
              </div>
              <p className="text-sm text-gray-400">{phase.tools.drive}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
