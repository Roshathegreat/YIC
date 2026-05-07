import type { Source } from "@/lib/schema";

interface SourceListProps {
  sources: Source[];
  compact?: boolean;
}

export default function SourceList({ sources, compact }: SourceListProps) {
  if (sources.length === 0) return null;
  return (
    <ol className={compact ? "text-xs space-y-1" : "text-sm space-y-2"}>
      {sources.map((s, i) => (
        <li key={`${s.url}-${i}`}>
          <a
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted underline-offset-2"
          >
            {s.publisher}
          </a>
          <span className="text-[var(--muted)]">
            {" — accessed "}
            {s.accessedDate}
            {s.verified === false ? " · ⚠ unverified" : ""}
          </span>
          {s.note ? (
            <span className="block text-[var(--muted)] italic">{s.note}</span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
