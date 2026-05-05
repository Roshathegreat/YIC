import Link from "next/link";
import { notFound } from "next/navigation";
import { COUNTRY_IDS, getCountry, type CountryId } from "@/lib/db";
import { BriefCard } from "@/components/lobster/BriefCard";
import { WOOBY_VOICE } from "@/lib/lobster-voice";

export function generateStaticParams() {
  return COUNTRY_IDS.map((id) => ({ id }));
}

export default async function LobsterCountryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!(COUNTRY_IDS as readonly string[]).includes(id)) notFound();
  const country = getCountry(id as CountryId);

  return (
    <main className="tide-surface min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <nav className="mb-4 text-sm">
          <Link
            href="/lobster"
            className="underline decoration-dotted text-[var(--tide-foam)]/80"
          >
            &larr; back to {WOOBY_VOICE.name}'s Tide Report
          </Link>
        </nav>

        <header className="mb-6">
          <p className="pixel text-xs text-[var(--tide-sun)]">
            {country.displayName.toUpperCase()} DESK
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-5xl" aria-hidden>
              {country.marineAnimal.emoji}
            </span>
            <h1 className="pixel text-2xl text-[var(--tide-foam)]">
              {country.displayName}
            </h1>
          </div>
          <p className="text-xs text-[var(--tide-foam)]/70 mt-2">
            Country representative: {country.marineAnimal.species}
          </p>
        </header>

        <section className="mb-8 pixel-card pixel-card--kelp p-4">
          <p className="pixel text-xs text-[var(--tide-sun)] mb-2">
            ◆ FROM ISE'S NOTEBOOK ◆
          </p>
          <p className="text-[var(--tide-foam)] leading-relaxed">
            {country.marineAnimal.lobsterRelationship}
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="pixel text-sm text-[var(--tide-sun)]">
            ◆ {WOOBY_VOICE.name.toUpperCase()}'S BRIEFS ◆
          </h2>
          {country.lobsterBriefs.length === 0 ? (
            <p className="text-[var(--tide-foam)]/70 text-sm">
              No briefs yet. Wooby is still reading the file.
            </p>
          ) : (
            country.lobsterBriefs.map((b) => (
              <div key={b.id} id={b.id} className="scroll-mt-20">
                <BriefCard country={country} brief={b} />
              </div>
            ))
          )}
        </section>

        <footer className="mt-10 text-xs text-[var(--tide-foam)]/70">
          Want the grown-up version with all the legal details? Visit the{" "}
          <Link
            href={`/countries/${country.id}`}
            className="underline decoration-dotted"
          >
            {country.displayName} Ledger page
          </Link>
          .
        </footer>
      </div>
    </main>
  );
}
