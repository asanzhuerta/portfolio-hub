import Image from "next/image";
import Link from "next/link";
import { EmailLink } from "@/components/EmailLink";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

const linkClass = "font-mono text-sm text-muted underline-offset-4 hover:text-foreground hover:underline";

export default function Home() {
  const [emailUser, emailDomain] = profile.email.split("@");

  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center">
        <Image
          src={profile.photo}
          alt={profile.name}
          width={112}
          height={112}
          priority
          unoptimized={profile.photo.endsWith(".svg")}
          className="h-28 w-28 rounded-full border border-border"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
          <p className="max-w-xl text-muted">{profile.bio}</p>
          <nav className="flex flex-wrap gap-4">
            <a href={profile.github} className={linkClass}>
              github
            </a>
            <EmailLink user={emailUser} domain={emailDomain} className={linkClass} />
            {profile.instagram && (
              <a href={profile.instagram} className={linkClass}>
                instagram
              </a>
            )}
          </nav>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-mono text-sm text-muted">{"// proyectos"}</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="flex h-full flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent"
              >
                <h3 className="font-mono font-semibold">{project.name}</h3>
                <p className="text-sm text-muted">{project.tagline}</p>
                <ul className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted">
                      {tag}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
