import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { YouTube } from "@/components/YouTube";
import { buttonPrimary, buttonSecondary, panel } from "@/components/styles";
import { odisea } from "@/content/odisea";
import { href, isLocale, localeTags } from "@/lib/i18n";
import { getDict, getLang } from "@/lib/locale";

const path = "/paralelos/odisea";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title: "ODISEA",
    description: odisea.intro[lang],
    alternates: {
      canonical: href(lang, path),
      languages: { es: href("es", path), en: href("en", path), "x-default": href("es", path) },
    },
    openGraph: { title: "ODISEA", description: odisea.intro[lang], url: href(lang, path) },
  };
}

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default async function OdiseaPage({ params }: PageProps<"/[lang]/paralelos/odisea">) {
  if (!isLocale((await params).lang)) notFound();
  const lang = await getLang();
  const t = await getDict();
  const o = t.odisea;
  const date = new Intl.DateTimeFormat(localeTags[lang].intl, { month: "long", year: "numeric" });
  const [first, ...otherLinks] = odisea.links;

  return (
    // The band's red replaces the site's cobalt on this page (the ink follows it).
    <div
      className="flex flex-col gap-28 pb-28 sm:gap-36"
      style={{ "--accent": "#e5484d", "--accent-strong": "#b4232c" } as React.CSSProperties}
    >
      <section className="relative grid min-h-[calc(100svh-4rem)] items-center gap-10 py-16 md:grid-cols-[1fr_1fr]">
        <div className="relative z-10 flex flex-col gap-8">
          <Link
            data-reveal
            href={href(lang, "/paralelos")}
            className="w-fit font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            ← {t.side.title}
          </Link>
          <h1 data-reveal style={stagger(1)}>
            <Image
              src={odisea.logo.src}
              alt="ODISEA"
              width={odisea.logo.width}
              height={odisea.logo.height}
              priority
              sizes="(min-width: 768px) 560px, 90vw"
              className="h-auto w-full max-w-[560px] drop-shadow-[0_0_30px_rgb(229_72_77/0.35)]"
            />
          </h1>
          <p data-reveal style={stagger(2)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent sm:text-xs">
            {odisea.kicker[lang]}
          </p>
          <p data-reveal style={stagger(3)} className="max-w-lg text-lg leading-relaxed text-muted">
            {odisea.intro[lang]}
          </p>
          <div data-reveal style={stagger(4)} className="flex flex-wrap gap-3">
            <a href={first.href} target="_blank" rel="noopener" className={buttonPrimary}>
              <Icon name={first.icon} /> {first.label}
            </a>
            {otherLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener" className={buttonSecondary}>
                <Icon name={link.icon} /> {link.label}
              </a>
            ))}
          </div>
        </div>
        {/* The band photo dissolves into the ink, like the portrait on the home page. */}
        <div
          data-reveal
          style={stagger(2)}
          className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-35 md:relative md:w-auto md:opacity-100"
        >
          <Image
            src={odisea.photo.src}
            alt={o.photoAlt}
            width={odisea.photo.width}
            height={odisea.photo.height}
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover [mask-image:radial-gradient(ellipse_72%_70%_at_50%_44%,black_45%,transparent_82%)] md:h-auto"
          />
        </div>
      </section>

      <section id="banda" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="01" title={o.about} />
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-5">
            {odisea.about[lang].map((paragraph, i) => (
              <p
                key={paragraph}
                data-reveal
                style={stagger(i)}
                className={i === 0 ? "font-display text-xl leading-relaxed tracking-tight sm:text-2xl" : "leading-relaxed text-muted sm:text-lg"}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <dl className="grid h-fit grid-cols-2 gap-3">
            {odisea.facts.map((fact, i) => (
              <div key={fact.label.es} data-reveal style={stagger(i)} className={`${panel} flex flex-col gap-2 p-4`}>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-faint">{fact.label[lang]}</dt>
                <dd className="font-display text-lg font-semibold tracking-tight">{fact.value[lang]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="formacion" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="02" title={o.members} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {odisea.members.map((member, i) => (
            <li key={member.name} data-reveal style={stagger(i)} className={`${panel} flex flex-col gap-3 p-5`}>
              <span className="font-display text-2xl font-semibold tracking-tight">{member.name}</span>
              <span className="text-sm leading-relaxed text-muted">{member.role[lang]}</span>
              {member.also && (
                <span className="mt-auto font-mono text-[10px] uppercase tracking-widest text-faint">
                  {o.also} <span className="text-accent">{member.also}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section id="videos" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="03" title={o.videos} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {odisea.videos.map((video, i) => (
            <figure key={video.id} data-reveal style={stagger(i % 3)} className="flex flex-col gap-3">
              <YouTube id={video.id} title={`ODISEA – ${video.title}`} label={o.play} size="sm" />
              <figcaption className="flex items-baseline justify-between gap-4">
                <span className="font-display text-lg font-semibold tracking-tight">{video.title}</span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-faint">{video.kind[lang]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <h3 data-reveal className="font-mono text-xs uppercase tracking-widest text-faint">
            {o.live}
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {odisea.live.map((video, i) => (
              <figure key={video.id} data-reveal style={stagger(i % 3)} className="flex flex-col gap-2">
                <YouTube id={video.id} title={`ODISEA – ${video.title}`} label={o.play} size="sm" />
                <figcaption className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold">{video.title}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-faint">{video.kind[lang]}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="musica" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="04" title={o.music} />
        <div className="grid gap-5 md:grid-cols-[1fr_1.1fr]">
          <ul className="grid h-fit grid-cols-2 gap-3">
            {odisea.releases.map((release, i) => (
              <li key={release.title} data-reveal style={stagger(i % 2)} className={`${panel} flex flex-col gap-1 p-4`}>
                <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                  {release.kind[lang]} · {release.year}
                </span>
                <span className="font-display text-lg font-semibold leading-tight tracking-tight">{release.title}</span>
              </li>
            ))}
          </ul>
          <div data-reveal style={stagger(1)} className="overflow-hidden rounded-2xl border border-line-strong">
            <SpotifyEmbed artist={odisea.spotifyArtist} title={o.spotify} label={o.spotifyLoad} note={t.legal.spotifyNote} />
          </div>
        </div>
      </section>

      <section id="trayectoria" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="05" title={o.shows} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {odisea.shows.map((season, i) => (
            <div key={season.year} data-reveal style={stagger(i)} className={`${panel} flex flex-col gap-4 p-5`}>
              <h3 className="font-display text-3xl font-semibold tracking-tight">
                {season.year}
                <span className="ml-2 font-mono text-xs font-normal text-faint">{season.dates.length}</span>
              </h3>
              <ol className="flex flex-col gap-3">
                {season.dates.map(([day, city, venue]) => (
                  <li key={day + venue} className="grid grid-cols-[3.2rem_1fr] gap-2 text-sm">
                    <span className="font-mono text-xs leading-5 text-accent">{day}</span>
                    <span className="flex flex-col">
                      <span className="text-foreground">{venue}</span>
                      <span className="text-xs text-faint">{city}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section id="prensa" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="06" title={o.press} />
        <ul className="grid gap-5 md:grid-cols-2">
          {odisea.press.map((item, i) => (
            <li key={item.href} data-reveal style={stagger(i)}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener"
                className={`${panel} group flex h-full flex-col gap-5 p-6 transition-colors hover:border-accent/60`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
                    {item.kind[lang]} · {date.format(new Date(item.date))}
                  </span>
                  <Icon
                    name="arrow"
                    className="h-5 w-5 -rotate-45 text-faint transition-all group-hover:rotate-0 group-hover:text-accent"
                  />
                </div>
                {item.quote ? (
                  <blockquote className="font-display text-2xl font-semibold leading-snug tracking-tight">
                    “{item.quote[lang]}”
                  </blockquote>
                ) : (
                  <p className="font-display text-xl font-semibold leading-snug tracking-tight">{item.title}</p>
                )}
                <p className="mt-auto text-sm text-muted">
                  <span className="text-foreground">{item.outlet}</span>
                  {item.quote && <> · {item.title}</>}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="final" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="07" title={o.ending} />
        <div data-reveal className={`${panel} relative isolate overflow-hidden p-8 sm:p-12`}>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_80%_at_85%_50%,rgb(229_72_77/0.16),transparent_70%)]"
          />
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">2022 – 2026</p>
          <p className="mt-4 max-w-2xl font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            {odisea.ending[lang]}
          </p>
        </div>
      </section>
    </div>
  );
}
