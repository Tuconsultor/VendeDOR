export default function CTASection() {
  return (
    <section id="empezar" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-900/50 to-cyan-900/50 border border-violet-700/20 rounded-3xl p-8 sm:p-12 text-center">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Cada semana que sigues vendiendo a mano
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Es una semana de reuniones sin preparar, deals sin seguimiento y objeciones sin respuesta.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <span className="text-green-400">✅</span>
                <span>Las 8 fases del proceso de ventas, de la prospección al reporting</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <span className="text-green-400">✅</span>
                <span>Pensado para vender más, no para tener más herramientas</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <span className="text-green-400">✅</span>
                <span>Adaptable a cualquier sector o tipo de negocio</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <span className="text-green-400">✅</span>
                <span>Completamente gratis</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl font-semibold text-lg hover:from-violet-500 hover:to-cyan-500 transition-all shadow-lg shadow-violet-600/20"
              >
                Acceder al sistema →
              </a>
              <a
                href="#"
                className="px-8 py-4 bg-gray-800/60 border border-gray-700/50 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all"
              >
                Ver en GitHub
              </a>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              He decidido compartir públicamente este sistema. Sin coste, sin registro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
