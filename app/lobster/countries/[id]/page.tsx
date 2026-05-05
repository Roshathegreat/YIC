import Link from "next/link";
import { notFound } from "next/navigation";
import { COUNTRY_IDS, getCountry, type CountryId } from "@/lib/db";
import { BriefCard } from "@/components/lobster/BriefCard";
import { CountryDot } from "@/components/lobster/CountryMark";
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
    <main className="surface-paper--kid">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <nav className="mb-6 text-sm">
          <Link
            href="/lobster"
            className="font-semibold text-[color:var(--coral)] underline decoration-2 underline-offset-4"
          >
            &larr; Back to {WOOBY_VOICE.name}&apos;s Tide Report
          </Link>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-3">
            <CountryDot id={country.id} size={20} />
            <p className="eyebrow">Country desk</p>
          </div>
          <h1 className="display text-4xl md:text-5xl mt-2">
            {country.displayName}
          </h1>
          <p className="text-[color:var(--muted)] mt-2">
            Country representative: {country.marineAnimal.species}
          </p>
        </header>

        <section className="mb-8 card card--teal">
          <p className="eyebrow">From Ise&apos;s notebook</p>
          <p className="mt-2 text-lg">{country.marineAnimal.lobsterRelationship}</p>
        </section>

        <section className="space-y-5">
          <h2 className="display text-2xl">Wooby&apos;s briefs</h2>
          {country.lobsterBriefs.length === 0 ? (
            <p className="text-[color:var(--muted)]">
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

        <footer className="mt-10 text-sm text-[color:var(--muted)]">
          Want the grown-up version with all the legal details?{" "}
          <Link
            href={`/countries/${country.id}`}
            className="font-semibold text-[color:var(--coral)] underline decoration-2 underline-offset-4"
          >
            Visit the {country.displayName} Ledger page &rarr;
          </Link>
        </footer>
      </div>
    </main>
  );
}
