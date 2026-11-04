import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmailLink } from "@/components/EmailLink";
import { FitText } from "@/components/FitText";
import { Icon } from "@/components/Icon";
import { RichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";
import { buttonDisabled, buttonPrimary, buttonSecondary, panel } from "@/components/styles";
import { profile, type Entry } from "@/content/profile";
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

function Timeline({ title, entries, lang }: { title: string; entries: Entry[]; lang: "es" | "en" }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 data-reveal className="font-mono text-xs uppercase tracking-widest text-faint">
        {title}
      </h3>
      <ol className="relative flex flex-col gap-7 border-l border-line pl-6">
        {entries.map((entry, i) => (
          <li key={entry.title.es} data-reveal style={stagger(i % 3)} className="relative flex flex-col gap-1.5">
            <span aria-hidden="true" className="absolute -left-[1.84rem] top-2 h-2 w-2 rounded-full bg-accent ring-4 ring-background" />
            {entry.period && <span className="font-mono text-[11px] uppercase tracking-widest text-accent">{entry.period[lang]}</span>}
            <span className="font-display text-lg font-semibold leading-snug tracking-tight">{entry.title[lang]}</span>
            <span className="text-sm text-muted">{entry.place[lang]}</span>
            {entry.detail && <p className="mt-1 text-sm leading-relaxed text-faint">{entry.detail[lang]}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  if (!isLocale((await params).lang)) notFound();
  const lang = await getLang();
  const t = await getDict();
  const [emailUser, emailDomain] = profile.email.split("@");
  const [lead, ...bio] = profile.bio[lang];
  const [firstName, ...surnames] = profile.name.split(" ");

  return (
    <div className="flex flex-col gap-28 pb-28 sm:gap-36">
      <section className="relative grid min-h-[calc(100svh-4rem)] items-center gap-10 py-16 md:grid-cols-[1.3fr_0.7fr]">
        <div className="relative z-10 flex min-w-0 flex-col gap-8">
          <div className="flex flex-col gap-6">
            {/* "Sanz Huerta" is set at 81% so it spans exactly the width of "Alejandro". */}
            <h1
              data-reveal
              aria-label={profile.name}
              className="flex w-fit flex-col font-display text-[4.25rem] font-semibold leading-[0.92] tracking-[-0.03em] sm:text-[6rem] lg:text-[7.25rem]"
            >
              <span>{firstName}</span>
              <span className="text-[0.81em] text-foreground/85">{surnames.join(" ")}</span>
            </h1>
            <div data-reveal style={stagger(1)} className="flex flex-col gap-3">
              <p>
                <FitText className="font-display text-[1.65rem] font-medium tracking-tight text-foreground/90 sm:text-[1.85rem]">
                  {profile.title[lang]}
                </FitText>
              </p>
              <p aria-label={profile.focus[lang].join(", ")}>
                <FitText className="font-mono text-xs uppercase tracking-[0.04em] text-accent sm:tracking-[0.16em]">
                  {profile.focus[lang].map((item, i) => (
                    <span key={item} className={`inline-flex items-center gap-[0.5em] sm:gap-[0.7em] ${i > 0 ? "ml-[1em] sm:ml-[1.6em]" : ""}`}>
                      <span aria-hidden="true" className="h-[0.34em] w-[0.34em] rounded-full bg-accent/70" />
                      {item}
                    </span>
                  ))}
                </FitText>
              </p>
            </div>
            <p data-reveal style={stagger(2)} className="flex items-center gap-3">
              <span aria-hidden="true" className="hidden h-px w-8 shrink-0 bg-line-strong sm:block" />
              <span className="min-w-0 flex-1">
                <FitText className="text-base font-semibold tracking-wide text-muted sm:text-[1.0625rem]">
                  {profile.beyond[lang].join(" · ")}
                </FitText>
              </span>
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
        <p data-reveal className="max-w-4xl font-display text-xl leading-relaxed [word-spacing:0.16em] sm:text-2xl">
          <RichText text={lead} />
        </p>
        <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {bio.map((paragraph, i) => (
            <p key={paragraph} data-reveal style={stagger(i % 2)} className="leading-relaxed text-muted [word-spacing:0.08em] sm:text-lg">
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

      <section id="trayectoria" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="03" title={t.home.path} />
        <div className="grid gap-10 md:grid-cols-2">
          <Timeline title={t.home.education} entries={profile.education} lang={lang} />
          <Timeline title={t.home.experience} entries={profile.experience} lang={lang} />
        </div>
      </section>

      <section id="stack" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="04" title={t.home.stack} />
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

      <section id="idiomas" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="05" title={t.home.languages} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profile.languages.map((language, i) => (
            <li key={language.name.es} data-reveal style={stagger(i)} className={`${panel} flex items-end justify-between gap-4 p-6`}>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-widest text-faint">{language.name[lang]}</span>
                <span className="font-display text-3xl font-semibold tracking-tight">{language.level[lang]}</span>
              </div>
              {language.detail && <span className="font-mono text-xs text-muted">{language.detail[lang]}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section id="contacto" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="06" title={t.home.contact} />
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
