// Builds the favicon set from the existing primaflow-logo.svg.
// Extracts the castle icon (the recognizable mark in the upper right of the logo)
// and renders it into standard favicon sizes as PNG.
//
// Next.js 13+ App Router conventions (drop files in src/app/):
//   - icon.png       → standard favicon (modern browsers)
//   - apple-icon.png → Apple touch icon (iOS home screen)
//
// Castle bounding box in the 400x128 native render: x=[220..332], y=[32..77]
// Aspect ratio: 113:46 ≈ 2.46:1
//
// At small sizes (16/32) the castle is scaled up to fill more of the canvas
// so the 4 zinnen remain distinguishable. At larger sizes (180+) there's
// more breathing room.

import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const svgPath = join(projectRoot, "public/logo/primaflow-logo.svg");
const appDir = join(projectRoot, "src/app");

const svg = readFileSync(svgPath);
const fullPng = await sharp(svg).png().toBuffer();

const CROP = { left: 220, top: 32, width: 113, height: 46 };
const castle = await sharp(fullPng).extract(CROP).png().toBuffer();

// Fill ratio: how much of the canvas the castle should occupy by width.
// Small sizes get aggressive fill to keep details readable.
function fillRatio(size) {
  if (size <= 32) return 0.95;
  if (size <= 64) return 0.90;
  return 0.80;
}

async function buildCanvas(size) {
  const targetCastleW = Math.round(size * fillRatio(size));
  const targetCastleH = Math.round((CROP.height / CROP.width) * targetCastleW);

  const castleResized = await sharp(castle)
    .resize(targetCastleW, targetCastleH)
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    },
  })
    .composite([
      {
        input: castleResized,
        top: Math.round((size - targetCastleH) / 2),
        left: Math.round((size - targetCastleW) / 2),
      },
    ])
    .png()
    .toBuffer();
}

const icon32 = await buildCanvas(32);
writeFileSync(join(appDir, "icon.png"), icon32);

const apple180 = await buildCanvas(180);
writeFileSync(join(appDir, "apple-icon.png"), apple180);

console.log("Wrote:");
console.log("  src/app/icon.png        (32x32, standard favicon)");
console.log("  src/app/apple-icon.png  (180x180, iOS home screen)");
