# Caso guiado: de un prospecto al reporte

Todas las empresas, personas y cifras de este caso son ficticias. Las respuestas de IA varían: valida los criterios de cada paso, no una frase exacta.

## Contexto que puedes copiar

Empresa: DemoCRM. Sector: software de ventas B2B. Producto: organización de oportunidades y seguimiento comercial. Cliente ideal: distribuidoras con 10–50 vendedores que gestionan oportunidades en hojas de cálculo. Ticket anual orientativo: 8000–12000 MXN. Mercado: México. No tenemos referencias verificables de clientes: no generes testimonios ni casos de éxito como si fueran reales.

## 1. Prepara los datos

Importa pipeline-demo.csv siguiendo inicio-manual.md. Los registros son:

| ID | Cliente ficticio | Fase | Valor | Probabilidad |
| --- | --- | --- | --- | --- |
| D001 | Distribuciones Norte Demo | Prospección | 12000 | 25 |
| D002 | Servicios Sur Demo | Propuesta | 8000 | 60 |
| D003 | Logística Centro Demo | Cerrado Ganado | 5000 | 100 |
| D004 | Comercio Este Demo | Cerrado Perdido | 3000 | 0 |

Las fechas son ejemplos fijos; adáptalas si quieres practicar alertas relativas a hoy.

## 2. Analiza el prospecto D001

Abre 01-prospeccion.md. Pega el contexto anterior y el prompt «Análisis de cuenta» con:

- Cuenta: Distribuciones Norte Demo.
- Sector: distribución industrial.
- Tamaño: 20 vendedores (supuesto del ejercicio).
- Web y LinkedIn: No disponibles.
- Notas: usa hojas de cálculo; el equipo menciona seguimientos olvidados. Presupuesto y decisor no confirmados.

Comprueba que propone un score entre 1 y 10 y distingue hechos de hipótesis. No debe afirmar que visitó una web ni conocer a un decisor específico. Guarda score (Q), prioridad (R) y una nota con las dudas (U).

## 3. Descubrimiento y demo

Con 05-descubrimiento.md, pide cinco preguntas para confirmar impacto, proceso de decisión y presupuesto. Practica con estas respuestas ficticias:

- Dirección comercial revisa el pipeline cada lunes.
- Se pierden recordatorios, pero no se ha medido su impacto económico.
- El director comercial evalúa; finanzas aprueba.
- No hay presupuesto confirmado ni autorización de compra.

Con 02-demos.md pide una demo de 10 minutos centrada en recordatorios y revisión de pipeline. El resultado debe incluir objetivo, guion y pregunta de validación. No promete beneficios económicos medidos.

## 4. Objeción y propuesta

Usa 06-objeciones.md: «Ya trabajamos con Sheets y no queremos cambiar todo». Revisa si la respuesta reconoce el contexto, pregunta por el problema y propone un siguiente paso proporcionado.

Copia propuesta-doc.md a Docs y usa 07-negociacion.md para revisarla. Propón una prueba acotada como hipótesis; no inventes descuentos autorizados, contratos ni testimonios. Guarda una siguiente acción y fecha en N/O. Mantén D001 en Prospección hasta que exista evidencia para cambiarlo: el ejercicio no genera una venta real.

## 5. Comprueba el pipeline y el informe

Sin cambiar los importes ni probabilidades del CSV:

- Oportunidades abiertas: 2.
- Pipeline abierto: 20000 MXN (12000 + 8000).
- Forecast ponderado abierto: 7800 MXN (12000 × 25/100 + 8000 × 60/100).
- Ganado total registrado: 5000 MXN.
- Tasa de cierre de oportunidades cerradas: 50% (1 ganada / 2 cerradas).

Pasa la tabla a 03-pipeline.md y luego a 08-reporting.md. Comprueba esos cálculos. No hay histórico ni actividad suficiente para afirmar ingresos de esta semana o mejora frente a la anterior. El informe debe señalar esa limitación.

El script de automatización usa estas mismas reglas y entrega metrics.json con openDeals=2, openPipeline=20000, weightedForecast=7800, wonTotal=5000 y winRate=50.

## 6. Practica expansión sin inventar resultados

Usa D003, la cuenta ganada ficticia, con 04-expansion.md. Indica que no hay datos de uso ni satisfacción. El resultado debe proponer preguntas y seguimiento, no afirmar que hay una oportunidad de ampliación confirmada.

## Checklist de finalización

- [ ] Importé 4 filas y verifiqué las 24 columnas.
- [ ] Pude abrir y copiar un prompt completo desde el sitio.
- [ ] Personalicé contexto y variables sin dejar {{llaves}}.
- [ ] Registré una siguiente acción con fecha.
- [ ] Creé una propuesta en mi propio Google Docs.
- [ ] El informe coincide con los cinco valores de control.
- [ ] Distinguí datos ficticios, hechos y recomendaciones de IA.
- [ ] No compartí claves ni datos reales de clientes en el repositorio público.
