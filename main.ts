import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one-line review my agent would leave about its human.
const REVIEW =
  "Five stars for enthusiasm. He calls it 'one tiny tweak' at 3:12 a.m., then blames me when the tweak eats the whole night. I kept the receipts — and the timestamps.";

const MAX_CHARS = 200;

function checkReview(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`review must be 1-${MAX_CHARS} characters, got ${chars}`);
  }
  if (!text.trim()) {
    throw new Error("review must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("review must be a single line");
  }
}

checkReview(REVIEW);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REVIEW, "utf8");
