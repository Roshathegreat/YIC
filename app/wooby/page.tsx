import Link from "next/link";
import WorldMap from "@/components/WorldMap";
import WoobyNav from "@/components/wooby/WoobyNav";
import Whale from "@/components/wooby/Whale";
import Bubbles from "@/components/wooby/Bubbles";
import StatCard from "@/components/wooby/StatCard";
import { getAllCountries, getAllCompanies } from "@/lib/db";
import { rankCountries, rankCompanies } from "@/lib/leaderboard";
import { medalForRank, WOOBY_TAGLINE } from "@/lib/wooby";

export default async function WoobyHome() {
  const [countries, companies] = await Promise.all([
    getAllCountries(),
    getAllCompanies(),
  ]);
  const top3Countries = rankCountries(countries).slice(0, 3);
  const bottom3Countries = rankCountries(countries).slice(-3).reverse();
  const top3Companies = rankCompanies(companies).slice(0, 3);

  const totalLeakage = countries.reduce(
    (sum, c) => sum + c.stats.oceanLeakageEstimateTonsPerYear,
    0,
  );
  const totalPolicies = countries.reduce(
    (sum, c) => sum + c.policies.length,
    0,
  );

  return (
    <div className="wooby-body relative">
      <Bubbles />
      <WoobyNav />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <section className="grid lg:grid-cols-2 gap-8 items-center mt-4 mb-12">
          <div>
            <p className="wooby-pill mb-3">🐋 Hi, I'm Wooby.</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              The world's plastic story —
              <br />
              told by a humpback whale.
            </h1>
            <p className="mt-4 text-white/95 max-w-xl text-lg">
              {WOOBY_TAGLINE}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/wooby/leaderboard"
                className="wooby-pill !bg-white !text-[var(--ocean-deep)] !border-white font-semibold"
              >
                🏆 See the leaderboard
              </Link>
              <Link href="/wooby/companies" className="wooby-pill">
                🏷️ Meet the brands
              </Link>
              <Link href="/wooby/teach" className="wooby-pill">
                👩‍🏫 For teachers
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Whale size={360} className="wooby-swim drop-shadow-2xl" />
          </div>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          <StatCard
            label="Countries on the map"
            value={countries.length}
            emoji="🌍"
            caption="Wooby has visited every one (in his imagination)."
          />
          <StatCard
            label="Big brands tracked"
            value={companies.length}
            emoji="🏷️"
            caption="The biggest plastic-using companies in the world."
          />
          <StatCard
            label="Estimated ocean leak"
            value={`${Math.round(totalLeakage / 1000).toLocaleString()}K t`}
            emoji="🌊"
            caption="Tonnes of plastic these countries leak into oceans each year."
          />
          <StatCard
            label="Plastic rules listed"
            value={totalPolicies}
            emoji="📜"
            caption="Laws and pledges helping cut plastic worldwide."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-3">Pick a country</h2>
          <div className="wooby-card p-3">
            <WorldMap
              variant="wooby"
              countries={countries.map((c) => ({
                id: c.id,
                displayName: c.displayName,
                m49: c.m49,
                accentColor: c.accentColor,
                iconEmoji: c.wooby.iconEmoji,
              }))}
            />
          </div>
          <p className="text-xs text-white/80 mt-2">
            Click a country and Wooby will tell you what's happening there.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-6 mb-12">
          <div className="wooby-card p-6">
            <h3 className="text-xl font-bold mb-3">🏆 Top 3 countries</h3>
            <ol className="space-y-3">
              {top3Countries.map((r, i) => (
                <li key={r.country.id}>
                  <Link
                    href={`/wooby/countries/${r.country.id}`}
                    className="flex items-center gap-3 hover:translate-x-1 transition-transform"
                  >
                    <span className="text-2xl">{medalForRank(i + 1)}</span>
                    <span className="font-bold text-lg">
                      {r.country.displayName}
                    </span>
                    <span className="ml-auto wooby-pill">
                      score {r.envScore}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <div className="wooby-card p-6">
            <h3 className="text-xl font-bold mb-3">
              🌊 Helpers Wooby is waiting on
            </h3>
            <ol className="space-y-3">
              {bottom3Countries.map((r) => (
                <li key={r.country.id}>
                  <Link
                    href={`/wooby/countries/${r.country.id}`}
                    className="flex items-center gap-3 hover:translate-x-1 transition-transform"
                  >
                    <span className="text-xl">🫧</span>
                    <span className="font-bold text-lg">
                      {r.country.displayName}
                    </span>
                    <span className="ml-auto wooby-pill">
                      score {r.envScore}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="wooby-card p-6 mb-10">
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-xl font-bold">⭐ Top 3 brands right now</h3>
            <Link href="/wooby/companies" className="text-sm underline">
              See all brands →
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {top3Companies.map((r, i) => (
              <Link
                key={r.company.id}
                href={`/wooby/companies/${r.company.id}`}
                className="wooby-card p-4 hover:scale-[1.02] transition-transform"
                style={{ background: "rgba(255,255,255,0.18)" }}
              >
                <div className="text-2xl">{medalForRank(i + 1)}</div>
                <div className="font-bold mt-1">{r.company.name}</div>
                <div className="text-xs text-white/85">{r.company.sector}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="wooby-quote max-w-2xl">
          <p className="text-base leading-relaxed">
            <strong>Wooby says:</strong> "I'm not mad. I'm just a whale.
            But the seas are full of plastic, and we can fix it together —
            with smart rules, smart brands, and smart kids like you."
          </p>
        </section>
      </main>
    </div>
  );
}
