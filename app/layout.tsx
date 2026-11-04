import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import { InkBackground } from "@/components/InkBackground";
import { profile } from "@/content/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
  title: { default: profile.name, template: `%s · ${profile.name}` },
  description: `Proyectos de software de ${profile.name}.`,
};

const nav = [
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#stack", label: "Stack" },
  { href: "/paralelos", label: "Paralelos" },
  { href: "/#contacto", label: "Contacto" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <InkBackground />
        <header className="sticky top-0 z-20 border-b border-line bg-background/40 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-8">
            <Link href="/" className="whitespace-nowrap font-display text-xl tracking-tight">
              <span className="sm:hidden">A.S.H.</span>
              <span className="hidden sm:inline">A. Sanz Huerta</span>
            </Link>
            <nav aria-label="Principal">
              <ul className="flex gap-4 font-mono text-[12px] uppercase tracking-wider text-muted sm:gap-5 sm:text-[13px] sm:tracking-widest">
                {nav.map((item) => (
                  <li key={item.href} className={item.href === "/#stack" ? "hidden sm:block" : undefined}>
                    <Link href={item.href} className="py-3 transition-colors hover:text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-8">{children}</main>
        <footer className="mx-auto flex w-full max-w-6xl justify-between gap-4 border-t border-line px-4 py-8 font-mono text-xs text-faint sm:px-8">
          <span>© {profile.name}</span>
          <span>asanzhuerta.netlify.app</span>
        </footer>
      </body>
    </html>
  );
}
