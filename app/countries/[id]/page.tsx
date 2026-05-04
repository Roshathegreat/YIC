import Link from "next/link";
import { notFound } from "next/navigation";
import { COUNTRY_IDS, getCountry, type CountryId } from "@/lib/db";
import { RecordCard } from "@/components/ledger/RecordCard";
import { SourceList } from "@/components/ledger/SourceCite";

export function generateStaticParams() {
  return COUNTRY_IDS.map((id) => ({ id }));
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!(COUNTRY_IDS as readonly string[]).includes(id)) notFound();
  const country = getCountry(id as CountryId);

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <nav className="mb-6 text-sm">
        <Link href="/" className="underline">
          &larr; Ledger
        </Link>
      </nav>

      <header className="mb-8 border-b border-gray-200 pb-6">
        <div
          className="h-1 w-16 rounded mb-3"
          style={{ backgroundColor: country.accentColor }}
        />
        <h1 className="text-3xl font-semibold text-gray-900">
          {country.displayName}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          ISO {country.iso3} · last updated {country.treatyPosition.lastUpdated}
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          UN Plastic Treaty position
        </h2>
        <RecordCard
          title="Current stance"
          lastUpdated={country.treatyPosition.lastUpdated}
        >
          <p>{country.treatyPosition.currentStance}</p>
          <p className="mt-3">
            <span className="font-medium">INC-5.2 (Geneva, Aug 2025): </span>
            {country.treatyPosition.inc52Position}
          </p>
          <div className="mt-3">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Sources
            </p>
            <SourceList sources={country.treatyPosition.sources} />
          </div>
        </RecordCard>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Domestic policies
        </h2>
        <div className="space-y-3">
          {country.domesticPolicies.map((p) => (
            <RecordCard
              key={p.id}
              id={p.id}
              title={p.name}
              subtitle={p.enacted ? `Enacted ${p.enacted}` : undefined}
              badge={p.scope}
              lastUpdated={p.lastUpdated}
            >
              <p>{p.summary}</p>
              <div className="mt-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Sources
                </p>
                <SourceList sources={p.sources} />
              </div>
            </RecordCard>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Companies
        </h2>
        <div className="space-y-3">
          {country.companies.map((c) => (
            <RecordCard
              key={c.id}
              id={c.id}
              title={c.name}
              subtitle={c.sector}
              lastUpdated={c.lastUpdated}
            >
              <ul className="list-disc pl-5 space-y-2">
                {c.commitments.map((cm, i) => (
                  <li key={i}>
                    <p>
                      {cm.description}
                      {cm.target ? ` (target: ${cm.target}` : ""}
                      {cm.year ? `${cm.target ? ", " : " ("}by ${cm.year}` : ""}
                      {cm.target || cm.year ? ")" : ""}
                    </p>
                    <SourceList sources={cm.sources} />
                  </li>
                ))}
              </ul>
            </RecordCard>
          ))}
        </div>
      </section>

      {country.newsFeed.length > 0 ? (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">News</h2>
          <ul className="space-y-3">
            {country.newsFeed.map((n) => (
              <li key={n.id} className="border-l-2 border-gray-200 pl-3">
                <a
                  href={n.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium underline"
                >
                  {n.headline}
                </a>
                <div className="text-xs text-gray-500">
                  {n.publisher} · {n.publishedDate}
                </div>
                <p className="text-sm mt-1">{n.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {country.deepNode ? (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Beppu deep node
          </h2>
          <RecordCard
            title="Local context"
            lastUpdated={country.deepNode.lastUpdated}
          >
            <p>
              <span className="font-medium">Marine debris: </span>
              {country.deepNode.marineDebrisData}
            </p>
            <p className="mt-2">
              <span className="font-medium">Hydrology: </span>
              {country.deepNode.hydrology}
            </p>
            <div className="mt-3">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Local cleanup orgs
              </p>
              <ul className="list-disc pl-5 mt-1 text-sm">
                {country.deepNode.cleanupOrgs.map((o, i) => (
                  <li key={i}>
                    {o.url ? (
                      <a
                        href={o.url}
                        className="underline"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {o.name}
                      </a>
                    ) : (
                      o.name
                    )}{" "}
                    — {o.description}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Sources
              </p>
              <SourceList sources={country.deepNode.sources} />
            </div>
          </RecordCard>
        </section>
      ) : null}
    </main>
  );
}
