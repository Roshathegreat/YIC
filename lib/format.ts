export function formatTons(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

export function formatPopulation(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  return n.toLocaleString();
}

export function formatPct(n: number): string {
  return `${n.toFixed(0)}%`;
}

export function formatStance(stance: string): string {
  switch (stance) {
    case "high-ambition":
      return "High-ambition coalition";
    case "low-ambition":
      return "Low-ambition coalition";
    default:
      return "Undecided";
  }
}
