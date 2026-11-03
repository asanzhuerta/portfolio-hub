# Portfolio hub — informe de investigación y plan

Fecha: 2026-11-03. Las cifras de precios vienen de las páginas oficiales cuando
se ha podido (Netlify, GitHub Docs) y de comparativas de terceros en el resto;
compruébalas en la web del proveedor antes de decidir.

## 1. Dónde alojar los instaladores

| Opción | Límites / coste | Enlaces firmados (descargas de pago) | Encaje |
|---|---|---|---|
| **GitHub Releases** | Gratis. Cada fichero < 2 GiB (mejor < 2 GB), hasta 1000 assets por release, **sin límite de tamaño total ni de ancho de banda**. | No (todo público). | **Ideal para proyectos gratuitos/open source** como Cover_Maker. |
| **Netlify (el propio sitio)** | Plan Free = 300 créditos/mes. Ancho de banda = 20 créditos/GB, cada deploy de producción = 15 créditos → ~10–14 GB/mes en total. Al agotarlos el sitio se pausa. | No (sin auth propia). | **No** para binarios: unas pocas descargas de un instalador de cientos de MB agotan el plan. Solo HTML/CSS/imágenes. |
| **Cloudflare R2** | 10 GB gratis, luego ~0,015 $/GB-mes. **Salida (egress) gratis.** | Sí: URLs prefirmadas (S3 API) con caducidad. | Mejor opción si algún día hay descargas de pago autoalojadas. |
| **Backblaze B2** | ~6–7 $/TB-mes, 10 GB gratis; egress gratis hasta 3× lo almacenado. | Sí (URLs con token). | Bien, pero R2 es más simple para descargas públicas. |
| **AWS S3 + CloudFront** | Egress ~0,085–0,09 $/GB (con capa gratuita de CloudFront). | Sí (URLs firmadas). | Potente pero caro y complejo para esto. |
| **Bunny CDN** | ~0,01 $/GB en Europa, mínimo ~1 $/mes. | Sí (token authentication). | Buena y europea, pero innecesaria al principio. |

**Recomendación:** instaladores en **GitHub Releases** (gratis, sin límite de
tráfico); Netlify solo sirve la web. Si en el futuro vendes algo, la entrega
de pago la hace el propio proveedor de pagos (ver §2), así que no hace falta
R2/B2 de momento.

⚠️ Si el instalador de Cover_Maker incluye PyTorch con CUDA podría pasar de
2 GB; en ese caso habría que descargar los componentes pesados en el primer
arranque o partir el paquete. Conviene vigilarlo en M9.

### Enlazar siempre a la última versión

- `https://github.com/asanzhuerta/Cover_Maker/releases/latest` → página de la
  última release (siempre funciona, 0 mantenimiento).
- `https://github.com/asanzhuerta/Cover_Maker/releases/latest/download/<NOMBRE>`
  → descarga directa, **solo si el nombre del asset es fijo** (p. ej.
  `Cover_Maker-setup.exe`). Tauri genera nombres con versión
  (`Cover_Maker_1.0.0_x64-setup.exe`), así que habría que subir también una
  copia con nombre fijo en el workflow de release.
- **API** `GET https://api.github.com/repos/asanzhuerta/Cover_Maker/releases/latest`
  → versión, fecha, notas, tamaño y URL de cada asset. Plan: leerla **en el
  build** (Astro) para mostrar versión/tamaño/fecha, y que el workflow de
  release de Cover_Maker llame a un *build hook* de Netlify para reconstruir
  la web al publicar. Así no se gasta el límite de 60 peticiones/hora por IP
  de la API sin token, y si la API falla el botón cae al enlace
  `releases/latest`.

## 2. Vender descargas digitales desde España (UE)

Vender software a particulares de la UE implica IVA del país del comprador
(por encima de 10.000 €/año en ventas intra-UE; por debajo, IVA español 21%),
facturas, y declaraciones (modelo 303 / OSS modelo 369). Con un **merchant of
record (MoR)** el vendedor legal ante el cliente es la plataforma: ella cobra y
liquida el IVA de todo el mundo y tú solo le facturas a ella.

| Proveedor | Comisión aprox. | MoR (IVA incluido) | Claves de licencia | Entrega de ficheros | Notas |
|---|---|---|---|---|---|
| **Lemon Squeezy** | 5% + 0,50 $ | Sí | Sí, nativas (activar/desactivar/límite de equipos, API de validación) | Sí | Comprada por Stripe (2024); dudas sobre su futuro, Stripe lo migra a "Managed Payments". |
| **Paddle** | 5% + 0,50 $ | Sí | No nativas (más orientado a SaaS) | Limitada | Revisión de alta más estricta; muy sólido. |
| **Gumroad** | 10% + 0,50 $ (30% si la venta viene de su marketplace) | Sí (desde 2025) | Sí (básicas) | Sí | El más fácil, el más caro. |
| **Polar.sh** | 4% + 0,40 $ (algunas fuentes: 5% + 0,50 $ desde 2026) | Sí | Sí, nativas (caducidad, límite de activaciones) | Sí, hasta 10 GB | Pensado para desarrolladores open source; buena API. |
| **Stripe directo** | ~1,5% + 0,25 € (tarjetas UE) | **No**: el IVA, OSS y facturas son cosa tuya | No (hay que programarlas) | No (hace falta R2/B2 + URLs firmadas + una función serverless) | Más barato por venta, mucho más trabajo y papeleo. |

