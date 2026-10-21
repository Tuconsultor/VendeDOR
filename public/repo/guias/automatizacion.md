# Automatización opcional: instalación y comprobación

## Qué hace y qué no hace

| Comando / workflow | Resultado |
| --- | --- |
| sales.mjs check | Lee y valida Sheets, hace una pequeña llamada a Qwen y comprueba lectura del Doc opcional. No valida escritura. |
| sales.mjs enrich | Puntúa oportunidades abiertas sin Score ICP. Escribe solo Q (score), R (prioridad) y V (fecha IA). Guarda justificaciones en output/enrichment.json. |
| sales.mjs report | Calcula métricas deterministas del pipeline y pide a Qwen un análisis. Guarda output/report.md y metrics.json. Si indicas un Doc existente, añade el informe al final. |
| review.mjs | Crea una Issue semanal genérica sin datos de clientes. No duplica la Issue al repetir en la misma semana ISO. |

No busca información en Internet, no envía emails, no crea un CRM alojado, no identifica decisores reales y no reemplaza revisión humana. El reporte ejecutado cada semana es una fotografía del pipeline completo, no un cálculo de ventas de esa semana. Todos los importes deben capturarse en pesos mexicanos (MXN); las respuestas que mencionan otras monedas se rechazan antes de guardarse. No hay conversión automática. No hay histórico automático. Sheets no ofrece aquí un bloqueo transaccional: evita editar la hoja mientras se enriquece; el script comprueba cambios antes de escribir, pero no puede garantizar ausencia de ediciones justo después de esa comprobación.

Los scripts se validan con pruebas de integración simuladas incluidas en tests/. No se han probado contra tus cuentas de Google o Qwen. La conexión y escritura reales deben validarse con tus propias credenciales y una copia con datos ficticios.

## 1. Crea un repositorio PRIVADO para la automatización

El sitio público distribuye código y ejemplos. No ejecutes los procesos de datos comerciales en él. Los artefactos de Actions de un repositorio público pueden ser accesibles para otros usuarios de GitHub; un artefacto no es un almacén de secretos.

1. Descarga el ZIP de https://github.com/Tuconsultor/VendeDOR/archive/refs/heads/main.zip y descomprímelo.
2. En tu cuenta de GitHub crea un repositorio nuevo y privado. Copia el proyecto allí (Upload files o Git). No uses un fork público si necesitas privacidad.
3. Conserva la estructura public/repo/scripts/, public/repo/ejemplos/ y public/repo/workflows/.
4. Para este repositorio privado no necesitas publicar la web: elimina .github/workflows/deploy-pages.yml de tu copia. No actives Pages en ese repositorio.
5. Copia solo los workflows comerciales que quieras desde public/repo/workflows/ a .github/workflows/ de la raíz. Los scripts siguen en public/repo/scripts/.
6. Deja los horarios comentados inicialmente. Los workflows instalados se ejecutan a mano con workflow_dispatch.
7. Si usas el recordatorio, activa Issues en Settings → General → Features.

No se necesita npm install para estos scripts: usan Node.js 24 y sus módulos nativos. No copies output/, archivos .env ni claves a Git.

## 2. Prepara Google Cloud y Sheets

1. En https://console.cloud.google.com crea o selecciona un proyecto propio.
2. En APIs y servicios → Biblioteca habilita Google Sheets API. Si usarás el Doc opcional, habilita también Google Docs API.
3. En IAM y administración → Cuentas de servicio crea una cuenta dedicada. No le concedas Owner o Editor de todo el proyecto: el acceso a los archivos se concede al compartirlos.
4. Crea una clave JSON para esa cuenta. Descárgala y guárdala fuera del repositorio. Algunas organizaciones prohíben estas claves; pide a tu administrador un método aprobado, no eludas esa política.
5. Crea un archivo de Sheets de prueba e importa ejemplos/pipeline-demo.csv. La pestaña debe llamarse exactamente «Pipeline Principal», con cabeceras A:X idénticas al CSV.
6. Comparte SOLO ese archivo, como Editor, con el client_email de la cuenta de servicio que aparece en el JSON. Ese correo identifica la cuenta; no compartas la clave JSON.
7. Copia el ID de la URL: https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit. No incluyas /edit ni la URL completa.
8. Opcional: crea tú un Google Doc nuevo, compártelo como Editor con la misma cuenta y copia su ID. El script añadirá texto plano, no formateará Markdown ni borrará el contenido previo. No necesita crear documentos ni permisos de toda tu unidad de Drive.

