import type { Country, Company } from "./schema";

export type CountryRanking = {
  country: Country;
  envScore: number;
};

export type CompanyRanking = {
  company: Company;
  combinedScore: number;
};

const STANCE_BONUS: Record<string, number> = {
  "high-ambition": 1.5,
  undecided: 0,
  "low-ambition": -1,
};

export function scoreCountry(c: Country): number {
  const recyclingComponent = c.stats.recyclingRatePct / 20;
  const leakagePenalty = Math.min(
    5,
    c.stats.oceanLeakageEstimateTonsPerYear / 100_000,
  );
  const wastePenalty = Math.min(5, c.stats.plasticWastePerCapitaKg / 30);
  const treaty = STANCE_BONUS[c.stats.treatyStance] ?? 0;
  const raw = recyclingComponent - leakagePenalty - wastePenalty + treaty;
  return Math.round(raw * 100) / 100;
}

export function scoreCompany(c: Company): number {
  const transparency = c.stats.transparencyScore;
  const commitment = c.stats.commitmentScore;
  const recycled =
    c.stats.recycledContentPct === null
      ? 0
      : Math.min(5, c.stats.recycledContentPct / 20);
  const footprintPenalty =
    c.stats.plasticFootprintTonsPerYear === null
      ? 0
      : Math.min(5, c.stats.plasticFootprintTonsPerYear / 1_000_000);
  const raw = transparency + commitment + recycled - footprintPenalty * 2;
  return Math.round(raw * 100) / 100;
}

export function rankCountries(countries: Country[]): CountryRanking[] {
  return countries
    .map((country) => ({ country, envScore: scoreCountry(country) }))
    .sort((a, b) => b.envScore - a.envScore);
}

export function rankCompanies(companies: Company[]): CompanyRanking[] {
  return companies
    .map((company) => ({ company, combinedScore: scoreCompany(company) }))
    .sort((a, b) => b.combinedScore - a.combinedScore);
}
