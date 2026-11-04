export type Link = {
  label: string;
  /** Leave empty while it is not known: the button shows as "pendiente". */
  href: string;
  icon: "github" | "orcid" | "instagram";
};

export type Profile = {
  name: string;
  role: string;
  intro: string;
  /** Paragraphs of the biography section. */
  bio: string[];
  /** Portrait in public/. Its lower and left edges fade into the background. */
  photo: string;
  email: string;
  website: string;
  /** PDF in public/. Leave empty until the CV is uploaded. */
  cv: string;
  links: Link[];
  technologies: { group: string; items: string[] }[];
};

export const profile: Profile = {
  name: "Alejandro Sanz Huerta",
  role: "Desarrollador de software · Músico",
  intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  bio: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ],
  photo: "/portrait.svg",
  email: "alejandro.sanzhuerta.dev@gmail.com",
  website: "https://asanzhuerta.netlify.app",
  cv: "",
  links: [
    { label: "GitHub", href: "https://github.com/asanzhuerta", icon: "github" },
    { label: "ORCID", href: "", icon: "orcid" },
    { label: "Instagram", href: "", icon: "instagram" },
  ],
  technologies: [
    { group: "Lenguajes", items: ["Python", "TypeScript", "Rust"] },
    { group: "Frontend", items: ["React", "Next.js", "Svelte", "Tailwind CSS"] },
    { group: "Escritorio y backend", items: ["Tauri", "FastAPI"] },
    { group: "Audio e IA", items: ["PyTorch", "ONNX", "FFmpeg"] },
    { group: "Herramientas", items: ["Git", "GitHub Actions", "LaTeX", "Netlify"] },
  ],
};
