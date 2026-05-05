import { VOCAB } from "@/lib/lobster-voice";

export function VocabWord({ term }: { term: string }) {
  const gloss = VOCAB[term];
  if (!gloss) return <span>{term}</span>;
  return (
    <span className="vocab" title={gloss}>
      {term}
    </span>
  );
}

export function VocabBox({ terms }: { terms: string[] }) {
  const entries = terms
    .map((t) => [t, VOCAB[t]] as const)
    .filter(([, g]) => Boolean(g));
  if (entries.length === 0) return null;
  return (
    <aside className="mt-4 p-3 border-2 border-[var(--tide-foam)] bg-[var(--tide-deep)] rounded-sm">
      <p className="pixel text-xs mb-2 text-[var(--tide-sun)]">
        Wooby's word box
      </p>
      <dl className="space-y-1.5 text-sm">
        {entries.map(([term, gloss]) => (
          <div key={term}>
            <dt className="inline font-semibold text-[var(--tide-kelp)]">
              {term}
            </dt>
            <dd className="inline text-[var(--tide-foam)]"> — {gloss}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
