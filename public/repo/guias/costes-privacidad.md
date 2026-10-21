# Costes, privacidad y uso de los materiales

## Qué es gratuito

Los materiales del repositorio se distribuyen bajo la licencia MIT incluida en LICENSE. Puedes usarlos, adaptarlos y redistribuirlos conservando el aviso de licencia. Se entregan sin garantía. La licencia no cubre marcas, servicios de terceros ni datos de otras personas. Conserva el aviso al redistribuir una copia del kit.

La web no cobra ni solicita registro. Eso no garantiza que los servicios externos sean gratuitos:

- Qwen Chat y Qwen API tienen condiciones, disponibilidad y cuotas diferentes.
- Las llamadas API de los scripts consumen tokens y pueden generar cargos. check también realiza una llamada pequeña.
- El enriquecimiento hace una llamada por prospecto abierto sin score; el reporte hace una llamada por ejecución. Los workflows ejecutan antes check. Respuestas 429/5xx pueden causar reintentos.
- Google y GitHub aplican sus cuotas, límites, planes y posibles requisitos de facturación. Los minutos de Actions y almacenamiento en repositorios privados dependen de tu plan.
- Configura límites y avisos de gasto en cada proveedor. Empieza con datos ficticios y ejecuciones manuales. No se promete coste cero.

## Asistente para vendedores

El asistente prepara mensajes y archivos en tu navegador. No envía los datos del formulario a un backend de VendeDOR ni usa una API de IA. El botón Abrir Qwen lleva a un servicio externo: tú decides qué pegar y enviar. Al importar la hoja a Google o compartir un archivo, se aplican las condiciones de esos servicios.

«Guardar mi avance en este navegador» está desactivado inicialmente. Si lo activas, guarda tu negocio, cliente, notas y progreso en el almacenamiento local de este navegador, accesible para quienes usen ese perfil del equipo. No es una cuenta en la nube ni una copia de seguridad. Desactivarlo elimina la copia local guardada; «Borrar mis datos» también limpia el formulario. Los archivos que descargaste se borran por separado desde tu equipo.

## Dónde van los datos

En modo manual tú eliges qué pegar en Qwen y qué guardar en Google. Qwen no recibe acceso automático a Drive por usar esta web.

En modo API:

1. La cuenta de servicio lee las columnas A:X del archivo de Sheets que compartiste.
2. A Qwen se envían BUSINESS_CONTEXT y, por oportunidad, ID, empresa, sector, valor, fase, probabilidad y notas. No se envían las columnas de contacto, email ni rol, pero las notas pueden contener datos personales: revísalas antes.
3. Las claves se usan para autenticar; no se envían como parte del prompt.
4. El enriquecimiento escribe score, prioridad y fecha IA en Sheets. Las justificaciones quedan en un archivo del ejecutor y, con Actions, en un artefacto.
5. El reporte y métricas quedan en output/ y en el artefacto del repositorio privado. Si habilitas el Doc, también se añaden al documento existente.
6. Los artefactos se retienen 7 días en los workflows de ejemplo; una copia descargada o un Doc puede durar más. El borrado de un artefacto no borra datos en Google o Qwen.

## Reglas de operación

- Usa un repositorio PRIVADO para las automatizaciones con datos. El repositorio público sirve para distribuir código y ejemplos ficticios.
- No publiques contactos, transcripciones, claves JSON, tokens, hojas reales ni informes en GitHub público.
- Autoriza el tratamiento de datos según tus políticas y contratos; minimiza o anonimiza la información antes de enviarla a un proveedor de IA.
- Revisa las condiciones y política de tratamiento de datos de tu región y modelo de Qwen y de Google. No se garantiza residencia, confidencialidad o retención específica de terceros.
- Da acceso solo a los archivos que necesita la cuenta de servicio. Limita colaboradores y rota o revoca claves expuestas desde el proveedor.
- No conviertas una hipótesis generada por IA en un hecho sobre una empresa. No inventes casos de éxito, personas, precios autorizados ni resultados de clientes.
- Revisa cifras y contenido antes de compartir o tomar una decisión. El sistema no envía emails ni contacta prospectos automáticamente.

La web no contiene un formulario de claves ni un backend para guardarlas. Google, GitHub y Qwen son servicios de terceros: usar cuentas propias no elimina esa dependencia.
