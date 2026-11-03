export type Profile = {
  name: string;
  bio: string;
  photo: string;
  email: string;
  website: string;
  github: string;
  /** Leave empty to hide the link. */
  instagram: string;
};

export const profile: Profile = {
  name: "Alejandro Sanz Huerta",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  photo: "/profile.svg",
  email: "alejandro.sanzhuerta.dev@gmail.com",
  website: "https://asanzhuerta.netlify.app",
  github: "https://github.com/asanzhuerta",
  instagram: "",
};
