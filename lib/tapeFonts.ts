import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

// Cover_Maker's own type ("Tape & Console"): Archivo SemiExpanded for display,
// IBM Plex Sans and Mono for text and labels. Only its card and page load them,
// through the `.theme-tape` scope in globals.css.
const archivo = Archivo({
  variable: "--font-tape-display",
  subsets: ["latin"],
  axes: ["wdth"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-tape-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-tape-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/** Classes that define the font variables of `.theme-tape`. */
export const tapeFonts = `${archivo.variable} ${plexSans.variable} ${plexMono.variable}`;
