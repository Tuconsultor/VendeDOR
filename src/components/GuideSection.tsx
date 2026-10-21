import { resourceUrl } from '../lib/resources';

export default function GuideSection() {
  return <section id="guia" className="scroll-mt-20 py-20 px-4 bg-violet-950/20">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tu primera puesta en marcha</h2>
      <p className="text-gray-300 mb-8">Empieza con el recorrido manual: necesitas una cuenta de Google y acceso a Qwen Chat. No requiere API, programación ni credenciales en esta web. La automatización es un paso opcional.</p>
      <ol className="grid md:grid-cols-2 gap-5 list-decimal list-inside">
        <li className="bg-gray-900 p-5 rounded-xl"><strong>Prepara tu CRM.</strong><p className="text-gray-400 mt-2">Descarga el CSV de ejemplo. En una hoja nueva de Google Sheets, usa Archivo → Importar → Subir, selecciona separador coma y llama a la pestaña «Pipeline Principal».</p><a className="text-violet-300 underline inline-block mt-3" href={resourceUrl('ejemplos/pipeline-demo.csv')} download>Descargar pipeline de ejemplo</a></li>
        <li className="bg-gray-900 p-5 rounded-xl"><strong>Configura el contexto.</strong><p className="text-gray-400 mt-2">Abre un prompt en los recursos. Sustituye cada variable entre llaves por tus datos y pega el bloque de contexto en un chat nuevo de Qwen.</p><a className="text-violet-300 underline inline-block mt-3" href="#repo">Abrir biblioteca de recursos</a></li>
        <li className="bg-gray-900 p-5 rounded-xl"><strong>Completa un caso.</strong><p className="text-gray-400 mt-2">Usa los prospectos ficticios para generar un análisis, preparar el descubrimiento, redactar una propuesta y crear el reporte. Comprueba los resultados con el caso guiado.</p><a className="text-violet-300 underline inline-block mt-3" href={resourceUrl('ejemplos/caso-completo.md')} download>Descargar caso paso a paso</a></li>
        <li className="bg-gray-900 p-5 rounded-xl"><strong>Revisa y guarda.</strong><p className="text-gray-400 mt-2">Verifica datos, importes y fuentes; registra la siguiente acción en Sheets. Copia las propuestas a un documento nuevo de Google Docs. La IA no envía mensajes ni actualiza tu hoja durante este recorrido.</p><a className="text-violet-300 underline inline-block mt-3" href={resourceUrl('guias/inicio-manual.md')} download>Descargar guía completa</a></li>
      </ol>
      <div className="mt-6 p-5 border border-amber-700/50 rounded-xl text-gray-300">
        <h3 className="font-semibold text-amber-200">Cuando quieras automatizar</h3>
        <p className="mt-2">Incluimos scripts y workflows para leer Sheets, puntuar prospectos, generar un reporte y crear recordatorios. Necesitan tus propias credenciales y configuración. Se prueban con servicios simulados; debes ejecutar la comprobación de conexión en tus cuentas antes de activar los horarios.</p>
        <a className="text-violet-300 underline inline-block mt-3" href={resourceUrl('guias/automatizacion.md')} download>Guía de automatización y validación</a>
      </div>
    </div>
  </section>;
}
