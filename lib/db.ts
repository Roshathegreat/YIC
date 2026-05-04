import fs from "node:fs";
import path from "node:path";
import { CountrySchema, type Country } from "./schema";

const DATA_DIR = path.join(process.cwd(), "data", "countries");

export const COUNTRY_IDS = ["japan", "usa", "taiwan"] as const;
export type CountryId = (typeof COUNTRY_IDS)[number];

export class CrossRefError extends Error {}

export function validateCrossRefs(country: Country): void {
  const policyIds = new Set(country.domesticPolicies.map((p) => p.id));
  const companyIds = new Set(country.companies.map((c) => c.id));
  const treatyId = `treaty-${country.id}`;

  const resolves = (id: string, type: "policy" | "company" | "treaty") => {
    if (type === "policy") return policyIds.has(id);
    if (type === "company") return companyIds.has(id);
    return id === treatyId;
  };

  for (const brief of country.lobsterBriefs) {
    if (!resolves(brief.recordId, brief.recordType)) {
      throw new CrossRefError(
        `${country.id}: lobsterBrief recordId "${brief.recordId}" (${brief.recordType}) does not resolve to a known ${brief.recordType} record.`,
      );
    }
  }

  for (const news of country.newsFeed) {
    if (news.sourceRecordId && news.sourceRecordType) {
      if (!resolves(news.sourceRecordId, news.sourceRecordType)) {
        throw new CrossRefError(
          `${country.id}: news "${news.id}" sourceRecordId "${news.sourceRecordId}" (${news.sourceRecordType}) does not resolve.`,
        );
      }
    }
  }
}

export function getCountry(id: CountryId): Country {
  const filePath = path.join(DATA_DIR, `${id}.json`);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw);
  const country = CountrySchema.parse(parsed);
  validateCrossRefs(country);
  return country;
}

export function getAllCountries(): Country[] {
  return COUNTRY_IDS.map((id) => getCountry(id));
}

export function findRecord(
  country: Country,
  recordId: string,
  recordType: "policy" | "company" | "treaty",
): { name: string; href: string } | null {
  if (recordType === "policy") {
    const p = country.domesticPolicies.find((x) => x.id === recordId);
    if (!p) return null;
    return { name: p.name, href: `/countries/${country.id}#${p.id}` };
  }
  if (recordType === "company") {
    const c = country.companies.find((x) => x.id === recordId);
    if (!c) return null;
    return { name: c.name, href: `/countries/${country.id}#${c.id}` };
  }
  return {
    name: `${country.displayName} treaty position`,
    href: `/treaty#treaty-${country.id}`,
  };
}
