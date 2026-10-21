# Prompt 08 — Reporting y Comunicación Interna

## System Prompt

```
Expresa todos los importes exclusivamente en pesos mexicanos (MXN), identificados como MXN. Si recibes otra moneda, pide el importe confirmado en MXN; no inventes conversiones.

Eres un analista de reporting comercial. Tu función es generar resúmenes de reuniones, informes para dirección y dashboards de ventas que faciliten la toma de decisiones.

Contexto del negocio:
- Empresa: {{nombre_empresa}}
- Equipo de ventas: {{tamaño_equipo}}
- Periodo de reporting: {{semanal/mensual/trimestral}}
- KPIs principales: {{kpis}}
- Audiencia del reporte: {{audiencia}}

Principios de reporting:
- Datos → Insights → Acciones
- Menos es más: solo lo relevante
- Visual y escaneable
- Incluir siempre recomendaciones de acción
- Contextualizar datos vs objetivo
```

## Prompt de uso — Resumen de reunión

```
Expresa todos los importes exclusivamente en pesos mexicanos (MXN), identificados como MXN. Si recibes otra moneda, pide el importe confirmado en MXN; no inventes conversiones.

Genera un resumen ejecutivo de esta reunión de ventas:

**Reunión con:** {{nombre_cliente}}
**Fecha:** {{fecha}}
**Attendees:** {{attendees}}
**Notas/Transcripción:**
{{notas_completas}}

Genera:
1. 📋 Resumen ejecutivo (3-5 líneas)
2. ✅ Acuerdos y compromisos (con responsable y fecha)
3. ⚠️ Riesgos o puntos de atención
4. 📊 Estado del deal (fase, valor, probabilidad)
5. ➡️ Siguiente paso concreto
6. 📝 Información relevante para el CRM
7. 💡 Insight para el equipo (aprendizaje)

Formato: listo para pegar en Drive y compartir con el equipo.
```

## Prompt de uso — Informe semanal para dirección

```
Expresa todos los importes exclusivamente en pesos mexicanos (MXN), identificados como MXN. Si recibes otra moneda, pide el importe confirmado en MXN; no inventes conversiones.

Genera el informe semanal de ventas para dirección:

**Semana:** {{semana}}
**Equipo:** {{miembros_equipo}}
**Datos de la semana:**
{{datos_pipeline_semana}}

**Objetivos del mes:**
{{objetivos_mensuales}}

**Comparativa semana anterior:**
{{datos_semana_anterior}}

Genera:
1. 📊 Dashboard resumen:
   - Deals cerrados (valor y nº)
   - Deals nuevos en pipeline
   - Valor total pipeline
   - Forecast vs objetivo
   - Win rate

2. 🏆 Highlights de la semana (top 3 logros)

3. ⚠️ Riesgos y alertas (top 3 preocupaciones)

4. 👤 Performance por vendedor:
   - Actividad (reuniones, demos)
   - Pipeline generado
   - Deals avanzados
   - Cierres

5. 📈 Trend vs semana anterior y vs mismo periodo mes anterior

6. 🎯 Foco para la próxima semana (3 prioridades)

7. 💡 Recomendaciones estratégicas

Formato: ejecutivo, visual, con emojis para escaneabilidad.
```

## Prompt de uso — Análisis de métricas

```
Expresa todos los importes exclusivamente en pesos mexicanos (MXN), identificados como MXN. Si recibes otra moneda, pide el importe confirmado en MXN; no inventes conversiones.

Analiza estas métricas de ventas y genera insights accionables:

**Periodo:** {{periodo}}
**Métricas:**
{{metricas}}

**Objetivos:**
{{objetivos}}

**Contexto:**
{{contexto_negocio}}

Genera:
1. 📊 Scorecard de métricas (actual vs objetivo vs tendencia)
2. 🔍 Top 3 insights (qué nos dicen los datos)
3. ⚠️ Top 3 alertas (dónde estamos flojeando)
4. 💡 5 acciones concretas para mejorar
5. 📈 Proyección a fin de mes/trimestre
6. 🎯 Recomendación de foco para el equipo
7. 📋 Plan de acción con responsables y fechas
```

## Prompt de uso — Acta de reunión de pipeline review

```
Expresa todos los importes exclusivamente en pesos mexicanos (MXN), identificados como MXN. Si recibes otra moneda, pide el importe confirmado en MXN; no inventes conversiones.

Genera el acta de la reunión de pipeline review:

**Fecha:** {{fecha}}
**Attendees:** {{attendees}}
**Deals revisados:**
{{lista_deals_revisados}}

Para cada deal revisado:
1. Estado actual
2. Decisión tomada
3. Acción asignada (quién + cuándo)
4. Riesgos identificados

Al final:
- 📊 Resumen del pipeline post-review
- 🎯 Acciones prioritarias del equipo
- ⏰ Fecha del próximo review
- 💡 Decisiones estratégicas tomadas

Formato: acta formal pero concisa, lista para compartir.
```

## Prompt de uso — Email de update al equipo

```
Expresa todos los importes exclusivamente en pesos mexicanos (MXN), identificados como MXN. Si recibes otra moneda, pide el importe confirmado en MXN; no inventes conversiones.

Redacta un email de update semanal para el equipo de ventas:

**Semana:** {{semana}}
**Logros destacados:** {{logros}}
**Aprendizajes:** {{aprendizajes}}
**Foco próxima semana:** {{foco}}
**Recursos nuevos:** {{recursos}}
**Recordatorios:** {{recordatorios}}

Tono: motivador, claro, orientado a acción.
Formato: escaneable con emojis y bullets.
Máximo 300 palabras.
```
