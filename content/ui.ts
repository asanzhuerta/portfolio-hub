import type { Locale } from "@/lib/i18n";

const es = {
  meta: {
    description:
      "Alejandro Sanz Huerta, Systems Engineer: desarrollo full-stack, arquitectura de sistemas e IA aplicada. Proyectos, descargas y contacto.",
    sideDescription: "Mi banda de metal alternativo y Orion Rituals, mi marca de festivales.",
  },
  nav: { bio: "Bio", projects: "Proyectos", side: "Paralelos", contact: "Contacto", label: "Principal" },
  language: { label: "Idioma", es: "Español", en: "English" },
  home: {
    seeProjects: "Ver proyectos",
    portraitAlt: "Retrato de",
    bio: "Biografía",
    projects: "Proyectos",
    stack: "Tecnologías",
    contact: "Contacto",
    talk: "¿Hablamos?",
    talkBody: "Para proyectos, colaboraciones o dudas sobre mis aplicaciones.",
    write: "Escríbeme",
    pending: "Pendiente",
  },
  cv: { download: "Descargar CV", soon: "CV disponible pronto" },
  project: {
    licence: "Licencia",
    source: "Código fuente",
    features: "Características",
    requirements: "Requisitos",
    screenshots: "Capturas",
    download: "Descargar para Windows",
    soon: "Próximamente",
    notes: "notas de la versión",
  },
  side: {
    kicker: "Fuera del código",
    title: "Proyectos paralelos",
    intro: "Música y eventos: lo que hago cuando no estoy programando. Cada uno tendrá pronto su propia web.",
    soon: "Web propia en camino",
  },
  notFound: { title: "Aquí no hay nada.", back: "← Volver al inicio" },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    description:
      "Alejandro Sanz Huerta, Systems Engineer: full-stack development, systems architecture and applied AI. Projects, downloads and contact.",
    sideDescription: "My alternative metal band and Orion Rituals, my festival brand.",
  },
  nav: { bio: "Bio", projects: "Projects", side: "Side", contact: "Contact", label: "Main" },
  language: { label: "Language", es: "Español", en: "English" },
  home: {
    seeProjects: "See projects",
    portraitAlt: "Portrait of",
    bio: "Biography",
    projects: "Projects",
    stack: "Technologies",
    contact: "Contact",
    talk: "Let's talk",
    talkBody: "About projects, collaborations or questions on my apps.",
    write: "Email me",
    pending: "Pending",
  },
  cv: { download: "Download CV", soon: "CV coming soon" },
  project: {
    licence: "Licence",
    source: "Source code",
    features: "Features",
    requirements: "Requirements",
    screenshots: "Screenshots",
    download: "Download for Windows",
    soon: "Coming soon",
    notes: "release notes",
  },
  side: {
    kicker: "Beyond code",
    title: "Side projects",
    intro: "Music and events: what I do when I am not programming. Each will soon have a site of its own.",
    soon: "Own site on the way",
  },
  notFound: { title: "Nothing here.", back: "← Back home" },
};

export const dictionaries: Record<Locale, Dictionary> = { es, en };
