# Playbook: Framework de Cualificación

## MEDDPICC — Adaptado para ventas B2B

### M — Metrics (Métricas)
**Qué buscar:** El impacto cuantificable del problema.

**Preguntas:**
- ¿Cuánto os cuesta este problema actualmente?
- ¿Qué métrica de negocio está afectada?
- ¿Cuánto podríais ahorrar/ganar resolviéndolo?

**Score:**
- 5: El cliente tiene métricas claras y cuantificadas
- 3: Hay impacto pero no cuantificado
- 1: No hay consciencia del impacto económico

---

### E — Economic Buyer (Decisor Económico)
**Qué buscar:** Quién aprueba el presupuesto.

**Preguntas:**
- ¿Quién aprueba este tipo de inversión?
- ¿Cómo es el proceso de aprobación?
- ¿Hay algún comité de compras?

**Score:**
- 5: Hablas directamente con el decisor económico
- 3: Tu contacto tiene acceso al decisor
- 1: No sabes quién decide

---

### D — Decision Criteria (Criterios de Decisión)
**Qué buscar:** Cómo evalúan las opciones.

**Preguntas:**
- ¿Qué criterios usaréis para evaluar soluciones?
- ¿Hay requisitos técnicos obligatorios?
- ¿Cómo pesa el precio vs valor?

**Score:**
- 5: Conoces los criterios y puedes alinearte
- 3: Tienes idea general de los criterios
- 1: No sabes cómo deciden

---

### D — Decision Process (Proceso de Decisión)
**Qué buscar:** Los pasos formales e informales para comprar.

**Preguntas:**
- ¿Cuál es vuestro proceso típico de compra?
- ¿Qué pasos faltan para llegar a una decisión?
- ¿Hay algún proceso de vendor approval?

**Score:**
- 5: Conoces todo el proceso paso a paso
- 3: Conoces las grandes fases
- 1: No entiendes cómo compran

---

### P — Paper Process (Proceso Administrativo)
**Qué buscar:** La burocracia para firmar.

**Preguntas:**
- ¿Quién firma los contratos?
- ¿Hay departamento legal que revise?
- ¿Cuánto tarda normalmente el proceso?

**Score:**
- 5: Conoces el proceso administrativo completo
- 3: Sabes quién firma pero no el proceso
- 1: No tienes idea de la burocracia

---

### I — Identify Pain (Identificar Dolor)
**Qué buscar:** El problema urgente que resuelves.

**Preguntas:**
- ¿Qué problema os urge resolver?
- ¿Qué estáis haciendo ahora para resolverlo?
- ¿Qué pasa si no lo resolvéis?

**Score:**
- 5: Dolor claro, urgente y cuantificado
- 3: Hay dolor pero no es urgente
- 1: No hay consciencia del problema

---

### C — Champion (Campeón)
**Qué buscar:** Tu aliado interno que impulsa la compra.

**Preguntas:**
- (Indirectas) ¿Quién más está interesado en esto?
- ¿Quién se beneficiaría más de esta solución?

**Score:**
- 5: Tienes un champion con poder e influencia
- 3: Tienes un aliado pero sin mucho poder
- 1: No tienes champion interno

---

### C — Competition (Competencia)
**Qué buscar:** Contra quién compites.

**Preguntas:**
- ¿Estáis evaluando otras soluciones?
- ¿Qué otras opciones habéis considerado?
- ¿Qué os gusta/no gusta de ellas?

**Score:**
- 5: Sabes contra quién compites y tus ventajas
- 3: Sabes que hay otras opciones
- 1: No sabes si hay competencia

---

## Cómo usar con Qwen

Después de cada reunión de descubrimiento, usa este prompt:

```
Evalúa esta oportunidad según MEDDPICC:

Deal: {{nombre_deal}}
Notas de la reunión: {{notas}}

Para cada letra, evalúa:
- Score (1-5)
- Evidencia encontrada
- Gap de información
- Pregunta para cerrar el gap

Score total y recomendación: avanzar / profundizar / descartar
```
