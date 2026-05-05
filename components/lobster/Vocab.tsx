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
    <aside className="mt-4 card card--sand !p-3 !shadow-none">
      <p className="eyebrow mb-2">Word box</p>
      <dl className="space-y-1.5 text-sm">
        {entries.map(([term, gloss]) => (
          <div key={term}>
            <dt className="inline font-bold">{term}</dt>
            <dd className="inline"> — {gloss}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
