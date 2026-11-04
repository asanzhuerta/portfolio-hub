import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmailLink } from "@/components/EmailLink";
import { Icon } from "@/components/Icon";
import { RichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";
import { buttonDisabled, buttonPrimary, buttonSecondary, panel } from "@/components/styles";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { href, isLocale } from "@/lib/i18n";
import { getDict, getLang } from "@/lib/locale";

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

async function CvButton() {
  const lang = await getLang();
  const t = await getDict();
  const cv = profile.cv[lang];
  return cv ? (
    <a href={cv} download className={buttonSecondary}>
      <Icon name="download" /> {t.cv.download}
    </a>
  ) : (
    <span className={buttonDisabled}>
      <Icon name="download" /> {t.cv.soon}
    </span>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  if (!isLocale((await params).lang)) notFound();
  const lang = await getLang();
  const t = await getDict();
  const [emailUser, emailDomain] = profile.email.split("@");
  const [lead, ...bio] = profile.bio[lang];

  return (
    <div className="flex flex-col gap-28 pb-28 sm:gap-36">
      <section className="relative grid min-h-[calc(100svh-4rem)] items-center gap-10 py-16 md:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10 flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <h1
              data-reveal
              className="font-display text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl"
            >
              {profile.name}
            </h1>
            <div data-reveal style={stagger(1)} className="flex flex-col gap-2">
              <p className="font-display text-2xl font-medium tracking-tight text-foreground/90 sm:text-3xl">
                {profile.title}
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent sm:text-xs">
                {profile.focus.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p
              data-reveal
              style={stagger(2)}
              className="flex items-center gap-3 text-sm font-semibold tracking-wide text-faint"
            >
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              {profile.beyond.join(" · ")}
            </p>
          </div>
          <p data-reveal style={stagger(3)} className="max-w-lg text-lg leading-relaxed text-muted">
            {profile.intro[lang]}
          </p>
          <div data-reveal style={stagger(4)} className="flex flex-wrap gap-3">
            <Link href={`${href(lang)}#proyectos`} className={buttonPrimary}>
              {t.home.seeProjects} <Icon name="arrow" />
            </Link>
            <CvButton />
          </div>
        </div>
        {/* The portrait dissolves into the ink: masked towards its edges. */}
        <div
          data-reveal
          style={stagger(2)}
          className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-40 md:relative md:w-auto md:opacity-100"
        >
          <Image
            src={profile.photo}
            alt={`${t.home.portraitAlt} ${profile.name}`}
            width={600}
            height={750}
            priority
            unoptimized={profile.photo.endsWith(".svg")}
            className="ml-auto h-full max-h-[78svh] w-auto object-cover [mask-image:radial-gradient(ellipse_58%_58%_at_55%_45%,black_30%,transparent_72%)]"
          />
        </div>
      </section>

      <section id="bio" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="01" title={t.home.bio} />
        <p data-reveal className="max-w-4xl font-display text-xl leading-relaxed tracking-tight sm:text-2xl">
          <RichText text={lead} />
        </p>
        <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {bio.map((paragraph, i) => (
            <p key={paragraph} data-reveal style={stagger(i % 2)} className="leading-relaxed text-muted sm:text-lg">
              <RichText text={paragraph} />
            </p>
          ))}
        </div>
      </section>

      <section id="proyectos" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="02" title={t.home.projects} />
        <ul className="grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project.slug} data-reveal style={stagger(i)}>
              <Link
                href={href(lang, `/projects/${project.slug}`)}
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
                  <p className="text-muted">{project.tagline[lang]}</p>
                </div>
                <ul className="mt-auto flex flex-wrap gap-2">
                  {project.tags[lang].map((tag) => (
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

      <section id="stack" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="03" title={t.home.stack} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profile.technologies.map((group, i) => (
            <div key={group.group.es} data-reveal style={stagger(i % 3)} className={`${panel} flex flex-col gap-4 p-5`}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-faint">{group.group[lang]}</h3>
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

      <section id="contacto" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="04" title={t.home.contact} />
        <div data-reveal className={`${panel} flex flex-col gap-8 p-6 sm:p-10`}>
          <div className="flex flex-col gap-3">
            <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{t.home.talk}</p>
            <p className="max-w-lg text-muted">{t.home.talkBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <EmailLink user={emailUser} domain={emailDomain} className={buttonPrimary}>
              <Icon name="mail" /> {t.home.write}
            </EmailLink>
            {profile.links.map((link) =>
              link.href ? (
                <a key={link.label} href={link.href} rel="me noopener" target="_blank" className={buttonSecondary}>
                  <Icon name={link.icon} /> {link.label}
                </a>
              ) : (
                <span key={link.label} className={buttonDisabled} title={t.home.pending}>
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
