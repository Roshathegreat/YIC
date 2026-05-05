import Link from "next/link";
import WorldMap from "@/components/WorldMap";
import { getAllCountries } from "@/lib/db";

export default function LedgerHome() {
  const countries = getAllCountries();
  return (
    <main className="surface-paper">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-10">
          <p className="eyebrow">The Ledger</p>
          <h1 className="display text-4xl md:text-5xl mt-2">
            Marine plastic governance, sourced.
          </h1>
          <p className="mt-4 max-w-2xl">
            A citable database of plastic policy, corporate disclosures, and
            treaty positions for Japan, the United States, and Taiwan. Every
            record links to its source and shows when it was last updated.
          </p>
          <p className="mt-3 text-sm">
            <Link
              href="/lobster"
              className="font-semibold text-[color:var(--coral)] underline decoration-2 underline-offset-4"
            >
              Looking for the kid-friendly version? Visit Wooby&apos;s Tide
              Report &rarr;
            </Link>
          </p>
        </header>

        <section className="mb-12">
          <div className="card !p-2">
            <WorldMap variant="ledger" countries={countries} />
          </div>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Highlighted: Japan, United States, Taiwan. Click a country to open
            its record.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="display text-2xl mb-4">Countries</h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {countries.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/countries/${c.id}`}
                  className="card block hover:translate-y-[-2px] transition-transform"
                >
                  <div
                    className="h-1.5 w-12 rounded"
                    style={{ backgroundColor: c.accentColor }}
                  />
                  <div className="display text-xl mt-3">{c.displayName}</div>
                  <div className="text-sm text-[color:var(--muted)] mt-1">
                    {c.domesticPolicies.length} policies ·{" "}
                    {c.companies.length} companies
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <nav className="text-sm">
          <Link
            href="/treaty"
            className="font-semibold text-[color:var(--coral)] underline decoration-2 underline-offset-4"
          >
            Compare treaty positions across all 3 countries &rarr;
          </Link>
        </nav>
      </div>
    </main>
  );
}
