import type { Locale } from "@/lib/i18n";

const es = {
  meta: {
    description:
      "Alejandro Sanz Huerta, Systems Engineer: desarrollo full-stack, arquitectura de sistemas e IA aplicada. Proyectos, descargas y contacto.",
    sideDescription: "Mi banda de metal alternativo, Orion Rituals, mi marca de festivales, y ODISEA, mi antigua banda.",
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
  lightbox: { open: "Ver a pantalla completa", close: "Cerrar", prev: "Anterior", next: "Siguiente" },
  side: {
    kicker: "Fuera del código",
    title: "Proyectos paralelos",
    intro: "Música y eventos: lo que hago cuando no estoy programando. Los activos tendrán pronto su propia web.",
    soon: "Web propia en camino",
  },
  odisea: {
    photoAlt: "Los cinco miembros de ODISEA",
    about: "La banda",
    videos: "Vídeos",
    live: "En directo",
    play: "Reproducir",
    music: "Discografía",
    spotify: "ODISEA en Spotify",
    shows: "Trayectoria",
    press: "Prensa",
    open: "Ver la banda",
  },
  notFound: { title: "Aquí no hay nada.", back: "← Volver al inicio" },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    description:
      "Alejandro Sanz Huerta, Systems Engineer: full-stack development, systems architecture and applied AI. Projects, downloads and contact.",
    sideDescription: "My alternative metal band, Orion Rituals, my festival brand, and ODISEA, my former band.",
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
  lightbox: { open: "View full screen", close: "Close", prev: "Previous", next: "Next" },
  side: {
    kicker: "Beyond code",
    title: "Side projects",
    intro: "Music and events: what I do when I am not programming. The active ones will soon have a site of their own.",
    soon: "Own site on the way",
  },
  odisea: {
    photoAlt: "The five members of ODISEA",
    about: "The band",
    videos: "Videos",
    live: "Live",
    play: "Play",
    music: "Discography",
    spotify: "ODISEA on Spotify",
    shows: "Shows",
    press: "Press",
    open: "See the band",
  },
  notFound: { title: "Nothing here.", back: "← Back home" },
};

export const dictionaries: Record<Locale, Dictionary> = { es, en };
