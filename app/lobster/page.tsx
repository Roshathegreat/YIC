import Link from "next/link";
import WorldMap from "@/components/WorldMap";
import { getAllCountries } from "@/lib/db";
import { WOOBY_VOICE } from "@/lib/lobster-voice";

export default function WoobyTideReportHome() {
  const countries = getAllCountries();

  return (
    <main className="tide-surface min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <header className="mb-8">
          <p className="pixel text-xs text-[var(--tide-sun)]">
            WOOBY'S TIDE REPORT
          </p>
          <h1 className="pixel mt-2 text-2xl md:text-3xl text-[var(--tide-foam)] leading-snug">
            MARINE PLASTIC POLLUTION,
            <br />
            EXPLAINED BY A CRAB.
          </h1>
          <p className="mt-4 text-[var(--tide-foam)] max-w-2xl leading-relaxed">
            Hi, I'm <strong>{WOOBY_VOICE.name}</strong>. I'm a sand crab from
            Beppu Bay. My friend Ise the lobster reads the grown-up news about
            ocean plastic, and together we tell you what's actually happening —
            in real words, with the real source under every story.
          </p>
          <p className="mt-3 text-sm text-[var(--tide-foam)]/80">
            <Link href="/" className="underline decoration-dotted">
              For researchers and teachers, the full Ledger is here &rarr;
            </Link>
          </p>
        </header>

        <section className="mb-10">
          <WorldMap variant="lobster" countries={countries} />
          <p className="mt-2 text-xs text-[var(--tide-foam)]/70">
            Click an animal to meet that country's representative and read
            Wooby's brief.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="pixel text-sm text-[var(--tide-sun)] mb-3">
            PICK A COUNTRY
          </h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {countries.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/lobster/countries/${c.id}`}
                  className="pixel-card block p-4 hover:translate-y-[-2px] transition-transform"
                >
                  <span className="text-4xl" aria-hidden>
                    {c.marineAnimal.emoji}
                  </span>
                  <div className="mt-2 pixel text-sm text-[var(--tide-foam)]">
                    {c.displayName}
                  </div>
                  <div className="text-xs text-[var(--tide-foam)]/70 mt-1">
                    {c.lobsterBriefs.length} stories from Wooby
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <nav className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/lobster/news"
            className="pixel-card pixel-card--sun p-4 hover:translate-y-[-2px] transition-transform"
          >
            <p className="pixel text-sm text-[var(--tide-foam)]">
              TODAY'S TIDE REPORT
            </p>
            <p className="text-xs text-[var(--tide-foam)]/80 mt-2">
              Wooby's daily news, pulled from real records.
            </p>
          </Link>
          <Link
            href="/lobster/beppu"
            className="pixel-card pixel-card--kelp p-4 hover:translate-y-[-2px] transition-transform"
          >
            <p className="pixel text-sm text-[var(--tide-foam)]">
              VISIT MY HOME PORT
            </p>
            <p className="text-xs text-[var(--tide-foam)]/80 mt-2">
              Beppu Bay: where mountain rain meets the sea.
            </p>
          </Link>
          <Link
            href="/lobster/court"
            className="pixel-card p-4 hover:translate-y-[-2px] transition-transform"
          >
            <p className="pixel text-sm text-[var(--tide-foam)]">
              THE BIG TREATY ROOM
            </p>
            <p className="text-xs text-[var(--tide-foam)]/80 mt-2">
              How the three countries stack up at the UN.
            </p>
          </Link>
        </nav>
      </div>
    </main>
  );
}
