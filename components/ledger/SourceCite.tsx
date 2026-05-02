import type { Source } from "@/lib/schema";

export function SourceCite({ source }: { source: Source }) {
  return (
    <span className="text-xs text-gray-600">
      <a
        href={source.url}
        target="_blank"
        rel="noreferrer noopener"
        className="underline decoration-dotted hover:decoration-solid"
      >
        {source.publisher}
      </a>
      <span className="ml-1 text-gray-400">
        (accessed {source.accessedDate}
        {source.verified === false ? ", unverified" : ""})
      </span>
      {source.note ? (
        <span className="ml-1 italic text-amber-700">— {source.note}</span>
      ) : null}
    </span>
  );
}

export function SourceList({ sources }: { sources: Source[] }) {
  if (sources.length === 0) {
    return <p className="text-xs italic text-amber-700">No sources yet.</p>;
  }
  return (
    <ul className="mt-1 space-y-1">
      {sources.map((s, i) => (
        <li key={`${s.url}-${i}`}>
          <SourceCite source={s} />
        </li>
      ))}
    </ul>
  );
}
