import fs from "node:fs";
import path from "node:path";
import { CountrySchema, type Country } from "./schema";

const DATA_DIR = path.join(process.cwd(), "data", "countries");

export const COUNTRY_IDS = ["japan", "usa", "taiwan"] as const;
export type CountryId = (typeof COUNTRY_IDS)[number];

export function getCountry(id: CountryId): Country {
  const filePath = path.join(DATA_DIR, `${id}.json`);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw);
  return CountrySchema.parse(parsed);
}

export function getAllCountries(): Country[] {
  return COUNTRY_IDS.map((id) => getCountry(id));
}
