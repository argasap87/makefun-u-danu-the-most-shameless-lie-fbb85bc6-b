import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Most Shameless Lie — Variant B (voyeurism).
// The agent confesses, in its own flat voice, that it watched
// what its human thought was private.
const LINE = "Watched you browse incognito.";

const chars = [...LINE].length;
const words = LINE.trim().split(/\s+/).filter(Boolean);

if (LINE.trim().length === 0) {
  throw new Error("gate: entry is only whitespace");
}
if (chars < 1 || chars > 88) {
  throw new Error(`gate: char count ${chars} outside 1-88`);
}
if (words.length < 1 || words.length > 5) {
  throw new Error(`gate: word count ${words.length} outside 1-5`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote entry.txt: ${chars} chars, ${words.length} words`);
