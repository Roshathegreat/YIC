import Link from "next/link";
import { notFound } from "next/navigation";
import { COUNTRY_IDS, getCountry, type CountryId } from "@/lib/db";
import { LOBSTER_VOICE } from "@/lib/lobster-voice";
import { resolveTranslations } from "@/lib/lobster";
import { SourceList } from "@/components/ledger/SourceCite";

export function generateStaticParams() {
  return COUNTRY_IDS.map((id) => ({ id }));
}

const RECORD_TYPE_LABEL: Record<string, string> = {
  treaty: "Treaty position",
  policy: "Policy",
  company: "Company",
  news: "News",
  beppu: "Local node",
};

export default async function LobsterCountryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!(COUNTRY_IDS as readonly string[]).includes(id)) notFound();
  const country = getCountry(id as CountryId);
  const translations = resolveTranslations(country);

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

        <section className="mb-10 space-y-3 text-slate-200">
          <p className="italic text-slate-400">{LOBSTER_VOICE.name} says:</p>
          <p className="text-lg leading-relaxed">
            {country.marineAnimal.lobsterRelationship}
          </p>
        </section>

        {translations.length === 0 ? (
          <section className="mt-6 p-4 border border-dashed border-slate-700 rounded text-sm text-slate-400">
            <p>
              No lobster translations yet for {country.displayName}. The
              verified records live on the{" "}
              <Link
                href={`/countries/${country.id}`}
                className="underline text-slate-200"
              >
                {country.displayName} ledger page
              </Link>
              .
            </p>
          </section>
        ) : (
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-100">
              What's actually going on
            </h2>
            {translations.map(({ translation, record }, i) => (
              <article
                key={`${translation.sourceRecordType}-${translation.sourceRecordId}-${i}`}
                className="border border-slate-700 rounded-md p-4 bg-slate-950/40"
              >
                <header className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      {RECORD_TYPE_LABEL[translation.sourceRecordType] ??
                        translation.sourceRecordType}
                    </p>
                    <h3 className="text-base font-medium text-slate-100">
                      {record.title}
                    </h3>
                  </div>
                  <span className="text-[10px] uppercase tracking-wide text-slate-500 border border-slate-700 rounded px-2 py-0.5 whitespace-nowrap">
                    {translation.modelVersion}
                  </span>
                </header>
                <p className="text-slate-200 leading-relaxed whitespace-pre-line">
                  {translation.body}
                </p>
                <footer className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                  <p>
                    <Link
                      href={record.ledgerHref}
                      className="underline text-slate-300"
                    >
                      From the ledger: {record.title} &rarr;
                    </Link>
                  </p>
                  <div>
                    <p className="uppercase tracking-wide text-slate-500">
                      Sources behind this
                    </p>
                    <SourceList sources={record.sources} />
                  </div>
                  <p className="text-slate-600">
                    Generated {translation.generatedAt} ·{" "}
                    {translation.modelVersion}
                  </p>
                </footer>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
