import Link from "next/link";
import { getAllCountries } from "@/lib/db";
import { VocabBox } from "@/components/lobster/Vocab";
import { WOOBY_VOICE } from "@/lib/lobster-voice";

export default function LobsterCourtPage() {
  const countries = getAllCountries();
  return (
    <main className="tide-surface min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8">
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
            THE BIG TREATY ROOM
          </p>
          <h1 className="pixel text-2xl md:text-3xl text-[var(--tide-foam)] mt-1 leading-snug">
            WHO WANTS WHAT AT THE UN
          </h1>
          <p className="text-[var(--tide-foam)]/80 mt-3 leading-relaxed">
            Every country sends a delegate to a giant meeting where they argue
            out a global plastic <em>treaty</em> — that's a rulebook the whole
            world has to follow. Here's where each of our three countries
            stands. (Taiwan isn't in the room, but we're saving them a seat.)
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          {countries.map((c) => {
            const treatyBrief = c.lobsterBriefs.find(
              (b) => b.refType === "treaty",
            );
            return (
              <article
                key={c.id}
                className="pixel-card pixel-card--kelp p-4 flex flex-col"
              >
                <div className="flex items-center gap-2">
                  <span className="text-3xl" aria-hidden>
                    {c.marineAnimal.emoji}
                  </span>
                  <h2 className="pixel text-base text-[var(--tide-foam)]">
                    {c.displayName}
                  </h2>
                </div>
                <p className="text-xs text-[var(--tide-foam)]/70 mt-1">
                  Speaking through: {c.marineAnimal.species.split("(")[0].trim()}
                </p>

                {treatyBrief ? (
                  <>
                    <h3 className="pixel text-xs text-[var(--tide-sun)] mt-4">
                      THE QUICK VERSION
                    </h3>
                    <p className="text-[var(--tide-foam)] mt-1 text-sm leading-relaxed">
                      {treatyBrief.body}
                    </p>
                  </>
                ) : null}

                <h3 className="pixel text-xs text-[var(--tide-sun)] mt-4">
                  THE GROWN-UP VERSION
                </h3>
                <p className="text-[var(--tide-foam)]/90 mt-1 text-xs leading-relaxed">
                  {c.treatyPosition.inc52Position}
                </p>

                <Link
                  href={`/countries/${c.id}#treaty`}
                  className="mt-4 text-xs underline decoration-dotted text-[var(--tide-foam)]/80"
                >
                  check the source &rarr;
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

        <section className="mt-8 pixel-card pixel-card--sun p-4">
          <p className="pixel text-xs text-[var(--tide-sun)] mb-2">
            ◆ ASK YOURSELF ◆
          </p>
          <p className="text-[var(--tide-foam)] leading-relaxed">
            Both Japan and the United States say they want a treaty, but
            neither one wants a top limit on how much new plastic gets made.
            If you were in the room, would you push for the cap? Or trust
            that recycling and cleanup can catch up?
          </p>
        </section>

        <p className="mt-6 text-xs text-[var(--tide-foam)]/70">
          Want every position with full source citations? Visit the{" "}
          <Link href="/treaty" className="underline decoration-dotted">
            Ledger treaty page
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
