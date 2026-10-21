# Puesta en marcha manual de VendeDOR

## Opción recomendada: asistente para vendedores

En https://tuconsultor.github.io/VendeDOR/#guia pulsa «Configurar mi negocio». Completa los cuatro pasos: Mi negocio, Mi hoja, Mi primer cliente y Mi primera acción. El asistente prepara tus mensajes con los datos que introduces: no hace falta editar variables ni archivos de código.

Tu hoja se descarga como un archivo .xlsx con fases desplegables, fórmulas y Dashboard. Puedes abrirla directamente en Excel o importarla en Google Sheets (Archivo → Importar → Subir → Crear hoja de cálculo nueva). Comprueba las pestañas y los desplegables en la aplicación que elijas; las opciones de importación dependen de esa aplicación. Google Sheets recalcula las fórmulas al abrir el archivo. Si una aplicación no conserva las validaciones, usa las fases indicadas en la pestaña Empieza aquí o vuelve a importarlo en Sheets/Excel.

La primera descarga es una hoja vacía de tu negocio. La descarga final incluye tu primer cliente y su acción con fecha. Importa cada copia como una hoja nueva: el asistente no se sincroniza con Google y no incluye cambios que ya hiciste en Sheets. Después del recorrido, continúa añadiendo oportunidades en la hoja que elegiste. Para nuevas filas asigna un ID único (D002, D003…), añade el cliente, su fase, la probabilidad y la siguiente acción. Las fórmulas y listas están preparadas para 500 oportunidades.

La IA responde en Qwen Chat cuando tú pegas y envías el mensaje; el sitio no contacta prospectos. Revisa la respuesta y registra lo que harás tú. Solo se guarda el avance entre sesiones si activas «Guardar mi avance en este navegador»; incluye el cliente y tus notas. Desactívalo en dispositivos compartidos y usa «Borrar mis datos» cuando termines. Los archivos descargados permanecen en tu equipo hasta que los borres allí.

## Opción alternativa: trabajar directamente con los materiales

Este recorrido permite usar los materiales sin programar. La web es una biblioteca: no es un CRM alojado, no inicia sesión en Google ni conecta automáticamente tu chat de Qwen con Drive.

## 1. Qué necesitas

