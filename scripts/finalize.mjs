// Post-export finalize: correct the static <html lang> for Greek pages so crawlers
// see the right language (the root layout defaults to lang="en"; the client also
// corrects it at runtime, this fixes the static HTML for SEO).
import path from 'node:path';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'out');

let patched = 0;

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (entry.name.endsWith('.html')) {
      const rel = path.relative(outDir, full).split(path.sep);
      if (rel[0] === 'el') {
        const html = await readFile(full, 'utf8');
        const fixed = html.replace('<html lang="en"', '<html lang="el"');
        if (fixed !== html) {
          await writeFile(full, fixed, 'utf8');
          patched += 1;
        }
      }
    }
  }
}

await walk(outDir);
console.log(`[finalize] set lang="el" on ${patched} Greek page(s).`);
