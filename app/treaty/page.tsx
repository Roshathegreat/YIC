import Link from "next/link";
import { getAllCountries } from "@/lib/db";
import { SourceList } from "@/components/ledger/SourceCite";

export default function TreatyComparePage() {
  const countries = getAllCountries();
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <nav className="mb-6 text-sm">
        <Link href="/" className="underline">
          &larr; Ledger
        </Link>
      </nav>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">
          UN Plastic Treaty — country positions compared
        </h1>
        <p className="mt-2 text-gray-700">
          Anchored to the resumed INC-5.2 session in Geneva, August 2025.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {countries.map((c) => (
          <section
            key={c.id}
            className="border border-gray-200 rounded-md p-4 bg-white"
          >
            <div
              className="h-1 w-12 rounded mb-3"
              style={{ backgroundColor: c.accentColor }}
            />
            <h2 className="text-lg font-semibold text-gray-900">
              <Link href={`/countries/${c.id}`} className="underline">
                {c.displayName}
              </Link>
            </h2>
            <p className="text-xs text-gray-500 mb-3">
              Last updated {c.treatyPosition.lastUpdated}
            </p>
            <p className="text-sm text-gray-800">
              <span className="font-medium">Stance: </span>
              {c.treatyPosition.currentStance}
            </p>
            <p className="text-sm text-gray-800 mt-3">
              <span className="font-medium">INC-5.2: </span>
              {c.treatyPosition.inc52Position}
            </p>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Sources
              </p>
              <SourceList sources={c.treatyPosition.sources} />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
