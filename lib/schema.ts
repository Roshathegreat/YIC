import { z } from "zod";

const ISODate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD");
const HexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/);
const Score0to5 = z.number().min(0).max(5);

export const SourceSchema = z.object({
  url: z.string().url(),
  publisher: z.string().min(1),
  accessedDate: ISODate,
  archiveUrl: z.string().url().optional(),
  verified: z.boolean().optional(),
  note: z.string().optional(),
});

export const PolicySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  enacted: ISODate.optional(),
  summary: z.string().min(1),
  scope: z.enum(["national", "subnational", "voluntary", "proposed"]),
  sources: z.array(SourceSchema),
  lastUpdated: ISODate,
});

export const NewsItemSchema = z.object({
  id: z.string().min(1),
  headline: z.string().min(1),
  url: z.string().url(),
  publisher: z.string().min(1),
  publishedDate: ISODate,
  summary: z.string().min(1),
});

export const CountryStatsSchema = z.object({
  population: z.number().int().nonnegative(),
  plasticWastePerCapitaKg: z.number().nonnegative(),
  mismanagedWasteTonsPerYear: z.number().nonnegative(),
  recyclingRatePct: z.number().min(0).max(100),
  oceanLeakageEstimateTonsPerYear: z.number().nonnegative(),
  treatyStance: z.enum(["high-ambition", "low-ambition", "undecided"]),
});

export const WoobyVoiceSchema = z.object({
  headline: z.string().min(1),
  narrative: z.string().min(1),
  iconEmoji: z.string().min(1),
});

export const CountrySchema = z.object({
  id: z.string().min(1),
  displayName: z.string().min(1),
  iso3: z.string().length(3),
  m49: z.number().int(),
  region: z.enum([
    "asia",
    "europe",
    "north-america",
    "south-america",
    "africa",
    "oceania",
  ]),
  accentColor: HexColor,
  stats: CountryStatsSchema,
  policies: z.array(PolicySchema),
  companyIds: z.array(z.string()),
  newsFeed: z.array(NewsItemSchema),
  wooby: WoobyVoiceSchema,
  sources: z.array(SourceSchema),
  lastUpdated: ISODate,
});

export const CompanyStatsSchema = z.object({
  plasticFootprintTonsPerYear: z.number().nonnegative().nullable(),
  brandAuditRank: z.number().int().positive().nullable(),
  recycledContentPct: z.number().min(0).max(100).nullable(),
  commitmentScore: Score0to5,
  transparencyScore: Score0to5,
});

export const CommitmentSchema = z.object({
  description: z.string().min(1),
  target: z.string().optional(),
  year: z.number().int().optional(),
});

export const ControversySchema = z.object({
  description: z.string().min(1),
  year: z.number().int().optional(),
});

export const CompanySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  hqCountryId: z.string().min(1),
  sector: z.string().min(1),
  logoEmoji: z.string().min(1),
  brandColor: HexColor,
  stats: CompanyStatsSchema,
  commitments: z.array(CommitmentSchema),
  controversies: z.array(ControversySchema),
  wooby: WoobyVoiceSchema,
  sources: z.array(SourceSchema),
  lastUpdated: ISODate,
});

export type Source = z.infer<typeof SourceSchema>;
export type Policy = z.infer<typeof PolicySchema>;
export type NewsItem = z.infer<typeof NewsItemSchema>;
export type Country = z.infer<typeof CountrySchema>;
export type CountryStats = z.infer<typeof CountryStatsSchema>;
export type Company = z.infer<typeof CompanySchema>;
export type CompanyStats = z.infer<typeof CompanyStatsSchema>;
export type Commitment = z.infer<typeof CommitmentSchema>;
export type Controversy = z.infer<typeof ControversySchema>;
export type WoobyVoice = z.infer<typeof WoobyVoiceSchema>;
