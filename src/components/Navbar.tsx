import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              VendeDOR
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#fases" className="text-gray-400 hover:text-white transition-colors text-sm">Guías de venta</a>
            <a href="#avanzado" className="text-gray-400 hover:text-white transition-colors text-sm">Avanzado</a>
            <a href="#repo" className="text-gray-400 hover:text-white transition-colors text-sm">Recursos</a>
            <a href="#beneficios" className="text-gray-400 hover:text-white transition-colors text-sm">Beneficios</a>
            <a href="#hoy" className="px-4 py-2 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg text-sm font-medium hover:from-violet-500 hover:to-cyan-500 transition-all">
              Empezar
            </a>
          </div>

          <button aria-label={isOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2" onClick={() => setIsOpen(false)}>
            <a href="#fases" className="block px-3 py-2 text-gray-400 hover:text-white text-sm">Guías de venta</a>
            <a href="#avanzado" className="block px-3 py-2 text-gray-400 hover:text-white text-sm">Avanzado</a>
            <a href="#repo" className="block px-3 py-2 text-gray-400 hover:text-white text-sm">Recursos</a>
            <a href="#beneficios" className="block px-3 py-2 text-gray-400 hover:text-white text-sm">Beneficios</a>
            <a href="#hoy" className="block px-3 py-2 text-violet-400 font-medium text-sm">Empezar</a>
          </div>
        )}
      </div>
    </nav>
  );
}

