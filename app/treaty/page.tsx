import Link from "next/link";
import { getAllCountries } from "@/lib/db";
import { SourceList } from "@/components/ledger/SourceCite";

export default function TreatyComparePage() {
  const countries = getAllCountries();
  return (
    <main className="surface-paper">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <nav className="mb-6 text-sm">
          <Link
            href="/"
            className="font-semibold text-[color:var(--coral)] underline decoration-2 underline-offset-4"
          >
            &larr; Ledger
          </Link>
        </nav>
        <header className="mb-8">
          <p className="eyebrow">Treaty comparison</p>
          <h1 className="display text-4xl mt-2">
            UN Plastic Treaty — country positions compared
          </h1>
          <p className="mt-3 text-[color:var(--muted)]">
            Anchored to the resumed INC-5.2 session in Geneva, August 2025.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {countries.map((c) => (
            <section key={c.id} className="card">
              <div
                className="h-1.5 w-12 rounded mb-3"
                style={{ backgroundColor: c.accentColor }}
              />
              <h2 className="display text-xl">
                <Link
                  href={`/countries/${c.id}`}
                  className="underline decoration-2 underline-offset-4"
                >
                  {c.displayName}
                </Link>
              </h2>
              <p className="text-xs text-[color:var(--muted)] mb-3">
                Last updated {c.treatyPosition.lastUpdated}
              </p>
              <p className="text-sm">
                <span className="font-bold">Stance: </span>
                {c.treatyPosition.currentStance}
              </p>
              <p className="text-sm mt-3">
                <span className="font-bold">INC-5.2: </span>
                {c.treatyPosition.inc52Position}
              </p>
              <div className="mt-4">
                <p className="eyebrow">Sources</p>
                <SourceList sources={c.treatyPosition.sources} />
              </div>
            </section>
          ))}
        </div>

        <p className="mt-8 text-sm">
          <Link
            href="/lobster/court"
            className="font-semibold text-[color:var(--coral)] underline decoration-2 underline-offset-4"
          >
            Read the kid-friendly version on Wooby&apos;s Tide Report &rarr;
          </Link>
        </p>
      </div>
      <p className="mt-8 text-sm">
        <Link
          href="/lobster/court"
          className="underline decoration-dotted"
        >
          Read the kid-friendly version on Wooby&apos;s Tide Report &rarr;
        </Link>
      </p>
      </div>
    </main>
  );
}
