# 🚀 VentasIA — Sistema de Ventas con IA

> De la prospección al reporting. 8 fases conectadas usando Qwen + GitHub + Google Drive.

## 📁 Estructura del repositorio

```
ventas-ia/
├── README.md
├── prompts/                    # Prompts de Qwen por fase
│   ├── 01-prospeccion.md
│   ├── 02-demos.md
│   ├── 03-pipeline.md
│   ├── 04-expansion.md
│   ├── 05-descubrimiento.md
│   ├── 06-objeciones.md
│   ├── 07-negociacion.md
│   └── 08-reporting.md
├── templates/                  # Templates de Google Drive
│   ├── pipeline-sheet.md
│   ├── propuesta-doc.md
│   └── seguimiento-sheet.md
├── workflows/                  # GitHub Actions
│   ├── seguimiento-semanal.yml
│   ├── enriquecimiento-diario.yml
│   └── reporte-semanal.yml
└── playbooks/                  # Playbooks comerciales
    ├── framework-cualificacion.md
    ├── mapa-decisores.md
    └── base-objeciones.md
```

## ⚡ Inicio rápido

1. **Clona este repo**
2. **Copia los prompts** a tu instancia de Qwen
3. **Crea las hojas de Google Sheets** con los templates
4. **Configura los workflows** en GitHub Actions
5. **Adapta** los prompts a tu sector y cliente ideal

## 🧠 Cómo usar los prompts

Cada prompt está diseñado para ser usado con Qwen (API o interfaz web). Los prompts incluyen:

- **Variables** entre `{{llaves}}` que debes personalizar
- **Contexto** del sistema para que Qwen entienda tu negocio
- **Formato de salida** estructurado para integración con Drive

## 🔗 Integración con Google Drive

Los prompts están diseñados para que la salida de Qwen se pueda:
- Copiar directamente a Google Sheets
- Pegar en Google Docs como propuesta
- Compartir con el equipo via Drive

## 📋 Requisitos

- Cuenta de GitHub (gratis)
- Cuenta de Google Drive (gratis)
- Acceso a Qwen API o interfaz web (gratis)
- Opcional: GitHub Actions para automatización

## 💡 Filosofía

> No se trata de usar IA en una fase. Se trata de conectar las 8.
> Un prompt suelto = una tarea resuelta.
> Un sistema conectado = un proceso de ventas que funciona cada semana.

---

Hecho con 💜 para vendedores que quieren vender más con IA.
