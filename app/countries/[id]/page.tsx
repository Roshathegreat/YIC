import Link from "next/link";
import { notFound } from "next/navigation";
import LedgerNav from "@/components/ledger/LedgerNav";
import SourceList from "@/components/ledger/SourceList";
import StatBar from "@/components/ledger/StatBar";
import { getCountry, getAllCountries, getCompaniesByIds } from "@/lib/db";
import { scoreCountry } from "@/lib/leaderboard";
import {
  formatPct,
  formatPopulation,
  formatStance,
  formatTons,
} from "@/lib/format";

export async function generateStaticParams() {
  const countries = await getAllCountries();
  return countries.map((c) => ({ id: c.id }));
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const country = await getCountry(id);
  if (!country) notFound();
  const companies = await getCompaniesByIds(country.companyIds);
  const score = scoreCountry(country);

  return (
    <div className="ledger-body min-h-screen">
      <LedgerNav />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <nav className="text-sm mb-4">
          <Link href="/" className="underline">
            ← All countries
          </Link>
        </nav>

        <header className="mb-6 flex items-start gap-4">
          <span
            className="w-2 self-stretch rounded"
            style={{ background: country.accentColor }}
          />
          <div>
            <h1 className="ledger-h text-4xl font-semibold">
              {country.displayName}
            </h1>
            <p className="text-sm text-[var(--muted)] mt-1">
              {country.iso3} · M49 {country.m49} · {country.region} ·{" "}
              {formatPopulation(country.stats.population)} people
            </p>
            <p className="mt-3 text-sm">
              <span className="tag">Composite score: {score}</span>{" "}
              <span
                className={
                  country.stats.treatyStance === "high-ambition"
                    ? "tag tag-good"
                    : country.stats.treatyStance === "low-ambition"
                      ? "tag tag-warn"
                      : "tag tag-mid"
                }
              >
                {formatStance(country.stats.treatyStance)}
              </span>
            </p>
          </div>
        </header>

        <section className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-10 max-w-3xl">
          <StatBar
            label="Plastic waste per person"
            value={country.stats.plasticWastePerCapitaKg}
            max={140}
            unit="kg/yr"
            tone="danger"
          />
          <StatBar
            label="Recycling rate"
            value={country.stats.recyclingRatePct}
            max={100}
            unit="%"
            tone="good"
            format={(n) => `${n}`}
          />
          <StatBar
            label="Mismanaged waste"
            value={country.stats.mismanagedWasteTonsPerYear}
            max={9_000_000}
            unit="t/yr"
            tone="danger"
            format={formatTons}
          />
          <StatBar
            label="Estimated ocean leakage"
            value={country.stats.oceanLeakageEstimateTonsPerYear}
            max={900_000}
            unit="t/yr"
            tone="danger"
            format={formatTons}
          />
        </section>

        <section className="mb-10">
          <h2 className="ledger-h text-2xl font-semibold mb-3">
            Domestic policies
          </h2>
          {country.policies.length === 0 ? (
            <p className="text-[var(--muted)] text-sm">
              No policies on record.
            </p>
          ) : (
            <ul className="space-y-4">
              {country.policies.map((p) => (
                <li
                  key={p.id}
                  className="border-l-2 border-[var(--ocean-mid)] pl-4"
                >
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-semibold">{p.name}</h3>
                    <span className="tag">{p.scope}</span>
                    {p.enacted ? (
                      <span className="text-xs text-[var(--muted)]">
                        enacted {p.enacted}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-[var(--ink)] mt-1">{p.summary}</p>
                  <div className="mt-2">
                    <SourceList sources={p.sources} compact />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mb-10">
          <h2 className="ledger-h text-2xl font-semibold mb-3">
            Companies present in {country.displayName}
          </h2>
          {companies.length === 0 ? (
            <p className="text-[var(--muted)] text-sm">No company data.</p>
          ) : (
            <ul className="grid sm:grid-cols-2 gap-3">
              {companies.map((co) => (
                <li key={co.id}>
                  <Link
                    href={`/companies/${co.id}`}
                    className="block border border-[var(--rule)] rounded-md p-3 hover:bg-[#fafbfd]"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-7 h-7 rounded flex items-center justify-center text-sm"
                        style={{ background: co.brandColor, color: "#fff" }}
                        aria-hidden
                      >
                        {co.logoEmoji}
                      </span>
                      <span className="font-medium">{co.name}</span>
                    </div>
                    <div className="text-xs text-[var(--muted)] mt-1">
                      {co.sector} ·{" "}
                      {co.stats.brandAuditRank
                        ? `BFFP rank #${co.stats.brandAuditRank}`
                        : "rank n/a"}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {country.newsFeed.length > 0 ? (
          <section className="mb-10">
            <h2 className="ledger-h text-2xl font-semibold mb-3">News</h2>
            <ul className="space-y-3">
              {country.newsFeed.map((n) => (
                <li key={n.id}>
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline"
                  >
                    {n.headline}
                  </a>
                  <div className="text-xs text-[var(--muted)]">
                    {n.publisher} · {n.publishedDate}
                  </div>
                  <p className="text-sm mt-1">{n.summary}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section>
          <h2 className="ledger-h text-2xl font-semibold mb-3">Sources</h2>
          <SourceList sources={country.sources} />
          <p className="text-xs text-[var(--muted)] mt-3">
            Last updated {country.lastUpdated}.
          </p>
        </section>
      </main>
    </div>
  );
}
