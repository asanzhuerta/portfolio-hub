import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

/** The site's look at 1200×630: ink-dark ground, a cobalt bloom, display type. */
export async function ogImage({
  kicker,
  title,
  subtitle,
  footer,
  icon,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  footer: string;
  /** Data URI of a square image shown above the title. */
  icon?: string;
}) {
  const [semibold, medium, mono] = await Promise.all([
    font("PlusJakartaSans-SemiBold.ttf"),
    font("PlusJakartaSans-Medium.ttf"),
    font("GeistMono-Regular.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#eceae6",
          backgroundColor: "#050608",
          backgroundImage:
            "radial-gradient(ellipse 60% 70% at 85% 20%, rgba(47,82,230,0.38), transparent 70%), radial-gradient(ellipse 50% 60% at 10% 100%, rgba(120,124,140,0.16), transparent 70%)",
          fontFamily: "Jakarta",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Mono", fontSize: 22, letterSpacing: 5, color: "#5b7cff" }}>
          {kicker.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {icon && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={icon} width={112} height={112} style={{ borderRadius: 28, marginBottom: 12 }} alt="" />
          )}
          <div style={{ display: "flex", fontSize: icon ? 84 : 92, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>
            {title}
            <span style={{ color: "#5b7cff" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 500, color: "#a1a3aa", maxWidth: 980 }}>{subtitle}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Mono",
            fontSize: 20,
            letterSpacing: 2,
            color: "#6b6e77",
            borderTop: "1px solid rgba(236,234,230,0.14)",
            paddingTop: 26,
          }}
        >
          <span>{footer}</span>
          <span>asanzhuerta.netlify.app</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Jakarta", data: semibold, weight: 600, style: "normal" },
        { name: "Jakarta", data: medium, weight: 500, style: "normal" },
        { name: "Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
