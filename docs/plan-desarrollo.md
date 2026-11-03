# Portfolio hub — plan de desarrollo

Web personal de Alejandro Sanz Huerta para distribuir sus proyectos.
URL: `https://asanzhuerta.netlify.app`. Ver también `informe-investigacion.md`.

## Datos del perfil (v0)

| Campo | Valor |
|---|---|
| Nombre | Alejandro Sanz Huerta |
| Bio | Lorem ipsum (placeholder, ES/EN) |
| Foto | Imagen de ejemplo en `public/profile.jpg` (placeholder) |
| Email | alejandro.sanzhuerta.dev@gmail.com (ofuscado frente a bots) |
| Web | https://asanzhuerta.netlify.app (esta misma) |
| GitHub | https://github.com/asanzhuerta |
| Instagram | pendiente del usuario (placeholder) |

Todo vive en `content/profile.json`; cambiarlo no exige tocar código.

## Stack

- **Next.js** (App Router, TypeScript, última versión estable) en Netlify
  (adaptador OpenNext automático).
- **Tailwind CSS v4** para estilos; fuentes **Geist Sans + Geist Mono**
  (toques developer: monoespaciada en etiquetas, versiones y comandos).
- **next-themes**: claro/oscuro según el sistema, con conmutador manual.
- **next-intl**: rutas `/es/...` y `/en/...`, detección por idioma del
  navegador, textos de UI en `messages/es.json` y `messages/en.json`.
- **Contenido**: un fichero MDX por proyecto e idioma
  (`content/projects/cover-maker/es.mdx`, `en.mdx`) con frontmatter validado
  con **zod** (nombre, resumen, repo, estado, plataformas, licencia, tags,
  capturas, `price` opcional, `download` = `github-release`).
- **API route** `GET /api/releases/[slug]`: consulta
  `api.github.com/repos/<repo>/releases/latest`, cachea 1 h, devuelve versión,
  fecha, tamaño y URL del instalador; si no hay release, `404` y el botón
  muestra "Próximamente" con enlace al repo.
- Calidad: ESLint, `tsc --noEmit`, **Vitest** (schema de contenido, lógica de
  releases), Lighthouse manual antes de publicar.

## Estructura

```
app/[locale]/page.tsx              Inicio: perfil + rejilla de proyectos
app/[locale]/projects/[slug]/page.tsx  Página de proyecto
app/api/releases/[slug]/route.ts   Última release de GitHub
components/                        ProfileCard, ProjectCard, DownloadButton,
                                   ThemeToggle, LocaleSwitch, Header, Footer
content/profile.json, content/projects/<slug>/{es,en}.mdx + imágenes
lib/content.ts (carga y valida), lib/github.ts (releases)
messages/{es,en}.json
netlify.toml
```

## Fases

1. **Base** — scaffold Next.js, Tailwind, fuentes, tema claro/oscuro, i18n,
   layout (cabecera con idioma/tema, pie con enlaces), `git init`, primer
   commit.
2. **Perfil e inicio** — `profile.json`, tarjeta de perfil con foto, bio y
   enlaces (GitHub, email, Instagram), rejilla de tarjetas de proyecto.
3. **Proyectos** — loader MDX + schema zod, página de Cover_Maker
   (descripción, características, requisitos, licencia y aviso legal según su
   DISCLAIMER, enlace al repo), metadatos SEO/Open Graph por idioma.
4. **Descargas** — `lib/github.ts` + API route + `DownloadButton` (versión,
   tamaño, fecha; cae a `releases/latest` o "Próximamente"). Tests Vitest.
5. **Pulido** — microanimaciones sutiles, accesibilidad (contraste, foco,
   teclado), responsive móvil, 404, favicon, `sitemap.xml`, `robots.txt`.
6. **Netlify** — `netlify.toml`, cabeceras de seguridad, build local OK.
   Con tu OK: crear repo `asanzhuerta/portfolio-hub` en GitHub, conectar
   Netlify (lo haces tú en su panel) con el subdominio `asanzhuerta`.
7. **Más adelante** — build hook desde el workflow de release de Cover_Maker,
   botón "Comprar" con el proveedor de pagos que elijas, dominio propio,
   donaciones (GitHub Sponsors / Ko-fi).

**Hecho para esta sesión** = fases 1–5 y la parte local de la 6: `npm run build`
y `npm run lint/test` en verde, la web probada en local en ES/EN y claro/oscuro.
