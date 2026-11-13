import type { Localized } from "@/lib/i18n";
import coverMakerShots from "./screenshots/cover-maker.json";

/** Alt text (what the picture shows) and caption (why it matters) of each screenshot. */
const coverMakerShotText: Record<string, { alt: Localized; caption: Localized }> = {
  mixer: {
    alt: {
      es: "Mezclador de Cover_Maker con seis pistas (voz, guitarra, batería, bajo, piano y resto), cada una con su forma de onda de color, botones M y S, panorama y volumen; la guitarra está silenciada.",
      en: "Cover_Maker's mixer with six tracks (vocals, guitar, drums, bass, piano and other), each with its coloured waveform, M and S buttons, pan and volume; the guitar is muted.",
    },
    caption: {
      es: "Mezclador: silencia, aísla, panoramiza y compara cada stem.",
      en: "Mixer: mute, solo, pan and compare every stem.",
    },
  },
  practice: {
    alt: {
      es: "Panel de práctica bajo el mezclador: perillas de tono, afinación fina y tempo, metrónomo, cuenta atrás, entrenador de velocidad del 70 al 100 % y marcadores de sección Intro, Verse, Chorus y Outro.",
      en: "Practice panel under the mixer: pitch, fine tune and tempo knobs, click, count-in, a speed trainer from 70 to 100 % and Intro, Verse, Chorus and Outro section markers.",
    },
    caption: {
      es: "Práctica: tono y tempo en tiempo real, metrónomo, secciones y entrenador de velocidad.",
      en: "Practice: real-time pitch and tempo, click, sections and a speed trainer.",
    },
  },
  loop: {
    alt: {
      es: "Mezclador con un bucle de 0:19 a 0:29 resaltado en naranja sobre la forma de onda de la mezcla y la pantalla del transporte con BPM, tonalidad y afinación.",
      en: "Mixer with a loop from 0:19 to 0:29 highlighted in orange over the mix waveform and the transport display with BPM, key and tuning.",
    },
    caption: {
      es: "Bucles ajustados a compases, con BPM, tonalidad y afinación detectados.",
      en: "Bar-snapped loops, with detected BPM, key and tuning.",
    },
  },
  meters: {
    alt: {
      es: "Mezclador reproduciendo un bucle de práctica en la menor, con los medidores LED de cada pista encendidos, la voz a −6 dB y la batería panoramizada a la izquierda.",
      en: "Mixer playing a practice loop in A minor, with every track's LED meters lit, the vocals at −6 dB and the drums panned left.",
    },
    caption: {
      es: "Medidores LED por pista, panorama y comparación A/B.",
      en: "Per-track LED meters, pan and A/B comparison.",
    },
  },
  "new-job": {
    alt: {
      es: "Pantalla de nuevo trabajo: zona para soltar archivos o pegar un enlace, una canción de ejemplo en la lista, voz y guitarra seleccionadas y la opción de exportar la canción sin ellas.",
      en: "New job screen: a drop zone for files or a pasted link, an example song in the list, vocals and guitar selected and the option to export the song without them.",
    },
    caption: {
      es: "Nuevo trabajo: suelta canciones o pega un enlace y elige qué stems quitar o extraer.",
      en: "New job: drop songs or paste a link and pick which stems to remove or extract.",
    },
  },
  queue: {
    alt: {
      es: "Cola con un trabajo terminado: seis stems y una canción de ejemplo con su forma de onda y un enlace al mezclador.",
      en: "Queue with one finished job: six stems and an example song with its waveform and a link to the mixer.",
    },
    caption: {
      es: "Cola: sigue cada canción mientras se separa y se exporta.",
      en: "Queue: follow every song as it is separated and exported.",
    },
  },
  "quick-start": {
    alt: {
      es: "Asistente del primer arranque en su tercer paso, Modelos: recomienda un modelo para el equipo y ofrece probarlo con una canción de ejemplo con licencia CC BY 4.0.",
      en: "First-run assistant on its third step, Models: it recommends a model for the PC and offers to try it on an example song licensed CC BY 4.0.",
    },
    caption: {
      es: "Primer arranque: tus primeros stems en minutos con una canción de ejemplo CC BY.",
      en: "First run: your first stems in minutes with a CC BY example song.",
    },
  },
};

export type Screenshot = {
  /** Image in public/, per language. `npm run screenshots` refreshes Cover_Maker's. */
  src: Localized;
  width: number;
  height: number;
  alt: Localized;
  caption: Localized;
};

export type FeatureGroup = {
  title: Localized;
  items: Localized<string[]>;
  /** Small picture shown under the group title. */
  image?: Screenshot;
};

export type Project = {
  slug: string;
  name: string;
  tagline: Localized;
  /** One line under the tagline, for the card and the page. */
  summary: Localized;
  description: Localized<string[]>;
  features: FeatureGroup[];
  requirements: Localized<string[]>;
  /** GitHub repository, "owner/name". */
  repo: string;
  /** Version shown on the card and the page. */
  version?: string;
  /** Fixed download links; without them the page offers the latest release from the GitHub API. */
  download?: { installer: string; release: string };
  platforms: Localized<string[]>;
  licence: string;
  tags: Localized<string[]>;
  /** Square icon in public/, shown on the card and the project page. */
  icon: string;
  /** Open Graph image in public/ (1200×630 PNG); otherwise one is drawn in the site's look. */
  ogImage?: string;
  screenshots: Screenshot[];
  /** Class that gives the card and the page the project's own look (see globals.css). */
  theme?: string;
  /** Shown on the project page, below the requirements. */
  notice?: Localized;
};

type Shot = (typeof coverMakerShots)[number];
const withText = (shot: Shot): Screenshot => ({ ...shot, ...coverMakerShotText[shot.name] });
const lcd = coverMakerShots.find((shot) => shot.name === "lcd")!;

