import Link from "next/link";
import LedgerNav from "@/components/ledger/LedgerNav";
import { getAllCompanies } from "@/lib/db";
import { rankCompanies } from "@/lib/leaderboard";
import { formatPct, formatTons } from "@/lib/format";

export default async function CompaniesIndexPage() {
  const companies = await getAllCompanies();
  const ranked = rankCompanies(companies);

  return (
    <div className="ledger-body min-h-screen">
      <LedgerNav />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-widest text-[var(--muted)]">
            Brand audit
          </p>
          <h1 className="ledger-h text-4xl font-semibold mt-1">
            Companies, ranked.
          </h1>
          <p className="text-[var(--muted)] mt-2 max-w-2xl">
            {companies.length} of the world's biggest plastic-relevant brands.
            Ranked by a composite of commitment, transparency, recycled
            content, and reported plastic footprint.
          </p>
        </header>

        <table className="ledger-table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Sector</th>
              <th>HQ</th>
              <th>Plastic footprint</th>
              <th>Recycled %</th>
              <th>Commit</th>
              <th>Transp</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((r, i) => (
              <tr key={r.company.id}>
                <td>{i + 1}</td>
                <td>
                  <Link
                    href={`/companies/${r.company.id}`}
                    className="hover:underline font-medium"
                  >
                    <span className="mr-1" aria-hidden>
                      {r.company.logoEmoji}
                    </span>
                    {r.company.name}
                  </Link>
                </td>
                <td className="text-xs text-[var(--muted)]">
                  {r.company.sector}
                </td>
                <td className="text-xs">{r.company.hqCountryId}</td>
                <td>
                  {r.company.stats.plasticFootprintTonsPerYear === null
                    ? "—"
                    : `${formatTons(r.company.stats.plasticFootprintTonsPerYear)} t`}
                </td>
                <td>
                  {r.company.stats.recycledContentPct === null
                    ? "—"
                    : formatPct(r.company.stats.recycledContentPct)}
                </td>
                <td>{r.company.stats.commitmentScore}/5</td>
                <td>{r.company.stats.transparencyScore}/5</td>
                <td className="font-semibold">{r.combinedScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
