import { EmailLink } from "@/components/EmailLink";
import type { LegalPage } from "@/content/legal";
import { localeTags, type Locale } from "@/lib/i18n";

/** A legal text: `{email}` in a paragraph becomes a mail link (built in the browser). */
export function LegalArticle({
  page,
  lang,
  email,
  emailLabel,
  updatedLabel,
}: {
  page: LegalPage;
  lang: Locale;
  email: string;
  emailLabel: string;
  updatedLabel: string;
}) {
  const [user, domain] = email.split("@");
  const date = new Intl.DateTimeFormat(localeTags[lang].intl, { dateStyle: "long" }).format(new Date(page.updated));

  return (
    <article className="flex max-w-3xl flex-col gap-12 pb-28 pt-16 sm:pt-24">
      <header className="flex flex-col gap-5">
        <h1 data-reveal className="font-display text-5xl font-semibold tracking-[-0.03em] sm:text-6xl">
          {page.title}
        </h1>
        <p data-reveal className="font-mono text-xs uppercase tracking-widest text-faint">
          {updatedLabel} {date}
        </p>
        <p data-reveal className="text-lg leading-relaxed text-muted">
          {page.intro}
        </p>
      </header>
      {page.sections.map((section, i) => (
        <section key={section.title} data-reveal className="flex flex-col gap-3">
          <h2 className="flex items-baseline gap-4 font-display text-2xl font-semibold tracking-tight">
            <span className="font-mono text-xs font-normal text-accent">{String(i + 1).padStart(2, "0")}</span>
            {section.title}
          </h2>
          {section.body.map((paragraph) => {
            const [before, after] = paragraph.split("{email}");
            return (
              <p key={paragraph} className="leading-relaxed text-muted">
                {before}
                {after !== undefined && (
                  <>
                    <EmailLink user={user} domain={domain} className="text-foreground underline underline-offset-4 hover:text-accent">
                      {emailLabel}
                    </EmailLink>
                    {after}
                  </>
                )}
              </p>
            );
          })}
        </section>
      ))}
    </article>
  );
}
