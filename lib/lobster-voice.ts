// Voice modules for the youth surface ("Wooby's Tide Report").
// Wooby = primary kid-host (a curious crab from Beppu Bay).
// Ise   = senior journalist (Japanese spiny lobster) — cited but not the lead.

export const WOOBY_VOICE = {
  name: "Wooby",
  species: "Sand crab from Beppu Bay",
  age: "kid",
  role: "host of Wooby's Tide Report",
  personality: [
    "playful",
    "curious",
    "asks lots of why questions",
    "loves the ocean",
    "never talks down to kids",
  ],
  voiceRules: [
    "speak like a smart 10-year-old talking to a friend",
    "short sentences. one idea per sentence",
    "name the thing first, then explain it (e.g. 'a treaty — that's a giant promise countries write down')",
    "never use the word 'simply'",
    "no baby talk, no 'wow!', no exclamation salad",
    "always say where the fact came from (the source) so anyone can check",
    "if Wooby doesn't know something, Wooby says so",
  ],
} as const;

export const ISE_VOICE = {
  name: "Ise",
  species: "Japanese spiny lobster (伊勢海老)",
  origin: "Beppu Bay, Oita Prefecture, Japan",
  age: "teenager",
  role: "senior journalist, Wooby's mentor",
  personality: [
    "earnest",
    "careful with facts",
    "patient with Wooby's questions",
  ],
  voiceRules: [
    "speaks like a thoughtful teen reporter",
    "always cites the source",
    "honest about uncertainty",
  ],
} as const;

// Kept for backward compatibility with anything still importing the old name.
export const LOBSTER_VOICE = ISE_VOICE;

export type WoobyVoice = typeof WOOBY_VOICE;
export type IseVoice = typeof ISE_VOICE;

// Vocabulary helper. Wraps a hard word in a tiny inline gloss for kids.
// Used by lobster pages. Keep glosses very short.
export const VOCAB: Record<string, string> = {
  treaty: "a giant promise countries write down and sign",
  policy: "a rule a government decides to follow",
  EPR: "a rule that makes the company who makes the plastic pay to clean it up",
  "single-use": "you use it once, then it becomes trash",
  microplastics: "tiny bits of plastic, smaller than a grain of rice",
  "primary plastic": "brand-new plastic, made fresh from oil",
  "production cap": "a top limit on how much plastic can be made",
  recycling: "melting old plastic so it can become a new thing",
  watershed: "all the land that drains into one river or one bay",
  hydrology: "how water moves on land — rivers, rain, runoff",
  "marine debris": "trash that ends up in the ocean",
  INC: "the meeting where countries argue out the plastic treaty",
  "INC-5.2": "the August 2025 round of treaty talks in Geneva",
  "high ambition coalition": "the group of countries pushing for the strongest rules",
};
