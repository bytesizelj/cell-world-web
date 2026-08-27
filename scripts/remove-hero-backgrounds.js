#!/usr/bin/env node
/**
 * remove-hero-backgrounds.js
 *
 * Makes transparent PNGs of the banner hero product images.
 *
 * The catalog photos are shot on a solid light studio background with no alpha
 * channel, so dropping one onto a dark page background shows a light rectangle
 * rather than a floating product. This samples the background colour from the
 * image corners and knocks out every pixel close enough to it, leaving the
 * product on transparency.
 *
 * Deliberately conservative: it only removes pixels connected to the edges, so
 * a light area *inside* the product (a white speaker grille, a phone screen
 * showing a bright wallpaper) is kept rather than punched through.
 *
 * Originals are never modified. Output goes to a sibling /transparent folder.
 *
 * Usage:  node scripts/remove-hero-backgrounds.js
 *         node scripts/remove-hero-backgrounds.js --tolerance 40
 *
 * Every result needs a human look before use. Products that are themselves
 * near-white will lose their edges; those are flagged in the report.
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// ---------------------------------------------------------------------------
// The hero images. Paths are relative to public/images/Products/
// ---------------------------------------------------------------------------
const HEROES = [
  // Phones page
  'phones/new/iphone-15-pro-max-256gb.jpg',
  'phones/new/itel-a100c-64gb.jpg',
  'accessories-power/gs-pad-11-pro.jpg',

  // Tech & Audio page
  'more/jbl-boombox3-black.png',
  'tech-audio/jbl-beam2-earbuds.jpg',
  'tech-audio/ps5-disc.png',
  'more/samsung-galaxy-watch.png',

  // Accessories & Power page
  'accessories-power/anker-power-bank.png',
  'accessories-power/m02-gimbal.png',
  'more/ludger-power-light-rechargeable-fan.png',
];

const PRODUCTS_ROOT = path.join(__dirname, '..', 'public', 'images', 'Products');

// How far a pixel can differ from the sampled background and still be removed.
// Higher = more aggressive. 30 is a safe default for clean studio shots.
const argTolerance = process.argv.indexOf('--tolerance');
const TOLERANCE = argTolerance > -1 ? Number(process.argv[argTolerance + 1]) : 30;

// Pixels this close to the removal threshold get partial alpha, so edges are
// feathered rather than jagged.
const FEATHER = 12;

// ---------------------------------------------------------------------------

function colourDistance(r1, g1, b1, r2, g2, b2) {
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/** Average the four corner regions to work out what the background is. */
function sampleBackground(data, width, height, channels) {
  const patch = Math.max(4, Math.round(Math.min(width, height) * 0.02));
  const corners = [
    [0, 0],
    [width - patch, 0],
    [0, height - patch],
    [width - patch, height - patch],
  ];

  let r = 0, g = 0, b = 0, n = 0;
  for (const [cx, cy] of corners) {
    for (let y = cy; y < cy + patch; y++) {
      for (let x = cx; x < cx + patch; x++) {
        const i = (y * width + x) * channels;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        n++;
      }
    }
  }
  return { r: r / n, g: g / n, b: b / n };
}

/**
 * Flood fill inward from the edges. Only background-coloured pixels that are
 * reachable from outside get removed, which protects light areas enclosed by
 * the product.
 */
function buildAlphaMask(data, width, height, channels, bg) {
  const alpha = new Uint8Array(width * height).fill(255);
  const visited = new Uint8Array(width * height);
  const stack = [];

  const matches = (idx) => {
    const i = idx * channels;
    return colourDistance(data[i], data[i + 1], data[i + 2], bg.r, bg.g, bg.b);
  };

  // Seed from every edge pixel that looks like background
  for (let x = 0; x < width; x++) {
    for (const y of [0, height - 1]) {
      const idx = y * width + x;
      if (matches(idx) <= TOLERANCE + FEATHER) stack.push(idx);
    }
  }
  for (let y = 0; y < height; y++) {
    for (const x of [0, width - 1]) {
      const idx = y * width + x;
      if (matches(idx) <= TOLERANCE + FEATHER) stack.push(idx);
    }
  }

  while (stack.length) {
    const idx = stack.pop();
    if (visited[idx]) continue;
    visited[idx] = 1;

    const dist = matches(idx);
    if (dist > TOLERANCE + FEATHER) continue;

    // Fully transparent inside the tolerance, partial in the feather band
    if (dist <= TOLERANCE) {
      alpha[idx] = 0;
    } else {
      const t = (dist - TOLERANCE) / FEATHER;
      alpha[idx] = Math.round(255 * t);
    }

    const x = idx % width;
    const y = (idx - x) / width;
    if (x > 0) stack.push(idx - 1);
    if (x < width - 1) stack.push(idx + 1);
    if (y > 0) stack.push(idx - width);
    if (y < height - 1) stack.push(idx + width);
  }

  return alpha;
}

