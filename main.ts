import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one line. Exactly 132 characters, one sentence, no trailing newline.
// The joke is a reframe: a $2.10 fine for a book 14 years overdue becomes
// a price tag on a childhood — fifteen cents a year.
const LINE =
  "I returned a library book 14 years late and the fine was $2.10, which means the library values my childhood at fifteen cents a year.";

// Gate check, in characters (not bytes): the bounty accepts 1–140
// characters of UTF-8 text, not only white space, on a single line.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 140) {
  throw new Error(`entry is ${charCount} characters, outside the 1–140 gate`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outFile = join("/output", "entry.txt");

mkdirSync("/output", { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// The deliverable is the file, not the console: nothing is printed.
