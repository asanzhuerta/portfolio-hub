import type { Localized } from "@/lib/i18n";
import coverMakerShots from "./screenshots/cover-maker.json";

const coverMakerCaptions: Record<string, Localized> = {
  "nuevo-trabajo": {
    es: "Nuevo trabajo: arrastra canciones, elige los stems y qué exportar.",
    en: "New job: drop songs, pick the stems and what to export.",
  },
  mezclador: {
    es: "Mezclador de previsualización con mute, solo y volumen por stem.",
    en: "Preview mixer with per-stem mute, solo and volume.",
  },
  modelos: {
    es: "Catálogo de modelos: tamaño, memoria y licencia antes de descargar.",
    en: "Model catalogue: size, memory and licence before you download.",
  },
};

export type Screenshot = {
  /** Image in public/, per language. `npm run screenshots` refreshes Cover_Maker's. */
  src: Localized;
  width: number;
  height: number;
  caption: Localized;
};

export type Project = {
  slug: string;
  name: string;
  tagline: Localized;
  description: Localized<string[]>;
  features: Localized<string[]>;
  requirements: Localized<string[]>;
  /** GitHub repository, "owner/name". Its latest release is offered for download. */
  repo: string;
  platforms: Localized<string[]>;
  licence: string;
  tags: Localized<string[]>;
  /** Square icon in public/, shown on the card and the project page. */
  icon: string;
  screenshots: Screenshot[];
  /** Accent colours of the project page: [accent, strong]. */
  accent?: [string, string];
  /** Shown on the project page, below the download button. */
  notice?: Localized;
};

export const projects: Project[] = [
  {
    slug: "cover-maker",
    icon: "/cover-maker.svg",
    accent: ["#8f7bff", "#6b4eff"],
    name: "Cover_Maker",
    tagline: {
      es: "Separación de stems con IA, en local, para músicos y productores.",
      en: "Local AI stem separation for musicians and producers.",
    },
    description: {
      es: [
        "Cover_Maker separa tus archivos de audio en las pistas que elijas (voz, guitarra, batería, bajo, piano y resto) o genera la canción \"sin X\" para que puedas practicar, ensayar o grabar una versión encima.",
        "Todo se procesa en tu ordenador: no se sube nada a ningún servidor.",
      ],
      en: [
        "Cover_Maker splits your audio files into the stems you choose (vocals, guitar, drums, bass, piano and other) or renders the song \"without X\", so you can practise, rehearse or record a cover on top of it.",
        "Everything runs on your computer: nothing is uploaded to any server.",
      ],
    },
    features: {
      es: [
        "Elige qué stems extraer o cuáles quitar.",
        "Arrastra archivos o carpetas enteras.",
        "Pega un enlace de vídeo y se descarga solo el audio.",
        "Mezclador de previsualización con mute, solo y volumen por pista.",
        "Catálogo de modelos de IA con la licencia de cada uno.",
        "Interfaz en español e inglés.",
      ],
      en: [
        "Choose which stems to extract or which to remove.",
        "Drag in files or whole folders.",
        "Paste a video link and only the audio is downloaded.",
        "Preview mixer with per-stem mute, solo and volume.",
        "AI model catalogue showing each model's licence.",
        "Spanish and English interface.",
      ],
    },
    requirements: {
      es: [
        "Windows 10 u 11 de 64 bits.",
        "Conexión a internet en el primer arranque (descarga el entorno de ejecución y los modelos que elijas).",
        "GPU NVIDIA opcional para ir más rápido; también funciona con CPU.",
      ],
      en: [
        "Windows 10 or 11, 64-bit.",
        "An internet connection on first launch (it downloads the runtime and the models you pick).",
        "Optional NVIDIA GPU for speed; it also runs on the CPU.",
      ],
    },
    repo: "asanzhuerta/Cover_Maker",
    platforms: { es: ["Windows"], en: ["Windows"] },
    licence: "MIT",
    tags: { es: ["audio", "IA", "Tauri", "Python"], en: ["audio", "AI", "Tauri", "Python"] },
    screenshots: coverMakerShots
      .filter((shot) => shot.name in coverMakerCaptions)
      .map((shot) => ({ ...shot, caption: coverMakerCaptions[shot.name] })),
    notice: {
      es: "Usa solo audio que tengas derecho a procesar. Los modelos de IA se descargan desde su origen tras aceptar su licencia; algunos son de uso no comercial.",
      en: "Only use audio you have the right to process. AI models are downloaded from their source after you accept their licence; some are for non-commercial use only.",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
