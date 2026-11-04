// Bakes soft edges into a cut-out photo's transparency, so the page needs no CSS
// mask (a mask would also clip the glow drawn around the silhouette).
//   node scripts/fade-cutout.mjs <in.png> <out.webp> <width> <sides 0..0.5> <bottomStart 0..1>
import sharp from "sharp";

const [, , input, output, width = "1400", sides = "0", bottom = "0.7"] = process.argv;
const side = +sides, start = +bottom;
const smooth = (t) => t * t * (3 - 2 * t);

const { data, info } = await sharp(input).ensureAlpha().resize({ width: +width }).raw().toBuffer({ resolveWithObject: true });
for (let y = 0; y < info.height; y++) {
  const v = y / (info.height - 1);
  const fy = v <= start ? 1 : 1 - smooth((v - start) / (1 - start));
  for (let x = 0; x < info.width; x++) {
    const u = x / (info.width - 1);
    const fx = side > 0 ? smooth(Math.min(1, Math.min(u, 1 - u) / side)) : 1;
    const i = (y * info.width + x) * 4 + 3;
    data[i] = Math.round(data[i] * fx * fy);
  }
}
const out = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).webp({ quality: 86, alphaQuality: 90 }).toFile(output);
console.log(output, out.width, out.height, out.size);
