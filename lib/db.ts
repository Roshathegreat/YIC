import { promises as fs } from "node:fs";
import path from "node:path";
import {
  CountrySchema,
  CompanySchema,
  type Country,
  type Company,
} from "./schema";

const DATA_DIR = path.join(process.cwd(), "data");
const COUNTRIES_DIR = path.join(DATA_DIR, "countries");
const COMPANIES_DIR = path.join(DATA_DIR, "companies");

async function readJsonDir<T>(
  dir: string,
  parse: (raw: unknown, file: string) => T,
): Promise<T[]> {
  const files = await fs.readdir(dir);
  const results: T[] = [];
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const raw = await fs.readFile(path.join(dir, file), "utf8");
    results.push(parse(JSON.parse(raw), file));
  }
  return results;
}

export async function getAllCountries(): Promise<Country[]> {
  const list = await readJsonDir(COUNTRIES_DIR, (raw, file) => {
    const parsed = CountrySchema.safeParse(raw);
    if (!parsed.success) {
      throw new Error(
        `Invalid country JSON in ${file}: ${parsed.error.message}`,
      );
    }
    return parsed.data;
  });
  list.sort((a, b) => a.displayName.localeCompare(b.displayName));
  return list;
}

export async function getCountry(id: string): Promise<Country | null> {
  const all = await getAllCountries();
  return all.find((c) => c.id === id) ?? null;
}

export async function getAllCompanies(): Promise<Company[]> {
  const list = await readJsonDir(COMPANIES_DIR, (raw, file) => {
    const parsed = CompanySchema.safeParse(raw);
    if (!parsed.success) {
      throw new Error(
        `Invalid company JSON in ${file}: ${parsed.error.message}`,
      );
    }
    return parsed.data;
  });
  list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

export async function getCompany(id: string): Promise<Company | null> {
  const all = await getAllCompanies();
  return all.find((c) => c.id === id) ?? null;
}

export async function getCompaniesByIds(ids: string[]): Promise<Company[]> {
  const all = await getAllCompanies();
  const map = new Map(all.map((c) => [c.id, c]));
  return ids.map((id) => map.get(id)).filter((c): c is Company => Boolean(c));
}
