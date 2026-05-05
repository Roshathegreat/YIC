import Link from "next/link";
import type { Country, LobsterBrief } from "@/lib/schema";
import { resolveBriefTarget } from "@/lib/db";
import { VocabBox } from "./Vocab";
import { CountryDot } from "./CountryMark";

const REF_LABEL: Record<LobsterBrief["refType"], string> = {
  treaty: "Treaty",
  policy: "Law",
  company: "Company",
  news: "News",
  beppu: "Home port",
};

const TAG_FLAVOR: Record<LobsterBrief["refType"], string> = {
  treaty: "tag--coral",
  policy: "tag--teal",
  company: "tag",
  news: "tag--sun",
  beppu: "tag--teal",
};

export function BriefCard({
  country,
  brief,
}: {
  country: Country;
  brief: LobsterBrief;
}) {
  const target = resolveBriefTarget(country, brief);
  return (
    <article className="card">
      <header className="flex items-center gap-2 mb-3">
        <span className={`tag ${TAG_FLAVOR[brief.refType]}`}>
          {REF_LABEL[brief.refType]}
        </span>
        <span className="inline-flex items-center gap-2 text-sm text-[color:var(--muted)]">
          <CountryDot id={country.id} size={10} />
          {country.displayName}
        </span>
      </header>

      <h3 className="display text-xl">{brief.headline}</h3>

      <p className="mt-3 text-[color:var(--ink)]">{brief.body}</p>

      {brief.whyItMatters ? (
        <div className="mt-4 card card--sun !p-3 !shadow-none">
          <p className="eyebrow !text-[color:var(--ink)] mb-1">
            Why it matters
          </p>
          <p className="text-[color:var(--ink)] text-sm">
            {brief.whyItMatters}
          </p>
        </div>
      ) : null}

      {brief.vocab.length > 0 ? <VocabBox terms={brief.vocab} /> : null}

      {target ? (
        <footer className="mt-4 text-sm">
          <Link
            href={target.ledgerHref}
            className="font-semibold text-[color:var(--coral)] underline decoration-2 underline-offset-4"
          >
            See the source &rarr; {target.title}
          </Link>
        </footer>
      ) : null}
    </article>
  );
}
