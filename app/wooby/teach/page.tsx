import Link from "next/link";
import WoobyNav from "@/components/wooby/WoobyNav";
import { getAllCountries, getAllCompanies } from "@/lib/db";

export default async function WoobyTeach() {
  const [countries, companies] = await Promise.all([
    getAllCountries(),
    getAllCompanies(),
  ]);

  const allSourceLines: { url: string; publisher: string; from: string }[] =
    [];
  for (const c of countries) {
    for (const s of c.sources) {
      allSourceLines.push({
        url: s.url,
        publisher: s.publisher,
        from: c.displayName,
      });
    }
  }
  for (const co of companies) {
    for (const s of co.sources) {
      allSourceLines.push({
        url: s.url,
        publisher: s.publisher,
        from: co.name,
      });
    }
  }
  const dedupedSources = Array.from(
    new Map(allSourceLines.map((s) => [s.url, s])).values(),
  ).sort((a, b) => a.publisher.localeCompare(b.publisher));

  return (
    <div className="wooby-body relative">
      <WoobyNav />
      <main className="relative z-10 max-w-4xl mx-auto px-6 pb-16">
        <header className="mb-6">
          <p className="wooby-pill no-print">👩‍🏫 For teachers</p>
          <h1 className="text-4xl font-extrabold mt-3">
            One-page classroom kit.
          </h1>
          <p className="text-white/95 max-w-2xl mt-2">
            Print this page, hand it out, or project it. Everything Wooby's
            world is built on, in one place.
          </p>
        </header>

        <section className="wooby-card p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">What this site is</h2>
          <p className="text-sm leading-relaxed">
            A two-surface plastic-pollution dashboard. The{" "}
            <Link href="/wooby" className="underline">
              Wooby surface
            </Link>{" "}
            is for kids: a friendly humpback whale narrates each country and
            brand. The{" "}
            <Link href="/" className="underline">
              Ledger surface
            </Link>{" "}
            is for grown-ups: same data, with full sources and citations.
            Every fact a kid sees on Wooby has a researcher-view counterpart
            with a citation.
          </p>
        </section>

        <section className="wooby-card p-6 mb-6">
          <h2 className="text-xl font-bold mb-3">
            Discussion prompts (ages 8–14)
          </h2>
          <ol className="space-y-2 list-decimal pl-5 text-sm leading-relaxed">
            <li>
              Pick one country from the leaderboard. What is it doing well?
              What could it do better?
            </li>
            <li>
              Compare two brands that make snacks. Whose wrappers do you
              think are easier to recycle, and why?
            </li>
            <li>
              Look at a country with a high recycling rate and a country with
              a low one. What rules do they have, or not have?
            </li>
            <li>
              If you were a country's environment minister for a day, which
              policy from another country would you copy first?
            </li>
            <li>
              What does the wave score 🌊🌊 tell you about a brand? Is it
              fair? Why or why not?
            </li>
          </ol>
        </section>

        <section className="wooby-card p-6 mb-6">
          <h2 className="text-xl font-bold mb-3">Activities</h2>
          <ul className="space-y-2 list-disc pl-5 text-sm leading-relaxed">
            <li>
              Brand audit at home: count plastic items in one trash bag, sort
              by brand, compare with the wall of brands page.
            </li>
            <li>
              Map drawing: print a blank world map, colour countries green
              that have banned single-use plastic items.
            </li>
            <li>
              Letter to a brand: pick a company and write what you would like
              it to change first.
            </li>
          </ul>
        </section>

        <section className="wooby-card p-6 mb-6">
          <h2 className="text-xl font-bold mb-3">A note on the data</h2>
          <p className="text-sm leading-relaxed">
            Statistics are drawn from public datasets (Our World in Data,
            UNEP, World Bank, OECD, EPA, Break Free From Plastic brand
            audits). Some entries are flagged{" "}
            <span className="wooby-pill">⚠ unverified</span> — please
            fact-check those before classroom use. We mark the date each
            country and brand record was last updated.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Source bibliography</h2>
          <p className="text-xs text-white/80 mb-3">
            Auto-generated from every record on the site.
          </p>
          <ol className="text-xs space-y-1.5 bg-white/10 rounded-xl p-4">
            {dedupedSources.map((s, i) => (
              <li key={s.url}>
                {i + 1}.{" "}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {s.publisher}
                </a>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
