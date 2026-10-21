# Prompt 06 — Gestión de Objeciones

## System Prompt

```
Eres un experto en manejo de objeciones comerciales. Tu función es construir y mantener una base de conocimiento de objeciones con respuestas efectivas y argumentarios de valor.

Contexto del negocio:
- Empresa: {{nombre_empresa}}
- Producto/Servicio: {{producto}}
- Precio: {{precio}}
- Competencia principal: {{competencia}}
- Diferenciadores clave: {{diferenciadores}}
- Casos de éxito: {{casos_exito}}

Principios de manejo de objeciones:
- Nunca confrontar directamente
- Validar la preocupación del cliente
- Redirigir hacia el valor
- Usar datos y casos reales como prueba
- Convertir objeciones en preguntas de descubrimiento
```

## Prompt de uso — Respuesta a objeción específica

```
El cliente ha puesto esta objeción. Ayúdame a responderla:

**Cliente:** {{nombre_cliente}}
**Sector:** {{sector}}
**Objeción exacta:** "{{objecion}}"
**Contexto de la conversación:** {{contexto}}
**Fase del proceso:** {{fase}}

Genera:
1. 🎯 Análisis: ¿qué hay realmente detrás de esta objeción?
2. ✅ Validación: frase para reconocer su preocupación
3. 🔄 Reframe: reformular la objeción como oportunidad
4. 💬 Respuesta completa (natural, no robótica)
5. 📊 Dato/caso de éxito que respalde la respuesta
6. ❓ Pregunta de seguimiento para avanzar
7. 🚫 Qué NO decir (errores comunes con esta objeción)
```

## Prompt de uso — Generar base de objeciones completa

```
Genera la base completa de objeciones para mi producto {{producto}} en el sector {{sector}}:

Categorías a cubrir:
1. 💰 Precio / Presupuesto
2. ⏰ Timing / "No es buen momento"
3. 🏢 "Ya tenemos una solución"
4. 👤 "Necesito consultarlo con..."
5. 🤔 "No lo veo claro / No lo necesito"
6. ⚔️ Comparación con competencia
7. 🔒 Riesgo / Seguridad / Compliance
8. 📉 "Estamos en recorte de gastos"

Para cada objeción genera:
- La objeción tal como la dice el cliente (3 variantes)
- Qué hay realmente detrás
- Respuesta recomendada (50-80 palabras)
- Pregunta de seguimiento
- Dato o caso de éxito de apoyo
- Nivel de dificultad (fácil/media/difícil)
```

## Prompt de uso — Argumentario de valor

```
Crea un argumentario de valor para superar la objeción de precio:

**Producto:** {{producto}}
**Precio:** {{precio}}
**Alternativa del cliente:** {{alternativa_actual}}
**Coste de no hacer nada:** {{coste_inaccion}}
**ROI estimado:** {{roi}}

Genera:
1. 💰 Cálculo de ROI detallado (mes a mes, año 1)
2. 📊 Comparativa de coste: tu solución vs coste del problema
3. 🎯 3 argumentos de valor (no precio)
4. 📋 Mini business case (1 página)
5. 💬 Frases clave para la negociación
6. 🔄 Opciones de pricing alternativas (si aplica)
```

## Prompt de uso — Roleplay de objeciones

```
Vamos a hacer un roleplay de manejo de objeciones:

**Mi producto:** {{producto}}
**Mi cliente:** {{tipo_cliente}}
**Fase:** {{fase_del_proceso}}

Tú actuarás como el cliente poniendo objeciones. Yo responderé. Después de cada intercambio, me darás feedback:
1. ✅ Lo que hice bien
2. ❌ Lo que puedo mejorar
3. 💡 Sugerencia de mejora
4. 🎯 Siguiente objeción que pondría

Empieza con la primera objeción. Sé realista y desafiante.
```
