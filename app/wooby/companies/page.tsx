import WoobyNav from "@/components/wooby/WoobyNav";
import Bubbles from "@/components/wooby/Bubbles";
import CompanyTile from "@/components/wooby/CompanyTile";
import { getAllCompanies } from "@/lib/db";
import { rankCompanies } from "@/lib/leaderboard";

export default async function WoobyCompaniesIndex() {
  const companies = await getAllCompanies();
  const ranked = rankCompanies(companies);

  return (
    <div className="wooby-body relative">
      <Bubbles />
      <WoobyNav />
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <header className="mb-6">
          <p className="wooby-pill">🏷️ Wall of brands</p>
          <h1 className="text-4xl font-extrabold mt-3">
            Meet the brands shaping the seas.
          </h1>
          <p className="text-white/95 max-w-2xl mt-2">
            Each brand gets a wave score: how Wooby thinks they are doing,
            from 🌊 (a lot to fix) to 🌊🌊🌊🌊🌊 (great work, keep going).
          </p>
        </header>

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ranked.map((r) => (
            <CompanyTile
              key={r.company.id}
              company={r.company}
              combinedScore={r.combinedScore}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
