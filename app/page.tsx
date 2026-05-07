import Link from "next/link";
import WorldMap from "@/components/WorldMap";
import LedgerNav from "@/components/ledger/LedgerNav";
import { getAllCountries, getAllCompanies } from "@/lib/db";
import { rankCountries, rankCompanies } from "@/lib/leaderboard";
import { formatPct, formatTons, formatStance } from "@/lib/format";

export default async function LedgerHome() {
  const [countries, companies] = await Promise.all([
    getAllCountries(),
    getAllCompanies(),
  ]);
  const rankedCountries = rankCountries(countries);
  const topCountries = rankedCountries.slice(0, 5);
  const bottomCountries = rankedCountries.slice(-5).reverse();
  const topCompanies = rankCompanies(companies).slice(0, 5);

  return (
    <div className="ledger-body min-h-screen">
      <LedgerNav />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <header className="mb-8">
          <p className="text-xs uppercase tracking-widest text-[var(--muted)]">
            The Ledger · researcher view
          </p>
          <h1 className="mt-1 text-4xl ledger-h font-semibold">
            Plastic governance, sourced.
          </h1>
          <p className="mt-3 text-[var(--muted)] max-w-2xl">
            A citable database of plastic policy, corporate disclosures, and
            treaty positions for {countries.length} countries and{" "}
            {companies.length} of the world's biggest brands. Every record
            links to its source and shows when it was last updated.
          </p>
        </header>

        <section className="mb-12">
          <WorldMap
            variant="ledger"
            countries={countries.map((c) => ({
              id: c.id,
              displayName: c.displayName,
              m49: c.m49,
              accentColor: c.accentColor,
            }))}
          />
          <p className="mt-2 text-xs text-[var(--muted)]">
            Click a country to open its dossier.
          </p>
        </section>

        <section className="mb-12 grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="ledger-h text-2xl font-semibold mb-3">
              Countries doing the most
            </h2>
            <table className="ledger-table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Country</th>
                  <th>Score</th>
                  <th>Recycling</th>
                  <th>Stance</th>
                </tr>
              </thead>
              <tbody>
                {topCountries.map((r, i) => (
                  <tr key={r.country.id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link
                        href={`/countries/${r.country.id}`}
                        className="hover:underline"
                      >
                        {r.country.displayName}
                      </Link>
                    </td>
                    <td>{r.envScore}</td>
                    <td>{formatPct(r.country.stats.recyclingRatePct)}</td>
                    <td className="text-xs">
                      {formatStance(r.country.stats.treatyStance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="ledger-h text-2xl font-semibold mb-3">
              Countries with the most work to do
            </h2>
            <table className="ledger-table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Country</th>
                  <th>Score</th>
                  <th>Ocean leakage</th>
                  <th>Stance</th>
                </tr>
              </thead>
              <tbody>
                {bottomCountries.map((r, i) => (
                  <tr key={r.country.id}>
                    <td>{rankedCountries.length - i}</td>
                    <td>
                      <Link
                        href={`/countries/${r.country.id}`}
                        className="hover:underline"
                      >
                        {r.country.displayName}
                      </Link>
                    </td>
                    <td>{r.envScore}</td>
                    <td>
                      {formatTons(r.country.stats.oceanLeakageEstimateTonsPerYear)} t/yr
                    </td>
                    <td className="text-xs">
                      {formatStance(r.country.stats.treatyStance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="ledger-h text-2xl font-semibold">
              Top scoring brands
            </h2>
            <Link href="/companies" className="text-sm underline">
              See all {companies.length} →
            </Link>
          </div>
          <table className="ledger-table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Company</th>
                <th>Sector</th>
                <th>Score</th>
                <th>Recycled content</th>
                <th>Plastic footprint</th>
              </tr>
            </thead>
            <tbody>
              {topCompanies.map((r, i) => (
                <tr key={r.company.id}>
                  <td>{i + 1}</td>
                  <td>
                    <Link
                      href={`/companies/${r.company.id}`}
                      className="hover:underline"
                    >
                      {r.company.name}
                    </Link>
                  </td>
                  <td className="text-xs text-[var(--muted)]">
                    {r.company.sector}
                  </td>
                  <td>{r.combinedScore}</td>
                  <td>
                    {r.company.stats.recycledContentPct === null
                      ? "—"
                      : formatPct(r.company.stats.recycledContentPct)}
                  </td>
                  <td>
                    {r.company.stats.plasticFootprintTonsPerYear === null
                      ? "—"
                      : `${formatTons(r.company.stats.plasticFootprintTonsPerYear)} t/yr`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="ledger-h text-2xl font-semibold mb-3">
            All countries
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {countries.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/countries/${c.id}`}
                  className="flex items-center gap-3 border border-[var(--rule)] rounded-md p-3 hover:bg-[#fafbfd]"
                >
                  <span
                    className="w-2 h-8 rounded"
                    style={{ background: c.accentColor }}
                  />
                  <span>
                    <span className="font-medium block">{c.displayName}</span>
                    <span className="text-xs text-[var(--muted)]">
                      {c.policies.length} policies · {c.companyIds.length} brands
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
