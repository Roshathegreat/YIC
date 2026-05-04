import Link from "next/link";
import { notFound } from "next/navigation";
import { COUNTRY_IDS, getCountry, type CountryId } from "@/lib/db";
import { LOBSTER_VOICE } from "@/lib/lobster-voice";
import { LOBSTER_STORIES } from "@/lib/lobster-content";

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
  const story = LOBSTER_STORIES[country.id];

  const policyById = new Map(country.domesticPolicies.map((p) => [p.id, p]));
  const companyById = new Map(country.companies.map((c) => [c.id, c]));

  return (
    <main className="lob-screen">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <nav className="mb-6 pixel">
          <Link href="/lobster" className="lob-link">
            ← {LOBSTER_VOICE.name}'s World
          </Link>
        </nav>

        <header className="lob-card p-5 mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="pixel" style={{ color: "var(--lob-accent)" }}>
                ▸ Country File
              </p>
              <h1 className="pixel-lg text-3xl mt-2">{country.displayName}</h1>
              <p className="pixel mt-1" style={{ color: "var(--lob-dim)" }}>
                Guide: {country.marineAnimal.species}
              </p>
            </div>
            <div
              className="h-3 w-16 rounded-sm shrink-0 mt-2"
              style={{ backgroundColor: country.accentColor }}
            />
          </div>
          <p className="mt-4 leading-relaxed">{story.hookline}</p>
        </header>

        <section className="mb-8">
          <p className="pixel mb-2" style={{ color: "var(--lob-accent)" }}>
            ▸ Meet your guide
          </p>
          <p className="leading-relaxed">{story.whoIsTheAnimal}</p>
        </section>

        <section className="lob-card p-5 mb-8">
          <p className="pixel mb-2" style={{ color: "var(--lob-accent)" }}>
            ▸ The big picture
          </p>
          <p className="leading-relaxed">{story.bigPicture}</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="pixel" style={{ color: "var(--lob-dim)" }}>
              Ambition score
            </span>
            <div className="flex-1 lob-bar">
              <span style={{ width: `${story.ambitionScore}%` }} />
            </div>
            <span className="pixel" style={{ color: "var(--lob-accent)" }}>
              {story.ambitionScore}/100
            </span>
          </div>
          <p
            className="pixel mt-2"
            style={{ color: "var(--lob-dim)", lineHeight: 1.6 }}
          >
            Ise's hand-rated score based on the country's stance at INC-5.2.
            Higher = pushing for stronger worldwide rules. See the{" "}
            <Link href="/treaty" className="lob-link">
              Ledger treaty page
            </Link>{" "}
            for the receipts.
          </p>
        </section>

        <section className="mb-8">
          <p className="pixel mb-3" style={{ color: "var(--lob-accent)" }}>
            ▸ The laws
          </p>
          <ul className="space-y-4">
            {story.policies.map((p) => {
              const ledger = policyById.get(p.policyId);
              return (
                <li key={p.policyId} className="lob-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="pixel-lg text-lg">{p.kidTitle}</h3>
                    {ledger ? (
                      <span className="lob-tag shrink-0">
                        {ledger.scope}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 leading-relaxed">{p.kidSummary}</p>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "var(--lob-dim)" }}
                  >
                    <span style={{ color: "var(--lob-accent)" }}>
                      Why it matters:
                    </span>{" "}
                    {p.whyItMatters}
                  </p>
                  {ledger ? (
                    <p className="pixel mt-3">
                      <Link href={`/countries/${country.id}`} className="lob-link">
                        See the source on the Ledger →
                      </Link>
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mb-8">
          <p className="pixel mb-3" style={{ color: "var(--lob-accent)" }}>
            ▸ The companies
          </p>
          <ul className="space-y-3">
            {story.companies.map((c) => {
              const ledger = companyById.get(c.companyId);
              return (
                <li key={c.companyId} className="lob-card-tight p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="pixel-lg">
                      {ledger?.name ?? c.companyId}
                    </h3>
                    {ledger?.sector ? (
                      <span className="lob-tag shrink-0">
                        {ledger.sector}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 leading-relaxed">{c.kidTake}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="lob-card p-5 mb-8">
          <p className="pixel mb-2" style={{ color: "var(--lob-accent)" }}>
            ▸ At the UN, in plain words
          </p>
          <p className="leading-relaxed">{story.treatyKidVersion}</p>
          <p className="pixel mt-3">
            <Link href="/lobster/court" className="lob-link">
              See all three countries side by side at the UN Court →
            </Link>
          </p>
        </section>

        <section className="mb-10 lob-card p-5" style={{ borderColor: "var(--lob-kelp)" }}>
          <p className="pixel mb-2" style={{ color: "var(--lob-kelp)" }}>
            ▸ One thing you can do
          </p>
          <p className="leading-relaxed">{story.thingYouCanDo}</p>
        </section>

        <footer className="pt-4 border-t-2 border-dashed border-[var(--lob-deep)] pixel text-sm">
          <span style={{ color: "var(--lob-dim)" }}>Want the receipts? </span>
          <Link href={`/countries/${country.id}`} className="lob-link">
            Open the Ledger record for {country.displayName} →
          </Link>
        </footer>
      </div>
    </main>
  );
}
