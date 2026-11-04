import type { Localized } from "@/lib/i18n";

export type SideProject = {
  slug: string;
  name: Localized;
  kind: Localized;
  summary: Localized;
  /** Wordmark in public/, white on transparent. Without one the name is set in type. */
  logo?: { src: string; width: number; height: number };
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
      es: "Organización y producción de eventos musicales: cartel, promoción, bandas y proveedores.",
      en: "Organising and producing music events: line-ups, promotion, bands and suppliers.",
    },
    logo: { src: "/side/orion-rituals.webp", width: 1400, height: 563 },
  },
];
