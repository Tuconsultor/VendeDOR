export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-full mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-gray-300">Kit abierto · Recursos gratuitos</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="text-white">Tu proceso de ventas</span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            asistido por IA
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
          De la prospección al reporting. <strong className="text-white">recursos para 8 fases</strong> usando{' '}
          <span className="text-violet-400 font-medium">Qwen</span> como motor de IA,{' '}
          <span className="text-cyan-400 font-medium">GitHub</span> para plantillas y código, y{' '}
          <span className="text-emerald-400 font-medium">Google Drive</span> para documentos y datos.
        </p>

        {/* Integration badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 border border-gray-700/40 rounded-xl">
            <svg className="w-5 h-5 text-violet-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <span className="text-sm font-medium text-gray-200">Qwen AI</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 border border-gray-700/40 rounded-xl">
            <svg className="w-5 h-5 text-gray-200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-sm font-medium text-gray-200">GitHub</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 border border-gray-700/40 rounded-xl">
            <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span className="text-sm font-medium text-gray-200">Google Drive</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#guia" className="px-8 py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all shadow-lg shadow-violet-600/20">
            Ponerlo en marcha →
          </a>
          <a href="#arquitectura" className="px-8 py-3.5 bg-gray-800/60 border border-gray-700/50 rounded-xl font-semibold hover:bg-gray-800 transition-all">
            Cómo se integra
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white">8</div>
            <div className="text-xs sm:text-sm text-gray-500">Fases comerciales</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white">3</div>
            <div className="text-xs sm:text-sm text-gray-500">Plataformas</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white">∞</div>
            <div className="text-xs sm:text-sm text-gray-500">Posibilidades</div>
          </div>
        </div>
      </div>
    </section>
  );
}
