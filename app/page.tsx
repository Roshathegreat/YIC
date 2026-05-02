import Link from "next/link";
import WorldMap from "@/components/WorldMap";
import { getAllCountries } from "@/lib/db";

export default function LedgerHome() {
  const countries = getAllCountries();
  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-500">
          The Ledger
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-gray-900">
          Plastic governance, sourced.
        </h1>
        <p className="mt-2 text-gray-700 max-w-2xl">
          A citable database of plastic policy, corporate disclosures, and
          treaty positions for selected countries. Every record links to its
          source and shows when it was last updated.
        </p>
        <p className="mt-2 text-sm">
          <Link href="/lobster" className="underline">
            Or visit the lobster's world &rarr;
          </Link>
        </p>
      </header>

      <section className="mb-10">
        <WorldMap variant="ledger" countries={countries} />
        <p className="mt-2 text-xs text-gray-500">
          Highlighted: Japan, United States, Taiwan. Click a country to open
          its record. Other countries are out of scope for the MVP.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 text-gray-900">Countries</h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {countries.map((c) => (
            <li key={c.id}>
              <Link
                href={`/countries/${c.id}`}
                className="block border border-gray-200 rounded-md p-4 hover:bg-gray-50"
              >
                <div
                  className="w-full h-1 rounded"
                  style={{ backgroundColor: c.accentColor }}
                />
                <div className="mt-3 font-medium text-gray-900">
                  {c.displayName}
                </div>
                <div className="text-xs text-gray-500">
                  {c.domesticPolicies.length} policies ·{" "}
                  {c.companies.length} companies
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <nav className="mt-10 text-sm">
        <Link href="/treaty" className="underline">
          Compare treaty positions across all 3 countries &rarr;
        </Link>
      </nav>
    </main>
  );
}
