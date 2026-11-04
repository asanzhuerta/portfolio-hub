import type { Localized } from "@/lib/i18n";

export type SideProject = {
  slug: string;
  name: Localized;
  kind: Localized;
  summary: Localized;
  /** Wordmark in public/, white on transparent. Without one the name is set in type. */
  logo?: { src: string; width: number; height: number };
  /** A page inside this site (path below /<lang>). Without one: "own site on the way". */
  page?: string;
  /** Colour of the card's glow, as "r g b". */
  glow?: string;
  /** Which page link text to show. */
  cta?: "odisea" | "orion";
};

/** Each one will get its own site later; for now they are a showcase. */
export const sideProjects: SideProject[] = [
  {
    slug: "banda",
    name: { es: "Proyecto musical", en: "Music project" },
    kind: { es: "Banda · Metal alternativo", en: "Band · Alternative metal" },
    summary: {
      es: "Proyecto musical de metal alternativo: composición, producción y directo.",
      en: "An alternative metal project: songwriting, production and live shows.",
    },
  },
  {
    slug: "orion-rituals",
    name: { es: "Orion Rituals", en: "Orion Rituals" },
    kind: { es: "Festivales · Producción de eventos", en: "Festivals · Event production" },
    summary: {
      es: "La marca de festivales que hemos creado Lucy y yo: Hércules Rock Fest y CRIPTA Halloween Fest.",
      en: "The festival brand Lucy and I created: Hércules Rock Fest and CRIPTA Halloween Fest.",
    },
    logo: { src: "/side/orion-rituals.webp", width: 1400, height: 563 },
    page: "/paralelos/orion-rituals",
    glow: "155 132 240",
    cta: "orion",
  },
  {
    slug: "odisea",
    name: { es: "ODISEA", en: "ODISEA" },
    kind: { es: "Banda · Metalcore alternativo · 2022–2026", en: "Band · Alternative metalcore · 2022–2026" },
    summary: {
      es: "Mi antigua banda: un álbum, un EP, varios singles y una veintena de conciertos por Andalucía.",
      en: "My former band: an album, an EP, several singles and some twenty shows across Andalusia.",
    },
    logo: { src: "/side/odisea.webp", width: 1400, height: 553 },
    page: "/paralelos/odisea",
    glow: "229 72 77",
    cta: "odisea",
  },
];
