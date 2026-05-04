import Link from "next/link";
import { notFound } from "next/navigation";
import { COUNTRY_IDS, findRecord, getCountry, type CountryId } from "@/lib/db";

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
    <main className="max-w-3xl mx-auto px-6 py-10">
      <header className="mb-8">
        <p className="tide-byline">A field trip with Wooby</p>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-6xl">{country.marineAnimal.emoji}</span>
          <div>
            <h2 className="tide-wordmark text-3xl sm:text-4xl">
              {country.displayName}
            </h2>
            <p className="tide-mono text-xs text-[var(--tide-muted)] mt-1">
              {country.marineAnimal.species}
            </p>
          </div>
        </div>
        <div className="tide-callout mt-5">
          <strong>What we&apos;re learning today:</strong> what is{" "}
          {country.displayName} actually doing about plastic — what laws they
          have passed, and which big companies have made promises.
        </div>
        <p className="mt-4 leading-relaxed italic">
          Ise says: {country.marineAnimal.lobsterRelationship}
        </p>
      </header>

      <section className="mb-10">
        <h3 className="tide-wordmark text-2xl mb-4">Wooby&apos;s briefings</h3>
        {country.lobsterBriefs.length === 0 ? (
          <p>No briefings yet for this country.</p>
        ) : (
          <ul className="space-y-5">
            {country.lobsterBriefs.map((brief) => {
              const record = findRecord(
                country,
                brief.recordId,
                brief.recordType,
              );
              return (
                <li key={brief.recordId} className="tide-card tide-card--kelp p-5">
                  <p className="tide-byline">
                    {brief.recordType === "company" ? "Company" : "Law"} ·{" "}
                    {country.displayName}
                  </p>
                  <h4 className="tide-wordmark text-xl mt-1 leading-tight">
                    {brief.woobyHeadline}
                  </h4>
                  <p className="mt-3 leading-relaxed">{brief.woobyBody}</p>

                  {brief.vocab.length > 0 ? (
                    <div className="mt-4">
                      <p className="tide-byline mb-1">New words</p>
                      <div>
                        {brief.vocab.map((v) => (
                          <span key={v.term} className="tide-chip" title={v.kidDefinition}>
                            {v.term}
                          </span>
                        ))}
                      </div>
                      <ul className="mt-2 text-sm space-y-1">
                        {brief.vocab.map((v) => (
                          <li key={`def-${v.term}`}>
                            <span className="tide-mono">{v.term}</span> —{" "}
                            {v.kidDefinition}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <p className="tide-takeaway mt-4">
                    Takeaway: {brief.takeaway}
                  </p>

                  {record ? (
                    <p className="tide-mono text-xs mt-4">
                      <Link href={record.href} className="underline">
                        Where this comes from on the Ledger: {record.name} →
                      </Link>
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {country.newsFeed.length > 0 ? (
        <section className="mb-10">
          <h3 className="tide-wordmark text-2xl mb-4">
            Latest dispatches from {country.displayName}
          </h3>
          <ul className="space-y-3">
            {country.newsFeed.slice(0, 3).map((n) => (
              <li key={n.id} className="tide-card p-4">
                <p className="tide-byline">
                  Ise · {n.publishedDate}
                </p>
                <p className="font-semibold mt-1">
                  {n.kidHeadline ?? n.headline}
                </p>
              </li>
            ))}
          </ul>
          <p className="tide-mono text-xs mt-3">
            <Link href="/lobster/news" className="underline">
              All dispatches in the Tide Report →
            </Link>
          </p>
        </section>
      ) : null}

      <section className="mb-10">
        <p className="tide-mono text-xs">
          <Link href={`/countries/${country.id}`} className="underline">
            See every sourced record for {country.displayName} on the Ledger →
          </Link>
        </p>
      </section>
    </main>
  );
}
