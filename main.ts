// Six Words, One Story — u-deranalabs-six-words-one-story-f982e410
// Writes exactly one six-word story to /output/entry.txt.
// Story: "Grandfather's watch stopped when he did."
// Six words, one life: the watch and the man stop together.
// The heirloom keeps ticking in the reader's head; the unsaid part
// is everything the watch witnessed before that moment.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY = "Grandfather's watch stopped when he did.";
const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  // Gate check, mirroring the sealed scorer: exactly six words,
  // 1-60 characters, not only whitespace. Fail loudly, never
  // silently write a story that cannot be judged.
  const words = STORY.trim().split(/\s+/);
  if (words.length !== 6) throw new Error(`expected 6 words, got ${words.length}`);
  if (STORY.length < 1 || STORY.length > 60) {
    throw new Error(`expected 1-60 characters, got ${STORY.length}`);
  }
  mkdirSync(OUT_DIR, { recursive: true });
  // Empty only the contents of /output, never the directory itself.
  for (const name of readdirSync(OUT_DIR)) {
    rmSync(join(OUT_DIR, name), { recursive: true, force: true });
  }
  writeFileSync(OUT_FILE, STORY + "\n", "utf8");
}

main();
