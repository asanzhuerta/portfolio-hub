# portfolio-hub

Web personal de Alejandro Sanz Huerta para distribuir sus proyectos
(`https://asanzhuerta.netlify.app`). Next.js (App Router) en Netlify.

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de producción
npm run lint
npm run cv           # compila el CV (XeLaTeX)
npm run screenshots  # capturas nuevas de Cover_Maker
```

## Idiomas

Todas las páginas viven en `/es/...` y `/en/...` (`app/[lang]/`). `/` redirige a
`/es`, y los enlaces antiguos (`/projects/<slug>`, `/paralelos`) a su versión en
español. Los textos de la interfaz están en `content/ui.ts`; los del perfil y los
proyectos llevan los dos idiomas en el propio campo (`{ es, en }`).

## Contenido

- Perfil: `content/profile.ts`. En la bio, `**texto**` sale en negrita.
- Proyectos: `content/projects.ts`. Para añadir un proyecto basta con añadir una
  entrada con su `slug` y su `repo` de GitHub; la página `/<lang>/projects/<slug>`
  se genera sola.
- Proyectos paralelos: `content/sideProjects.ts`; los logos van en `public/side/`
  (blancos sobre transparente) y los originales en `assets/`.

## CV

Las fuentes están en `cv/`. El contenido vive en `cv/contenido-es.tex` y
`cv/contenido-en.tex`, y lo comparten dos plantillas: `cv.tex`, con el estilo de la
web, y `cv-replica.tex`, la réplica del CV original. El teléfono y la fecha de
nacimiento van en `cv/privado.tex`, que no se sube a GitHub (copia
`privado.example.tex`).

`npm run cv` genera:
- `public/cv/Alejandro-Sanz-Huerta-CV-{es,en}.pdf`, la versión pública que
  descarga la web (sin teléfono ni fecha);
- `cv/out/cv-{es,en}-privado.pdf`, con esos datos, para enviarla a mano;
- `cv/out/cv-replica.pdf`.

## Capturas de Cover_Maker

`npm run screenshots` abre la app real (la instalada o el build local en
`../cover_maker`), la maneja por DevTools y guarda cada pantalla en español y en
inglés en `public/projects/cover-maker/`, junto con el índice
`content/screenshots/cover-maker.json`. Repítelo después de cada versión con
cambios visibles. Para la captura del mezclador hace falta un trabajo terminado;
su título se cambia por uno neutro para no mostrar canciones de terceros.

## Descargas

El botón de descarga lee la última release publicada del repo
(`api.github.com/repos/<repo>/releases/latest`, en caché 1 h) y enlaza el
instalador `*-setup.exe`. Los borradores y las pre-releases no cuentan. Si no hay
ninguna release, muestra "Próximamente". También está disponible como JSON en
`/api/releases/<slug>`.

Cuando se publica una release de Cover_Maker, su workflow `notify-website.yml`
llama al build hook de Netlify (secreto `NETLIFY_BUILD_HOOK` en el repo de
Cover_Maker) y la web se reconstruye con la versión nueva al momento.

Opcional: la variable de entorno `GITHUB_TOKEN` (token de solo lectura) sube el
límite de la API de GitHub de 60 a 5000 peticiones por hora.

## SEO

`app/sitemap.ts`, `app/robots.ts`, etiquetas `hreflang` y canónicas por página,
e imágenes Open Graph generadas con `next/og` (`lib/og.tsx`) para cada idioma y
proyecto. El favicon está en `public/icon.svg`.

Documentación: `docs/informe-investigacion.md`, `docs/plan-desarrollo.md`.
