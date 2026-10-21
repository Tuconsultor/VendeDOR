# Plantilla CRM: Google Sheets

## Crear una copia en tu cuenta

Importa ejemplos/pipeline-demo.csv o pipeline-vacio.csv desde Archivo → Importar → Subir. El separador es coma; no cambies el orden ni el nombre de las 24 cabeceras. Renombra la pestaña «Pipeline Principal».

Define una sola moneda para los importes y anótala en el nombre o descripción del archivo. En J usa números de 0 a 100: 25 significa 25%, no 0,25. Las fórmulas siguientes usan funciones en español y separador punto y coma. Si tu Sheets usa otro idioma/región, adapta nombres y separadores o usa las alternativas inglesas indicadas.

## Pipeline Principal: columnas A:X

| Columna | Cabecera exacta | Tipo / instrucción |
| --- | --- | --- |
| A | ID | Texto único, por ejemplo D001; asignación manual |
| B | Deal Name | Nombre de la oportunidad |
| C | Cliente | Nombre de la empresa |
| D | Sector | Texto o desplegable propio |
| E | Contacto Principal | Persona; no necesaria para el ejercicio |
| F | Email | Dato personal; no se envía por el script a Qwen |
| G | Rol | Rol del contacto |
| H | Valor | Número positivo o cero, sin símbolo ni separador de millares en el CSV |
| I | Fase | Prospección / Demo / Propuesta / Negociación / Cerrado Ganado / Cerrado Perdido |
| J | Probabilidad (%) | Número 0–100, no formato porcentaje |
| K | Fecha Creación | Fecha, preferentemente ISO AAAA-MM-DD |
| L | Fecha Último Contacto | Fecha |
| M | Días en Fase | Fórmula opcional basada en W |
| N | Siguiente Acción | Acción revisada por una persona |
| O | Fecha Siguiente Acción | Fecha |
| P | Responsable | Nombre o rol |
| Q | Score ICP | Entero 1–10; vacío significa pendiente de analizar |
| R | Prioridad | Alta / Media / Baja |
| S | Fuente | Referido / Inbound / Evento / Ejercicio, etc. |
| T | Competencia | Solo información conocida |
| U | Notas | No incluyas datos confidenciales sin autorización; se envía a Qwen en modo API |
| V | Última Actualización IA | Fecha ISO escrita por enrich o por ti |
| W | Fecha Cambio Fase | Actualízala manualmente cuando cambie I |
| X | Fecha Cierre | Fecha real al cerrar ganado/perdido; vacía si sigue abierto |

## Listas y validación

Selecciona I2:I → Datos → Validación de datos → Desplegable. Añade las seis fases exactas de la tabla. Valida J como número entre 0 y 100 y Q entre 1 y 10, permitiendo vacíos en Q. Crea un desplegable Alta/Media/Baja en R. Los scripts no crean ni mantienen estos formatos.

## Fórmulas opcionales

En M2 y después arrastra hacia abajo (español):

    =SI(O(I2="Cerrado Ganado";I2="Cerrado Perdido";W2="");"";HOY()-W2)

Inglés:

    =IF(OR(I2="Cerrado Ganado",I2="Cerrado Perdido",W2=""),"",TODAY()-W2)

W es la fecha del último cambio de fase. K es la fecha de creación: no son intercambiables. El sistema no detecta cambios de fase por sí solo.

## Dashboard: hoja nueva

Estas fórmulas toman datos de Pipeline Principal, no de la propia pestaña Dashboard. Los rangos de ejemplo llegan a la fila 1000: amplíalos si hace falta.

Pipeline abierto (español):

    =SUMAR.SI.CONJUNTO('Pipeline Principal'!H2:H1000;'Pipeline Principal'!I2:I1000;"<>Cerrado Ganado";'Pipeline Principal'!I2:I1000;"<>Cerrado Perdido")

Forecast ponderado abierto (español):

    =SUMAPRODUCTO(('Pipeline Principal'!I2:I1000<>"Cerrado Ganado")*('Pipeline Principal'!I2:I1000<>"Cerrado Perdido")*'Pipeline Principal'!H2:H1000*'Pipeline Principal'!J2:J1000)/100

Equivalentes ingleses: SUMIFS y SUMPRODUCT, con comas entre argumentos.

Win rate: número de oportunidades Cerrado Ganado dividido por el total de Cerrado Ganado + Cerrado Perdido, multiplicado por 100. Si no hay cerradas, muestra «Sin datos», no 0 como si fuera una medición.

Con pipeline-demo.csv: pipeline abierto 20000, forecast 7800, ganado registrado 5000 y win rate 50%. No son cifras exclusivas de una semana.

## Otras pestañas

- Actividad: importa ejemplos/actividad.csv para fecha, Deal ID, tipo, resumen, resultado, siguiente paso y responsable.
- Métricas Semanales: importa ejemplos/metricas-semanales.csv. Registra actividad por periodo para poder comparar semanas.
- Objeciones: copia las columnas Objeción, Categoría, Respuesta, Pregunta de Seguimiento, Evidencia, Frecuencia y Fecha. Alimenta la base con casos reales revisados.
- ICP Score: define Criterio, Peso, Descripción, Ejemplo score bajo y Ejemplo score alto. Usa esos criterios en el contexto enviado a Qwen.

Las fórmulas y la importación deben comprobarse en tu configuración regional de Sheets; el caso guiado incluye los valores de control. El script calcula las métricas con JavaScript y no depende de estas fórmulas.

## Conexión con Qwen

En modo manual, copia solo los campos necesarios al prompt 03-pipeline.md y guarda el análisis revisado. En modo API consulta guias/automatizacion.md: el enriquecimiento escribe únicamente Q/R/V; no actualiza fases, fechas de cierre ni contactos.
