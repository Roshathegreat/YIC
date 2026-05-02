import Link from "next/link";
import { notFound } from "next/navigation";
import { COUNTRY_IDS, getCountry, type CountryId } from "@/lib/db";
import { LOBSTER_VOICE } from "@/lib/lobster-voice";

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
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <nav className="mb-6 text-sm">
          <Link href="/lobster" className="underline text-slate-300">
            &larr; {LOBSTER_VOICE.name}'s World
          </Link>
        </nav>

        <header className="mb-8">
          <div className="text-6xl">{country.marineAnimal.emoji}</div>
          <h1 className="mt-3 text-3xl font-semibold">
            {country.displayName}
          </h1>
          <p className="text-sm text-slate-400">
            {country.marineAnimal.species}
          </p>
        </header>

        <section className="space-y-4 text-slate-200">
          <p className="italic text-slate-400">
            {LOBSTER_VOICE.name} says:
          </p>
          <p className="text-lg leading-relaxed">
            {country.marineAnimal.lobsterRelationship}
          </p>
          <div className="mt-6 p-4 border border-dashed border-slate-700 rounded text-sm text-slate-400">
            <p>
              The translated story of {country.displayName}'s plastic situation
              will appear here once the translation layer comes online (week
              2). For now, the verified facts live on the{" "}
              <Link
                href={`/countries/${country.id}`}
                className="underline text-slate-200"
              >
                Ledger page for {country.displayName}
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
