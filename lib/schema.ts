import { z } from "zod";

const ISODate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD");

export const SourceSchema = z.object({
  url: z.string().url(),
  publisher: z.string().min(1),
  accessedDate: ISODate,
  archiveUrl: z.string().url().optional(),
  verified: z.boolean().optional(),
  note: z.string().optional(),
});

export const TreatyRoundSchema = z.object({
  roundId: z.string(),
  date: ISODate,
  position: z.string(),
  sources: z.array(SourceSchema),
});

export const PolicySchema = z.object({
  id: z.string(),
  name: z.string(),
  enacted: ISODate.optional(),
  summary: z.string(),
  scope: z.enum(["national", "subnational", "voluntary", "proposed"]),
  sources: z.array(SourceSchema),
  lastUpdated: ISODate,
});

export const CommitmentSchema = z.object({
  description: z.string(),
  target: z.string().optional(),
  year: z.number().int().optional(),
  sources: z.array(SourceSchema),
});

export const CompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  sector: z.string(),
  commitments: z.array(CommitmentSchema),
  sources: z.array(SourceSchema),
  lastUpdated: ISODate,
});

export const NewsItemSchema = z.object({
  id: z.string(),
  headline: z.string(),
  url: z.string().url(),
  publisher: z.string(),
  publishedDate: ISODate,
  summary: z.string(),
  addedDate: ISODate,
});

export const BeppuNodeSchema = z.object({
  marineDebrisData: z.string(),
  cleanupOrgs: z.array(
    z.object({
      name: z.string(),
      url: z.string().url().optional(),
      description: z.string(),
    }),
  ),
  hydrology: z.string(),
  sources: z.array(SourceSchema),
  lastUpdated: ISODate,
});

export const MarineAnimalSchema = z.object({
  species: z.string(),
  spriteId: z.string(),
  emoji: z.string(),
  lobsterRelationship: z.string(),
});

export const TreatyPositionSchema = z.object({
  currentStance: z.string(),
  inc52Position: z.string(),
  historicalRounds: z.array(TreatyRoundSchema),
  sources: z.array(SourceSchema),
  lastUpdated: ISODate,
});

// A "brief" is Wooby's kid-friendly retelling of a ledger record.
// It MUST point back to a real record ID on the same country, so kids can
// trust that nothing was made up. Cross-ref enforcement lives in lib/db.ts.
export const LobsterBriefSchema = z.object({
  id: z.string(),
  // Which ledger record on this country this brief is retelling.
  // Must match either:
  //   - "treaty"  (the country's treatyPosition)
  //   - a domesticPolicies[].id
  //   - a companies[].id
  //   - a newsFeed[].id
  //   - "beppu" (only on Japan, retells deepNode)
  refType: z.enum(["treaty", "policy", "company", "news", "beppu"]),
  refId: z.string(),
  // Kid headline. Punchy, no jargon, no clickbait. Max ~60 chars.
  headline: z.string().min(3).max(80),
  // 1-3 short sentences, Wooby voice. Names the hard word, then explains it.
  body: z.string().min(10).max(600),
  // Optional "why it matters" closer for older kids / teachers.
  whyItMatters: z.string().max(300).optional(),
  // Vocab keys (from lib/lobster-voice VOCAB) to surface as a sidebar.
  vocab: z.array(z.string()).default([]),
});

export const CountrySchema = z.object({
  id: z.enum(["japan", "usa", "taiwan"]),
  displayName: z.string(),
  iso3: z.string().length(3),
  m49: z.number().int(),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  marineAnimal: MarineAnimalSchema,
  treatyPosition: TreatyPositionSchema,
  domesticPolicies: z.array(PolicySchema),
  companies: z.array(CompanySchema),
  newsFeed: z.array(NewsItemSchema),
  deepNode: BeppuNodeSchema.optional(),
  lobsterBriefs: z.array(LobsterBriefSchema).default([]),
});

export type Country = z.infer<typeof CountrySchema>;
export type Source = z.infer<typeof SourceSchema>;
export type Policy = z.infer<typeof PolicySchema>;
export type Company = z.infer<typeof CompanySchema>;
export type NewsItem = z.infer<typeof NewsItemSchema>;
export type LobsterBrief = z.infer<typeof LobsterBriefSchema>;
