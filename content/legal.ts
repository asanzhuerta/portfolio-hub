import type { Localized } from "@/lib/i18n";

export type LegalSection = { title: string; body: string[] };
export type LegalPage = { title: string; updated: string; intro: string; sections: LegalSection[] };

const updated = "2026-11-04";

/** Legal notice (LSSI-CE, art. 10) for a personal site with no economic activity. */
export const legalNotice: Localized<LegalPage> = {
  es: {
    title: "Aviso legal",
    updated,
    intro:
      "En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), estos son los datos del responsable de este sitio web.",
    sections: [
      {
        title: "Titular",
        body: [
          "Alejandro Sanz Huerta, con residencia en Cádiz (España). Contacto: {email}.",
          "Este es un sitio web personal, sin actividad económica: sirve para presentar mi perfil y mis proyectos y para descargar aplicaciones gratuitas.",
        ],
      },
      {
        title: "Condiciones de uso",
        body: [
          "El acceso a la web es libre y gratuito. Al usarla aceptas este aviso legal. Te comprometes a hacer un uso adecuado de sus contenidos y a no emplearlos para actividades ilícitas.",
        ],
      },
      {
        title: "Propiedad intelectual",
        body: [
          "Los textos, diseños, fotografías y logotipos de esta web pertenecen a su titular o a sus respectivos autores (bandas, colaboradores y la marca Orion Rituals) y no pueden reutilizarse sin permiso.",
          "El código fuente de la web y de las aplicaciones publicadas tiene su propia licencia, indicada en cada repositorio de GitHub (por ejemplo, MIT en Cover_Maker).",
        ],
      },
      {
        title: "Descargas",
        body: [
          "Las aplicaciones se ofrecen gratis y tal cual, sin garantía de ningún tipo. Cada usuario es responsable de cómo las usa y del contenido que procesa con ellas, respetando los derechos de autor y las licencias de terceros.",
        ],
      },
      {
        title: "Enlaces y contenidos de terceros",
        body: [
          "La web enlaza o integra servicios de terceros (GitHub, YouTube, Spotify, redes sociales, ticketeras y medios). No me hago responsable de sus contenidos ni de sus políticas, que se rigen por sus propias condiciones.",
        ],
      },
      {
        title: "Protección de datos",
        body: [
          "La web no tiene formularios ni registra usuarios. Si me escribes por correo, uso tus datos solo para responderte y no los cedo a nadie. Puedes pedir que los borre en cualquier momento escribiendo a la misma dirección.",
          "El alojamiento corre a cargo de Netlify, que puede registrar datos técnicos de acceso (como la dirección IP) por motivos de seguridad y funcionamiento.",
        ],
      },
      {
        title: "Legislación aplicable",
        body: ["Este aviso se rige por la legislación española."],
      },
    ],
  },
  en: {
    title: "Legal notice",
    updated,
    intro:
      "As required by Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), these are the details of the person responsible for this website.",
    sections: [
      {
        title: "Owner",
        body: [
          "Alejandro Sanz Huerta, based in Cádiz (Spain). Contact: {email}.",
          "This is a personal website with no economic activity: it presents my profile and projects and offers free applications for download.",
        ],
      },
      {
        title: "Terms of use",
        body: [
          "Access to the site is free. By using it you accept this notice. You agree to use its content properly and not for any unlawful purpose.",
        ],
      },
      {
        title: "Intellectual property",
        body: [
          "The texts, designs, photographs and logos on this site belong to its owner or to their respective authors (bands, partners and the Orion Rituals brand) and may not be reused without permission.",
          "The source code of the site and of the published applications has its own licence, stated in each GitHub repository (for example, MIT for Cover_Maker).",
        ],
      },
      {
        title: "Downloads",
        body: [
          "The applications are offered free of charge and as they are, with no warranty of any kind. Each user is responsible for how they use them and for the content they process, respecting copyright and third-party licences.",
        ],
      },
      {
        title: "Third-party links and content",
        body: [
          "The site links to or embeds third-party services (GitHub, YouTube, Spotify, social networks, ticket sellers and media). I am not responsible for their content or policies, which are governed by their own terms.",
        ],
      },
      {
        title: "Data protection",
        body: [
          "The site has no forms and no user accounts. If you email me, I use your details only to reply and do not share them. You can ask me to delete them at any time at the same address.",
          "The site is hosted by Netlify, which may log technical access data (such as the IP address) for security and operation.",
        ],
      },
      {
        title: "Applicable law",
        body: ["This notice is governed by Spanish law."],
      },
    ],
  },
};

export const cookiePolicy: Localized<LegalPage> = {
  es: {
    title: "Política de cookies",
    updated,
    intro:
      "Esta web no usa cookies propias, ni de analítica ni de publicidad, y no te sigue entre páginas. Por eso no verás ningún aviso de cookies al entrar.",
    sections: [
      {
        title: "Contenido de terceros, solo si lo pides",
        body: [
          "Algunas páginas incluyen vídeos de YouTube y un reproductor de Spotify. No se cargan hasta que pulsas sobre ellos: mientras tanto solo ves una imagen y no se conecta con esos servicios.",
          "Al pulsar en un vídeo se carga desde youtube-nocookie.com, el modo de privacidad mejorada de YouTube. Al cargar el reproductor de Spotify, Spotify puede usar sus propias cookies. Puedes consultar sus políticas en policies.google.com y spotify.com/legal.",
        ],
      },
      {
        title: "Almacenamiento técnico",
        body: [
          "La web no guarda nada en tu navegador. Netlify, el alojamiento, puede usar mecanismos técnicos necesarios para servir las páginas de forma segura; no sirven para identificarte.",
        ],
      },
      {
        title: "Cómo gestionarlas",
        body: [
          "Puedes borrar o bloquear las cookies de terceros desde la configuración de tu navegador. Si no pulsas en los vídeos ni en el reproductor, no se instala ninguna.",
        ],
      },
    ],
  },
  en: {
    title: "Cookie policy",
    updated,
    intro:
      "This site uses no cookies of its own, no analytics and no advertising, and it does not track you across pages. That is why there is no cookie banner.",
    sections: [
      {
        title: "Third-party content, only when you ask",
        body: [
          "Some pages include YouTube videos and a Spotify player. They are not loaded until you click them: until then you only see a picture and nothing connects to those services.",
          "Clicking a video loads it from youtube-nocookie.com, YouTube's privacy-enhanced mode. Loading the Spotify player lets Spotify use its own cookies. See their policies at policies.google.com and spotify.com/legal.",
        ],
      },
      {
        title: "Technical storage",
        body: [
          "The site stores nothing in your browser. Netlify, the host, may use technical means needed to serve the pages securely; they are not used to identify you.",
        ],
      },
      {
        title: "Managing them",
        body: [
          "You can delete or block third-party cookies in your browser settings. If you do not click the videos or the player, none are set.",
        ],
      },
    ],
  },
};