**Recomendación:** cuando quieras vender, usar un MoR — **Polar.sh** o
**Lemon Squeezy** (claves de licencia y entrega de fichero incluidas) — con un
botón de "Comprar" en la página del proyecto que abre su checkout. Sin
backend propio. Aun con MoR, vender de forma habitual en España normalmente
requiere estar de alta como autónomo (o sociedad) y declarar esos ingresos;
consúltalo con un gestor. Esto no es asesoramiento legal ni fiscal.

## 3. Stack recomendado para la web

**Astro** (estático) en Netlify:

- Contenido como **colecciones de contenido**: un fichero Markdown por
  proyecto (`src/content/projects/cover-maker.md`) con frontmatter validado
  (nombre, resumen, repo, plataforma, estado, licencia, precio opcional,
  capturas). Añadir un proyecto = añadir un `.md` y sus imágenes.
- Perfil en un único `src/data/profile.json` (foto, nombre, bio, enlaces).
- Páginas: inicio (perfil + rejilla de proyectos) y `/projects/<slug>`
  (descripción, capturas, requisitos, botón de descarga con versión, enlace al
  repo, licencia y aviso legal).
- CSS propio ligero (sin framework pesado), modo claro/oscuro, i18n ES/EN
  opcional más adelante.
- Netlify: `netlify.toml` con `npm run build` → `dist/`, cabeceras de
  seguridad y caché. 0 € en plan Free con tráfico de amigos.
- Alternativas: Eleventy (más simple, menos componentes), Hugo (rapidísimo
  pero plantillas Go). Astro es el mejor equilibrio estética/mantenimiento.

## 4. Nota legal sobre Cover_Maker

- Descarga audio de enlaces de vídeo que pega el usuario (vía yt-dlp). Es
  legal como herramienta, pero **cobrar por ella** aumenta el riesgo: las
  plataformas de pago (MoR) suelen rechazar o cerrar productos asociados a
  "descargar de YouTube", y te convierte en vendedor comercial de una
  herramienta de ese tipo.
- Varios modelos de su catálogo son **no comerciales** (HT Demucs: los pesos
  son solo para uso personal/investigación) o **sin licencia** (BS-Roformer
  6-stem, BS-Roformer Resurrection). El usuario los descarga él mismo, pero un
  producto de pago que dependa de ellos queda en zona gris.
- **Recomendación: distribuir Cover_Maker gratis** (MIT, GitHub Releases),
  como mucho con un botón de donación (GitHub Sponsors / Ko-fi). Reservar la
  venta para otros proyectos sin estos problemas.

## 5. Plan propuesto

1. Crear el proyecto Astro en esta carpeta con perfil (datos de ejemplo), home
   y la página de Cover_Maker con botón de descarga a GitHub Releases (cae a
   `releases/latest` mientras no exista ninguna release).
2. `netlify.toml`, README con "cómo añadir un proyecto", repositorio git local.
3. Con tu OK: crear el repo en GitHub, conectar Netlify (lo haces tú desde
   su panel o con `netlify` CLI), dominio.
4. Más adelante: build hook desde el workflow de release de Cover_Maker;
   botón "Comprar" con el MoR elegido para los proyectos de pago.

## Fuentes

- [Netlify pricing](https://www.netlify.com/pricing/)
- [GitHub Docs — About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- [Cloudflare R2 pricing (resumen 2026)](https://upstash.com/kb/cloudflare-r2-pricing-in-2026-storage-operations-and-real-monthly-bills)
- [Backblaze B2 pricing explicado (2026)](https://upstash.com/blog/backblaze-b2-pricing-explained-2026.md)
- [Bunny CDN pricing](https://bunny.net/pricing/cdn/)
- [Lemon Squeezy vs Stripe (2026)](https://dodopayments.com/blogs/lemon-squeezy-vs-stripe/)
- [Paddle fees 2026](https://dodopayments.com/blogs/paddle-fees-explained)
- [Gumroad fees 2026](https://checkoutpage.com/blog/gumroad-fees)
- [Polar docs](https://polar.sh/docs)
- [Billeo — IVA servicios digitales / OSS](https://www.billeo.es/blog/iva-servicios-digitales-internacionales-oss-moss)
- [AEAT — Plataformas OSS](https://www3.agenciatributaria.gob.es/static_files/Sede/Tema/IVA/Comercio_electr/Folletos/Plataformas_OSS.pdf)

## 6. Decisiones del usuario (2026-11-03)

- **Stack: Next.js (App Router) con API routes**, en Netlify (adaptador
  OpenNext que Netlify aplica automáticamente). Las páginas de proyecto se
  generan estáticas; las API routes se ejecutan como Netlify Functions y
  gastan créditos de cómputo (10 créditos/GB-hora), despreciable con tráfico
  bajo. Uso previsto de API routes: `/api/releases/[slug]` (última release
  desde la API de GitHub con caché/ISR, para no agotar el límite sin token) y,
  más adelante, webhooks/checkout del proveedor de pagos.
- **Dominio:** subdominio de Netlify (`*.netlify.app`) al principio.
- **Pagos:** decidir más tarde; Cover_Maker gratis. Se deja preparado el campo
  de precio y el botón "Comprar" sin proveedor.
- **Diseño:** minimal con toques de developer, tarjetas de proyecto, modo
  claro/oscuro automático, **bilingüe ES/EN**.
- **Pendiente:** datos reales del perfil (foto, nombre, bio, email, web);
  se usan placeholders hasta entonces.
