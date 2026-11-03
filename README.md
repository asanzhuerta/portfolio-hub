# portfolio-hub

Web personal de Alejandro Sanz Huerta para distribuir sus proyectos
(`https://asanzhuerta.netlify.app`). Next.js (App Router) en Netlify.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint
```

## Contenido

- Perfil: `content/profile.ts` (foto en `public/`, deja `instagram` vacío para ocultarlo).
- Proyectos: `content/projects.ts`. Añadir un proyecto = añadir una entrada con su
  `slug` y su `repo` de GitHub; la página `/projects/<slug>` se genera sola.

## Descargas

El botón de descarga lee la última release publicada del repo
(`api.github.com/repos/<repo>/releases/latest`, en caché 1 h) y enlaza el
instalador `*-setup.exe`. Los borradores y pre-releases no cuentan. Si no hay
ninguna release muestra "Próximamente". También disponible como JSON en
`/api/releases/<slug>`.

Opcional: la variable de entorno `GITHUB_TOKEN` (token de solo lectura) sube el
límite de la API de GitHub de 60 a 5000 peticiones/hora.

Documentación: `docs/informe-investigacion.md`, `docs/plan-desarrollo.md`.
