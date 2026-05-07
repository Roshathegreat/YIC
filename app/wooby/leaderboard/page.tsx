import Link from "next/link";
import WoobyNav from "@/components/wooby/WoobyNav";
import Bubbles from "@/components/wooby/Bubbles";
import { getAllCountries, getAllCompanies } from "@/lib/db";
import { rankCountries, rankCompanies } from "@/lib/leaderboard";
import { medalForRank } from "@/lib/wooby";

export default async function WoobyLeaderboard() {
  const [countries, companies] = await Promise.all([
    getAllCountries(),
    getAllCompanies(),
  ]);
  const rankedCountries = rankCountries(countries);
  const rankedCompanies = rankCompanies(companies);
  const podium = rankedCountries.slice(0, 3);
  const tail = rankedCountries.slice(-3).reverse();

  return (
    <div className="wooby-body relative">
      <Bubbles />
      <WoobyNav />
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <header className="mb-6">
          <p className="wooby-pill">🏆 Leaderboard</p>
          <h1 className="text-4xl font-extrabold mt-3">
            Heroes of the ocean.
          </h1>
          <p className="text-white/95 max-w-2xl mt-2">
            Wooby ranks countries by recycling, plastic waste, ocean leakage,
            and treaty bravery. The top 3 get medals!
          </p>
        </header>

        <section className="mb-10">
          <div className="grid sm:grid-cols-3 gap-4 items-end">
            {/* podium order: 2nd, 1st, 3rd visually */}
            {podium.length >= 2 ? (
              <div className="wooby-card p-5 text-center sm:order-1">
                <div className="text-5xl mb-1">🥈</div>
                <Link
                  href={`/wooby/countries/${podium[1].country.id}`}
                  className="text-xl font-bold underline"
                >
                  {podium[1].country.displayName}
                </Link>
                <div className="wooby-label mt-1">
                  score {podium[1].envScore}
                </div>
              </div>
            ) : null}
            {podium.length >= 1 ? (
              <div className="wooby-card p-6 text-center sm:order-2 sm:scale-110">
                <div className="text-6xl mb-1">🥇</div>
                <Link
                  href={`/wooby/countries/${podium[0].country.id}`}
                  className="text-2xl font-extrabold underline"
                >
                  {podium[0].country.displayName}
                </Link>
                <div className="wooby-label mt-1">
                  score {podium[0].envScore}
                </div>
              </div>
            ) : null}
            {podium.length >= 3 ? (
              <div className="wooby-card p-5 text-center sm:order-3">
                <div className="text-5xl mb-1">🥉</div>
                <Link
                  href={`/wooby/countries/${podium[2].country.id}`}
                  className="text-xl font-bold underline"
                >
                  {podium[2].country.displayName}
                </Link>
                <div className="wooby-label mt-1">
                  score {podium[2].envScore}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-6 mb-10">
          <div className="wooby-card p-5">
            <h2 className="text-xl font-bold mb-3">All countries, ranked</h2>
            <ol className="space-y-2">
              {rankedCountries.map((r, i) => (
                <li
                  key={r.country.id}
                  className="flex items-center gap-3 border-b border-white/15 pb-2 last:border-0"
                >
                  <span className="w-7 text-right opacity-80">
                    {medalForRank(i + 1)}
                  </span>
                  <Link
                    href={`/wooby/countries/${r.country.id}`}
                    className="font-semibold hover:underline"
                  >
                    {r.country.displayName}
                  </Link>
                  <span className="ml-auto text-sm opacity-90">
                    score {r.envScore}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="wooby-card p-5">
            <h2 className="text-xl font-bold mb-3">
              🌊 Helpers Wooby is waiting on
            </h2>
            <p className="text-sm opacity-90 mb-3">
              These countries leak the most plastic into the sea or have rules
              that aren't strong yet. Wooby believes they can do it.
            </p>
            <ol className="space-y-2">
              {tail.map((r) => (
                <li
                  key={r.country.id}
                  className="flex items-center gap-3 border-b border-white/15 pb-2 last:border-0"
                >
                  <span className="text-xl">🫧</span>
                  <Link
                    href={`/wooby/countries/${r.country.id}`}
                    className="font-semibold hover:underline"
                  >
                    {r.country.displayName}
                  </Link>
                  <span className="ml-auto text-sm opacity-90">
                    score {r.envScore}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="wooby-card p-5">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl font-bold">⭐ Brands, ranked</h2>
            <Link href="/wooby/companies" className="text-sm underline">
              All brand pages →
            </Link>
          </div>
          <ol className="space-y-2">
            {rankedCompanies.map((r, i) => (
              <li
                key={r.company.id}
                className="flex items-center gap-3 border-b border-white/15 pb-2 last:border-0"
              >
                <span className="w-7 text-right opacity-80">
                  {medalForRank(i + 1)}
                </span>
                <span aria-hidden>{r.company.logoEmoji}</span>
                <Link
                  href={`/wooby/companies/${r.company.id}`}
                  className="font-semibold hover:underline"
                >
                  {r.company.name}
                </Link>
                <span className="ml-auto text-sm opacity-90">
                  score {r.combinedScore}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
