import type { Localized } from "@/lib/i18n";

export type Link = {
  label: string;
  /** Leave empty while it is not known: the button shows as pending. */
  href: string;
  icon: "github" | "orcid" | "instagram" | "linkedin";
};

export type Profile = {
  name: string;
  /** Main title, shown big under the name. */
  title: Localized;
  /** Specialities, in a single line under the title. */
  focus: Localized<string[]>;
  /** Second, quieter line: what happens outside software. */
  beyond: Localized<string[]>;
  intro: Localized;
  /** Paragraphs of the biography. `**text**` is shown in bold. */
  bio: Localized<string[]>;
  /** Portrait in public/. Its edges fade into the background. */
  photo: string;
  email: string;
  website: string;
  /** CV PDF in public/, one per language (built from cv/ with LaTeX). Empty while missing. */
  cv: Localized;
  links: Link[];
  technologies: { group: Localized; items: string[] }[];
};

export const profile: Profile = {
  name: "Alejandro Sanz Huerta",
  title: { es: "Ingeniero Informático en Sistemas de Información", en: "Systems Engineer" },
  focus: {
    es: ["Desarrollo full-stack", "Arquitectura de sistemas", "IA aplicada"],
    en: ["Full-stack Development", "Systems Architecture", "Applied AI"],
  },
  beyond: {
    es: ["Músico", "Proyectos creativos", "Producción de eventos"],
    en: ["Music", "Creative Projects", "Event Production"],
  },
  intro: {
    es: "Diseño y construyo aplicaciones y sistemas digitales, combinando desarrollo full-stack, automatización e inteligencia artificial para transformar ideas y necesidades reales en soluciones funcionales.",
    en: "I design and build digital applications and systems, combining full-stack development, automation and artificial intelligence to turn ideas and real needs into working solutions.",
  },
  bio: {
    es: [
      "Soy Graduado en Ingeniería Informática por la Universidad de Cádiz y entiendo el desarrollo de software como una forma de convertir problemas complejos en soluciones útiles. Mi trabajo se mueve entre la ingeniería, el diseño de sistemas y la experimentación con nuevas tecnologías, con especial interés en construir herramientas que respondan a necesidades reales.",
      "Mi experiencia e intereses abarcan el desarrollo de aplicaciones web y de escritorio, el diseño de arquitecturas de software, la gestión de datos, la automatización de procesos y la integración de inteligencia artificial. Trabajo con tecnologías como TypeScript, Python y Rust, explorando diferentes herramientas y enfoques en función de los objetivos y requisitos de cada proyecto.",
      "Mi actividad también se extiende al ámbito musical y cultural. Como parte de un proyecto musical de metal alternativo, participo en la creación y producción musical, así como en la planificación y desarrollo de sus proyectos. Paralelamente, a través de **Orion Rituals**, trabajo en la organización y producción de eventos musicales, coordinando aspectos como la planificación, comunicación, promoción, colaboración con bandas y gestión de proveedores. Estas experiencias me permiten aplicar conocimientos de organización, gestión de proyectos y resolución de problemas en entornos que van mucho más allá del desarrollo de software.",
      "Más allá del código, me interesa comprender cómo funcionan los sistemas en su conjunto: desde la identificación de una necesidad y el diseño de una solución hasta su implementación, integración y evolución. Disfruto especialmente de los proyectos que requieren investigar, conectar diferentes tecnologías y encontrar soluciones fuera de lo convencional.",
      "Este espacio reúne parte de ese recorrido: proyectos, experimentos e iniciativas que reflejan mi manera de entender la tecnología, afrontar retos y convertir ideas en realidades.",
    ],
    en: [
      "I hold a degree in Computer Engineering from the University of Cádiz, and I see software development as a way of turning complex problems into useful solutions. My work moves between engineering, systems design and experimenting with new technologies, with a particular interest in building tools that answer real needs.",
      "My experience and interests cover web and desktop application development, software architecture, data management, process automation and the integration of artificial intelligence. I work with technologies such as TypeScript, Python and Rust, choosing different tools and approaches to fit the goals and requirements of each project.",
      "My work also reaches into music and culture. As part of an alternative metal project, I take part in writing and producing music, and in planning and developing its projects. Alongside it, through **Orion Rituals**, I organise and produce music events, coordinating planning, communication, promotion, collaboration with bands and suppliers. These experiences let me apply organisation, project management and problem solving in settings that go far beyond software development.",
      "Beyond code, I am interested in understanding how systems work as a whole: from spotting a need and designing a solution to building, integrating and evolving it. I especially enjoy projects that call for research, for connecting different technologies and for finding unconventional solutions.",
      "This space gathers part of that journey: projects, experiments and initiatives that reflect how I understand technology, take on challenges and turn ideas into reality.",
    ],
  },
  photo: "/portrait.svg",
  email: "alejandro.sanzhuerta.dev@gmail.com",
  website: "https://asanzhuerta.netlify.app",
  cv: {
    es: "/cv/Alejandro-Sanz-Huerta-CV-es.pdf",
    en: "/cv/Alejandro-Sanz-Huerta-CV-en.pdf",
  },
  links: [
    { label: "GitHub", href: "https://github.com/asanzhuerta", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/alejandro-sanz-huerta", icon: "linkedin" },
    { label: "ORCID", href: "https://orcid.org/0009-0003-1237-0367", icon: "orcid" },
    { label: "Instagram", href: "https://www.instagram.com/_ale_sanz_/", icon: "instagram" },
  ],
  // From the CV, plus what Cover_Maker and this site are built with.
  technologies: [
    {
      group: { es: "Lenguajes", en: "Languages" },
      items: ["TypeScript", "JavaScript", "Python", "Rust", "C", "C++", "C#", "Java", "Kotlin", "PHP"],
    },
    {
      group: { es: "Web", en: "Web" },
      items: ["React", "Next.js", "Svelte", "Node.js", "Laravel", "Tailwind CSS", "HTML / CSS"],
    },
    {
      group: { es: "Escritorio y backend", en: "Desktop and backend" },
      items: ["Tauri", "FastAPI", "Unity"],
    },
    {
      group: { es: "Bases de datos", en: "Databases" },
      items: ["PostgreSQL", "MySQL", "Oracle", "SQLite"],
    },
    {
      group: { es: "IA", en: "AI" },
      items: ["PyTorch", "Claude", "Codex"],
    },
    {
      group: { es: "Herramientas", en: "Tools" },
      items: ["Git", "GitHub Actions", "Docker", "Pentaho", "LaTeX", "Netlify", "Google Workspace", "Canva"],
    },
  ],
};
