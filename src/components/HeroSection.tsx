export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-12 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-full mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-gray-300">Para vendedores · Sin programación</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="text-white">Pon en marcha tu</span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            asistente de ventas
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
          Configura tu negocio, organiza tus oportunidades y prepara tu primer seguimiento. Te guiamos para usar{' '}
          <span className="text-violet-400 font-medium">Qwen</span> para preparar mensajes,{' '}
          nuestras plantillas y{' '}
          <span className="text-emerald-400 font-medium">Google Drive</span> para tu hoja y documentos.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#guia" className="px-8 py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all shadow-lg shadow-violet-600/20">
            Configurar mi negocio →
          </a>
          <a href="#fases" className="px-8 py-3.5 bg-gray-800/60 border border-gray-700/50 rounded-xl font-semibold hover:bg-gray-800 transition-all">
            Ver las tareas de venta
          </a>
        </div>


      </div>
    </section>
  );
}
