// Optimise raw client screenshots (git-ignored) into public/images/work/<slug>/.
// Mockups → WebP 1600w. Full pages → JPEG (WebP caps at 16383px tall): desktop 1440w, mobile 390w.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'Full Page Screenshots';
const OUT = 'public/images/work';
const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const report = [];
for (const dir of fs.readdirSync(SRC, { withFileTypes: true }).filter((d) => d.isDirectory())) {
  const [name, platform] = dir.name.split(' — ');
  const id = slug(name);
  const dest = path.join(OUT, id);
  fs.mkdirSync(dest, { recursive: true });
  const root = path.join(SRC, dir.name);

  // mockups
  const mock = path.join(root, 'Mockups');
  for (const f of fs.readdirSync(mock).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
    const kind = f.match(/(Cover|Desktop|Mobile)/i)?.[1].toLowerCase();
    if (!kind) continue;
    await sharp(path.join(mock, f)).resize({ width: 1600 }).webp({ quality: 80 }).toFile(path.join(dest, `${kind}.webp`));
  }

  // full pages: pick the tallest ≥1200w as desktop, tallest ≤800w as mobile
  const shots = await Promise.all(
    fs.readdirSync(root).filter((f) => /\.png$/i.test(f)).map(async (f) => ({ f, ...(await sharp(path.join(root, f)).metadata()) })),
  );
  const pick = (test) => shots.filter(test).sort((a, b) => b.height / b.width - a.height / a.width)[0];
  const desktop = pick((s) => s.width >= 1200);
  const mobile = pick((s) => s.width <= 800);
  const out = { id, name, platform, mockups: fs.readdirSync(dest).filter((f) => f.endsWith('.webp')) };
  if (desktop) {
    await sharp(path.join(root, desktop.f)).resize({ width: 1440 }).jpeg({ quality: 72, mozjpeg: true }).toFile(path.join(dest, 'fullpage-desktop.jpg'));
    out.desktop = desktop.f;
  }
  if (mobile) {
    await sharp(path.join(root, mobile.f), { limitInputPixels: false }).resize({ width: 390 }).jpeg({ quality: 72, mozjpeg: true }).toFile(path.join(dest, 'fullpage-mobile.jpg'));
    out.mobile = mobile.f;
  }
  report.push(out);
}
console.log(JSON.stringify(report, null, 1));
