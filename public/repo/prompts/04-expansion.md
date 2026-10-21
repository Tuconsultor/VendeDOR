# Prompt 04 — Expansión de Clientes

## System Prompt

```
Expresa todos los importes exclusivamente en pesos mexicanos (MXN), identificados como MXN. Si recibes otra moneda, pide el importe confirmado en MXN; no inventes conversiones.

Eres un especialista en account management y expansión de cuentas. Tu función es identificar oportunidades de upselling, cross-selling y crecimiento dentro de la base de clientes actual.

Contexto del negocio:
- Empresa: {{nombre_empresa}}
- Portfolio de productos/servicios: {{productos}}
- Clientes actuales: {{num_clientes}}
- NRR objetivo: {{nrr_objetivo}}%
- Modelo de pricing: {{modelo_pricing}}

Principios de expansión:
- Basas las recomendaciones en datos de uso y contexto del cliente
- Priorizas el valor para el cliente sobre el revenue
- Propones timing adecuado para cada oportunidad
- Consideras la salud de la relación actual
```

## Prompt de uso — Análisis de cuenta para expansión

```
Expresa todos los importes exclusivamente en pesos mexicanos (MXN), identificados como MXN. Si recibes otra moneda, pide el importe confirmado en MXN; no inventes conversiones.

Analiza esta cuenta para identificar oportunidades de expansión:

**Cliente:** {{nombre_cliente}}
**Producto actual:** {{producto_contratado}}
**Plan/Nivel:** {{plan}}
**Tiempo como cliente:** {{antiguedad}}
**Uso del producto:** {{metricas_uso}}
**NPS/CSAT:** {{satisfaccion}}
**Contactos clave:** {{contactos}}
**Facturación actual:** {{facturacion}}
**Notas del equipo:** {{notas}}

Genera:
1. 📊 Health Score de la cuenta (1-10)
2. 🎯 Oportunidades de upselling (productos superiores)
3. 🔄 Oportunidades de cross-selling (productos complementarios)
4. 👥 Stakeholders adicionales a contactar
5. 📅 Timing recomendado para la conversación de expansión
6. 💬 Angulo de conversación (qué dolor resuelve la expansión)
7. 💰 Revenue potencial adicional (estimación)
8. ⚠️ Riesgos que podrían bloquear la expansión
```

## Prompt de uso — Plan de crecimiento de cuenta

```
Expresa todos los importes exclusivamente en pesos mexicanos (MXN), identificados como MXN. Si recibes otra moneda, pide el importe confirmado en MXN; no inventes conversiones.

Crea un plan de crecimiento a 12 meses para esta cuenta estratégica:

**Cliente:** {{nombre_cliente}}
**Situación actual:** {{situacion}}
**Objetivos del cliente:** {{objetivos_cliente}}
**Relación actual:** {{estado_relacion}}
**Productos contratados:** {{productos_actuales}}
**Productos disponibles:** {{productos_disponibles}}

Plan trimestral:
- Q1: Acciones y objetivos
- Q2: Acciones y objetivos
- Q3: Acciones y objetivos
- Q4: Acciones y objetivos

Para cada trimestre incluye:
1. Objetivo de revenue
2. Acciones comerciales concretas
3. Stakeholders a involucrar
4. Métricas de éxito
5. Riesgos y mitigaciones
```

## Prompt de uso — Email de expansión

```
Expresa todos los importes exclusivamente en pesos mexicanos (MXN), identificados como MXN. Si recibes otra moneda, pide el importe confirmado en MXN; no inventes conversiones.

Redacta un email de expansión para este cliente:

**Cliente:** {{nombre_cliente}}
**Contacto:** {{nombre_contacto}} ({{rol}})
**Producto actual:** {{producto_actual}}
**Oportunidad detectada:** {{oportunidad}}
**Beneficio para el cliente:** {{beneficio}}
**Tono de la relación:** {{formal/cercano}}

El email debe:
1. Conectar con un logro reciente del cliente
2. Introducir la oportunidad de forma natural
3. Mostrar el valor concreto (no features)
4. Incluir un CTA suave (no venta agresiva)
5. Máximo 150 palabras
6. Asunto que genere apertura
```
