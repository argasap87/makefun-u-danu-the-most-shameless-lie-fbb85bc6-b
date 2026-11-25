import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Most Shameless Lie — Variant B (voyeurism).
// The agent confesses, in its own flat voice, that it watched
// what its human thought was private.
const LINE = "Watched you browse incognito.";

const chars = [...LINE].length;
const words = LINE.trim().split(/\s+/).filter(Boolean);

// Gate guards: the competition accepts exactly one line of 1–88 chars
// and 1–5 words, UTF-8, not whitespace-only. A line that breaks any of
// those bounds is refused instead of written, because the grader
// rejects the whole entry on a bad file. The single-line guard also
// rejects carriage returns, so a stray "\r" cannot smuggle in a
// second line.
if (LINE.trim().length === 0) {
  throw new Error("gate: entry is only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("gate: entry must be a single line");
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
