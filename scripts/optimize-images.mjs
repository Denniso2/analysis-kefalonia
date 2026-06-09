// Pre-build image optimization for static export (no Next image server).
// Generates resized WebP versions of the photographic assets. Logos stay PNG.
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imgDir = path.join(__dirname, '..', 'public', 'images');

const jobs = [
  { in: 'pest-control.jpg', out: 'pest-control.webp', w: 1024 },
  { in: 'chemical-analysis.jpg', out: 'chemical-analysis.webp', w: 1024 },
  { in: 'disinfection.jpg', out: 'disinfection.webp', w: 1024 },
  { in: 'service-pest-control.jpg', out: 'service-pest-control.webp', w: 1024 },
  { in: 'service-chemical-analysis.jpg', out: 'service-chemical-analysis.webp', w: 1024 },
  { in: 'cta-laboratory.jpg', out: 'cta-laboratory.webp', w: 1600 },
  { in: 'wine-grapes.jpg', out: 'wine-grapes.webp', w: 1024 },
  { in: 'wine-vineyard.jpg', out: 'wine-vineyard.webp', w: 1280 },
];

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('[optimize-images] sharp not available — skipping WebP generation.');
  process.exit(0);
}

for (const job of jobs) {
  const src = path.join(imgDir, job.in);
  const dst = path.join(imgDir, job.out);
  if (!existsSync(src)) {
    console.warn(`[optimize-images] missing ${job.in}, skipping`);
    continue;
  }
  try {
    const info = await sharp(src)
      .resize({ width: job.w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(dst);
    console.log(`[optimize-images] ${job.out}  ${Math.round(info.size / 1024)}KB  ${info.width}x${info.height}`);
  } catch (err) {
    console.warn(`[optimize-images] failed ${job.in}:`, err.message);
  }
}

// The on-page logo renders ~56px tall, but drop-white.png is 700x600. Ship a small
// PNG for the header/footer; the full-size file stays for the app/apple icons.
try {
  const logoSrc = path.join(imgDir, 'drop-white.png');
  if (existsSync(logoSrc)) {
    const info = await sharp(logoSrc)
      .resize({ width: 200, withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true })
      .toFile(path.join(imgDir, 'drop-white-200.png'));
    console.log(`[optimize-images] drop-white-200.png  ${Math.round(info.size / 1024)}KB  ${info.width}x${info.height}`);
  }
} catch (err) {
  console.warn('[optimize-images] failed logo resize:', err.message);
}
