import Image from "next/image";
import Link from "next/link";
import { EmailLink } from "@/components/EmailLink";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import { buttonDisabled, buttonPrimary, buttonSecondary, panel } from "@/components/styles";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

function CvButton() {
  return profile.cv ? (
    <a href={profile.cv} download className={buttonSecondary}>
      <Icon name="download" /> Descargar CV
    </a>
  ) : (
    <span className={buttonDisabled}>
      <Icon name="download" /> CV disponible pronto
    </span>
  );
}

export default function Home() {
  const [emailUser, emailDomain] = profile.email.split("@");

  return (
    <div className="flex flex-col gap-28 pb-28 sm:gap-36">
      <section className="relative grid min-h-[calc(100svh-4rem)] items-center gap-10 py-16 md:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10 flex flex-col gap-7">
          <p data-reveal className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            {profile.role}
          </p>
          <h1
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
            className="font-display text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </h1>
          <p data-reveal style={{ "--i": 2 } as React.CSSProperties} className="max-w-md text-lg leading-relaxed text-muted">
            {profile.intro}
          </p>
          <div data-reveal style={{ "--i": 3 } as React.CSSProperties} className="flex flex-wrap gap-3">
            <Link href="#proyectos" className={buttonPrimary}>
              Ver proyectos <Icon name="arrow" />
            </Link>
            <CvButton />
          </div>
        </div>
        {/* The portrait dissolves into the ink: masked towards its left and bottom edges. */}
        <div
          data-reveal
          style={{ "--i": 2 } as React.CSSProperties}
          className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-40 md:relative md:w-auto md:opacity-100"
        >
          <Image
            src={profile.photo}
            alt={`Retrato de ${profile.name}`}
            width={600}
            height={750}
            priority
            unoptimized={profile.photo.endsWith(".svg")}
            className="ml-auto h-full max-h-[78svh] w-auto object-cover [mask-image:radial-gradient(ellipse_58%_58%_at_55%_45%,black_30%,transparent_72%)]"
          />
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <SectionHeading id="bio" index="01" title="Biografía" />
        <div className="grid gap-6 md:grid-cols-2">
          {profile.bio.map((paragraph, i) => (
            <p
              key={paragraph}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="text-lg leading-relaxed text-muted first:text-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <SectionHeading id="proyectos" index="02" title="Proyectos" />
        <ul className="grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <Link
                href={`/projects/${project.slug}`}
                className={`${panel} group flex h-full flex-col gap-6 p-6 transition-colors hover:border-accent/60`}
              >
                <div className="flex items-start justify-between gap-4">
                  <Image
                    src={project.icon}
                    alt=""
                    width={64}
                    height={64}
                    unoptimized
                    className="h-16 w-16 rounded-2xl shadow-lg shadow-black/40"
                  />
                  <Icon
                    name="arrow"
                    className="h-5 w-5 -rotate-45 text-faint transition-all group-hover:rotate-0 group-hover:text-accent"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl font-semibold tracking-tight">{project.name}</h3>
                  <p className="text-muted">{project.tagline}</p>
                </div>
                <ul className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                      {tag}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-10">
        <SectionHeading id="stack" index="03" title="Tecnologías" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profile.technologies.map((group, i) => (
            <div key={group.group} data-reveal style={{ "--i": i } as React.CSSProperties} className={`${panel} flex flex-col gap-4 p-5`}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-faint">{group.group}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full bg-white/5 px-3 py-1.5 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <SectionHeading id="contacto" index="04" title="Contacto" />
        <div data-reveal className={`${panel} flex flex-col gap-8 p-6 sm:p-10`}>
          <div className="flex flex-col gap-3">
            <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">¿Hablamos?</p>
            <p className="max-w-lg text-muted">Para proyectos, colaboraciones o dudas sobre mis aplicaciones.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <EmailLink user={emailUser} domain={emailDomain} className={buttonPrimary}>
              <Icon name="mail" /> Escríbeme
            </EmailLink>
            {profile.links.map((link) =>
              link.href ? (
                <a key={link.label} href={link.href} className={buttonSecondary}>
                  <Icon name={link.icon} /> {link.label}
                </a>
              ) : (
                <span key={link.label} className={buttonDisabled} title="Pendiente">
                  <Icon name={link.icon} /> {link.label}
                </span>
              ),
            )}
            <CvButton />
          </div>
        </div>
      </section>
    </div>
  );
}
