# Template: Pipeline Sheet (Google Sheets)

## Estructura de la hoja

### Hoja 1: "Pipeline Principal"

| Columna | Tipo | Descripción |
|---------|------|-------------|
| A: ID | Auto | Identificador único del deal |
| B: Deal Name | Texto | Nombre del deal |
| C: Cliente | Texto | Nombre de la empresa prospecto |
| D: Sector | Dropdown | Sector del cliente |
| E: Contacto Principal | Texto | Nombre del contacto |
| F: Email | Texto | Email del contacto |
| G: Rol | Dropdown | Rol del contacto (CEO, CTO, VP Sales...) |
| H: Valor (€) | Número | Valor del deal |
| I: Fase | Dropdown | Prospección/Demo/Propuesta/Negociación/Cerrado Ganado/Cerrado Perdido |
| J: Probabilidad (%) | Número | Probabilidad de cierre (0-100) |
| K: Fecha Creación | Fecha | Cuando se creó el deal |
| L: Fecha Último Contacto | Fecha | Última interacción |
| M: Días en Fase | Fórmula | =HOY()-fecha cambio de fase |
| N: Siguiente Acción | Texto | Próximo paso concreto |
| O: Fecha Siguiente Acción | Fecha | Deadline del siguiente paso |
| P: Responsable | Dropdown | Miembro del equipo |
| Q: Score ICP | Número | Score de encaje con ICP (1-10) |
| R: Prioridad | Dropdown | Alta/Media/Baja |
| S: Fuente | Dropdown | LinkedIn/Referido/Inbound/Evento/Web |
| T: Competencia | Texto | Competidor en carrera (si aplica) |
| U: Notas | Texto | Notas libres |
| V: Última Actualización IA | Fecha | Cuando Qwen analizó por última vez |

### Hoja 2: "Actividad"

| Columna | Tipo | Descripción |
|---------|------|-------------|
| A: Fecha | Fecha | Fecha de la actividad |
| B: Deal ID | Referencia | ID del deal relacionado |
| C: Tipo | Dropdown | Email/Reunión/Call/LinkedIn/Demo/Propuesta |
| D: Resumen | Texto | Resumen de la actividad |
| E: Resultado | Texto | Outcome de la actividad |
| F: Siguiente Paso | Texto | Acción derivada |
| G: Responsable | Dropdown | Quién realizó la actividad |

### Hoja 3: "Dashboard"

Fórmulas clave:
- Total Pipeline: =SUMAR.SI(I:I,"<>Cerrado*",H:H)
- Deals por fase: =CONTAR.SI(I:I,"Prospección")
- Win Rate: =Cerrados Ganados / (Ganados + Perdidos)
- Forecast Ponderado: =SUMAPRODUCTO(H:H, J:J)
- Días medios en pipeline: =PROMEDIO de deals cerrados

### Hoja 4: "Objeciones"

| Columna | Tipo | Descripción |
|---------|------|-------------|
| A: Objeción | Texto | La objeción tal como la dice el cliente |
| B: Categoría | Dropdown | Precio/Timing/Competencia/Necesidad/Riesgo |
| C: Respuesta | Texto | Respuesta recomendada |
| D: Pregunta Seguimiento | Texto | Pregunta para avanzar |
| E: Caso de Apoyo | Texto | Caso de éxito relevante |
| F: Frecuencia | Número | Cuántas veces se ha encontrado |
| G: Última Actualización | Fecha | Cuando se actualizó |

### Hoja 5: "ICP Score"

| Columna | Tipo | Descripción |
|---------|------|-------------|
| A: Criterio | Texto | Criterio de encaje |
| B: Peso | Número | Peso del criterio (1-5) |
| C: Descripción | Texto | Qué evalúa este criterio |
| D: Score 1 | Texto | Qué significa score 1 |
| E: Score 5 | Texto | Qué significa score 5 |

## Fórmulas útiles

```
// Días en fase actual
=SI(I2="Cerrado Ganado";0;HOY()-K2)

// Score de prioridad automático
=SI(Y(L2<HOY()-14;R2="Alta");"🔴 URGENTE";SI(L2<HOY()-7;"🟡 Revisar";"🟢 OK"))

// Forecast ponderado
=H2*(J2/100)

// Velocidad del pipeline (deals/día)
=CONTAR.SI(I:I;"Cerrado Ganado")/DIAS(MIN(K:K);HOY())
```

## Cómo conectar con Qwen

1. Copia los datos de la hoja "Pipeline Principal"
2. Pega en el prompt de Qwen (Fase 3 - Gestión del Pipeline)
3. Qwen genera el análisis
4. Copia el resultado a la hoja "Dashboard" o comparte por email
