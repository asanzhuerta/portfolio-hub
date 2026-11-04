import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmailLink } from "@/components/EmailLink";
import { Icon } from "@/components/Icon";
import { Lightbox } from "@/components/Lightbox";
import { RichText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";
import { buttonDisabled, buttonPrimary, buttonSecondary, panel } from "@/components/styles";
import { orion } from "@/content/orion";
import { href, isLocale, localeTags } from "@/lib/i18n";
import { getDict, getLang } from "@/lib/locale";

const path = "/paralelos/orion-rituals";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title: "Orion Rituals",
    description: orion.intro[lang],
    alternates: {
      canonical: href(lang, path),
      languages: { es: href("es", path), en: href("en", path), "x-default": href("es", path) },
    },
    openGraph: { title: "Orion Rituals", description: orion.intro[lang], url: href(lang, path) },
  };
}

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default async function OrionPage({ params }: PageProps<"/[lang]/paralelos/orion-rituals">) {
  if (!isLocale((await params).lang)) notFound();
  const lang = await getLang();
  const t = await getDict();
  const o = t.orion;
  const longDate = new Intl.DateTimeFormat(localeTags[lang].intl, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const monthYear = new Intl.DateTimeFormat(localeTags[lang].intl, { month: "long", year: "numeric" });
  const [user, domain] = orion.email.split("@");

  return (
    // The brand's purple replaces the site's cobalt on this page (the ink follows it).
    <div
      className="flex flex-col gap-28 pb-28 sm:gap-36"
      style={{ "--accent": "#9b84f0", "--accent-strong": "#6a4fc9" } as React.CSSProperties}
    >
      <section className="relative grid items-center gap-8 py-10 sm:py-16 md:min-h-[calc(100svh-4rem)] md:content-center md:grid-rows-[auto_auto] md:grid-cols-[1.15fr_0.85fr] md:gap-10">
        {/* First thing on every screen size; above the photo on phones. */}
        <Link
          data-reveal
          href={href(lang, "/paralelos")}
          className="order-first w-fit font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground md:col-start-1 md:row-start-1 md:self-end"
        >
          ← {t.side.title}
        </Link>
        <div className="relative z-10 flex flex-col gap-8 md:col-start-1 md:row-start-2 md:self-start -mt-20 sm:-mt-28 md:mt-0">
          <h1 data-reveal style={stagger(1)}>
            <Image
              src={orion.logo.src}
              alt="Orion Rituals"
              width={orion.logo.width}
              height={orion.logo.height}
              priority
              sizes="(min-width: 768px) 600px, 90vw"
              className="h-auto w-full max-w-[600px] drop-shadow-[0_0_30px_rgb(155_132_240/0.4)]"
            />
          </h1>
          <p data-reveal style={stagger(2)} className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent sm:text-xs">
            {orion.kicker[lang]}
          </p>
          <p data-reveal style={stagger(3)} className="max-w-lg text-lg leading-relaxed text-muted">
            {orion.intro[lang]}
          </p>
          <div data-reveal style={stagger(4)} className="flex flex-wrap gap-3">
            <a href={orion.links[0].href} target="_blank" rel="noopener" className={buttonPrimary}>
              <Icon name={orion.links[0].icon} /> {orion.links[0].label}
            </a>
            <a href={orion.links[1].href} target="_blank" rel="noopener" className={buttonSecondary}>
              <Icon name="arrow" className="h-4 w-4 -rotate-45" /> {orion.links[1].label}
            </a>
            <EmailLink user={user} domain={domain} className={buttonSecondary}>
              <Icon name="mail" /> {o.write}
            </EmailLink>
            <span className={buttonDisabled} title={o.siteSoon}>
              {o.site} · {t.project.soon}
            </span>
          </div>
        </div>
        {/* Lucy and me, cut out (rembg); the fade at the bottom is baked into the image. */}
        <div
          data-reveal
          style={stagger(2)}
          className="pointer-events-none order-first flex justify-center md:order-none md:col-start-2 md:row-span-2 md:row-start-1 md:self-center md:justify-end"
        >
          <Image
            src={orion.photo.src}
            alt={orion.photo.alt[lang]}
            width={orion.photo.width}
            height={orion.photo.height}
            priority
            unoptimized
            className="h-auto max-h-[46svh] w-auto drop-shadow-[0_0_40px_rgb(155_132_240/0.35)] md:max-h-[80svh]"
          />
        </div>
      </section>

      <section id="quienes" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="01" title={o.about} />
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-5">
            {orion.about[lang].map((paragraph, i) => (
              <p
                key={paragraph}
                data-reveal
                style={stagger(i)}
                className={
                  i === 0
                    ? "font-display text-xl leading-relaxed [word-spacing:0.12em] sm:text-2xl"
                    : "leading-relaxed text-muted [word-spacing:0.06em] sm:text-lg"
                }
              >
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
          <div className="flex h-fit flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              {orion.founders.map((founder, i) => (
                <div key={founder.name} data-reveal style={stagger(i)} className={`${panel} flex flex-col gap-1 p-5`}>
                  <span className="font-display text-2xl font-semibold tracking-tight">{founder.name}</span>
                  <span className="text-sm text-muted">{founder.role[lang]}</span>
                </div>
              ))}
            </div>
            <dl className="grid grid-cols-2 gap-3">
              {orion.facts.map((fact, i) => (
                <div key={fact.value} data-reveal style={stagger(i + 2)} className={`${panel} flex flex-col gap-1 p-5`}>
                  <dd className="font-display text-3xl font-semibold tracking-tight text-accent">{fact.value}</dd>
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-faint">{fact.label[lang]}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="eventos" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="02" title={o.events} />
        <div className="flex flex-col gap-6">
          {orion.events.map((event, i) => (
            <article key={event.slug} data-reveal style={stagger(i)} className={`${panel} grid gap-8 p-5 sm:p-8 md:grid-cols-[0.8fr_1.2fr]`}>
              <Lightbox
                labels={t.lightbox}
                grid="grid"
                featureFirst={false}
                captions={false}
                sizes="(min-width: 768px) 420px, 100vw"
                images={[{ ...event.poster, alt: event.poster.alt[lang], caption: event.poster.alt[lang] }]}
              />
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                    {longDate.format(new Date(event.date))}
                  </span>
                  <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{event.name}</h3>
                  <p className="text-sm text-muted">
                    {event.venue} · {event.hours[lang]}
                  </p>
                  <p className="mt-2 leading-relaxed text-muted">{event.note[lang]}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-mono text-[11px] uppercase tracking-widest text-faint">{o.lineup}</h4>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {event.lineup.map(([band, style]) => (
                      <li key={band} className="flex flex-col rounded-xl border border-line px-4 py-3">
                        <span className="font-semibold">{band}</span>
                        <span className="text-xs text-faint">{style[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {event.extras[lang].map((extra) => (
                    <li key={extra} className="rounded-full bg-white/5 px-3 py-1.5 text-sm">
                      {extra}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                  <span className="font-mono text-xs text-muted">{event.prices[lang]}</span>
                  <a href={event.tickets} target="_blank" rel="noopener" className={buttonSecondary}>
                    {o.tickets} <Icon name="arrow" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="medios" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="03" title={o.press} />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {orion.press.map((item, i) => (
            <li key={item.href} data-reveal style={stagger(i % 3)}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener"
                className={`${panel} group flex h-full flex-col gap-5 p-6 transition-colors hover:border-accent/60`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
                    {item.kind[lang]} · {monthYear.format(new Date(item.date))}
                  </span>
                  <Icon name="arrow" className="h-5 w-5 -rotate-45 text-faint transition-all group-hover:rotate-0 group-hover:text-accent" />
                </div>
                <p className="font-display text-xl font-semibold leading-snug tracking-tight">{item.title}</p>
                <p className="mt-auto text-sm text-foreground">{item.outlet}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="colaboradores" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="04" title={o.partners} />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {orion.partners.map((partner, i) => {
            const [file, width, height] = partner.logo;
            const body = (
              <>
                <span className="flex h-24 w-full items-center justify-center sm:h-28">
                  <Image
                    src={`/side/orion-rituals/partners/${file}`}
                    alt={partner.name}
                    width={width}
                    height={height}
                    unoptimized
                    className="h-auto max-h-full w-auto max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
                <span className="flex items-center gap-1.5 text-center text-xs leading-snug text-faint transition-colors group-hover:text-foreground">
                  {partner.name}
                  {partner.href && <Icon name="arrow" className="h-3 w-3 shrink-0 -rotate-45" />}
                </span>
              </>
            );
            const tile = `${panel} group flex h-full flex-col items-center justify-between gap-4 p-5`;
            return (
              <li key={partner.name} data-reveal style={stagger(i % 4)}>
                {partner.href ? (
                  <a href={partner.href} target="_blank" rel="noopener" className={`${tile} transition-colors hover:border-accent/60`}>
                    {body}
                  </a>
                ) : (
                  <div className={tile}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section id="web" className="flex scroll-mt-24 flex-col gap-10">
        <SectionHeading index="05" title={o.next} />
        <div data-reveal className={`${panel} relative isolate flex flex-col gap-5 overflow-hidden p-8 sm:p-12`}>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_80%_at_85%_50%,rgb(155_132_240/0.18),transparent_70%)]"
          />
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">{t.project.soon}</p>
          <p className="max-w-2xl font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{o.nextBody}</p>
          <div className="flex flex-wrap gap-3">
            <span className={buttonDisabled}>
              {o.site} · {t.project.soon}
            </span>
            <a href={orion.links[0].href} target="_blank" rel="noopener" className={buttonSecondary}>
              <Icon name="instagram" /> @orionrituals
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
