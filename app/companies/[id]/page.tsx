import Link from "next/link";
import { notFound } from "next/navigation";
import LedgerNav from "@/components/ledger/LedgerNav";
import SourceList from "@/components/ledger/SourceList";
import { getAllCompanies, getCompany } from "@/lib/db";
import { scoreCompany } from "@/lib/leaderboard";
import { formatPct, formatTons } from "@/lib/format";

export async function generateStaticParams() {
  const companies = await getAllCompanies();
  return companies.map((c) => ({ id: c.id }));
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = await getCompany(id);
  if (!company) notFound();
  const score = scoreCompany(company);

  return (
    <div className="ledger-body min-h-screen">
      <LedgerNav />
      <main className="max-w-4xl mx-auto px-6 py-10">
        <nav className="text-sm mb-4">
          <Link href="/companies" className="underline">
            ← All companies
          </Link>
        </nav>

        <header className="mb-8 flex items-start gap-4">
          <span
            className="rounded-lg w-16 h-16 flex items-center justify-center text-3xl shrink-0"
            style={{ background: company.brandColor, color: "#fff" }}
            aria-hidden
          >
            {company.logoEmoji}
          </span>
          <div>
            <h1 className="ledger-h text-3xl font-semibold">{company.name}</h1>
            <p className="text-sm text-[var(--muted)] mt-1">
              {company.sector} · HQ {company.hqCountryId}
            </p>
            <p className="mt-2 text-sm">
              <span className="tag">Composite score: {score}</span>{" "}
              {company.stats.brandAuditRank ? (
                <span className="tag tag-warn">
                  BFFP rank #{company.stats.brandAuditRank}
                </span>
              ) : null}
            </p>
          </div>
        </header>

        <section className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="border border-[var(--rule)] rounded-md p-4">
            <div className="text-xs text-[var(--muted)]">
              Plastic footprint
            </div>
            <div className="text-2xl font-semibold mt-1">
              {company.stats.plasticFootprintTonsPerYear === null
                ? "—"
                : `${formatTons(company.stats.plasticFootprintTonsPerYear)} tonnes/yr`}
            </div>
          </div>
          <div className="border border-[var(--rule)] rounded-md p-4">
            <div className="text-xs text-[var(--muted)]">Recycled content</div>
            <div className="text-2xl font-semibold mt-1">
              {company.stats.recycledContentPct === null
                ? "—"
                : formatPct(company.stats.recycledContentPct)}
            </div>
          </div>
          <div className="border border-[var(--rule)] rounded-md p-4">
            <div className="text-xs text-[var(--muted)]">
              Commitment score
            </div>
            <div className="text-2xl font-semibold mt-1">
              {company.stats.commitmentScore} / 5
            </div>
          </div>
          <div className="border border-[var(--rule)] rounded-md p-4">
            <div className="text-xs text-[var(--muted)]">
              Transparency score
            </div>
            <div className="text-2xl font-semibold mt-1">
              {company.stats.transparencyScore} / 5
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="ledger-h text-2xl font-semibold mb-3">Commitments</h2>
          {company.commitments.length === 0 ? (
            <p className="text-[var(--muted)] text-sm">No public commitments on record.</p>
          ) : (
            <ul className="space-y-2 list-disc pl-5">
              {company.commitments.map((c, i) => (
                <li key={i} className="text-sm">
                  {c.description}
                  {c.target ? (
                    <span className="text-[var(--muted)]"> · target {c.target}</span>
                  ) : null}
                  {c.year ? (
                    <span className="text-[var(--muted)]"> · by {c.year}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>

        {company.controversies.length > 0 ? (
          <section className="mb-10">
            <h2 className="ledger-h text-2xl font-semibold mb-3">
              Controversies
            </h2>
            <ul className="space-y-2 list-disc pl-5">
              {company.controversies.map((c, i) => (
                <li key={i} className="text-sm">
                  {c.description}
                  {c.year ? (
                    <span className="text-[var(--muted)]"> · {c.year}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section>
          <h2 className="ledger-h text-2xl font-semibold mb-3">Sources</h2>
          <SourceList sources={company.sources} />
          <p className="text-xs text-[var(--muted)] mt-3">
            Last updated {company.lastUpdated}.
          </p>
        </section>
      </main>
    </div>
  );
}
