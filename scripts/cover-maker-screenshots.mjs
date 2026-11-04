// Takes fresh screenshots of the real Cover_Maker app for its project page.
//
//   npm run screenshots                 (uses the installed app or the local build)
//   npm run screenshots -- "C:\path\to\cover-maker-desktop.exe"
//
// It starts the app with WebView2's remote debugging on, drives it over the
// Chrome DevTools Protocol, captures each screen in Spanish and English, then
// puts the language back as it was. Output: public/projects/cover-maker/*.webp
// and content/screenshots/cover-maker.json (read by content/projects.ts).
// Needs Windows, a working engine and, for the mixer shot, one finished job.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const outDir = join(root, "public", "projects", "cover-maker");
const manifest = join(root, "content", "screenshots", "cover-maker.json");
const port = 9333;

const candidates = [
  process.argv[2],
  process.env.COVER_MAKER_EXE,
  join(process.env.LOCALAPPDATA ?? "", "Cover_Maker", "cover-maker-desktop.exe"),
  join(process.env.LOCALAPPDATA ?? "", "Programs", "Cover_Maker", "cover-maker-desktop.exe"),
  join(process.env.ProgramFiles ?? "", "Cover_Maker", "cover-maker-desktop.exe"),
  join(root, "..", "cover_maker", "desktop", "src-tauri", "target", "release", "cover-maker-desktop.exe"),
].filter(Boolean);
const exe = candidates.find((path) => existsSync(path));
if (!exe) {
  console.error("No encuentro Cover_Maker. Pásale la ruta del .exe:\n  npm run screenshots -- C:\\ruta\\cover-maker-desktop.exe");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

console.log(`Abriendo ${exe}`);
const app = spawn(exe, [], {
  env: { ...process.env, WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS: `--remote-debugging-port=${port}` },
  stdio: "ignore",
});

async function connect() {
  for (let i = 0; i < 60; i++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      const page = targets.find((t) => t.type === "page" && t.url.startsWith("http://tauri.localhost"));
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // Not up yet.
    }
    await sleep(500);
  }
  throw new Error("La app no abrió el puerto de depuración (¿ya estaba abierta? ciérrala y repite).");
}

const ws = new WebSocket(await connect());
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let nextId = 0;
const pending = new Map();
ws.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data);
  if (pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, (msg) => (msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result)));
    ws.send(JSON.stringify({ id, method, params }));
  });
const evaluate = async (expression) =>
  (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.value;

// In-page helpers: click by link target or visible text, wait for text.
const helpers = `
  window.__cm = {
    sleep: (ms) => new Promise((r) => setTimeout(r, ms)),
    go: async (href) => { document.querySelector('nav a[href="' + href + '"], a[href="' + href + '"]').click(); await window.__cm.sleep(1500); },
    clickText: async (...texts) => {
      const el = [...document.querySelectorAll("a, button, [role=button], label")].find((x) => texts.includes(x.textContent.trim()));
      if (!el) return false;
      el.click(); await window.__cm.sleep(1500); return true;
    },
    waitText: async (texts, ms = 60000) => {
      const end = Date.now() + ms;
      while (Date.now() < end) {
        if (texts.some((t) => document.body.innerText.includes(t))) return true;
        await window.__cm.sleep(500);
      }
      return false;
    },
  };`;

const shots = [
  { name: "nuevo-trabajo", open: `await __cm.go("/")` },
  {
    name: "mezclador",
    // The mixer of the most recent finished job. Its title is replaced by a neutral
    // one so the site never shows the name of a third-party song.
    open: `await __cm.go("/queue");
      if (!(await __cm.clickText("Mezclador", "Mixer"))) return false;
      const title = document.querySelector("main h1")?.nextElementSibling;
      if (title) title.textContent = LANG === "en" ? "Demo track · Rehearsal mix" : "Pista de demostración · Mezcla de ensayo";
      window.scrollTo(0, 0);`,
  },
  { name: "modelos", open: `await __cm.go("/models")` },
];

try {
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 800, deviceScaleFactor: 1.5, mobile: false });
  await evaluate(helpers);
  if (!(await evaluate(`__cm.waitText(["Motor listo", "Engine ready"])`))) throw new Error("El motor no arrancó.");

  const setLang = (lang) =>
    evaluate(`(async () => {
      await __cm.go("/settings");
      const select = document.querySelector('[data-testid="locale"]');
      const before = select.value;
      select.value = ${JSON.stringify(lang)};
      select.dispatchEvent(new Event("change", { bubbles: true }));
      await __cm.sleep(800);
      return before;
    })()`);
  const startLang = await setLang("es");

  mkdirSync(outDir, { recursive: true });
  const result = [];
  for (const lang of ["es", "en"]) {
    await setLang(lang);
    for (const shot of shots) {
      const ok = await evaluate(`(async () => { const LANG = ${JSON.stringify(lang)}; ${shot.open}; await __cm.sleep(1200); return true; })()`);
      if (!ok) {
        console.warn(`  ${shot.name} (${lang}): no disponible, se omite`);
        continue;
      }
      const png = Buffer.from((await send("Page.captureScreenshot", { format: "png" })).data, "base64");
      const file = `${shot.name}-${lang}.webp`;
      const info = await sharp(png).webp({ quality: 86 }).toFile(join(outDir, file));
      console.log(`  ${file} ${info.width}×${info.height}`);
      let entry = result.find((r) => r.name === shot.name);
      if (!entry) result.push((entry = { name: shot.name, width: info.width, height: info.height, src: {} }));
      entry.src[lang] = `/projects/cover-maker/${file}`;
    }
  }
  await setLang(startLang);
  await evaluate(`__cm.go("/")`);

  mkdirSync(join(root, "content", "screenshots"), { recursive: true });
  writeFileSync(manifest, JSON.stringify(result.filter((r) => r.src.es && r.src.en), null, 2) + "\n");
  console.log(`Capturas listas: ${manifest}`);
} finally {
  ws.close();
  // The app starts the Python engine as a child process: close the whole tree.
  spawn("taskkill", ["/PID", String(app.pid), "/T", "/F"], { stdio: "ignore" });
}
