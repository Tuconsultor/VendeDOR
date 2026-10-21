export const repositoryUrl = 'https://github.com/Tuconsultor/VendeDOR';
export const resourceUrl = (path: string) => `${import.meta.env.BASE_URL}repo/${path}`;

export const resourceFolders = [
  { name: 'guias', description: 'Empieza aquí: recorrido manual, automatización y solución de problemas', files: [
    ['inicio-manual.md', 'Guía de puesta en marcha sin programación'],
    ['automatizacion.md', 'Configurar Google, Qwen y GitHub Actions'],
    ['costes-privacidad.md', 'Costes, datos personales y condiciones de uso'],
  ] },
  { name: 'ejemplos', description: 'Empresa y datos ficticios para completar tu primera prueba', files: [
    ['caso-completo.md', 'De un prospecto al reporte: entradas y resultados esperados'],
    ['pipeline-demo.csv', 'Pipeline de ejemplo para importar en Google Sheets'],
    ['pipeline-vacio.csv', 'Cabeceras para empezar con tus propios datos'],
    ['actividad.csv', 'Registro de actividad'],
    ['metricas-semanales.csv', 'Registro de métricas semanales'],
  ] },
  { name: 'prompts', description: 'Copia el contenido, sustituye las variables y úsalo en Qwen', files: [
    ['01-prospeccion.md', 'Análisis de cuentas y listas'], ['02-demos.md', 'Guiones de demo y presentaciones'],
    ['03-pipeline.md', 'Priorización, forecast y riesgos'], ['04-expansion.md', 'Planes de crecimiento'],
    ['05-descubrimiento.md', 'Preguntas y cualificación'], ['06-objeciones.md', 'Respuestas y práctica'],
    ['07-negociacion.md', 'Cierre y revisión de propuestas'], ['08-reporting.md', 'Resúmenes e informes'],
  ] },
  { name: 'templates', description: 'Estructuras para crear tus hojas y documentos; instrucciones incluidas', files: [
    ['pipeline-sheet.md', 'CRM en Sheets y fórmulas'], ['propuesta-doc.md', 'Propuesta para copiar a Docs'],
    ['seguimiento-sheet.md', 'Seguimiento y métricas semanales'],
  ] },
  { name: 'playbooks', description: 'Marcos comerciales para adaptar a tu negocio', files: [
    ['framework-cualificacion.md', 'MEDDPICC y preguntas de cualificación'],
    ['mapa-decisores.md', 'Stakeholders y estrategia de acceso'], ['base-objeciones.md', 'Respuestas orientativas a objeciones'],
  ] },
  { name: 'workflows', description: 'Automatización opcional: requiere instalación y credenciales; consulta la guía', files: [
    ['seguimiento-semanal.yml', 'Recordatorio mediante una Issue'],
    ['enriquecimiento-diario.yml', 'Puntuar prospectos de Sheets con Qwen'],
    ['reporte-semanal.yml', 'Reporte en tu repositorio privado; Docs opcional'],
  ] },
  { name: 'scripts', description: 'Cliente de integración para Node.js 24, sin dependencias adicionales', files: [
    ['sales.mjs', 'Validación, enriquecimiento y generación de informes'],
    ['review.mjs', 'Recordatorio semanal con número de semana ISO'],
  ] },
];
