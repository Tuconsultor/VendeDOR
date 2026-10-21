export default function ProblemSection() {
  const problems = [
    { icon: '🎯', text: 'Reuniones que empiezas sin preparar' },
    { icon: '❄️', text: 'Deals que se enfrían porque nadie los prioriza' },
    { icon: '🔄', text: 'Objeciones que escuchas por décima vez sin respuesta' },
    { icon: '💤', text: 'Clientes actuales a los que nunca les vendes más' },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            El problema no es que vendas poco.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Es que tu proceso vive en <span className="text-red-400 font-medium">10 sitios distintos</span>: LinkedIn, una hoja de cálculo, el CRM, tu cabeza y mil notas sueltas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-red-950/20 border border-red-900/30 rounded-xl"
            >
              <span className="text-2xl">{problem.icon}</span>
              <span className="text-gray-300">{problem.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/50 border border-gray-700/50 rounded-2xl">
            <span className="text-lg">💡</span>
            <span className="text-gray-300">
              <strong className="text-white">La solución:</strong> Un sistema conectado que usa IA para cubrir las 8 fases de tu proceso comercial.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