La autenticación usa una clave RSA para obtener un token OAuth de una hora. El script solicita los scopes spreadsheets y documents; el acceso efectivo se limita además por los archivos compartidos con la cuenta. No introduzcas estas claves en la página pública.

Documentación: https://developers.google.com/identity/protocols/oauth2/service-account y https://developers.google.com/sheets/api/guides/authorizing.

## 3. Prepara Qwen en Alibaba Cloud Model Studio

Qwen Chat y la API son productos distintos. Tener acceso al chat no proporciona una clave ni cuota de API.

1. Abre Alibaba Cloud Model Studio desde tu cuenta de Alibaba Cloud y selecciona la región en la que está disponible tu servicio.
2. Revisa los requisitos de cuenta, facturación, modelos habilitados, tratamiento de datos y cuotas de esa región.
3. Crea una API key del servicio y guárdala como secreto. Copia el identificador exacto de un modelo habilitado para tu cuenta que admita Chat Completions y JSON mode (por ejemplo qwen-plus cuando esté disponible).
4. Configura el endpoint compatible con OpenAI correspondiente a ESA clave y región. Los ejemplos admiten hosts oficiales:
   - Singapur/internacional: https://dashscope-intl.aliyuncs.com/compatible-mode/v1
   - China: https://dashscope.aliyuncs.com/compatible-mode/v1
   - Estados Unidos, si tu cuenta/modelo lo admite: https://dashscope-us.aliyuncs.com/compatible-mode/v1
5. Verifica endpoint y disponibilidad con la documentación oficial actual de tu región: https://www.alibabacloud.com/help/en/model-studio/use-qwen-by-calling-api

No uses endpoints intermediarios sin revisar su tratamiento de claves y datos. Una clave de una región puede fallar en otra. Estos scripts no prueban todos los modelos: JSON mode y límites dependen del modelo elegido.

## 4. Guarda secretos y variables en TU repositorio privado

En Settings → Secrets and variables → Actions → Secrets crea:

| Secreto | Valor que debes introducir de forma privada |
| --- | --- |
| GOOGLE_CREDENTIALS | Contenido completo del JSON de la cuenta de servicio, con sus saltos de línea válidos |
| GOOGLE_SHEET_ID | ID del archivo de Sheets de prueba |
| QWEN_API_KEY | Tu clave de Model Studio |
| GOOGLE_REPORT_DOC_ID | Opcional: ID del Doc compartido con la cuenta de servicio |

En la pestaña Variables crea:

| Variable | Ejemplo no secreto |
| --- | --- |
| QWEN_BASE_URL | https://dashscope-intl.aliyuncs.com/compatible-mode/v1 |
| QWEN_MODEL | El modelo exacto habilitado en tu cuenta, por ejemplo qwen-plus |
| BUSINESS_CONTEXT | DemoCRM vende organización de pipeline a distribuidoras B2B de 10–50 vendedores. Ticket 8000–12000 MXN. |

No publiques información confidencial en BUSINESS_CONTEXT. Para contextos sensibles cambia los workflows de tu copia para leer secrets.BUSINESS_CONTEXT en lugar de vars.BUSINESS_CONTEXT.

GITHUB_TOKEN lo suministra GitHub Actions; no hace falta crear un token personal para el recordatorio. El workflow declara issues: write. Los otros dos workflows solo tienen contents: read.

## 5. Valida de forma manual antes de programar

