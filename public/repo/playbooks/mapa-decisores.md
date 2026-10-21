# Playbook: Mapa de Decisores

## Tipos de Stakeholders en una Compra B2B

### 🟢 El Champion (Campeón)
**Rol:** Tu aliado interno. Impulsa la compra desde dentro.
**Características:**
- Tiene poder e influencia
- Se beneficia personalmente del cambio
- Está dispuesto a luchar por ti internamente
- Te da acceso a otros stakeholders

**Cómo identificarlo:**
- Te da información privilegiada
- Te presenta a otros decisores
- Defiende tu solución cuando no estás
- Tiene urgencia personal en resolver el problema

**Cómo activarlo:**
- Dale argumentos para defender tu solución
- Proporciona materiales que pueda compartir
- Ayúdale a construir su business case interno
- Reconoce su papel (sin hacerle quedar mal)

---

### 🔵 El Economic Buyer (Decisor Económico)
**Rol:** Quién aprueba el presupuesto. Tiene poder de veto.
**Características:**
- Controla el presupuesto
- Mira ROI y impacto en negocio
- No entra en detalles técnicos
- Quiere ver el "big picture"

**Cómo acceder:**
- A través del Champion
- Ofreciendo una reunión ejecutiva
- Con un business case sólido
- Hablando su idioma (números, no features)

**Qué necesita escuchar:**
- ROI claro y cuantificado
- Riesgo de no actuar
- Comparativa vs alternativas
- Timeline de implementación

---

### 🟡 El Technical Buyer (Decisor Técnico)
**Rol:** Evalúa la viabilidad técnica. Puede bloquear la compra.
**Características:**
- Evalúa integración, seguridad, compliance
- Busca razones para decir "no" (por protección)
- Quiere detalles técnicos
- No decide pero puede vetar

**Cómo manejarlo:**
- No lo ignores ni lo subestimes
- Dale toda la información técnica que pida
- Anticípate a sus preocupaciones
- Ofrece demos técnicas y documentación

**Qué necesita ver:**
- Arquitectura y seguridad
- Integraciones disponibles
- Compliance y certificaciones
- Soporte técnico y SLAs

---

### 🟠 El End User (Usuario Final)
**Rol:** Quién usará el producto día a día.
**Características:**
- Le importa la facilidad de uso
- Temeroso del cambio
- Puede ser un champion o un bloqueador
- Su adopción determina el éxito

**Cómo manejarlo:**
- Involúcralo temprano
- Muestra cómo le facilita la vida
- Address sus miedos al cambio
- Pide su feedback en el proceso

---

### 🔴 El Blocker (Bloqueador)
**Rol:** Quién se opone al cambio o a tu solución.
**Características:**
- Tiene algo que perder con el cambio
- Puede ser el proveedor actual (interno o externo)
- Tiene influencia política
- Busca razones para mantener el status quo

**Cómo manejarlo:**
- Entiende su motivación (¿qué pierde?)
- No lo confrontes directamente
- Busca alinearlo con el cambio
- Si es imposible, minimiza su influencia
- Asegúrate de que el Economic Buyer tiene más peso

---

### ⚪ El Coach (Coach/Informante)
**Rol:** Te da información interna. No tiene poder de decisión.
**Características:**
- Quiere ayudarte (por la razón que sea)
- Te da información sobre el proceso interno
- No puede impulsar la compra
- Puede ser un futuro champion

**Cómo manejarlo:**
- Agradécele la información
- No le pidas que tome decisiones por ti
- Valida su información con otras fuentes
- Considera si puede evolucionar a champion

---

## Template de Mapa de Decisores

```
DEAL: {{nombre_deal}}
CLIENTE: {{nombre_cliente}}

| Stakeholder | Nombre | Rol | Poder | Influencia | Actitud | Acceso | Estrategia |
|-------------|--------|-----|-------|------------|---------|--------|------------|
| | | Champion | Alto | Alta | 🟢 Favorable | Directo | Activar |
| | | Economic Buyer | Alto | Alta | 🔵 Neutral | Indirecto | Acceder |
| | | Technical Buyer | Medio | Media | 🟡 Skeptical | Directo | Informar |
| | | End User | Bajo | Media | 🟠 TBD | TBD | Involucrar |
| | | Blocker | Medio | Alta | 🔴 Opposed | TBD | Neutralizar |

GAPS:
- ¿Falta alguien clave?
- ¿Tenemos acceso al Economic Buyer?
- ¿Hay un champion real o solo un coach?

PRÓXIMAS ACCIONES:
1. 
2. 
3. 
```

## Cómo usar con Qwen

```
Crea un mapa de decisores para esta oportunidad:

Cliente: {{nombre_cliente}}
Sector: {{sector}}
Producto: {{producto}}
Contacto actual: {{nombre}} ({{rol}})
Lo que sabemos del proceso: {{contexto}}

Genera:
1. Stakeholders probables con roles
2. Para cada uno: motivaciones, preocupaciones, estrategia
3. Gaps en nuestro mapa
4. Acciones para cubrir los gaps
5. Prioridad de acceso a cada stakeholder
```
