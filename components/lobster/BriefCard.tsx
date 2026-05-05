import Link from "next/link";
import type { Country, LobsterBrief } from "@/lib/schema";
import { resolveBriefTarget } from "@/lib/db";
import { VocabBox } from "./Vocab";

const REF_LABEL: Record<LobsterBrief["refType"], string> = {
  treaty: "TREATY",
  policy: "LAW",
  company: "COMPANY",
  news: "NEWS",
  beppu: "HOME PORT",
};

const CARD_FLAVOR: Record<LobsterBrief["refType"], string> = {
  treaty: "pixel-card pixel-card--sun",
  policy: "pixel-card pixel-card--kelp",
  company: "pixel-card",
  news: "pixel-card pixel-card--sun",
  beppu: "pixel-card pixel-card--kelp",
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
    <article className={`${CARD_FLAVOR[brief.refType]} p-4`}>
      <header className="flex items-center gap-2 mb-2">
        <span className="tide-chip text-[var(--tide-kelp)]">
          {REF_LABEL[brief.refType]}
        </span>
        <span className="text-xs text-[var(--tide-foam)]/70">
          {country.displayName}
        </span>
      </header>
      <h3 className="pixel text-sm md:text-base text-[var(--tide-foam)] leading-snug">
        {brief.headline}
      </h3>
      <p className="mt-3 text-[var(--tide-foam)] leading-relaxed">
        {brief.body}
      </p>
      {brief.whyItMatters ? (
        <p className="mt-3 text-sm text-[var(--tide-sun)]">
          <span className="pixel text-[10px] mr-2">WHY IT MATTERS</span>
          {brief.whyItMatters}
        </p>
      ) : null}
      {brief.vocab.length > 0 ? <VocabBox terms={brief.vocab} /> : null}
      {target ? (
        <footer className="mt-4 text-xs">
          <Link
            href={target.ledgerHref}
            className="underline decoration-dotted text-[var(--tide-foam)]/80 hover:text-[var(--tide-foam)]"
          >
            check the source record &rarr; {target.title}
          </Link>
        </footer>
      ) : null}
    </article>
  );
}
