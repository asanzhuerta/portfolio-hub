export type SideProject = {
  slug: string;
  name: string;
  kind: string;
  summary: string;
};

/** Reserved for now: the pages show "próximamente" until there is content. */
export const sideProjects: SideProject[] = [
  {
    slug: "banda",
    name: "Proyecto musical",
    kind: "Banda",
    summary: "Mi banda de música. Discografía, conciertos y vídeos, muy pronto.",
  },
  {
    slug: "orion-rituals",
    name: "Orion Rituals",
    kind: "Festivales",
    summary: "Mi marca de festivales. Próximas ediciones, cartel y entradas, muy pronto.",
  },
];
