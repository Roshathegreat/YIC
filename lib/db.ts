import fs from "node:fs";
import path from "node:path";
import { CountrySchema, type Country, type LobsterBrief } from "./schema";

const DATA_DIR = path.join(process.cwd(), "data", "countries");

export const COUNTRY_IDS = ["japan", "usa", "taiwan"] as const;
export type CountryId = (typeof COUNTRY_IDS)[number];

function assertBriefRefs(country: Country): void {
  const policyIds = new Set(country.domesticPolicies.map((p) => p.id));
  const companyIds = new Set(country.companies.map((c) => c.id));
  const newsIds = new Set(country.newsFeed.map((n) => n.id));
  for (const b of country.lobsterBriefs) {
    let ok = false;
    switch (b.refType) {
      case "treaty":
        ok = b.refId === "treaty";
        break;
      case "policy":
        ok = policyIds.has(b.refId);
        break;
      case "company":
        ok = companyIds.has(b.refId);
        break;
      case "news":
        ok = newsIds.has(b.refId);
        break;
      case "beppu":
        ok = b.refId === "beppu" && Boolean(country.deepNode);
        break;
    }
    if (!ok) {
      throw new Error(
        `Lobster brief "${b.id}" on ${country.id} points to ${b.refType}:${b.refId} but no matching ledger record exists.`,
      );
    }
  }
}

export function getCountry(id: CountryId): Country {
  const filePath = path.join(DATA_DIR, `${id}.json`);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw);
  const country = CountrySchema.parse(parsed);
  assertBriefRefs(country);
  return country;
}

export function getAllCountries(): Country[] {
  return COUNTRY_IDS.map((id) => getCountry(id));
}

// Resolve a brief back to the human-readable title of the source record,
// so kid pages can show "Wooby is talking about: Plastic Resource Circulation Act".
export function resolveBriefTarget(
  country: Country,
  brief: LobsterBrief,
): { title: string; ledgerHref: string } | null {
  switch (brief.refType) {
    case "treaty":
      return {
        title: "UN Plastic Treaty position",
        ledgerHref: `/countries/${country.id}#treaty`,
      };
    case "policy": {
      const p = country.domesticPolicies.find((x) => x.id === brief.refId);
      return p
        ? {
            title: p.name,
            ledgerHref: `/countries/${country.id}#${brief.refId}`,
          }
        : null;
    }
    case "company": {
      const c = country.companies.find((x) => x.id === brief.refId);
      return c
        ? {
            title: c.name,
            ledgerHref: `/countries/${country.id}#${brief.refId}`,
          }
        : null;
    }
    case "news": {
      const n = country.newsFeed.find((x) => x.id === brief.refId);
      return n
        ? {
            title: n.headline,
            ledgerHref: `/countries/${country.id}#${brief.refId}`,
          }
        : null;
    }
    case "beppu":
      return {
        title: "Beppu deep node",
        ledgerHref: `/countries/${country.id}#beppu`,
      };
  }
}