export const projects: Project[] = [
  {
    slug: "cover-maker",
    icon: "/projects/cover-maker/logo.svg",
    ogImage: "/projects/cover-maker/og.png",
    theme: "theme-tape",
    name: "Cover_Maker",
    version: "0.4.0",
    tagline: {
      es: "El estudio del músico de covers",
      en: "The cover musician's studio",
    },
    summary: {
      es: "Separa cualquier canción en stems, practica encima y llévala a tu DAW. Gratis, de código abierto y 100 % en local.",
      en: "Split any song into stems, practise over it and take it to your DAW. Free, open source and 100 % local.",
    },
    description: {
      es: [
        "Cover_Maker separa una canción en voz, guitarra, batería, bajo, piano y resto, o te da la canción \"sin X\": la pista de acompañamiento sin el instrumento que tocas. Después puedes practicar encima con cambio de tono y tempo en tiempo real, bucles por compases y metrónomo, y exportar la sesión a tu DAW.",
        "Todo se procesa en tu ordenador, sin cuenta ni telemetría. La interfaz está en seis idiomas (español, inglés, portugués de Brasil, francés, alemán e italiano) y el primer arranque te guía con una canción de ejemplo con licencia CC BY.",
      ],
      en: [
        "Cover_Maker splits a song into vocals, guitar, drums, bass, piano and other, or gives you the song \"without X\": the backing track without the instrument you play. Then you can practise over it with real-time pitch and tempo, bar-snapped loops and a click, and export the session to your DAW.",
        "Everything runs on your computer, with no account and no telemetry. The interface comes in six languages (English, Spanish, Brazilian Portuguese, French, German and Italian), and the first run walks you through it with a CC BY example song.",
      ],
    },
    features: [
      {
        title: { es: "Separar", en: "Separate" },
        items: {
          es: [
            "Voz, guitarra, batería, bajo, piano y resto: extrae los stems, quítalos (\"la canción sin X\") o ambas cosas.",
            "Voz principal y coros por separado.",
            "Archivos locales, enlaces de vídeo pegados y listas de reproducción enteras.",
            "Catálogo de modelos con la licencia de cada uno. Todo en local, sin cuenta ni telemetría.",
          ],
          en: [
            "Vocals, guitar, drums, bass, piano and other: extract the stems, remove them (\"the song without X\") or both.",
            "Lead and backing vocals on their own.",
            "Local files, pasted video links and whole playlists.",
            "Model catalogue showing each model's licence. 100 % local, with no account or telemetry.",
          ],
        },
      },
      {
        title: { es: "Practicar", en: "Practise" },
        image: {
          ...lcd,
          alt: {
            es: "Pantalla del transporte: posición 00:21.3 de 00:39.4, 75 BPM al 75 %, tonalidad Fa sostenido, afinación ±0 y entrenador de velocidad al 75 %.",
            en: "Transport display: position 00:21.3 of 00:39.4, 75 BPM at 75 %, key F sharp, tuning ±0 and the speed trainer at 75 %.",
          },
          caption: { es: "", en: "" },
        },
        items: {
          es: [
            "Mezclador con panorama, medidores LED, comparación A/B y bucle.",
            "Detección de tonalidad, afinación y BPM.",
            "Tono de ±12 semitonos y tempo del 50 al 150 %, en tiempo real.",
            "Bucles ajustados a compases, cuenta atrás, metrónomo y entrenador de velocidad.",
          ],
          en: [
            "Mixer with pan, LED meters, A/B comparison and loop.",
            "Key, tuning and BPM detection.",
            "Pitch ±12 semitones and tempo from 50 to 150 %, in real time.",
            "Bar-snapped loops, count-in, click and a speed trainer.",
          ],
        },
      },
      {
        title: { es: "Producir", en: "Produce" },
        items: {
          es: [
            "Exporta la sesión a REAPER o DAWproject.",
            "Audio a MIDI por stem.",
            "Plugin VST3 y script para REAPER.",
            "Biblioteca con carpetas vigiladas, importación de listas y fuentes Creative Commons.",
          ],
          en: [
            "Export the session to REAPER or DAWproject.",
            "Audio to MIDI per stem.",
            "VST3 plugin and REAPER script.",
            "Library with watched folders, playlist import and Creative Commons sources.",
          ],
        },
      },
    ],
    requirements: {
      es: [
        "Windows 10 u 11 de 64 bits.",
        "GPU NVIDIA opcional para ir más rápido; también funciona con la CPU.",
        "Conexión a internet en el primer arranque (descarga el entorno de ejecución y los modelos que elijas).",
      ],
      en: [
        "Windows 10 or 11, 64-bit.",
        "Optional NVIDIA GPU for speed; it also runs on the CPU.",
        "An internet connection on first launch (it downloads the runtime and the models you pick).",
      ],
    },
    repo: "asanzhuerta/Cover_Maker",
    download: {
      installer: "https://github.com/asanzhuerta/Cover_Maker/releases/latest/download/Cover_Maker_x64-setup.exe",
      release: "https://github.com/asanzhuerta/Cover_Maker/releases/latest",
    },
    platforms: { es: ["Windows"], en: ["Windows"] },
    licence: "MIT",
    tags: { es: ["stems", "práctica", "DAW", "VST3"], en: ["stems", "practice", "DAW", "VST3"] },
    screenshots: coverMakerShots.filter((shot) => shot.name in coverMakerShotText).map(withText),
    notice: {
      es: "Usa solo audio que tengas derecho a procesar. Los modelos de IA se descargan desde su origen tras aceptar su licencia; algunos son de uso no comercial.",
      en: "Only use audio you have the right to process. AI models are downloaded from their source after you accept their licence; some are for non-commercial use only.",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
