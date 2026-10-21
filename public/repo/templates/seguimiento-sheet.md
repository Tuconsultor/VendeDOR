# Template: Seguimiento Semanal (Google Sheets)

## Hoja: "Follow-up Semanal"

| Columna | Tipo | Descripción |
|---------|------|-------------|
| A: Semana | Texto | Nº de semana (ej: "Semana 23 - 2025") |
| B: Deal | Texto | Nombre del deal |
| C: Cliente | Texto | Empresa |
| D: Fase | Dropdown | Fase actual |
| E: Valor | Número | Valor del deal |
| F: Acción Planificada | Texto | Lo que debías hacer |
| G: Acción Realizada | Texto | Lo que realmente hiciste |
| H: Resultado | Texto | Qué pasó |
| I: Siguiente Acción | Texto | Próximo paso |
| J: Fecha Límite | Fecha | Deadline |
| K: Bloqueadores | Texto | Qué te frena |
| L: Necesito Ayuda | Checkbox | ¿Necesitas soporte? |
| M: Notas IA | Texto | Sugerencia de Qwen |

## Hoja: "Métricas Semanales"

| Métrica | Semana Actual | Semana Anterior | Variación | Objetivo |
|---------|---------------|-----------------|-----------|----------|
| Emails enviados | | | | |
| Reuniones agendadas | | | | |
| Demos realizadas | | | | |
| Propuestas enviadas | | | | |
| Deals avanzados de fase | | | | |
| Deals cerrados | | | | |
| Revenue cerrado (€) | | | | |
| Win rate (%) | | | | |
| Pipeline generado (€) | | | | |
| Días medios en pipeline | | | | |

## Hoja: "Ritmo Semanal"

### Checklist semanal del vendedor:

| Día | Actividad | Completado |
|-----|-----------|------------|
| Lunes | Revisar pipeline + priorizar deals | ☐ |
| Lunes | Planificar outreach de la semana | ☐ |
| Martes | Follow-ups pendientes | ☐ |
| Martes | Reuniones de descubrimiento | ☐ |
| Miércoles | Demos programadas | ☐ |
| Miércoles | Enviar propuestas pendientes | ☐ |
| Jueves | Follow-ups de propuestas | ☐ |
| Jueves | Actualizar CRM/Sheet | ☐ |
| Viernes | Review semanal + plan siguiente | ☐ |
| Viernes | Reporte para dirección | ☐ |

## Cómo automatizar con Qwen

Cada viernes:
1. Copia los datos de "Métricas Semanales"
2. Usa el prompt de "Informe semanal para dirección" (Fase 8)
3. Qwen genera el informe
4. Pégalo en un Google Doc
5. Compártelo con dirección
