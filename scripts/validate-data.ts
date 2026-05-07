import fs from "node:fs";
import path from "node:path";
import { CountrySchema, CompanySchema } from "../lib/schema";

const DATA_DIR = path.join(process.cwd(), "data");

function validateDir(
  dir: string,
  schema: typeof CountrySchema | typeof CompanySchema,
  label: string,
): number {
  const fullDir = path.join(DATA_DIR, dir);
  if (!fs.existsSync(fullDir)) {
    console.error(`MISSING ${dir}/ directory`);
    return 1;
  }
  let failed = 0;
  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".json"));
  for (const file of files) {
    const filePath = path.join(fullDir, file);
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(raw);
      schema.parse(parsed);
      console.log(`ok  data/${dir}/${file}`);
    } catch (err) {
      failed += 1;
      console.error(`FAIL data/${dir}/${file}`);
      console.error(err instanceof Error ? err.message : err);
    }
  }
  console.log(`-- ${label}: ${files.length - failed}/${files.length} valid`);
  return failed;
}

const countryFails = validateDir("countries", CountrySchema, "Countries");
const companyFails = validateDir("companies", CompanySchema, "Companies");
const total = countryFails + companyFails;

if (total > 0) {
  console.error(`\n${total} file(s) failed validation`);
  process.exit(1);
}

console.log("\nAll data valid.");
