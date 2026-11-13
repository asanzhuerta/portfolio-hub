// Imports Cover_Maker's logo, social preview and screenshots from its own repo for
// the project page.
//
//   npm run screenshots                       (reads ../cover_maker)
//   npm run screenshots -- "C:\path\to\cover_maker"
//
// The Cover_Maker repo keeps the source images (README screenshots in English and
// Spanish, the practice screenshots of M14, the user manual's figures and the
// branding). This copies them from its checked-out branch (keep it on `main`),
// converts the screenshots to WebP and writes content/screenshots/cover-maker.json,
// which content/projects.ts reads. next/image then serves AVIF or WebP at the
// width each visitor needs. Every image here only uses Creative Commons or
// synthetic audio: never add a screenshot that shows a commercial song.
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const source = resolve(process.argv[2] ?? join(root, "..", "cover_maker"));
const outDir = join(root, "public", "projects", "cover-maker");
const manifest = join(root, "content", "screenshots", "cover-maker.json");

if (!existsSync(join(source, "branding", "logo.svg"))) {
  console.error(`No encuentro el repo de Cover_Maker en ${source}. Pásale la ruta:\n  npm run screenshots -- C:\\ruta\\cover_maker`);
  process.exit(1);
}

const readme = (lang, name) => `docs/screenshots/readme/${lang}/${name}.png`;

/** Gallery order. `src` per language; screenshots that only exist in English use it for both. */
const shots = [
  { name: "mixer", src: { es: readme("es", "mixer"), en: readme("en", "mixer") } },
  { name: "practice", src: "docs/screenshots/m14/after-practice-dark.png" },
  { name: "loop", src: "docs/screenshots/m14/after-mixer-dark.png" },
  { name: "meters", src: "docs/latex/user-manual/figures/mixer-dark.png" },
  { name: "new-job", src: { es: readme("es", "new-job"), en: readme("en", "new-job") } },
  { name: "queue", src: { es: readme("es", "queue"), en: readme("en", "queue") } },
  { name: "quick-start", src: { es: readme("es", "quick-start"), en: readme("en", "quick-start") } },
  // Not in the gallery: the transport display, shown next to the practice features.
  { name: "lcd", src: "docs/screenshots/m14/after-lcd-dark.png" },
];

mkdirSync(outDir, { recursive: true });

for (const file of ["logo.svg"]) {
  copyFileSync(join(source, "branding", file), join(outDir, file));
  console.log(`  ${file}`);
}
// Open Graph image of the project page, at the 1200×630 Open Graph size.
await sharp(join(source, "branding", "social-preview.png"))
  .resize(1200, 630, { fit: "cover", position: "left" })
  .png({ compressionLevel: 9, palette: false })
  .toFile(join(outDir, "og.png"));
console.log("  og.png");

const result = [];
for (const shot of shots) {
  const src = typeof shot.src === "string" ? { es: shot.src, en: shot.src } : shot.src;
  const entry = { name: shot.name, width: 0, height: 0, src: {} };
  for (const lang of ["es", "en"]) {
    const shared = src.es === src.en;
    const file = shared ? `${shot.name}.webp` : `${shot.name}-${lang}.webp`;
    if (!shared || lang === "es") {
      const info = await sharp(join(source, src[lang])).webp({ quality: 90, effort: 6 }).toFile(join(outDir, file));
      entry.width = info.width;
      entry.height = info.height;
      console.log(`  ${file} ${info.width}×${info.height} ${(info.size / 1024).toFixed(0)} KB`);
    }
    entry.src[lang] = `/projects/cover-maker/${file}`;
  }
  result.push(entry);
}

mkdirSync(join(root, "content", "screenshots"), { recursive: true });
writeFileSync(manifest, JSON.stringify(result, null, 2) + "\n");
console.log(`Listo: ${manifest}`);
