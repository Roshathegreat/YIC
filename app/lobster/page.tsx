import Link from "next/link";
import WorldMap from "@/components/WorldMap";
import { getAllCountries } from "@/lib/db";
import { WOOBY_VOICE } from "@/lib/lobster-voice";
import { CountryDot } from "@/components/lobster/CountryMark";

export default function WoobyTideReportHome() {
  const countries = getAllCountries();

  return (
    <main className="surface-paper--kid">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero — one big, clear message. No competing tags. */}
        <header className="mb-10">
          <p className="eyebrow">Wooby&apos;s Tide Report</p>
          <h1 className="display text-4xl md:text-5xl mt-2">
            Marine plastic pollution,
            <br />
            explained for kids.
          </h1>
          <p className="mt-5 text-lg max-w-2xl">
            Hi, I&apos;m <strong>{WOOBY_VOICE.name}</strong>. I&apos;m a sand crab
            from Beppu Bay in Japan. I read the grown-up news about ocean
            plastic and turn it into stories you can actually follow — with
            the real source under every story.
          </p>
          <p className="mt-3 text-sm">
            <Link
              href="/"
              className="font-semibold text-[color:var(--coral)] underline decoration-2 underline-offset-4"
            >
              Teachers and researchers — visit the full Ledger &rarr;
            </Link>
          </p>
        </header>

        {/* Country picker — clear list, country dots, no emoji clutter */}
        <section className="mb-12">
          <h2 className="display text-2xl mb-4">Pick a country</h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {countries.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/lobster/countries/${c.id}`}
                  className="card hover:translate-y-[-2px] transition-transform block h-full"
                >
                  <CountryDot id={c.id} size={18} />
                  <div className="display text-xl mt-3">{c.displayName}</div>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">
                    {c.lobsterBriefs.length} stories from Wooby
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Map — one paragraph of context, no shouty caption */}
        <section className="mb-12">
          <h2 className="display text-2xl mb-3">Where in the world</h2>
          <div className="card !p-2">
            <WorldMap variant="lobster" countries={countries} />
          </div>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Click a colored country to read its briefs.
          </p>
        </section>

        {/* Three actions, equal weight */}
        <nav className="grid gap-4 sm:grid-cols-3">
          <Link href="/lobster/news" className="card card--coral block">
            <p className="eyebrow">Today</p>
            <p className="display text-lg mt-1">The Tide Report</p>
            <p className="text-sm mt-2 opacity-90">
              Wooby&apos;s daily story, pulled from real records.
            </p>
          </Link>
          <Link href="/lobster/beppu" className="card card--teal block">
            <p className="eyebrow">Home port</p>
            <p className="display text-lg mt-1">Beppu Bay</p>
            <p className="text-sm mt-2 opacity-90">
              How rain on a mountain becomes plastic in the sea.
            </p>
          </Link>
          <Link href="/lobster/court" className="card card--sun block">
            <p className="eyebrow">The big room</p>
            <p className="display text-lg mt-1">Treaty Talks</p>
            <p className="text-sm mt-2">
              Three countries, three positions, one rulebook.
            </p>
          </Link>
        </nav>
      </div>
    </main>
  );
}