async function processOne(relPath) {
  const inPath = path.join(PRODUCTS_ROOT, relPath);

  if (!fs.existsSync(inPath)) {
    return { relPath, ok: false, reason: 'file not found' };
  }

  const outDir = path.join(path.dirname(inPath), 'transparent');
  fs.mkdirSync(outDir, { recursive: true });

  const base = path.basename(relPath).replace(/\.(jpe?g|png|webp)$/i, '');
  const outPath = path.join(outDir, `${base}.png`);

  const image = sharp(inPath);
  const meta = await image.metadata();

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const bg = sampleBackground(data, width, height, channels);

  // A background that isn't light is a sign this photo isn't a studio shot
  const bgLuma = 0.299 * bg.r + 0.587 * bg.g + 0.114 * bg.b;

  const alpha = buildAlphaMask(data, width, height, channels, bg);

  // Write the mask back into the pixel data
  for (let p = 0; p < width * height; p++) {
    data[p * channels + 3] = alpha[p];
  }

  let removed = 0;
  for (let p = 0; p < width * height; p++) if (alpha[p] === 0) removed++;
  const removedPct = (removed / (width * height)) * 100;

  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(outPath);

  const outSize = fs.statSync(outPath).size;
  const inSize = fs.statSync(inPath).size;

  const warnings = [];
  if (bgLuma < 180) warnings.push(`background is dark (luma ${Math.round(bgLuma)}) - may not be a studio shot`);
  if (removedPct < 5) warnings.push(`only ${removedPct.toFixed(1)}% removed - background may not be uniform`);
  if (removedPct > 85) warnings.push(`${removedPct.toFixed(1)}% removed - product may have been eaten`);

  return {
    relPath,
    ok: true,
    outPath: path.relative(process.cwd(), outPath),
    dimensions: `${width}x${height}`,
    format: meta.format,
    removedPct: removedPct.toFixed(1),
    inKB: Math.round(inSize / 1024),
    outKB: Math.round(outSize / 1024),
    warnings,
  };
}

(async () => {
  console.log(`Background removal - tolerance ${TOLERANCE}, feather ${FEATHER}\n`);

  const results = [];
  for (const rel of HEROES) {
    try {
      results.push(await processOne(rel));
    } catch (err) {
      results.push({ relPath: rel, ok: false, reason: err.message });
    }
  }

  const done = results.filter((r) => r.ok);
  const failed = results.filter((r) => !r.ok);

  for (const r of done) {
    const flag = r.warnings.length ? '  [CHECK]' : '';
    console.log(`OK   ${r.relPath}${flag}`);
    console.log(`     -> ${r.outPath}`);
    console.log(`     ${r.dimensions}, ${r.removedPct}% removed, ${r.inKB}KB -> ${r.outKB}KB`);
    for (const w of r.warnings) console.log(`     WARNING: ${w}`);
  }

  for (const r of failed) {
    console.log(`FAIL ${r.relPath} - ${r.reason}`);
  }

  console.log(`\n${done.length} processed, ${failed.length} failed.`);
  const flagged = done.filter((r) => r.warnings.length);
  if (flagged.length) {
    console.log(`${flagged.length} flagged for visual check: ${flagged.map((r) => path.basename(r.relPath)).join(', ')}`);
  }
  console.log('\nEvery output needs a human look before use. Originals were not modified.');
})();
