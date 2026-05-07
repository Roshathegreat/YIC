import Link from "next/link";
import { notFound } from "next/navigation";
import WoobyNav from "@/components/wooby/WoobyNav";
import Bubbles from "@/components/wooby/Bubbles";
import StatCard from "@/components/wooby/StatCard";
import { getAllCountries, getCountry, getCompaniesByIds } from "@/lib/db";
import { scoreCountry } from "@/lib/leaderboard";
import { woobyMoodForCountry } from "@/lib/wooby";
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

export default async function WoobyCountryPage({
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
    <div className="wooby-body relative">
      <Bubbles />
      <WoobyNav />
      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-16">
        <nav className="text-sm mb-4">
          <Link href="/wooby" className="wooby-pill">
            ← Back to map
          </Link>
        </nav>

        <header className="mb-6 flex items-start gap-4">
          <span
            className="text-5xl rounded-2xl w-20 h-20 flex items-center justify-center"
            style={{ background: country.accentColor }}
          >
            {country.wooby.iconEmoji}
          </span>
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">
              {country.displayName}
            </h1>
            <p className="wooby-label mt-1">
              {country.iso3} · {formatPopulation(country.stats.population)}{" "}
              people · {woobyMoodForCountry(country.stats.treatyStance)}
            </p>
          </div>
        </header>

        <section className="wooby-quote max-w-2xl mb-8">
          <p className="text-lg font-semibold mb-2">
            🐋 {country.wooby.headline}
          </p>
          <p className="text-base leading-relaxed">
            {country.wooby.narrative}
          </p>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          <StatCard
            label="Plastic per person"
            value={`${country.stats.plasticWastePerCapitaKg} kg`}
            emoji="🛍️"
            caption="That's how much plastic each person here uses every year."
          />
          <StatCard
            label="Recycling rate"
            value={formatPct(country.stats.recyclingRatePct)}
            emoji="♻️"
            caption="Percent of plastic that actually gets recycled."
          />
          <StatCard
            label="Ocean leak"
            value={`${formatTons(country.stats.oceanLeakageEstimateTonsPerYear)} t`}
            emoji="🌊"
            caption="Tonnes of plastic that escape into the sea each year."
          />
          <StatCard
            label="Treaty score"
            value={score}
            emoji="⭐"
            caption={formatStance(country.stats.treatyStance)}
          />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">📜 Plastic rules here</h2>
          {country.policies.length === 0 ? (
            <p className="wooby-card p-4">
              No plastic rules on record yet. Wooby is waiting!
            </p>
          ) : (
            <ul className="grid sm:grid-cols-2 gap-3">
              {country.policies.map((p) => (
                <li key={p.id} className="wooby-card p-4">
                  <div className="font-bold">{p.name}</div>
                  {p.enacted ? (
                    <div className="wooby-label mt-1">started {p.enacted}</div>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed">{p.summary}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {companies.length > 0 ? (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-3">
              🏷️ Big brands you'll find here
            </h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {companies.map((co) => (
                <li key={co.id}>
                  <Link
                    href={`/wooby/companies/${co.id}`}
                    className="wooby-card p-4 flex items-center gap-3 hover:scale-[1.02] transition-transform"
                  >
                    <span
                      className="rounded-full w-12 h-12 flex items-center justify-center text-2xl"
                      style={{ background: co.brandColor }}
                    >
                      {co.logoEmoji}
                    </span>
                    <div>
                      <div className="font-bold">{co.name}</div>
                      <div className="wooby-label">{co.sector}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {country.newsFeed.length > 0 ? (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-3">📰 In the news</h2>
            <ul className="space-y-3">
              {country.newsFeed.map((n) => (
                <li key={n.id} className="wooby-card p-4">
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold underline"
                  >
                    {n.headline}
                  </a>
                  <div className="wooby-label mt-1">
                    {n.publisher} · {n.publishedDate}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed">{n.summary}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="text-xs text-white/80">
          Want the data with sources? See the{" "}
          <Link href={`/countries/${country.id}`} className="underline">
            researcher view
          </Link>
          .
        </p>
      </main>
    </div>
  );
}
