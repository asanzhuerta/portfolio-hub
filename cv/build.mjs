// Builds the CV with XeLaTeX (MiKTeX or TeX Live):
//   public/cv/Alejandro-Sanz-Huerta-CV-{es,en}.pdf  public version for the site (no phone, no birth date)
//   cv/out/cv-{es,en}-privado.pdf                   with the data in cv/privado.tex, for sending by hand
//   cv/out/cv-replica.pdf                           replica of the original Canva design
// Usage: npm run cv
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "out");
const site = join(here, "..", "public", "cv");
mkdirSync(out, { recursive: true });
mkdirSync(site, { recursive: true });

function build(jobname, preamble, main) {
  // A one-line driver file: MiKTeX on Windows drops backslashes from arguments.
  const driver = join(out, `${jobname}.driver.tex`);
  writeFileSync(driver, `${preamble}\\input{${main}}\n`);
  // Two passes: the backgrounds are placed with TikZ "remember picture".
  for (let pass = 0; pass < 2; pass++) {
    try {
      execFileSync(
        "xelatex",
        ["-interaction=nonstopmode", "-halt-on-error", "-output-directory=out", `-jobname=${jobname}`, `out/${jobname}.driver.tex`],
        { cwd: here, stdio: "pipe" },
      );
    } catch (error) {
      const log = String(error.stdout ?? "");
      console.error(log.split("\n").filter((line) => line.startsWith("!")).join("\n") || log.slice(-2000));
      process.exit(1);
    }
  }
  return join(out, `${jobname}.pdf`);
}

for (const lang of ["es", "en"]) {
  const pdf = build(`cv-${lang}`, `\\def\\cvlang{${lang}}\\def\\cvpublic{}`, "cv");
  copyFileSync(pdf, join(site, `Alejandro-Sanz-Huerta-CV-${lang}.pdf`));
  build(`cv-${lang}-privado`, `\\def\\cvlang{${lang}}`, "cv");
}
build("cv-replica", "\\def\\cvlang{es}", "cv-replica");
console.log("CV listo: public/cv/ y cv/out/");
