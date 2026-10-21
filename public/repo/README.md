# VendeDOR: kit de ventas con IA

Biblioteca de prompts, plantillas, playbooks y automatizaciones opcionales para Qwen, Google Sheets/Docs y GitHub Actions.

## Empieza sin programar

1. Sigue [la guía manual](guias/inicio-manual.md).
2. Importa [el pipeline de ejemplo](ejemplos/pipeline-demo.csv) en una hoja tuya de Google Sheets.
3. Completa [el caso guiado](ejemplos/caso-completo.md) y comprueba los resultados esperados.
4. Adapta [los prompts](prompts/) y [las plantillas](templates/) a tu negocio.
5. Revisa [costes y privacidad](guias/costes-privacidad.md) antes de usar datos reales.

No necesitas API ni cuenta de GitHub para el recorrido manual. La conexión entre fases se realiza copiando los datos y resultados; la página no conecta tus cuentas automáticamente.

## Automatización opcional

Sigue [la guía de automatización](guias/automatizacion.md). Incluye configuración de APIs, permisos, secretos, región y modelo de Qwen, instalación y comprobación con datos ficticios.

- scripts/sales.mjs: check, enrich y report; requiere Node 24 y tus credenciales.
- scripts/review.mjs: recordatorio semanal mediante una Issue.
- workflows/: ejemplos para copiar a .github/workflows/ de TU repositorio privado. No se ejecutan desde esta carpeta. Los horarios están desactivados hasta que los habilites.

Los scripts se prueban con servicios simulados. Las conexiones reales deben validarse en tus cuentas. El informe es una fotografía actual del pipeline, no un histórico semanal. No hay envío automático de emails.

## Estructura

- guias/: instrucciones completas, configuración y diagnóstico.
- ejemplos/: datos ficticios, cabeceras importables y caso de principio a fin.
- prompts/: 8 categorías de prompts con contexto y variables.
- templates/: estructuras de CRM, propuesta y seguimiento.
- playbooks/: cualificación, decisores y objeciones.
- scripts/: integraciones sin dependencias adicionales.
- workflows/: instalación opcional de tareas de GitHub Actions.
- LICENSE: licencia MIT del kit.

Los materiales son gratuitos; las APIs y plataformas pueden tener costes y límites. No publiques datos de clientes en el repositorio público.
