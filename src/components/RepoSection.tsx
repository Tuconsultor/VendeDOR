import { useState } from 'react';

const repoStructure = [
  {
    folder: 'prompts/',
    description: 'Prompts de Qwen para cada fase',
    files: [
      { name: '01-prospeccion.md', desc: 'Análisis de cuentas, enriquecimiento de listas, investigación competitiva' },
      { name: '02-demos.md', desc: 'Guiones de demo, casos de éxito adaptados, one-pagers' },
      { name: '03-pipeline.md', desc: 'Análisis de pipeline, priorización, forecast, deals en riesgo' },
      { name: '04-expansion.md', desc: 'Análisis de cuentas, planes de crecimiento, emails de upselling' },
      { name: '05-descubrimiento.md', desc: 'Preguntas por sector, análisis de respuestas, mapa de decisores' },
      { name: '06-objeciones.md', desc: 'Base de objeciones, argumentarios, roleplay de práctica' },
      { name: '07-negociacion.md', desc: 'Guiones de cierre, revisión de propuestas, estrategia de descuento' },
      { name: '08-reporting.md', desc: 'Resúmenes de reunión, informes para dirección, análisis de métricas' },
    ],
  },
  {
    folder: 'templates/',
    description: 'Templates de Google Drive',
    files: [
      { name: 'pipeline-sheet.md', desc: 'Estructura completa del CRM en Google Sheets' },
      { name: 'propuesta-doc.md', desc: 'Template de propuesta comercial en Google Docs' },
      { name: 'seguimiento-sheet.md', desc: 'Hoja de seguimiento semanal y métricas' },
    ],
  },
  {
    folder: 'workflows/',
    description: 'GitHub Actions para automatización',
    files: [
      { name: 'seguimiento-semanal.yml', desc: 'Recordatorio semanal de pipeline review' },
      { name: 'enriquecimiento-diario.yml', desc: 'Análisis automático de nuevos prospectos con Qwen' },
      { name: 'reporte-semanal.yml', desc: 'Generación automática del reporte semanal' },
    ],
  },
  {
    folder: 'playbooks/',
    description: 'Playbooks comerciales',
    files: [
      { name: 'framework-cualificacion.md', desc: 'MEDDPICC completo con preguntas y scoring' },
      { name: 'mapa-decisores.md', desc: 'Tipos de stakeholders y estrategia de acceso' },
      { name: 'base-objeciones.md', desc: '20+ objeciones comunes con respuestas probadas' },
    ],
  },
];

export default function RepoSection() {
  const [activeFolder, setActiveFolder] = useState(0);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const handleCopyStructure = () => {
    const text = repoStructure.map(f => 
      `${f.folder}\n${f.files.map(file => `  ├── ${file.name}`).join('\n')}`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedFile('structure');
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <section id="repo" className="py-20 px-4 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800/50 border border-gray-700/50 rounded-full mb-4">
            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-xs text-gray-400">Repositorio completo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Estructura del Sistema
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Todo lo que necesitas para poner en marcha tu sistema de ventas con IA.
            Prompts, templates, automatizaciones y playbooks.
          </p>
        </div>

        {/* File tree */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Folder navigation */}
          <div className="bg-gray-900/80 border border-gray-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800/50">
              <span className="text-lg">📁</span>
              <span className="font-mono text-sm text-gray-300">ventas-ia/</span>
            </div>
            <div className="space-y-1">
              {repoStructure.map((folder, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFolder(index)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                    activeFolder === index
                      ? 'bg-violet-900/30 border border-violet-700/30 text-violet-300'
                      : 'hover:bg-gray-800/50 text-gray-400'
                  }`}
                >
                  <span>📂</span>
                  <span className="font-mono">{folder.folder}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800/50">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>📄</span>
                <span className="font-mono">README.md</span>
              </div>
            </div>
          </div>

          {/* File list */}
          <div className="lg:col-span-2 bg-gray-900/80 border border-gray-800/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white font-mono">
                  {repoStructure[activeFolder].folder}
                </h3>
                <p className="text-sm text-gray-500">{repoStructure[activeFolder].description}</p>
              </div>
              <span className="text-xs text-gray-600 bg-gray-800/50 px-2 py-1 rounded">
                {repoStructure[activeFolder].files.length} archivos
              </span>
            </div>

            <div className="space-y-3">
              {repoStructure[activeFolder].files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-800/30 border border-gray-700/20 rounded-lg hover:border-violet-700/30 transition-all"
                >
                  <span className="text-lg mt-0.5">📄</span>
                  <div className="flex-1">
                    <p className="font-mono text-sm text-gray-200">{file.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{file.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(file.name);
                      setCopiedFile(file.name);
                      setTimeout(() => setCopiedFile(null), 2000);
                    }}
                    className="px-2 py-1 text-xs bg-gray-700/50 rounded hover:bg-gray-700 transition-colors text-gray-400"
                  >
                    {copiedFile === file.name ? '✓ Copiado' : 'Copiar'}
                  </button>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-6 pt-4 border-t border-gray-800/50 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-violet-400">
                  {repoStructure.reduce((acc, f) => acc + f.files.length, 0)}
                </div>
                <div className="text-xs text-gray-500">Archivos</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-cyan-400">30+</div>
                <div className="text-xs text-gray-500">Prompts</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-emerald-400">3</div>
                <div className="text-xs text-gray-500">Workflows</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick start */}
        <div className="mt-8 p-6 bg-gradient-to-r from-violet-950/30 to-cyan-950/30 border border-violet-800/20 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>⚡</span> Inicio rápido
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-2">
              <span className="text-violet-400 font-bold text-sm mt-0.5">1.</span>
              <p className="text-sm text-gray-400">Copia los <strong className="text-gray-200">prompts</strong> a tu instancia de Qwen</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-violet-400 font-bold text-sm mt-0.5">2.</span>
              <p className="text-sm text-gray-400">Crea las <strong className="text-gray-200">hojas de Drive</strong> con los templates</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-violet-400 font-bold text-sm mt-0.5">3.</span>
              <p className="text-sm text-gray-400">Configura los <strong className="text-gray-200">workflows</strong> en GitHub Actions</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-violet-400 font-bold text-sm mt-0.5">4.</span>
              <p className="text-sm text-gray-400"><strong className="text-gray-200">Adapta</strong> las variables a tu negocio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
