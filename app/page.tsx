import Image from "next/image";
import Link from "next/link";
import { EmailLink } from "@/components/EmailLink";
import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

const [firstName, ...lastNames] = profile.name.split(" ");

export default function Home() {
  const [emailUser, emailDomain] = profile.email.split("@");

  return (
    <div className="flex flex-col gap-32 pb-32 sm:gap-44">
      <section className="flex min-h-[calc(100svh-4rem)] flex-col justify-end gap-10 pb-16 pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">{profile.role}</p>
        <h1 className="font-display text-[clamp(3.5rem,12vw,11rem)] leading-[0.9] tracking-tight">
          {firstName}
          <br />
          <em className="text-muted">{lastNames.join(" ")}</em>
        </h1>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-lg leading-relaxed text-muted">{profile.bio}</p>
          <a
            href="#proyectos"
            className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            Desliza ↓
          </a>
        </div>
      </section>

      <section className="reveal flex flex-col gap-12">
        <SectionHeading id="proyectos" index="01" title="Proyectos" />
        <ul className="flex flex-col">
          {projects.map((project, i) => (
            <li key={project.slug} className="border-b border-line">
              <Link
                href={`/projects/${project.slug}`}
                className="group grid gap-4 py-10 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline"
              >
                <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-5xl tracking-tight transition-colors group-hover:text-accent sm:text-6xl">
                    {project.name}
                  </h3>
                  <p className="max-w-xl text-muted">{project.tagline}</p>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  {project.tags.join(" / ")} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="reveal flex flex-col gap-12">
        <SectionHeading id="stack" index="02" title="Tecnologías" />
        <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {profile.technologies.map((group) => (
            <div key={group.group} className="flex flex-col gap-3">
              <dt className="font-mono text-xs uppercase tracking-widest text-faint">{group.group}</dt>
              <dd className="text-xl leading-relaxed">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="reveal flex flex-col gap-12">
        <SectionHeading id="cv" index="03" title="Currículum" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-muted">
            Formación, experiencia y proyectos en una página, en PDF.
          </p>
          {profile.cv ? (
            <a
              href={profile.cv}
              download
              className="inline-flex min-h-11 w-fit items-center gap-3 rounded-full border border-foreground/30 px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:border-accent hover:bg-accent hover:text-white"
            >
              Descargar CV <span aria-hidden="true">↓</span>
            </a>
          ) : (
            <span className="inline-flex min-h-11 w-fit items-center rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-faint">
              CV disponible pronto
            </span>
          )}
        </div>
      </section>

      <section className="reveal flex flex-col gap-12">
        <SectionHeading id="contacto" index="04" title="Contacto" />
        <div className="grid gap-12 sm:grid-cols-[auto_1fr] sm:items-start">
          <Image
            src={profile.photo}
            alt={profile.name}
            width={160}
            height={160}
            unoptimized={profile.photo.endsWith(".svg")}
            className="h-40 w-40 rounded-full grayscale"
          />
          <div className="flex flex-col gap-10">
            <EmailLink
              user={emailUser}
              domain={emailDomain}
              className="w-fit font-display text-3xl tracking-tight underline decoration-line underline-offset-8 transition-colors hover:text-accent hover:decoration-accent sm:text-5xl"
            >
              Escríbeme
            </EmailLink>
            <ul className="flex flex-col">
              {profile.links.map((link) => (
                <li key={link.label} className="border-b border-line">
                  {link.href ? (
                    <a
                      href={link.href}
                      className="group flex justify-between gap-4 py-4 transition-colors hover:text-accent"
                    >
                      <span className="font-mono text-xs uppercase tracking-widest">{link.label}</span>
                      <span className="text-muted group-hover:text-accent">{link.handle} ↗</span>
                    </a>
                  ) : (
                    <span className="flex justify-between gap-4 py-4 text-faint">
                      <span className="font-mono text-xs uppercase tracking-widest">{link.label}</span>
                      <span>pendiente</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
