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
    <main className="surface-paper">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <nav className="mb-6 text-sm">
          <Link
            href="/"
            className="font-semibold text-[color:var(--coral)] underline decoration-2 underline-offset-4"
          >
            &larr; Ledger
          </Link>
        </nav>

        <header className="mb-10 border-b-2 rule pb-6">
          <div
            className="h-1.5 w-16 rounded mb-3"
            style={{ backgroundColor: country.accentColor }}
          />
          <h1 className="display text-4xl md:text-5xl">
            {country.displayName}
          </h1>
          <p className="text-sm text-[color:var(--muted)] mt-2">
            ISO {country.iso3} · last updated{" "}
            {country.treatyPosition.lastUpdated}
          </p>
          <p className="text-sm mt-3">
            <Link
              href={`/lobster/countries/${country.id}`}
              className="font-semibold text-[color:var(--coral)] underline decoration-2 underline-offset-4"
            >
              Read the kid-friendly version on Wooby&apos;s Tide Report &rarr;
            </Link>
          </p>
        </header>

        <section className="mb-10">
          <h2 className="display text-2xl mb-4">UN Plastic Treaty position</h2>
          <RecordCard
            id="treaty"
            title="Current stance"
            lastUpdated={country.treatyPosition.lastUpdated}
          >
            <p>{country.treatyPosition.currentStance}</p>
            <p className="mt-3">
              <span className="font-bold">INC-5.2 (Geneva, Aug 2025): </span>
              {country.treatyPosition.inc52Position}
            </p>
            <div className="mt-3">
              <p className="eyebrow">Sources</p>
              <SourceList sources={country.treatyPosition.sources} />
            </div>
          </RecordCard>
        </section>

        <section className="mb-10">
          <h2 className="display text-2xl mb-4">Domestic policies</h2>
          <div className="space-y-4">
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
                  <p className="eyebrow">Sources</p>
                  <SourceList sources={p.sources} />
                </div>
              </RecordCard>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="display text-2xl mb-4">Companies</h2>
          <div className="space-y-4">
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
            <h2 className="display text-2xl mb-4">News</h2>
            <ul className="space-y-3">
              {country.newsFeed.map((n) => (
                <li
                  key={n.id}
                  id={n.id}
                  className="border-l-2 rule pl-3 scroll-mt-24"
                >
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-bold underline"
                  >
                    {n.headline}
                  </a>
                  <div className="text-xs text-[color:var(--muted)]">
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
            <h2 className="display text-2xl mb-4">Beppu deep node</h2>
            <RecordCard
              id="beppu"
              title="Local context"
              lastUpdated={country.deepNode.lastUpdated}
            >
              <p>
                <span className="font-bold">Marine debris: </span>
                {country.deepNode.marineDebrisData}
              </p>
              <p className="mt-2">
                <span className="font-bold">Hydrology: </span>
                {country.deepNode.hydrology}
              </p>
              <div className="mt-3">
                <p className="eyebrow">Local cleanup orgs</p>
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
                <p className="eyebrow">Sources</p>
                <SourceList sources={country.deepNode.sources} />
              </div>
            </RecordCard>
          </section>
        ) : null}
      </div>
    </main>
  );
}
