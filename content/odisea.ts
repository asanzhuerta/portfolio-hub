import type { Localized } from "@/lib/i18n";

/** ODISEA, my former band (2022–2026). Its page lives inside this site. */
export const odisea = {
  slug: "odisea",
  name: "ODISEA",
  logo: { src: "/side/odisea.webp", width: 1400, height: 553 },
  photo: { src: "/side/odisea/banda.webp", width: 1414, height: 925 },
  kicker: { es: "Metalcore alternativo · Cádiz · 2022 – 2026", en: "Alternative metalcore · Cádiz · 2022 – 2026" },
  intro: {
    es: "Mi antigua banda. Melodías intensas, riffs contundentes y una estética cuidada al detalle, entre la rabia y la sensibilidad.",
    en: "My former band. Intense melodies, heavy riffs and a carefully crafted look, somewhere between rage and tenderness.",
  } as Localized,
  about: {
    es: [
      "ODISEA fue un proyecto musical marcado por la energía, la emoción y una identidad propia. Su música unía melodías intensas, riffs contundentes y una estética muy cuidada en cada detalle.",
      "Cada canción se movía entre la rabia y la sensibilidad, creando una experiencia directa e inmersiva. El proyecto nació de experiencias reales y trató temas personales y sociales desde una visión honesta y cercana.",
      "En la banda me encargué de la guitarra y la voz, de la producción y de la promoción, y del diseño gráfico. Todo fue 100 % DIY: autoproducido y autogestionado.",
    ],
    en: [
      "ODISEA was a music project driven by energy, emotion and an identity of its own. Its music brought together intense melodies, heavy riffs and a look crafted down to the last detail.",
      "Every song moved between rage and tenderness, making for a direct, immersive experience. The project grew out of real experiences and dealt with personal and social themes from an honest, close-up point of view.",
      "In the band I played guitar and sang, and took care of production, promotion and graphic design. Everything was 100% DIY: self-produced and self-managed.",
    ],
  } as Localized<string[]>,
  facts: [
    { label: { es: "Género", en: "Genre" }, value: { es: "Metalcore alternativo", en: "Alternative metalcore" } },
    { label: { es: "Años", en: "Years" }, value: { es: "2022 – 2026", en: "2022 – 2026" } },
    { label: { es: "Origen", en: "From" }, value: { es: "Cádiz, España", en: "Cádiz, Spain" } },
    { label: { es: "Temática", en: "Themes" }, value: { es: "Emo · goth · personal", en: "Emo · goth · personal" } },
  ],
  // Instagram goes first, as asked.
  links: [
    { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/odisea_band" },
    { label: "Spotify", icon: "spotify", href: "https://open.spotify.com/intl-es/artist/02e70YYx2pauBnKAIvCp68" },
    { label: "YouTube", icon: "youtube", href: "https://www.youtube.com/@ODISEA-METAL" },
    { label: "YouTube Music", icon: "ytmusic", href: "https://music.youtube.com/channel/UCa2rTGU8OctguKqrWdH08tA" },
    { label: "Amazon Music", icon: "music", href: "https://music.amazon.es/artists/B0BCV67QWV/odisea" },
    { label: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/@odisea_metalband" },
  ] as const,
  spotifyArtist: "02e70YYx2pauBnKAIvCp68",
  videos: [
    { id: "lmCesAEwdSE", title: "Ciempiés", kind: { es: "Videoclip oficial", en: "Official video" } },
    { id: "KjrV4BF63wg", title: "Penitencia", kind: { es: "Videoclip oficial", en: "Official video" } },
    { id: "qqwzT-Qs6t8", title: "Spielzeug", kind: { es: "Lyric video oficial", en: "Official lyric video" } },
  ],
  live: [
    { id: "diDm3eP7EAE", title: "Impío", kind: { es: "Directo · Acústica 2024", en: "Live · Acústica 2024" } },
    { id: "_zs9-Ad5SPA", title: "Demonios", kind: { es: "Directo · Acústica 2024", en: "Live · Acústica 2024" } },
    { id: "bkTJy8jKkJc", title: "Memento Mori", kind: { es: "Resumen 2024", en: "2024 recap" } },
  ],
  releases: [
    { title: "Corrosión", kind: { es: "EP", en: "EP" }, year: 2026 },
    { title: "Penitencia", kind: { es: "Single", en: "Single" }, year: 2026 },
    { title: "Una y otra vez", kind: { es: "Single", en: "Single" }, year: 2026 },
    { title: "Spielzeug", kind: { es: "Single", en: "Single" }, year: 2026 },
    { title: "Canciones que escuchar", kind: { es: "Single", en: "Single" }, year: 2026 },
    { title: "Ecos del alma", kind: { es: "Álbum", en: "Album" }, year: 2024 },
  ],
  shows: [
    { year: 2023, dates: [
      ["03/03", "Cádiz", "Colegio Amor de Dios"],
      ["12/05", "Cádiz", "La Báskula"],
      ["08/07", "Cádiz", "Decadifest"],
      ["23/09", "Jerez", "La Yerbabuena"],
      ["28/10", "Cádiz", "Halloween Party"],
      ["09/12", "Valdelagrana", "PureThrash Metal Coast Ed."],
    ] },
    { year: 2024, dates: [
      ["03/03", "Dos Hermanas", "Totaku Music Club"],
      ["04/05", "Marinaleda", "Sala Palo Palo"],
      ["23/09", "Chiclana", "Open Brocoli Session"],
      ["31/10", "Cádiz", "Halloween Party"],
      ["02/11", "El Puerto de Santa María", "Plaza Colón"],
      ["16/11", "Puerto Real", "El Cobijo"],
      ["13/12", "Cádiz", "Acústica"],
    ] },
    { year: 2025, dates: [
      ["03/03", "Alcalá de Guadaíra", "La Fabrika de Sonido"],
      ["05/04", "Jerez de la Frontera", "La Malquería"],
      ["02/05", "Puerto Real", "El Cobijo"],
      ["08/08", "Cádiz", "Paseo Marítimo"],
      ["27/09", "Sevilla", "Sala Hollander"],
    ] },
    { year: 2026, dates: [
      ["09/05", "Granada", "Sala Víbora"],
      ["23/05", "Jerez de la Frontera", "La Malquería"],
    ] },
  ] as { year: number; dates: [string, string, string][] }[],
  // The two press pieces from the band's dossier. More are listed for review.
  press: [
    {
      outlet: "Rock The Best Music",
      title: "Odisea – Ecos del alma",
      quote: { es: "Melodías con las que es sencillo conectar", en: "Melodies that are easy to connect with" },
      kind: { es: "Reseña", en: "Review" },
      date: "2025-02-24",
      href: "https://rockthebestmusic.com/2025/02/odisea-ecos-del-alma.html",
    },
    {
      outlet: "Rock For Everyone",
      title: "Reseña de Corrosión de Odisea",
      quote: { es: "Se nota el mimo que hay detrás de la producción", en: "You can tell the care that went into the production" },
      kind: { es: "Reseña", en: "Review" },
      date: "2026-04-12",
      href: "https://rockforeveryone.es/resena-de-corrosion-de-odisea/",
    },
  ],
};
