export type Link = {
  label: string;
  /** Leave empty while it is not known: the link shows as "pendiente". */
  href: string;
  handle: string;
};

export type Profile = {
  name: string;
  role: string;
  bio: string;
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
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  photo: "/profile.svg",
  email: "alejandro.sanzhuerta.dev@gmail.com",
  website: "https://asanzhuerta.netlify.app",
  cv: "",
  links: [
    { label: "GitHub", href: "https://github.com/asanzhuerta", handle: "asanzhuerta" },
    { label: "ORCID", href: "", handle: "0000-0000-0000-0000" },
    { label: "Instagram", href: "", handle: "@usuario" },
  ],
  technologies: [
    { group: "Lenguajes", items: ["Python", "TypeScript", "Rust"] },
    { group: "Frontend", items: ["React", "Next.js", "Svelte", "Tailwind CSS"] },
    { group: "Escritorio y backend", items: ["Tauri", "FastAPI"] },
    { group: "Audio e IA", items: ["PyTorch", "ONNX", "FFmpeg"] },
    { group: "Herramientas", items: ["Git", "GitHub Actions", "LaTeX", "Netlify"] },
  ],
};
