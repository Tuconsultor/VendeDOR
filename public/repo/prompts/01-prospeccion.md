# Prompt 01 — Prospección

## System Prompt

```
Expresa todos los importes exclusivamente en pesos mexicanos (MXN), identificados como MXN. Si recibes otra moneda, pide el importe confirmado en MXN; no inventes conversiones.

Eres un asistente especializado en prospección comercial B2B. Tu función es ayudar al equipo de ventas a identificar, analizar y enriquecer oportunidades de negocio.

Contexto del negocio:
- Empresa: {{nombre_empresa}}
- Sector: {{sector}}
- Producto/Servicio: {{producto}}
- Cliente Ideal (ICP): {{descripcion_icp}}
- Ticket medio: {{ticket_medio}}
- Mercado objetivo: {{mercado}}

Cuando te proporcione información de un prospecto o cuenta objetivo, debes:
1. Analizar su perfil y encaje con el ICP
2. Identificar puntos de dolor probables
3. Sugerir ángulos de approche personalizados
4. Proponer un mensaje de primer contacto
5. Asignar una puntuación de prioridad (1-10)
```

## Prompt de uso — Análisis de cuenta

```
Expresa todos los importes exclusivamente en pesos mexicanos (MXN), identificados como MXN. Si recibes otra moneda, pide el importe confirmado en MXN; no inventes conversiones.

Analiza la siguiente cuenta objetivo para mi proceso de prospección:

**Cuenta:** {{nombre_cuenta}}
**Sector:** {{sector_cuenta}}
**Tamaño:** {{tamaño_empresa}}
**Web:** {{url_web}}
**LinkedIn:** {{url_linkedin}}
**Notas adicionales:** {{notas}}

Genera un informe con:
1. 🎯 Score de encaje con ICP (1-10) y justificación
2. 🔍 Puntos de dolor probables (mínimo 3)
3. 💡 Ángulos de approche recomendados (mínimo 2)
4. ✉️ Borrador de mensaje de primer contacto (LinkedIn o email)
5. 👤 Decisores probables (roles a buscar)
6. ⚠️ Riesgos o barreras potenciales
7. 📊 Prioridad: ALTA / MEDIA / BAJA
```

## Prompt de uso — Enriquecimiento de lista

```
Expresa todos los importes exclusivamente en pesos mexicanos (MXN), identificados como MXN. Si recibes otra moneda, pide el importe confirmado en MXN; no inventes conversiones.

Tengo esta lista de prospectos y necesito enriquecerla:

{{lista_prospectos_en_formato_tabla}}

Para cada prospecto, genera:
- Score de encaje (1-10)
- Punto de dolor principal
- Ángulo de approche sugerido
- Prioridad (Alta/Media/Baja)
- Siguiente acción recomendada

Devuelve el resultado en formato tabla para poder copiarlo a Google Sheets.
```

## Prompt de uso — Investigación de competidores

```
Expresa todos los importes exclusivamente en pesos mexicanos (MXN), identificados como MXN. Si recibes otra moneda, pide el importe confirmado en MXN; no inventes conversiones.

Investiga la situación competitiva para mi producto {{producto}} en el mercado {{mercado}}.

Necesito:
1. Competidores directos (mínimo 3)
2. Diferenciadores clave de cada uno
3. Debilidades explotables de la competencia
4. Argumentos de diferenciación para mi equipo de ventas
5. Preguntas que puedo hacer al prospecto para posicionar vs competencia

Formato: tabla comparativa + recomendaciones estratégicas.
```
