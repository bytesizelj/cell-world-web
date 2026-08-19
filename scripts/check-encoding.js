#!/usr/bin/env node
/**
 * Guards against UTF-8-read-as-Windows-1252 mojibake reaching the repo.
 *
 * How the corruption happens: PowerShell 5.1's `Get-Content` defaults to the
 * system ANSI codepage (Windows-1252), so reading a UTF-8 file and writing it
 * back mangles every non-ASCII character - a bullet turns into three Latin-1
 * characters, an emoji into four. Run the same script twice and the damage
 * nests, so a lone degree sign can end up seven characters wide.
 *
 * (Deliberately no literal examples in this file - they would trip the check.)
 *
 * Detection is a round-trip rather than a character blocklist: a run of
 * non-ASCII text is mojibake only if encoding it back to cp1252 produces
 * VALID UTF-8. Genuinely accented text ("Câbles", "360°", "Téléphones")
 * encodes to lone high bytes that are not valid UTF-8, so it is never flagged.
 *
 * Usage:
 *   node scripts/check-encoding.js            # check the whole repo
 *   node scripts/check-encoding.js --staged   # check staged content only (hook)
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const EXT = /\.(ts|tsx|js|jsx|json|md|css)$/;
const SKIP = new Set(['node_modules', '.next', '.git', 'out', 'dist']);

// cp1252 differs from latin1 only across 0x80-0x9F. The five slots cp1252 leaves
// undefined (0x81 0x8D 0x8F 0x90 0x9D) come back as C1 control code points.
const CP1252_HIGH = {
  0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84, 0x2026: 0x85, 0x2020: 0x86,
  0x2021: 0x87, 0x02C6: 0x88, 0x2030: 0x89, 0x0160: 0x8A, 0x2039: 0x8B, 0x0152: 0x8C,
  0x017D: 0x8E, 0x2018: 0x91, 0x2019: 0x92, 0x201C: 0x93, 0x201D: 0x94, 0x2022: 0x95,
  0x2013: 0x96, 0x2014: 0x97, 0x02DC: 0x98, 0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B,
  0x0153: 0x9C, 0x017E: 0x9E, 0x0178: 0x9F,
};

function toCp1252Bytes(str) {
  const out = Buffer.alloc(str.length);
  for (let i = 0; i < str.length; i++) {
    const cp = str.codePointAt(i);
    if (cp > 0xFFFF) return null;
    if (cp <= 0xFF) out[i] = cp;
    else if (CP1252_HIGH[cp] !== undefined) out[i] = CP1252_HIGH[cp];
    else return null;
  }
  return out;
}

function decodeUtf8Strict(buf) {
  const s = buf.toString('utf8');
  if (s.includes('�')) return null;
  return Buffer.compare(Buffer.from(s, 'utf8'), buf) === 0 ? s : null;
}

/** Returns the repaired text if `run` is mojibake, else null. */
function repair(run) {
  let cur = run;
  for (let i = 0; i < 6; i++) {
    const bytes = toCp1252Bytes(cur);
    if (!bytes) break;
    const dec = decodeUtf8Strict(bytes);
    if (dec === null || dec === cur) break;
    cur = dec;
  }
  return cur === run ? null : cur;
}

function findings(content, label) {
  const out = [];
  if (content.charCodeAt(0) === 0xFEFF) out.push({ line: 1, from: '<BOM>', to: '<no BOM>' });
  for (const m of content.matchAll(/[^\x00-\x7F]+/g)) {
    const fixed = repair(m[0]);
    if (fixed) out.push({ line: content.slice(0, m.index).split('\n').length, from: m[0], to: fixed });
  }
  return out.map((f) => ({ ...f, label }));
}

function repoFiles() {
  const files = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) { if (!SKIP.has(e.name)) walk(path.join(dir, e.name)); }
      else if (EXT.test(e.name)) files.push(path.join(dir, e.name));
    }
  })(process.cwd());
  return files;
}

const staged = process.argv.includes('--staged');
let all = [];

if (staged) {
  const names = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACM'],
    { encoding: 'utf8' }).split('\n').map((s) => s.trim()).filter((s) => s && EXT.test(s));
  for (const n of names) {
    // read the STAGED blob, not the working tree - that is what gets committed
    const buf = execFileSync('git', ['show', ':' + n], { maxBuffer: 64 * 1024 * 1024 });
    all = all.concat(findings(buf.toString('utf8'), n));
  }
} else {
  for (const f of repoFiles()) {
    const rel = path.relative(process.cwd(), f).replace(/\\/g, '/');
    all = all.concat(findings(fs.readFileSync(f, 'utf8'), rel));
  }
}

if (!all.length) {
  console.log('encoding check: clean' + (staged ? ' (staged)' : ''));
  process.exit(0);
}

console.error('\n  Encoding check FAILED - mojibake detected\n');
console.error('  UTF-8 text was read as Windows-1252 somewhere in your toolchain.');
console.error('  PowerShell 5.1 does this by default: Get-Content without -Encoding utf8.\n');
for (const f of all.slice(0, 40))
  console.error('    ' + f.label + ':' + f.line + '  ' + JSON.stringify(f.from) + '  should be  ' + JSON.stringify(f.to));
if (all.length > 40) console.error('    ... and ' + (all.length - 40) + ' more');
console.error('\n  Fix the source of the corruption, then re-stage. In PowerShell:');
console.error('    Get-Content -Raw -Encoding utf8 $p');
console.error('    [System.IO.File]::WriteAllText($p, $s, [System.Text.UTF8Encoding]::new($false))');
console.error('  (the $false suppresses the BOM - [Text.Encoding]::UTF8 emits one)\n');
console.error('  To bypass this check for one commit: git commit --no-verify\n');
process.exit(1);
