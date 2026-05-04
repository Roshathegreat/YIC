import Link from "next/link";
import { getAllCountries } from "@/lib/db";
import { LOBSTER_STORIES, COURT_INTRO } from "@/lib/lobster-content";

export default function LobsterCourtPage() {
  const countries = getAllCountries();
  return (
    <main className="lob-screen">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <nav className="mb-6 pixel">
          <Link href="/lobster" className="lob-link">
            ← Ise's World
          </Link>
        </nav>

        <header className="mb-8">
          <p className="pixel" style={{ color: "var(--lob-accent)" }}>
            ▸ The UN Court
          </p>
          <h1 className="pixel-lg text-3xl mt-2">
            The animals argue about plastic
          </h1>
          <p className="mt-3 leading-relaxed max-w-2xl">
            {COURT_INTRO.whatIsThis}
          </p>
        </header>

        <section className="lob-card p-5 mb-8">
          <p className="pixel mb-2" style={{ color: "var(--lob-accent)" }}>
            ▸ The big question
          </p>
          <p className="leading-relaxed">{COURT_INTRO.bigQuestion}</p>
          <p
            className="pixel mt-3 leading-relaxed"
            style={{ color: "var(--lob-dim)" }}
          >
            {COURT_INTRO.whoSitsHere}
          </p>
        </section>

        <section className="mb-8">
          <p className="pixel mb-3" style={{ color: "var(--lob-accent)" }}>
            ▸ At the table
          </p>
          <ul className="space-y-4">
            {countries.map((c) => {
              const story = LOBSTER_STORIES[c.id];
              return (
                <li key={c.id} className="lob-card p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="pixel-lg text-xl">
                        <Link
                          href={`/lobster/countries/${c.id}`}
                          className="lob-link"
                        >
                          {c.displayName}
                        </Link>
                      </h2>
                      <p
                        className="pixel mt-1"
                        style={{ color: "var(--lob-dim)" }}
                      >
                        Speaker: {c.marineAnimal.species.split("(")[0].trim()}
                      </p>
                    </div>
                    <div
                      className="h-3 w-12 rounded-sm shrink-0 mt-2"
                      style={{ backgroundColor: c.accentColor }}
                    />
                  </div>

                  <blockquote
                    className="mt-4 pl-3 border-l-2"
                    style={{ borderColor: c.accentColor }}
                  >
                    <p className="leading-relaxed italic">
                      "{story.treatyKidVersion}"
                    </p>
                  </blockquote>

                  <p
                    className="pixel mt-3 leading-relaxed"
                    style={{ color: "var(--lob-dim)" }}
                  >
                    <span style={{ color: "var(--lob-ink)" }}>
                      Original (researcher version):
                    </span>{" "}
                    {c.treatyPosition.inc52Position}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <span
                      className="pixel"
                      style={{ color: "var(--lob-dim)" }}
                    >
                      Ambition
                    </span>
                    <div className="flex-1 lob-bar">
                      <span style={{ width: `${story.ambitionScore}%` }} />
                    </div>
                    <span
                      className="pixel"
                      style={{ color: "var(--lob-accent)" }}
                    >
                      {story.ambitionScore}/100
                    </span>
                  </div>

                  <p className="pixel mt-3">
                    <Link href={`/countries/${c.id}`} className="lob-link">
                      See the cited source →
                    </Link>
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="lob-card p-5 mb-8">
          <p className="pixel mb-2" style={{ color: "var(--lob-accent)" }}>
            ▸ Vocabulary you'll hear at the UN
          </p>
          <dl className="grid sm:grid-cols-2 gap-3 mt-2">
            <div>
              <dt className="pixel" style={{ color: "var(--lob-kelp)" }}>
                High Ambition Coalition
              </dt>
              <dd className="text-sm mt-1 leading-relaxed">
                The group of countries pushing for the strongest worldwide
                rules — including a cap on how much new plastic gets made.
              </dd>
            </div>
            <div>
              <dt className="pixel" style={{ color: "var(--lob-kelp)" }}>
                Production cap
              </dt>
              <dd className="text-sm mt-1 leading-relaxed">
                A worldwide limit on how much brand-new plastic factories are
                allowed to make. The hardest fight in the negotiation.
              </dd>
            </div>
            <div>
              <dt className="pixel" style={{ color: "var(--lob-kelp)" }}>
                Lifecycle approach
              </dt>
              <dd className="text-sm mt-1 leading-relaxed">
                Looking at plastic from when oil comes out of the ground all
                the way to when the bottle is thrown away. Most countries say
                they support this — but they disagree about which parts to
                actually regulate.
              </dd>
            </div>
            <div>
              <dt className="pixel" style={{ color: "var(--lob-kelp)" }}>
                INC-5.2
              </dt>
              <dd className="text-sm mt-1 leading-relaxed">
                The 5th round (resumed) of negotiations. It met in Geneva in
                August 2025. It ended without a finished treaty.
              </dd>
            </div>
          </dl>
        </section>

        <footer className="pt-4 border-t-2 border-dashed border-[var(--lob-deep)] pixel text-sm">
          <span style={{ color: "var(--lob-dim)" }}>
            Want the side-by-side researcher view?{" "}
          </span>
          <Link href="/treaty" className="lob-link">
            Open the Ledger treaty page →
          </Link>
        </footer>
      </div>
    </main>
  );
}
