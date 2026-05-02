import fs from "node:fs";
import path from "node:path";
import { CountrySchema } from "../lib/schema";

const DATA_DIR = path.join(process.cwd(), "data", "countries");
const COUNTRIES = ["japan", "usa", "taiwan"];

let failed = 0;
for (const id of COUNTRIES) {
  const filePath = path.join(DATA_DIR, `${id}.json`);
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    CountrySchema.parse(parsed);
    console.log(`ok  data/countries/${id}.json`);
  } catch (err) {
    failed += 1;
    console.error(`FAIL data/countries/${id}.json`);
    console.error(err instanceof Error ? err.message : err);
  }
}

if (failed > 0) {
  console.error(`\n${failed} file(s) failed validation`);
  process.exit(1);
}
console.log("\nAll country data valid.");