- Una cuenta de Google con acceso a Sheets y Docs.
- Acceso a [Qwen Chat](https://qwen.ai). Su disponibilidad, límites y condiciones dependen del proveedor y de tu región.
- Un navegador con conexión a Internet. No necesitas GitHub ni una API para el recorrido manual.
- Primero usa solo los datos ficticios de ejemplos/. Consulta costes-privacidad.md antes de incluir datos reales.

En la web, abre «Recursos para ponerlo en marcha». Elige una carpeta y usa Abrir, Copiar contenido o Descargar. El ZIP contiene el proyecto completo; los materiales están dentro de public/repo/.

## 2. Prepara las hojas

1. Entra en https://sheets.google.com y crea una hoja nueva llamada «CRM de prueba VendeDOR».
2. Descarga ejemplos/pipeline-demo.csv desde el catálogo.
3. En Sheets: Archivo → Importar → Subir → selecciona el CSV. Importa en una hoja nueva y elige separador coma. Conserva las cabeceras y su orden.
4. Renombra la pestaña a «Pipeline Principal» (mayúsculas y espacios incluidos).
5. Verifica: hay 24 columnas A:X y 4 oportunidades; los importes son 12000, 8000, 5000 y 3000; las probabilidades son 25, 60, 100 y 0. No hay símbolos de moneda ni separadores de millares en los CSV.
6. Formatea K, L, O, W y X como fechas, H como número/moneda y J como número 0–100. J contiene 25 para 25%, no 0,25. Todos los importes se capturan exclusivamente en pesos mexicanos (MXN).
7. Crea una pestaña «Actividad» importando actividad.csv y otra «Métricas Semanales» importando metricas-semanales.csv. Usa «Insertar hojas nuevas» para conservar el pipeline.
8. El resto de pestañas y listas desplegables están descritos en templates/pipeline-sheet.md. Son opcionales para la primera prueba. En I, crea un desplegable con Prospección, Demo, Propuesta, Negociación, Cerrado Ganado y Cerrado Perdido.
9. Para empezar sin datos ficticios, importa pipeline-vacio.csv en otro archivo y añade tus oportunidades. Usa IDs únicos y mantén A:X.

No hay una plantilla alojada en una cuenta de Google del autor que debas solicitar: la importación crea una copia en tu propia cuenta.

## 3. Personaliza los prompts

1. Abre prompts/01-prospeccion.md. «Copiar contenido» copia todo el archivo, no solo su nombre.
2. Identifica el bloque «System Prompt». Sustituye cada {{variable}} por un dato real o «No disponible». No dejes variables sin resolver ni inventes información.
3. En Qwen Chat, abre una conversación nueva y pega ese bloque como primer mensaje. No necesitas una función especial de mensajes system en la interfaz web.
4. Copia el bloque «Prompt de uso — Análisis de cuenta», rellénalo con el primer cliente ficticio y envíalo como segundo mensaje.
5. Si Qwen no puede consultar una web, suministra el texto pertinente o pide que indique las limitaciones. Una puntuación de IA es una hipótesis, no una investigación verificada.
6. Comprueba que responde con score, justificación, dudas y siguiente acción. Revisa el contenido antes de copiarlo a Sheets.

## 4. Conecta las ocho fases manualmente

La conexión la haces tú transfiriendo contexto y resultados. No existe sincronización automática en este modo.

| Orden recomendado | Recurso | Entrada | Salida que debes guardar |
| --- | --- | --- | --- |
| 1. Prospección | prompts/01-prospeccion.md | Empresa, sector, producto e ICP | Hipótesis de encaje, score y siguiente acción |
| 2. Descubrimiento | prompts/05-descubrimiento.md | Hipótesis y preguntas abiertas | Preguntas, respuestas reales y decisores |
| 3. Demo | prompts/02-demos.md | Necesidades confirmadas | Guion de demo y material de apoyo |
| 4. Objeciones | prompts/06-objeciones.md | Objeción textual y contexto | Respuesta propuesta para revisar |
| 5. Negociación | prompts/07-negociacion.md | Presupuesto, alcance y condiciones | Borrador de propuesta y próximos pasos |
| 6. Pipeline | prompts/03-pipeline.md | Tabla actualizada de oportunidades | Priorización y forecast |
| 7. Reporting | prompts/08-reporting.md | Pipeline y actividad del periodo | Informe revisado |
| 8. Expansión | prompts/04-expansion.md | Cliente ganado y necesidades reales | Plan de seguimiento y crecimiento |

Los números de los archivos representan categorías, no un orden obligatorio. No inventes un cierre o una expansión para completar el ejercicio: usa la cuenta ganada ficticia del ejemplo para practicar expansión.

## 5. Prepara una propuesta en Docs

1. Abre templates/propuesta-doc.md y copia el contenido.
2. En https://docs.google.com crea un documento en blanco y pega la plantilla.
3. Sustituye las variables. Reemplaza los ejemplos de caso de éxito por evidencias reales; si no las tienes, elimina esa sección.
4. Usa el prompt de revisión de propuesta (07). Valida precios, compromisos y condiciones tú mismo.
5. Comparte desde el botón Compartir de Google Docs con las personas concretas que correspondan. No elijas acceso público para información comercial.

## 6. Primera comprobación

Sigue ejemplos/caso-completo.md. Debes poder explicar de dónde sale cada cifra, registrar una siguiente acción con fecha y generar un informe sin inventar ventas. Esto valida el recorrido manual; no valida las APIs.

## 7. Problemas frecuentes

- CSV en una sola columna: vuelve a importar y selecciona separador coma.
- Fórmula con error: revisa idioma/región de Sheets y separadores ; o ,. Las funciones y sus rangos están en pipeline-sheet.md.
- Copiar no funciona: concede permiso de portapapeles o usa Descargar y abre el archivo en un editor. También puedes seleccionar el texto en el lector.
- No veo mis datos actualizados: el recorrido manual no sincroniza; copia los resultados a la hoja tú mismo.
- Qwen inventa información: pide hechos, fuentes y supuestos por separado; descarta afirmaciones sin evidencia.
- Quiero automatizar: sigue automatizacion.md. No pegues credenciales en esta web ni en un chat.

## Repetición semanal

Actualiza actividades y fases, registra cuándo cambian (W) y cuándo cierran (X), revisa los próximos contactos y crea el reporte. Guarda una copia histórica si necesitas comparar semanas. Una foto del pipeline no es un histórico de ventas semanales.
