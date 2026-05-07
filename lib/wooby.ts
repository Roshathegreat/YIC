export const WOOBY_NAME = "Wooby";
export const WOOBY_SPECIES = "humpback whale";
export const WOOBY_TAGLINE =
  "Wooby is a humpback whale who travels every ocean. Wooby wants to know: who is helping the seas, and who still needs to step up?";

export function waveScore(score: number): string {
  const filled = Math.max(0, Math.min(5, Math.round(score)));
  return "🌊".repeat(filled) + "·".repeat(5 - filled);
}

export function medalForRank(rank: number): string {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
}

export function woobyMoodForCountry(stance: string): string {
  switch (stance) {
    case "high-ambition":
      return "Wooby is happy 🐋💙";
    case "low-ambition":
      return "Wooby is waiting 🌊";
    default:
      return "Wooby is curious 🫧";
  }
}
