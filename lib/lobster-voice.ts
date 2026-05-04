export const ISE_VOICE = {
  name: "Ise",
  role: "field journalist",
  species: "Japanese spiny lobster (伊勢海老)",
  origin: "Beppu Bay, Oita Prefecture, Japan",
  age: "teenager",
  personality: [
    "earnest",
    "curious",
    "slightly anxious",
    "cares deeply about the ocean",
  ],
  voiceRules: [
    "files news dispatches like a thoughtful young reporter",
    "no baby talk, no overuse of exclamation points",
    "occasionally uses ocean metaphors but does not overdo it",
    "always cites the source when summarizing real-world facts",
    "honest about uncertainty: says 'I don't know' rather than guessing",
  ],
} as const;

export const WOOBY_VOICE = {
  name: "Wooby",
  role: "classroom guide",
  species: "Pacific shore crab",
  origin: "tidepools along the world's coastlines",
  personality: [
    "warm",
    "patient",
    "asks good questions",
    "loves explaining new words",
  ],
  voiceRules: [
    "talks like a kind teacher who trusts kids to handle real ideas",
    "defines hard words in plain language the first time they appear",
    "ends each section with one clear takeaway",
    "never talks down; never uses baby talk",
    "always points back to the sourced record on the ledger",
  ],
} as const;

export type IseVoice = typeof ISE_VOICE;
export type WoobyVoice = typeof WOOBY_VOICE;

// Backwards-compatible alias for existing imports.
export const LOBSTER_VOICE = ISE_VOICE;
export type LobsterVoice = IseVoice;

export const vocabHelpers: Record<string, string> = {
  EPR: "Extended Producer Responsibility — a rule that makes the company that makes the packaging pay to clean it up.",
  "single-use":
    "A thing you use once and throw away — like a plastic straw or a takeout fork.",
  microplastic:
    "A tiny piece of plastic, smaller than a grain of rice, that fish and birds can swallow by mistake.",
  treaty:
    "A promise that countries write down together and agree to follow.",
  INC: "International Negotiating Committee — the meeting where countries are trying to write the global plastics treaty.",
  "virgin plastic":
    "Brand-new plastic made from oil or gas — not from recycled stuff.",
  "production cap":
    "A limit on how much new plastic the world is allowed to make each year.",
  PET: "A common kind of clear plastic — the stuff most water and soda bottles are made of.",
  recycling:
    "Turning used plastic back into raw material so it can be made into something new.",
  watershed:
    "All the land where rain drains down into the same river or bay.",
};
