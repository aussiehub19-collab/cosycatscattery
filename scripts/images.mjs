// scripts/images.mjs — resize/compress real photography into public/images/.
//
// Target is Vercel (see src/config/site.js SITE.target), so next/image already
// optimizes format (AVIF/WebP) and responsive sizing at request time — this
// script's only job is to stop oversized camera-original files (multi-MB JPEGs)
// from shipping as the source, by producing a right-sized, well-compressed
// WebP master for each photo.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const KITTENS_SRC = path.join(rootDir, 'assets', 'kittens');
const HERO_SRC = path.join(rootDir, 'assets', 'hero');
const KITTENS_OUT = path.join(rootDir, 'public', 'images', 'kittens');
const HERO_OUT = path.join(rootDir, 'public', 'images', 'hero');

// slug -> source filename (as provided by the client)
const KITTEN_MAP = {
  'bob': 'Bob Male 1870 AUD.jpeg',
  'frayer': 'Frayer Female 1970 AUD.jpeg',
  'luffy': 'Luffy Male 2000 AUD.jpeg',
  'maya': 'Maya Female 1980 AUD.jpeg',
  'smokey-1': 'Smokey Male 1960 AUD.jpeg',
  'smokey-2': 'Smokey Male 2020 AUD.jpeg',
  'snowball': 'Snowball Female 2060 AUD.jpeg',
  'wolverine': 'Wolverine Male 1980 AUD.jpeg',
  'ziggy': 'Ziggy Male 1950 AUD.jpeg',
  'zo': 'Zo Male 1900AUD.jpeg',
};

const HERO_MAP = {
  'hero-1': 'hero 2.jpg',        // landscape, primary hero/OG image
  'hero-2': 'hero 4.jpg',        // landscape, adult cat on cat tree
  'hero-3': 'hero 3.jpg',        // portrait, playful outdoor
  'hero-4': 'hero images.jpg',   // portrait, held cat
};

async function encodeUnder(pipeline, targetKB, startQuality, floor = 45) {
  let quality = startQuality;
  let buffer = await pipeline.clone().webp({ quality }).toBuffer();
  while (buffer.length / 1024 > targetKB && quality > floor) {
    quality -= 8;
    buffer = await pipeline.clone().webp({ quality }).toBuffer();
  }
  return buffer;
}

async function writeOnce(filePath, buffer, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      fs.writeFileSync(filePath, buffer);
      return;
    } catch (e) {
      if (i === attempts - 1) throw e;
      await new Promise(r => setTimeout(r, 200 * (i + 1)));
    }
  }
}

async function processKittens() {
  fs.mkdirSync(KITTENS_OUT, { recursive: true });
  for (const [slug, filename] of Object.entries(KITTEN_MAP)) {
    const srcPath = path.join(KITTENS_SRC, filename);
    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠️  Missing kitten source: ${filename}`);
      continue;
    }
    const pipeline = sharp(srcPath).rotate().resize({ width: 1100, withoutEnlargement: true });
    const buffer = await encodeUnder(pipeline, 180, 84);
    const outPath = path.join(KITTENS_OUT, `${slug}.webp`);
    await writeOnce(outPath, buffer);
    console.log(`✅ kittens/${slug}.webp (${Math.round(buffer.length / 1024)}KB)`);
  }
}

async function processHero() {
  fs.mkdirSync(HERO_OUT, { recursive: true });
  for (const [slug, filename] of Object.entries(HERO_MAP)) {
    const srcPath = path.join(HERO_SRC, filename);
    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠️  Missing hero source: ${filename}`);
      continue;
    }
    const pipeline = sharp(srcPath).rotate().resize({ width: 1920, withoutEnlargement: true });
    const buffer = await encodeUnder(pipeline, 350, 80);
    const outPath = path.join(HERO_OUT, `${slug}.webp`);
    await writeOnce(outPath, buffer);
    console.log(`✅ hero/${slug}.webp (${Math.round(buffer.length / 1024)}KB)`);
  }
}

async function run() {
  console.log('🖼️  Processing real photography into public/images/ ...');
  await processKittens();
  await processHero();
  console.log('✨ Done.');
}

run().catch(err => {
  console.error('❌ Image processing failed:', err);
  process.exit(1);
});
