import type { Localized } from "@/lib/i18n";

const img = (name: string, width: number, height: number, alt: Localized) => ({
  src: `/side/orion-rituals/${name}.webp`,
  width,
  height,
  alt,
});

/** Orion Rituals, the festival brand Lucy and I run. It will get its own site. */
export const orion = {
  slug: "orion-rituals",
  logo: { src: "/side/orion-rituals.webp", width: 1400, height: 563 },
  photo: img("lucy-y-ale-fundido", 1100, 1502, { es: "Lucy y Alejandro, fundadores de Orion Rituals", en: "Lucy and Alejandro, founders of Orion Rituals" }),
  kicker: { es: "Festivales y conciertos · Cádiz · Desde 2026", en: "Festivals and concerts · Cádiz · Since 2026" },
  intro: {
    es: "La marca de festivales que hemos creado Lucy y yo: rituales de música alternativa para que la escena gaditana tenga dónde brillar.",
    en: "The festival brand Lucy and I created: rituals of alternative music so the Cádiz scene has a place to shine.",
  } as Localized,
  email: "orionritualscadiz@gmail.com",
  links: [
    { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/orionrituals/" },
    { label: "Linktree", icon: "arrow", href: "https://linktr.ee/orionrituals" },
  ] as const,
  about: {
    es: [
      "Orion Rituals lo formamos chavales de la escena musical gaditana. Siempre hemos sentido la necesidad de tener un punto de encuentro más allá de La Báskula: un lugar donde los artistas que quieren consolidarse en la escena puedan dar el espectáculo que se merecen.",
      "Es un proyecto de **Lucy** y mío, hecho a cuatro manos de principio a fin: elegimos y contratamos a las bandas, buscamos sala, colaboradores y proveedores, diseñamos los carteles y todo el material gráfico, llevamos la promoción y las redes, vendemos las entradas y montamos cada evento el mismo día.",
      "Cada evento es un ritual: conciertos, pero también pizza gratis, mercadillo, meet & greet, photocall, sorteos o un concurso de disfraces. Y esto no ha hecho más que empezar…",
    ],
    en: [
      "Orion Rituals is made up of young people from the Cádiz music scene. We always felt the need for a meeting point beyond La Báskula: a place where artists who want to grow in the scene can put on the show they deserve.",
      "It is a project by **Lucy** and me, done by the two of us from start to finish: we choose and book the bands, find the venue, partners and suppliers, design the posters and every graphic, run the promotion and social media, sell the tickets and set up each event on the day.",
      "Every event is a ritual: concerts, but also free pizza, a market, meet & greet, photocall, giveaways or a costume contest. And this is only the beginning…",
    ],
  } as Localized<string[]>,
  founders: [
    {
      name: "Lucy",
      role: { es: "Co-Presidenta", en: "Co-President" },
    },
    {
      name: "Ale",
      role: { es: "Co-Presidente", en: "Co-President" },
    },
  ],
  facts: [
    { value: "2", label: { es: "Festivales", en: "Festivals" } },
    { value: "7", label: { es: "Bandas", en: "Bands" } },
    { value: "+200", label: { es: "Personas en el primer ritual", en: "People at the first ritual" } },
    { value: "Sala Soho", label: { es: "Cádiz", en: "Cádiz" } },
  ],
  events: [
    {
      slug: "cripta",
      name: "CRIPTA Halloween Fest",
      date: "2026-10-31",
      venue: "Sala Soho · Cádiz",
      hours: { es: "17:00 apertura · 18:00 conciertos", en: "17:00 doors · 18:00 concerts" },
      poster: img("cripta-cartel", 1131, 1600, { es: "Cartel de CRIPTA Halloween Fest", en: "CRIPTA Halloween Fest poster" }),
      lineup: [
        ["Kadikaze", { es: "Metal alternativo · Sevilla / Chiclana", en: "Alternative metal · Seville / Chiclana" }],
        ["Mientras las Abejas Duermen", { es: "Stoner / doom / heavy psych · Ubrique", en: "Stoner / doom / heavy psych · Ubrique" }],
        ["Samsara", { es: "Metal alternativo · Cádiz", en: "Alternative metal · Cádiz" }],
        ["Zirat", { es: "Psych-rock alternativo · Cádiz", en: "Alternative psych rock · Cádiz" }],
      ] as [string, Localized][],
      extras: {
        es: ["Concurso de disfraces", "Pizza gratis al consumir"],
        en: ["Costume contest", "Free pizza with a drink"],
      } as Localized<string[]>,
      prices: { es: "Anticipada 10 € · Doble 18 € · Taquilla 12 €", en: "Advance €10 · Double €18 · Door €12" },
      tickets: "https://ticketandroll.com/evento/orion-rituals-cripta-halloween-fest",
      note: {
        es: "El segundo ritual: una tarde-noche de música, disfraces y oscuridad.",
        en: "The second ritual: an evening of music, costumes and darkness.",
      },
    },
    {
      slug: "hercules",
      name: "Hércules Rock Fest",
      date: "2026-08-15",
      venue: "Sala Soho · Cádiz",
      hours: { es: "17:00 apertura · 18:00 conciertos", en: "17:00 doors · 18:00 concerts" },
      poster: img("hercules-cartel", 1080, 1350, { es: "Cartel del Hércules Rock Fest", en: "Hércules Rock Fest poster" }),
      lineup: [
        ["ODISEA", { es: "Metalcore alternativo", en: "Alternative metalcore" }],
        ["Holehead × Blackmoss", { es: "Rock alternativo", en: "Alternative rock" }],
        ["Samsara", { es: "Nu metal alternativo", en: "Alternative nu metal" }],
        ["Fuera de Órbita", { es: "Indie rock", en: "Indie rock" }],
      ] as [string, Localized][],
      extras: {
        es: ["Pizza gratis", "Mercadillo", "Meet & greet", "Photocall", "Sorteos"],
        en: ["Free pizza", "Market", "Meet & greet", "Photocall", "Giveaways"],
      } as Localized<string[]>,
      prices: { es: "Anticipada 10 € · Doble 18 € · Taquilla 12 €", en: "Advance €10 · Double €18 · Door €12" },
      tickets: "https://ticketandroll.com/evento/hercules-rockfest-tardeo-rockero-gaditano",
      note: {
        es: "El primer ritual, «tardeo rockero gaditano»: más de 200 personas llenaron la Sala Soho.",
        en: "The first ritual, a Cádiz rock afternoon: over 200 people packed Sala Soho.",
      },
    },
  ],
  // Logos in public/side/orion-rituals/partners (as supplied, trimmed and resized).
  partners: [
    { name: "Sala Soho", href: "https://www.facebook.com/Sohoalternative", logo: ["soho.webp", 560, 284] },
    { name: "Asociación Cultural Bahía Metal Rock", href: "https://www.instagram.com/bahiametalrock/", logo: ["bahia-metal-rock.webp", 320, 320] },
    { name: "Asociación de Músicos de Puerto Real", href: "https://musicospuertoreal.es/", logo: ["musicos-puerto-real.webp", 320, 320] },
    { name: "Radio El Palmar 108 FM", href: "https://www.facebook.com/radioelpalmar108fm/", logo: ["radio-el-palmar.webp", 254, 320] },
    { name: "Live Sound", href: "https://livesoundaudiovisuales.es/", logo: ["live-sound.webp", 315, 320] },
    { name: "encumar.es", href: "https://encumar.es/", logo: ["encumar.webp", 319, 320] },
    { name: "Ticket and Roll", href: "https://ticketandroll.com/", logo: ["ticket-and-roll.svg", 60, 47] },
  ] as { name: string; href?: string; logo: [string, number, number] }[],
  press: [
    {
      outlet: "Onda Cádiz",
      title: "El Hércules Rock Fest ofrece un espacio alternativo en el verano gaditano",
      kind: { es: "Televisión local · Reportaje", en: "Local TV · Report" },
      date: "2026-08-16",
      href: "https://ondacadiz.es/noticias/2026-08/el-hercules-rock-fest-ofrece-un-espacio-alternativo-en-el-verano-gaditano",
    },
    {
      outlet: "Próximo Destino · Radio El Palmar",
      title: "Entrevista a Alex Sanz y Lucía Palma de Orion Rituals",
      kind: { es: "Radio · Entrevista", en: "Radio · Interview" },
      date: "2026-10-23",
      href: "https://www.ivoox.com/proximo-destino-episodio-14-previo-23-de-audios-mp3_rf_182676229_1.html",
    },
    {
      outlet: "Rock The Best Music",
      title: "Hércules Rock Fest, este verano en Cádiz",
      kind: { es: "Anuncio", en: "Announcement" },
      date: "2026-07-03",
      href: "https://rockthebestmusic.com/2026/07/hercules-rock-fest-este-verano-en-cadiz.html",
    },
    {
      outlet: "Rock The Best Music",
      title: "Cádiz, agosto en duro",
      kind: { es: "Agenda", en: "Listings" },
      date: "2026-07-30",
      href: "https://rockthebestmusic.com/2026/07/cadiz-agosto-en-duro.html",
    },
    {
      outlet: "Motel Bourbon",
      title: "Planes rockeros para este mes de agosto",
      kind: { es: "Agenda", en: "Listings" },
      date: "2026-07-30",
      href: "https://motelbourbon.blogspot.com/2026/07/planes-rockeros-para-este-mes-de-agosto.html",
    },
    {
      outlet: "Motel Bourbon",
      title: "Agenda de conciertos de octubre en Cádiz",
      kind: { es: "Agenda", en: "Listings" },
      date: "2026-10-17",
      href: "https://motelbourbon.blogspot.com/2026/10/agenda-conciertos-octubre-cadiz-buzzos.html",
    },
  ],
};
