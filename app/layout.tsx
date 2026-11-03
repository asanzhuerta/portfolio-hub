import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
  title: { default: profile.name, template: `%s · ${profile.name}` },
  description: `Proyectos de software de ${profile.name}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-6 sm:px-6">
          <Link href="/" className="font-mono text-sm text-muted hover:text-foreground">
            ~/asanzhuerta
          </Link>
          <a
            href={profile.github}
            className="font-mono text-sm text-muted hover:text-foreground"
          >
            github
          </a>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 sm:px-6">{children}</main>
        <footer className="mx-auto w-full max-w-3xl px-4 py-8 font-mono text-xs text-muted sm:px-6">
          © {profile.name}
        </footer>
      </body>
    </html>
  );
}
