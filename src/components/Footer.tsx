export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                VentasIA
              </span>
            </div>
            <p className="text-sm text-gray-500 max-w-sm">
              Un sistema abierto de ventas con IA. GitHub + Google Drive + Qwen para cubrir las 8 fases de tu proceso comercial.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Sistema</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#fases" className="hover:text-white transition-colors">8 Fases</a></li>
              <li><a href="#arquitectura" className="hover:text-white transition-colors">Arquitectura</a></li>
              <li><a href="#repo" className="hover:text-white transition-colors">Repositorio</a></li>
              <li><a href="#beneficios" className="hover:text-white transition-colors">Beneficios</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Plataformas</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="https://github.com/Tuconsultor/VendeDOR" target="_blank" rel="noopener" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://drive.google.com" target="_blank" rel="noopener" className="hover:text-white transition-colors">Google Drive</a></li>
              <li><a href="https://qwen.ai" target="_blank" rel="noopener" className="hover:text-white transition-colors">Qwen AI</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © 2026 VendeDOR. <a className="underline" href={`${import.meta.env.BASE_URL}repo/LICENSE`} download="LICENSE">Licencia MIT</a>.
          </p>
          <p className="text-sm text-gray-600">
            Hecho con 💜 para vendedores que quieren vender más con IA.
          </p>
        </div>
      </div>
    </footer>
  );
}
