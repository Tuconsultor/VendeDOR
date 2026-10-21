# VendeDOR

Kit público de ventas con IA: prompts, plantillas y playbooks para un recorrido manual reproducible, más automatizaciones opcionales con configuración propia.

Sitio: https://tuconsultor.github.io/VendeDOR/

## Usar el kit sin programar

Empieza en [la guía manual](public/repo/guias/inicio-manual.md) y completa [el caso con datos ficticios](public/repo/ejemplos/caso-completo.md). Los materiales se pueden abrir, copiar y descargar desde el sitio o desde [public/repo](public/repo/README.md).

Las automatizaciones requieren un repositorio privado, Node.js 24 y credenciales propias. Consulta [la guía de automatización](public/repo/guias/automatizacion.md). Los scripts tienen pruebas con servicios simulados; debes comprobar las integraciones reales en tus cuentas antes de habilitar horarios. El sitio es una biblioteca, no un CRM alojado.

## Desarrollo de la web

Requisitos: Node.js 24 y npm (validados con Node 24.19.0/npm 11.9.0).

```sh
npm ci
npm run dev
```

Vite usa el puerto 3000. Validación desde la raíz:

```sh
npm run typecheck
npm test
npm run build -- --base=/VendeDOR/
```

El workflow .github/workflows/deploy-pages.yml publica dist en GitHub Pages al actualizar main. En Settings → Pages, selecciona GitHub Actions como origen. Para un repositorio con otro nombre, cambia el argumento --base en el workflow. Para un dominio raíz usa --base=/.

## Costes, datos y licencia

Materiales bajo [MIT](LICENSE). Revisa [costes y privacidad](public/repo/guias/costes-privacidad.md): los recursos son gratuitos, pero no se garantiza coste cero de APIs o servicios. No guardes claves ni datos reales en este repositorio público. La automatización no envía emails.
