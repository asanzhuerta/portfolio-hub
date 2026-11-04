import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { InkBackground } from "@/components/InkBackground";
import { RevealObserver } from "@/components/RevealObserver";
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

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
  title: { default: profile.name, template: `%s · ${profile.name}` },
  description: `Proyectos de software de ${profile.name}.`,
};

const nav = [
  { href: "/#bio", label: "Bio" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/paralelos", label: "Paralelos" },
  { href: "/#contacto", label: "Contacto" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} h-full antialiased`}
    >
      <head>
        {/* Arms the scroll-reveal styles before first paint; without JS nothing is hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <InkBackground />
        <RevealObserver />
        <header className="sticky top-0 z-20 border-b border-line bg-background/50 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-8">
            <Link href="/" className="whitespace-nowrap font-display text-[15px] font-semibold tracking-tight">
              Alejandro Sanz<span className="text-accent">.</span>
            </Link>
            <nav aria-label="Principal">
              <ul className="flex gap-1 text-sm text-muted">
                {nav.map((item) => (
                  <li key={item.href} className={item.href === "/#bio" ? "hidden sm:block" : undefined}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center rounded-full px-3 transition-colors hover:bg-white/5 hover:text-foreground"
                    >
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
