// Generates branded 1200x630 social-share cards (Open Graph / Twitter) per locale:
// the white ANALYSIS water-drop mark on the brand navy gradient with a localized
// service tagline. Runs as part of `npm run build` (after optimize-images).
//
// Why pre-generate static files (vs. next/og): the site is `output: 'export'`, so we
// keep the same build-time, sharp-based asset pipeline used for the WebP photos. The
// outputs are committed alongside the other images so shares work without a rebuild.
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imgDir = path.join(__dirname, '..', 'public', 'images');
const DROP = path.join(imgDir, 'drop-white.png'); // white water-drop mark on transparent (700x600)

const W = 1200;
const H = 630;
const DROP_W = 224;
const DROP_H = Math.round((DROP_W * 600) / 700); // preserve aspect → 192
const DROP_TOP = 150;

// DejaVu Sans is the one Greek-capable family reliably present on the (WSL/CI) build
// host. The brand name "ANALYSIS" is carried by the tagline ("Chemical Analysis"), so
// the card needs no separate wordmark.
const FONT = 'DejaVu Sans, sans-serif';

const cards = {
  en: {
    tagline: 'PEST CONTROL · CHEMICAL ANALYSIS',
    sub: 'Kefalonia &amp; Ithaca · 30 years of experience',
  },
  el: {
    tagline: 'ΑΠΟΛΥΜΑΝΣΕΙΣ · ΧΗΜΙΚΕΣ ΑΝΑΛΥΣΕΙΣ',
    sub: 'Κεφαλονιά &amp; Ιθάκη · 30 χρόνια εμπειρίας',
  },
};

function background({ tagline, sub }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b0d35"/>
      <stop offset="0.45" stop-color="#191970"/>
      <stop offset="1" stop-color="#0b0d35"/>
    </linearGradient>
    <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="95"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="600" cy="240" r="280" fill="#2a2aa0" opacity="0.55" filter="url(#glow)"/>
  <rect x="565" y="398" width="70" height="3" rx="1.5" fill="#6EC1E4" opacity="0.85"/>
  <text x="600" y="452" text-anchor="middle" font-family="${FONT}" font-size="32" font-weight="700" letter-spacing="4" fill="#6EC1E4">${tagline}</text>
  <text x="600" y="496" text-anchor="middle" font-family="${FONT}" font-size="22" font-weight="400" letter-spacing="1.5" fill="#ffffff" opacity="0.82">${sub}</text>
</svg>`;
}

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('[og-card] sharp not available — skipping.');
  process.exit(0);
}

if (!existsSync(DROP)) {
  console.warn('[og-card] missing drop-white.png — skipping.');
  process.exit(0);
}

const drop = await sharp(DROP).resize({ width: DROP_W }).png().toBuffer();
const left = Math.round((W - DROP_W) / 2);

for (const [loc, copy] of Object.entries(cards)) {
  const info = await sharp(Buffer.from(background(copy)))
    .composite([{ input: drop, left, top: DROP_TOP }])
    .jpeg({ quality: 90, chromaSubsampling: '4:4:4' }) // 4:4:4 keeps the cyan text/edges crisp
    .toFile(path.join(imgDir, `og-${loc}.jpg`));
  console.log(`[og-card] og-${loc}.jpg  ${Math.round(info.size / 1024)}KB  ${info.width}x${info.height}`);
}
