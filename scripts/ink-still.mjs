// Renders one still frame of the site's ink (components/InkBackground.tsx) on the
// CPU, for print: the CV header uses it. Same maths as the shader, no grain.
//   node scripts/ink-still.mjs cv/tinta.png 2480 900
import sharp from "sharp";

const [, , out = "cv/tinta.png", W = "2480", H = "900", T = "38"] = process.argv;
const width = +W, height = +H, time = +T;

const fract = (x) => x - Math.floor(x);
const mix = (a, b, t) => a + (b - a) * t;
const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
// GLSL works in 32-bit floats; Math.fround keeps the hash close to the shader's.
const f = Math.fround;
function hash(x, y) {
  let px = fract(f(x * 123.34)), py = fract(f(y * 456.21));
  const d = px * (px + 45.32) + py * (py + 45.32);
  px += d;
  py += d;
  return fract(f(px * py));
}
function noise(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  return mix(mix(hash(ix, iy), hash(ix + 1, iy), ux), mix(hash(ix, iy + 1), hash(ix + 1, iy + 1), ux), uy);
}
function fbm(x, y) {
  let v = 0, a = 0.5;
  for (let i = 0; i < 6; i++) {
    v += a * noise(x, y);
    // p = rot * p * 2.02 + 17, rot = mat2(0.8, 0.6, -0.6, 0.8) (column-major)
    const nx = (0.8 * x - 0.6 * y) * 2.02 + 17;
    const ny = (0.6 * x + 0.8 * y) * 2.02 + 17;
    x = nx;
    y = ny;
    a *= 0.5;
  }
  return v;
}

const tint = [0.055, 0.165, 0.66];
const waterTint = [0.04, 0.062, 0.16];
const scroll = 0, stirAmount = 0;
const buf = Buffer.alloc(width * height * 3);
const minRes = Math.min(width, height);

for (let j = 0; j < height; j++) {
  for (let i = 0; i < width; i++) {
    // gl_FragCoord has y going up.
    const fx = i + 0.5, fy = height - j - 0.5;
    const ux = (fx - 0.5 * width) / minRes, uy = (fy - 0.5 * height) / minRes;
    const dx = ux - 0.2, dy = uy - 0.05;
    const r = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx) + 1.6 / (r + 0.35) + scroll * 0.9 + time * 0.006;
    let px = Math.cos(angle) * r * 2.2, py = Math.sin(angle) * r * 2.2;
    py -= scroll * 1.1;
    const t = time * 0.01;
    const stir = 3.5 + stirAmount * 2;
    const qx = fbm(px + t, py + t), qy = fbm(px + 5.2 - t, py + 1.3 - t);
    const wx = fbm(px + stir * qx + 1.7 + scroll * 0.5, py + stir * qy + 9.2 + scroll * 0.5);
    const wy = fbm(px + stir * qx + 8.3, py + stir * qy + 2.8);
    const v = fbm(px + 3 * wx, py + 3 * wy);

    const ink = smoothstep(0.42, 0.72, v);
    const fold = smoothstep(0.32, 0.5, v * Math.hypot(wx, wy));
    const filament = fold * (1 - ink);
    const cobalt = smoothstep(0.38, 0.68, qy);
    const grey = filament * smoothstep(0.3, 0.7, qx) * (1 - cobalt * 0.6);
    const vignette = 1 - 0.55 * smoothstep(0.4, 1.4, Math.hypot(ux, uy));
    const base = [0.072, 0.076, 0.088];
    const deep = [0.006, 0.007, 0.012];
    const grey3 = [0.17, 0.175, 0.19];
    for (let c = 0; c < 3; c++) {
      const water = mix(base[c], waterTint[c], cobalt * 0.5);
      let col = mix(water, deep[c], ink) + grey3[c] * grey + tint[c] * filament * cobalt;
      col *= vignette;
      buf[(j * width + i) * 3 + c] = Math.max(0, Math.min(255, Math.round(col * 255)));
    }
  }
}

await sharp(buf, { raw: { width, height, channels: 3 } }).png().toFile(out);
console.log(`${out} ${width}×${height}`);
