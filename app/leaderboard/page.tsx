import Link from "next/link";
import LedgerNav from "@/components/ledger/LedgerNav";
import { getAllCountries, getAllCompanies } from "@/lib/db";
import { rankCountries, rankCompanies } from "@/lib/leaderboard";
import { formatPct, formatStance, formatTons } from "@/lib/format";

export default async function LeaderboardPage() {
  const [countries, companies] = await Promise.all([
    getAllCountries(),
    getAllCompanies(),
  ]);
  const rankedCountries = rankCountries(countries);
  const rankedCompanies = rankCompanies(companies);

  return (
    <div className="ledger-body min-h-screen">
      <LedgerNav />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-widest text-[var(--muted)]">
            Leaderboard
          </p>
          <h1 className="ledger-h text-4xl font-semibold mt-1">
            Who is doing what.
          </h1>
          <p className="text-[var(--muted)] mt-2 max-w-3xl">
            Composite ranking. Countries: recycling rate − plastic-waste
            penalty − ocean-leakage penalty + treaty-stance bonus. Companies:
            commitment + transparency + recycled content − footprint penalty.
            Tap any row for the full record.
          </p>
        </header>

        <section className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="ledger-h text-2xl font-semibold mb-3">
              Countries — full ranking
            </h2>
            <table className="ledger-table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Country</th>
                  <th>Score</th>
                  <th>Recycle</th>
                  <th>Stance</th>
                </tr>
              </thead>
              <tbody>
                {rankedCountries.map((r, i) => (
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
                    <td className="font-semibold">{r.envScore}</td>
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
              Companies — full ranking
            </h2>
            <table className="ledger-table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Company</th>
                  <th>Score</th>
                  <th>Recycle</th>
                  <th>Footprint</th>
                </tr>
              </thead>
              <tbody>
                {rankedCompanies.map((r, i) => (
                  <tr key={r.company.id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link
                        href={`/companies/${r.company.id}`}
                        className="hover:underline"
                      >
                        <span aria-hidden className="mr-1">
                          {r.company.logoEmoji}
                        </span>
                        {r.company.name}
                      </Link>
                    </td>
                    <td className="font-semibold">{r.combinedScore}</td>
                    <td>
                      {r.company.stats.recycledContentPct === null
                        ? "—"
                        : formatPct(r.company.stats.recycledContentPct)}
                    </td>
                    <td>
                      {r.company.stats.plasticFootprintTonsPerYear === null
                        ? "—"
                        : `${formatTons(r.company.stats.plasticFootprintTonsPerYear)} t`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
