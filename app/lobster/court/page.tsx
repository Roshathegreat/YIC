import Link from "next/link";
import { getAllCountries } from "@/lib/db";
import { VocabBox } from "@/components/lobster/Vocab";
import { CountryDot } from "@/components/lobster/CountryMark";
import { WOOBY_VOICE } from "@/lib/lobster-voice";

export default function LobsterCourtPage() {
  const countries = getAllCountries();
  return (
    <main className="surface-paper--kid">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <nav className="mb-6 text-sm">
          <Link
            href="/lobster"
            className="font-semibold text-[color:var(--coral)] underline decoration-2 underline-offset-4"
          >
            &larr; Back to {WOOBY_VOICE.name}&apos;s Tide Report
          </Link>
        </nav>

        <header className="mb-8">
          <p className="eyebrow">The big room</p>
          <h1 className="display text-4xl md:text-5xl mt-2">
            Treaty talks, in plain words
          </h1>
          <p className="mt-3 text-lg max-w-2xl">
            Every country sends a delegate to a giant meeting where they
            argue out a global plastic <em>treaty</em> — a rulebook the
            whole world has to follow. Here&apos;s where each of our three
            countries stands. (Taiwan isn&apos;t in the room, but we&apos;re
            saving them a seat.)
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          {countries.map((c) => {
            const treatyBrief = c.lobsterBriefs.find(
              (b) => b.refType === "treaty",
            );
            return (
              <article key={c.id} className="card flex flex-col">
                <div className="flex items-center gap-2">
                  <CountryDot id={c.id} />
                  <h2 className="display text-xl">{c.displayName}</h2>
                </div>
                <p className="text-xs text-[color:var(--muted)] mt-1">
                  Speaking through:{" "}
                  {c.marineAnimal.species.split("(")[0].trim()}
                </p>

                {treatyBrief ? (
                  <>
                    <p className="eyebrow mt-4">The quick version</p>
                    <p className="mt-1 text-sm">{treatyBrief.body}</p>
                  </>
                ) : null}

                <p className="eyebrow mt-4">The grown-up version</p>
                <p className="mt-1 text-xs text-[color:var(--muted)]">
                  {c.treatyPosition.inc52Position}
                </p>

                <Link
                  href={`/countries/${c.id}#treaty`}
                  className="mt-4 text-sm font-semibold text-[color:var(--coral)] underline decoration-2 underline-offset-4"
                >
                  See the source &rarr;
                </Link>
              </article>
            );
          })}
        </section>

        <section className="mt-8">
          <VocabBox
            terms={[
              "treaty",
              "INC",
              "INC-5.2",
              "production cap",
              "primary plastic",
              "high ambition coalition",
            ]}
          />
        </section>

        <section className="mt-8 card card--coral">
          <p className="eyebrow">Ask yourself</p>
          <p className="display text-2xl mt-2">
            Both Japan and the United States want a treaty, but neither one
            wants a top limit on how much new plastic gets made.
          </p>
          <p className="mt-3">
            If you were in the room, would you push for the cap? Or would you
            trust that recycling and cleanup can catch up?
          </p>
        </section>

        <p className="mt-6 text-sm text-[color:var(--muted)]">
          Want every position with full source citations?{" "}
          <Link
            href="/treaty"
            className="font-semibold text-[color:var(--coral)] underline decoration-2 underline-offset-4"
          >
            Visit the Ledger treaty page &rarr;
          </Link>
        </p>
      </div>
    </main>
  );
}
