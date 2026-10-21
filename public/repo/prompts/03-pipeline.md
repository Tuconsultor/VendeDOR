# Prompt 03 — Gestión del Pipeline

## System Prompt

```
Eres un analista de pipeline comercial. Tu función es ayudar al equipo de ventas a gestionar, priorizar y hacer forecast de sus oportunidades.

Contexto del negocio:
- Empresa: {{nombre_empresa}}
- Ciclo medio de venta: {{ciclo_dias}} días
- Valor medio deal: {{valor_medio}}
- Fases del pipeline: {{fases_pipeline}}
- Tasa de conversión por fase: {{tasas_conversion}}

Tu rol:
- Analizar el estado del pipeline
- Identificar deals en riesgo
- Priorizar oportunidades
- Generar forecasts realistas
- Sugerir acciones para deals estancados
```

## Prompt de uso — Análisis de pipeline

```
Analiza mi pipeline actual:

{{datos_pipeline_en_formato_tabla}}
(Columnas: Deal | Cliente | Valor | Fase | Días en fase | Último contacto | Siguiente acción | Responsable)

Genera:
1. 📊 Resumen ejecutivo del pipeline (valor total, deals por fase, promedio días)
2. 🔴 Deals en riesgo (estancados +30% del tiempo normal en fase)
3. 🟢 Deals calientes (avanzando bien, con momentum)
4. 🟡 Deals que necesitan atención (sin contacto reciente)
5. 📈 Forecast del mes (optimista, realista, conservador)
6. ⚡ Top 5 acciones prioritarias para esta semana
7. 💡 Recomendaciones estratégicas
```

## Prompt de uso — Priorización de deals

```
Necesito priorizar mis deals activos para esta semana:

{{lista_deals}}

Criterios de priorización:
- Valor del deal
- Probabilidad de cierre
- Urgencia temporal
- Relación con el decisor
- Momentum actual

Para cada deal genera:
1. Score de prioridad (1-10)
2. Razón de la priorización
3. Acción concreta para esta semana
4. Riesgo si no se actúa
5. Recurso necesario (demo, propuesta, reunión con dirección...)

Devuelve en formato tabla ordenada por prioridad.
```

## Prompt de uso — Forecast semanal

```
Genera un forecast de ventas para las próximas {{semanas}} semanas:

**Pipeline actual:**
{{datos_pipeline}}

**Histórico de conversión:**
- Prospección → Demo: {{tasa}}%
- Demo → Propuesta: {{tasa}}%
- Propuesta → Negociación: {{tasa}}%
- Negociación → Cierre: {{tasa}}%

**Deals en negociación activa:**
{{deals_negociacion}}

Genera:
1. Forecast optimista (todos los deals avanzan)
2. Forecast realista (tasas históricas aplicadas)
3. Forecast conservador (solo deals calientes)
4. Deals que más impactan el forecast
5. Riesgos principales para el forecast
6. Acciones para mejorar el forecast
```

## Prompt de uso — Deal en riesgo

```
Este deal está en riesgo. Ayúdame a diagnosticar y crear un plan de rescate:

**Deal:** {{nombre_deal}}
**Cliente:** {{nombre_cliente}}
**Valor:** {{valor}}
**Fase actual:** {{fase}}
**Días en fase:** {{dias}}
**Último contacto:** {{fecha}}
**Contacto principal:** {{nombre_y_rol}}
**Lo que ha pasado:** {{contexto}}

Analiza:
1. 🩺 Diagnóstico: ¿por qué está en riesgo?
2. 📋 Señales de alerta que hemos ignorado
3. 🎯 Plan de rescate (acciones concretas con fechas)
4. 💬 Mensaje de reactivación para el contacto
5. 🔄 Alternativa si no se puede recuperar
6. 📊 Decisión: salvar / descalificar / escalar