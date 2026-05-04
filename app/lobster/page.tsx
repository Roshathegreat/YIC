import Link from "next/link";
import WorldMap from "@/components/WorldMap";
import { getAllCountries } from "@/lib/db";

const COUNTRY_TAGLINE: Record<string, string> = {
  japan:
    "Charged for plastic bags since 2020. The country where Wooby and Ise both grew up watching the tide.",
  usa: "Home of California's SB 54 — the law that put cleanup back on the makers, not the shoppers.",
  taiwan:
    "Phasing out throwaway plastic step by step since 2018. Also home to one of the world's biggest raw-plastic factories.",
};

export default function LobsterHome() {
  const countries = getAllCountries();
  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <section className="mb-10">
        <div className="tide-card p-6 sm:p-8">
          <p className="tide-byline">Wooby says hi</p>
          <h2 className="tide-wordmark text-3xl sm:text-4xl mt-2">
            Hi, I&apos;m Wooby. I&apos;m a crab.
          </h2>
          <p className="mt-3 text-lg leading-relaxed">
            I read the grown-up plastic news so you don&apos;t have to, and I
            tell you what&apos;s actually going on in plain words. My friend
            Ise — she&apos;s a Japanese spiny lobster — files dispatches from
            the field. Together we cover three countries.
          </p>
          <div className="tide-callout mt-5">
            <strong>What we&apos;re learning today:</strong> different
            countries are trying very different things to stop plastic from
            getting into the ocean. Some pass laws. Some make companies pay.
            Some try to write a global promise together.
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="tide-card tide-card--water p-3 sm:p-4">
          <WorldMap variant="lobster" countries={countries} />
        </div>
        <p className="tide-mono mt-2 text-xs text-[var(--tide-muted)]">
          Tap a sea creature to visit that country&apos;s page.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="tide-wordmark text-2xl mb-4">Pick a country</h3>
        <ul className="grid gap-4 sm:grid-cols-3">
          {countries.map((c) => (
            <li key={c.id}>
              <Link
                href={`/lobster/countries/${c.id}`}
                className="tide-card block p-4 no-underline hover:translate-y-[-2px] transition-transform"
              >
                <div
                  className="h-2 w-12 rounded mb-3"
                  style={{ backgroundColor: c.accentColor }}
                />
                <span className="text-4xl">{c.marineAnimal.emoji}</span>
                <div className="mt-2 font-semibold text-lg">
                  {c.displayName}
                </div>
                <div className="tide-mono text-xs text-[var(--tide-muted)] mt-1">
                  {c.marineAnimal.species}
                </div>
                <p className="text-sm mt-3 leading-snug">
                  {COUNTRY_TAGLINE[c.id]}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <div className="tide-card tide-card--kelp p-5 sm:p-6">
          <p className="tide-byline">Today on the Tide Report</p>
          <h3 className="tide-wordmark text-2xl mt-1">
            Ise&apos;s latest dispatches
          </h3>
          <p className="mt-2">
            Bag charges, broken promises, big factories. The latest plastic
            pollution news, written for kids — with every story linked back to
            its sourced record.
          </p>
          <Link
            href="/lobster/news"
            className="tide-mono inline-block mt-3 underline"
          >
            Read the Tide Report →
          </Link>
        </div>
      </section>
    </main>
  );
}
