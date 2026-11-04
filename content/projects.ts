export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string[];
  features: string[];
  requirements: string[];
  /** GitHub repository, "owner/name". Its latest release is offered for download. */
  repo: string;
  platforms: string[];
  licence: string;
  tags: string[];
  /** Square icon in public/, shown on the card and the project page. */
  icon: string;
  /** Shown on the project page, below the download button. */
  notice?: string;
};

export const projects: Project[] = [
  {
    slug: "cover-maker",
    icon: "/cover-maker.svg",
    name: "Cover_Maker",
    tagline: "Separación de stems con IA, en local, para músicos y productores.",
    description: [
      "Cover_Maker separa tus archivos de audio en las pistas que elijas (voz, guitarra, batería, bajo, piano y resto) o genera la canción \"sin X\" para que puedas practicar, ensayar o grabar una versión encima.",
      "Todo se procesa en tu ordenador: no se sube nada a ningún servidor.",
    ],
    features: [
      "Elige qué stems extraer o cuáles quitar.",
      "Arrastra archivos o carpetas enteras.",
      "Pega un enlace de vídeo y se descarga solo el audio.",
      "Mezclador de previsualización con mute, solo y volumen por pista.",
      "Catálogo de modelos de IA con la licencia de cada uno.",
      "Interfaz en español e inglés.",
    ],
    requirements: [
      "Windows 10 u 11 de 64 bits.",
      "Conexión a internet en el primer arranque (descarga el entorno de ejecución y los modelos que elijas).",
      "GPU NVIDIA opcional para ir más rápido; también funciona con CPU.",
    ],
    repo: "asanzhuerta/Cover_Maker",
    platforms: ["Windows"],
    licence: "MIT",
    tags: ["audio", "IA", "Tauri", "Python"],
    notice:
      "Usa solo audio que tengas derecho a procesar. Los modelos de IA se descargan desde su origen tras aceptar su licencia; algunos son de uso no comercial.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
