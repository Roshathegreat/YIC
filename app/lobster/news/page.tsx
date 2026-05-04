import Link from "next/link";
import { findRecord, getAllCountries } from "@/lib/db";
import type { Country, NewsItem } from "@/lib/schema";

type Dispatch = NewsItem & { country: Country };

export default function TideReportPage() {
  const countries = getAllCountries();
  const dispatches: Dispatch[] = countries
    .flatMap((c) => c.newsFeed.map((n) => ({ ...n, country: c })))
    .sort((a, b) =>
      a.publishedDate < b.publishedDate ? 1 : a.publishedDate > b.publishedDate ? -1 : 0,
    );

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <header className="mb-8">
        <p className="tide-byline">The Tide Report · Issue 001</p>
        <h2 className="tide-wordmark text-3xl sm:text-4xl mt-1">
          Plastic pollution news, for kids
        </h2>
        <div className="tide-callout mt-4">
          <strong>What we&apos;re learning today:</strong> news stories about
          plastic are usually written for grown-ups. Here, Ise files the same
          stories in plain words, and Wooby explains the tricky vocabulary.
          Every dispatch links to the full sourced record on the Ledger.
        </div>
      </header>

      {dispatches.length === 0 ? (
        <p>No dispatches yet. Check back soon.</p>
      ) : (
        <ul className="space-y-6">
          {dispatches.map((d) => {
            const record =
              d.sourceRecordId && d.sourceRecordType
                ? findRecord(d.country, d.sourceRecordId, d.sourceRecordType)
                : null;
            return (
              <li key={d.id} className="tide-card p-5 sm:p-6">
                <div
                  className="h-2 w-10 rounded mb-3"
                  style={{ backgroundColor: d.country.accentColor }}
                />
                <p className="tide-byline">
                  Filed by Ise from {d.country.displayName} ·{" "}
                  {d.publishedDate}
                </p>
                <h3 className="tide-wordmark text-xl sm:text-2xl mt-1 leading-tight">
                  {d.kidHeadline ?? d.headline}
                </h3>
                {d.iseDispatch ? (
                  <p className="mt-3 leading-relaxed">{d.iseDispatch}</p>
                ) : (
                  <p className="mt-3 leading-relaxed">{d.summary}</p>
                )}

                {d.vocab && d.vocab.length > 0 ? (
                  <div className="tide-callout mt-4">
                    <strong>Wooby&apos;s word of the day:</strong>{" "}
                    {d.vocab.map((v, i) => (
                      <span key={v.term}>
                        {i > 0 ? " · " : null}
                        <em>{v.term}</em> — {v.kidDefinition}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="tide-mono mt-4 text-xs text-[var(--tide-muted)] flex flex-wrap gap-x-4 gap-y-1">
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline"
                  >
                    Original story · {d.publisher} ↗
                  </a>
                  {record ? (
                    <Link href={record.href} className="underline">
                      Where this comes from on the Ledger →
                    </Link>
                  ) : null}
                  <Link
                    href={`/lobster/countries/${d.country.id}`}
                    className="underline"
                  >
                    More on {d.country.displayName} →
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
