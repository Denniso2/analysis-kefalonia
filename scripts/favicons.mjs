// Generates the favicon set from the brand water-drop mark.
//
// The source art (drop-white.png) is a WHITE drop on a transparent background. On
// its own it is invisible on the white surfaces that render favicons — Google
// search results, light browser tabs — which is why the icon looked "pure white".
// We composite it onto a solid navy (#191970, the brand midnight blue used in the
// header/footer) tile so the mark stays legible everywhere: search results,
// light/dark tabs, and the iOS home screen (where transparency would turn black).
import path from 'node:path';
import { existsSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const imgDir = path.join(root, 'public', 'images');

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('[favicons] sharp not available — skipping favicon generation.');
  process.exit(0);
}

const SRC = path.join(imgDir, 'drop-white.png');
if (!existsSync(SRC)) {
  console.warn('[favicons] missing drop-white.png — skipping.');
  process.exit(0);
}

// Brand midnight blue (tailwind.config.ts `navy`).
const NAVY = { r: 0x19, g: 0x19, b: 0x70, alpha: 1 };

// A solid navy square of `size`px with the white drop centered. The mark fills
// ~68% of the tile so it stays readable when scaled down to a 16px tab icon.
async function tile(size) {
  const inner = Math.round(size * 0.68);
  const drop = await sharp(SRC)
    .resize({ width: inner, height: inner, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: NAVY } })
    .composite([{ input: drop, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// Assemble a real multi-resolution .ico whose frames are PNG-encoded (the modern
// ICO variant, understood by every current browser and by Google's crawler).
function buildIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // image type: 1 = icon
  header.writeUInt16LE(frames.length, 4); // frame count

  let offset = 6 + frames.length * 16; // data starts after the directory
  const dir = frames.map((f) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(f.size >= 256 ? 0 : f.size, 0); // width  (0 means 256)
    e.writeUInt8(f.size >= 256 ? 0 : f.size, 1); // height (0 means 256)
    e.writeUInt8(0, 2); // palette size (0 = none)
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(f.buf.length, 8); // frame byte length
    e.writeUInt32LE(offset, 12); // frame byte offset
    offset += f.buf.length;
    return e;
  });

  return Buffer.concat([header, ...dir, ...frames.map((f) => f.buf)]);
}

// favicon.ico → 16/32/48 for browser tabs, Google, and bare /favicon.ico probes.
const icoFrames = [];
for (const size of [16, 32, 48]) icoFrames.push({ size, buf: await tile(size) });
writeFileSync(path.join(root, 'public', 'favicon.ico'), buildIco(icoFrames));
console.log('[favicons] public/favicon.ico  16/32/48');

// 192px PNG (a multiple of 48, per Google's favicon guidance) for high-DPI use.
writeFileSync(path.join(imgDir, 'icon-192.png'), await tile(192));
console.log('[favicons] public/images/icon-192.png  192x192');

// 180px Apple touch icon (iOS home-screen standard).
writeFileSync(path.join(imgDir, 'apple-icon.png'), await tile(180));
console.log('[favicons] public/images/apple-icon.png  180x180');