1. Confirma que la hoja contiene solo los cuatro registros ficticios.
2. En Actions abre «Enriquecimiento de prospectos» → Run workflow en la rama por defecto.
3. El paso check comprueba lectura de Sheets y una llamada pequeña a Qwen (puede generar coste). El paso enrich llama a Qwen por cada oportunidad abierta sin score (máximo 10 por ejecución en el workflow).
4. Para el CSV de ejemplo debe procesar 2 oportunidades. Verifica que Q y R tienen score/prioridad y V fecha ISO. No debe modificar H, I, J, U ni las filas cerradas. Descarga enrichment.json desde Artifacts para leer las justificaciones.
5. Repite: con ambas Q ya completas debe procesar 0 y no modificar la hoja ni crear un nuevo análisis. Para volver a analizar una oportunidad, revisa y vacía Q manualmente.
6. Ejecuta «Informe de situación del pipeline». Descarga el artefacto pipeline-report. metrics.json debe contener openDeals=2, openPipeline=20000, weightedForecast=7800, wonTotal=5000 y winRate=50. El análisis puede variar; no debe inventar comparaciones semanales.
7. Si configuraste el Doc, comprueba que el informe se añadió al final. Una repetición añadirá otro bloque; no es una operación idempotente. Si solo quieres el artefacto, no configures GOOGLE_REPORT_DOC_ID.
8. Ejecuta el recordatorio dos veces: debe haber una sola Issue para esa semana ISO.
9. Solo después de esta validación prueba con datos reales autorizados. Mantén una copia de seguridad y acceso limitado a tu repositorio, hoja y artefactos.

Un check correcto no demuestra permisos de escritura. Las pruebas con servicios simulados no demuestran que tus credenciales estén bien configuradas.

## 6. Ejecución local alternativa

Instala Node.js 24. En una terminal de confianza, dentro de public/repo/, configura los mismos nombres de variables mediante el gestor de secretos o mecanismo de entorno de tu sistema. No pegues claves en comandos que se guarden en el historial. Si usas un .env, mantenlo fuera de Git y con permisos restrictivos; Node 24 permite cargarlo con --env-file=/ruta/privada/config.env. No se incluye ningún archivo con valores reales.

Con las variables ya cargadas:

    node scripts/sales.mjs check
    node scripts/sales.mjs enrich
    node scripts/sales.mjs report

MAX_PROSPECTS es opcional (1–100, por defecto 10). Los resultados se escriben en output/ del directorio desde el que ejecutes el comando. El reporte rechaza datos mayores de 60000 caracteres: es una integración de ejemplo para pipelines pequeños, no procesamiento por lotes ilimitado.

Para ejecutar las pruebas sin claves ni llamadas externas, desde la raíz del proyecto:

    node --test tests/*.test.mjs

## 7. Activa horarios, si los necesitas

En tu copia instalada de cada workflow, descomenta schedule y su cron debajo de on. Los comentarios muestran ejemplos en UTC, sin cambio de horario de verano. Los cron se ejecutan en la rama por defecto y GitHub puede retrasarlos; no garantizan puntualidad. En forks las programaciones pueden estar desactivadas. Puedes mantener solo la ejecución manual para controlar costes.

Las tres automatizaciones comparten concurrency.group=sales-integrations para evitar solaparse en un mismo repositorio. No edites la hoja mientras corre enrich; distintos repositorios no comparten ese bloqueo.

## 8. Diagnóstico

- Error de cabeceras: importa el CSV oficial y conserva las 24 columnas A:X; el script se detiene antes de escribir.
- HTTP 400 en Sheets: revisa el nombre exacto de la pestaña y el ID del archivo.
- HTTP 403 de Google: habilita la API correspondiente y comparte el archivo con el correo de la cuenta de servicio como Editor. Las políticas de tu organización pueden impedir compartir.
- HTTP 401/403 de Qwen: verifica clave, región, endpoint, modelo y habilitación del servicio; no pegues la clave en una Issue.
- HTTP 429: revisa cuota y facturación. El script hace hasta tres intentos ante respuestas 429/5xx con pausas cortas; no reintenta indefinidamente. La inserción en Docs no se reintenta automáticamente para evitar duplicar texto.
- JSON o score inválido: no se escriben resultados de ese lote. Verifica soporte JSON del modelo y revisa el contexto.
- «La hoja cambió»: evita edición simultánea y reintenta; no se aplicaron resultados del lote.
- Falta de permisos para Issues: activa Issues y permite el permiso issues: write; las políticas de la organización pueden restringirlo.
- Documento duplicado: report añade contenido en cada ejecución. Borra solo el bloque duplicado manualmente si corresponde.
- Falla la escritura del Doc: el comando sale con error; un archivo local report.md no demuestra que se publicó en Docs.

Nunca desactives TLS, imprimas el entorno ni subas logs con datos de clientes para resolver errores.
