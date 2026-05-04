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

export const VocabSchema = z.object({
  term: z.string().min(1),
  kidDefinition: z.string().min(1),
});

export const RecordTypeSchema = z.enum(["policy", "company", "treaty"]);

export const LobsterBriefSchema = z.object({
  recordId: z.string().min(1),
  recordType: RecordTypeSchema,
  woobyHeadline: z.string().min(1),
  woobyBody: z.string().min(1),
  vocab: z.array(VocabSchema).max(4),
  takeaway: z.string().min(1),
});

export const NewsItemSchema = z.object({
  id: z.string(),
  headline: z.string(),
  url: z.string().url(),
  publisher: z.string(),
  publishedDate: ISODate,
  summary: z.string(),
  addedDate: ISODate,
  kidHeadline: z.string().optional(),
  kidSummary: z.string().optional(),
  iseDispatch: z.string().optional(),
  sourceRecordId: z.string().optional(),
  sourceRecordType: RecordTypeSchema.optional(),
  vocab: z.array(VocabSchema).max(2).optional(),
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
  lobsterBriefs: z.array(LobsterBriefSchema).default([]),
  deepNode: BeppuNodeSchema.optional(),
});

export type Country = z.infer<typeof CountrySchema>;
export type Source = z.infer<typeof SourceSchema>;
export type Policy = z.infer<typeof PolicySchema>;
export type Company = z.infer<typeof CompanySchema>;
export type NewsItem = z.infer<typeof NewsItemSchema>;
export type LobsterBrief = z.infer<typeof LobsterBriefSchema>;
export type Vocab = z.infer<typeof VocabSchema>;
export type RecordType = z.infer<typeof RecordTypeSchema>;
