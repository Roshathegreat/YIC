import Link from "next/link";
import { notFound } from "next/navigation";
import WoobyNav from "@/components/wooby/WoobyNav";
import Bubbles from "@/components/wooby/Bubbles";
import StatCard from "@/components/wooby/StatCard";
import WaveScore from "@/components/wooby/WaveScore";
import { getAllCompanies, getCompany } from "@/lib/db";
import { scoreCompany } from "@/lib/leaderboard";
import { formatPct, formatTons } from "@/lib/format";

export async function generateStaticParams() {
  const companies = await getAllCompanies();
  return companies.map((c) => ({ id: c.id }));
}

export default async function WoobyCompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = await getCompany(id);
  if (!company) notFound();
  const score = scoreCompany(company);

  return (
    <div className="wooby-body relative">
      <Bubbles />
      <WoobyNav />
      <main className="relative z-10 max-w-4xl mx-auto px-6 pb-16">
        <nav className="text-sm mb-4">
          <Link href="/wooby/companies" className="wooby-pill">
            ← Back to brands
          </Link>
        </nav>

        <header className="flex items-start gap-4 mb-6">
          <span
            className="rounded-2xl w-20 h-20 flex items-center justify-center text-4xl shrink-0"
            style={{ background: company.brandColor }}
            aria-hidden
          >
            {company.logoEmoji}
          </span>
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">
              {company.name}
            </h1>
            <p className="wooby-label mt-1">
              {company.sector} · HQ {company.hqCountryId}
              {company.stats.brandAuditRank
                ? ` · pollution rank #${company.stats.brandAuditRank}`
                : ""}
            </p>
            <div className="mt-3">
              <WaveScore score={Math.max(0, score / 2)} label="Wooby score" />
            </div>
          </div>
        </header>

        <section className="wooby-quote max-w-2xl mb-8">
          <p className="text-lg font-semibold mb-2">
            🐋 {company.wooby.headline}
          </p>
          <p className="text-base leading-relaxed">{company.wooby.narrative}</p>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          <StatCard
            label="Plastic footprint"
            value={
              company.stats.plasticFootprintTonsPerYear === null
                ? "—"
                : `${formatTons(company.stats.plasticFootprintTonsPerYear)} t`
            }
            emoji="🛍️"
            caption="Tonnes of plastic this brand uses each year."
          />
          <StatCard
            label="Recycled stuff"
            value={
              company.stats.recycledContentPct === null
                ? "—"
                : formatPct(company.stats.recycledContentPct)
            }
            emoji="♻️"
            caption="How much of their plastic was already used before."
          />
          <StatCard
            label="Big promises"
            value={`${company.stats.commitmentScore}/5`}
            emoji="🎯"
            caption="Are they making real plastic-cutting goals?"
          />
          <StatCard
            label="Honesty"
            value={`${company.stats.transparencyScore}/5`}
            emoji="🔍"
            caption="Do they share enough info for us to check?"
          />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">🎯 What they promised</h2>
          {company.commitments.length === 0 ? (
            <p className="wooby-card p-4">
              No public promises on record yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {company.commitments.map((c, i) => (
                <li key={i} className="wooby-card p-4 text-sm leading-relaxed">
                  {c.description}
                  {c.year ? (
                    <span className="wooby-label ml-2">by {c.year}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>

        {company.controversies.length > 0 ? (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-3">
              🌊 What needs more work
            </h2>
            <ul className="space-y-2">
              {company.controversies.map((c, i) => (
                <li key={i} className="wooby-card p-4 text-sm leading-relaxed">
                  {c.description}
                  {c.year ? (
                    <span className="wooby-label ml-2">{c.year}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="text-xs text-white/80">
          Want the receipts and sources?{" "}
          <Link href={`/companies/${company.id}`} className="underline">
            See the researcher view
          </Link>
          .
        </p>
      </main>
    </div>
  );
}
