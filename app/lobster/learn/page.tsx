import Link from "next/link";
import { PLASTIC_101 } from "@/lib/lobster-content";

export default function LobsterLearnPage() {
  return (
    <main className="lob-screen">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <nav className="mb-6 pixel">
          <Link href="/lobster" className="lob-link">
            ← Ise's World
          </Link>
        </nav>

        <header className="mb-8">
          <p className="pixel" style={{ color: "var(--lob-accent)" }}>
            ▸ Plastic 101
          </p>
          <h1 className="pixel-lg text-3xl mt-2">
            What plastic is, and why a treaty.
          </h1>
          <p className="mt-3 leading-relaxed max-w-2xl">
            Five minutes. No jargon. If you read this once, the rest of Ise's
            World will make sense.
          </p>
        </header>

        <section className="lob-card p-5 mb-5">
          <p className="pixel mb-2" style={{ color: "var(--lob-accent)" }}>
            ▸ Stage 1 — What is plastic?
          </p>
          {PLASTIC_101.whatIsPlastic.map((p, i) => (
            <p key={i} className="leading-relaxed mt-2">
              {p}
            </p>
          ))}
        </section>

        <section className="lob-card p-5 mb-5">
          <p className="pixel mb-2" style={{ color: "var(--lob-accent)" }}>
            ▸ Stage 2 — Where does it go?
          </p>
          {PLASTIC_101.whereDoesItGo.map((p, i) => (
            <p key={i} className="leading-relaxed mt-2">
              {p}
            </p>
          ))}
          <p
            className="pixel mt-4 leading-relaxed"
            style={{ color: "var(--lob-dim)" }}
          >
            Numbers from Geyser, Jambeck & Law (Science Advances, 2017) — the
            first global accounting of every plastic ever made. Researchers,
            see the Ledger for citation.
          </p>
        </section>

        <section className="lob-card p-5 mb-5">
          <p className="pixel mb-2" style={{ color: "var(--lob-accent)" }}>
            ▸ Stage 3 — Why a worldwide treaty?
          </p>
          {PLASTIC_101.whyTreaty.map((p, i) => (
            <p key={i} className="leading-relaxed mt-2">
              {p}
            </p>
          ))}
          <p className="pixel mt-4">
            <Link href="/lobster/court" className="lob-link">
              Hear what each country is saying at the UN →
            </Link>
          </p>
        </section>

        <section className="lob-card p-5 mb-8">
          <p className="pixel mb-3" style={{ color: "var(--lob-accent)" }}>
            ▸ Words to know
          </p>
          <dl className="grid sm:grid-cols-2 gap-4">
            {PLASTIC_101.vocabulary.map((v) => (
              <div key={v.word}>
                <dt className="pixel" style={{ color: "var(--lob-kelp)" }}>
                  {v.word}
                </dt>
                <dd className="text-sm mt-1 leading-relaxed">{v.meaning}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="lob-card p-5 mb-8"
          style={{ borderColor: "var(--lob-kelp)" }}
        >
          <p className="pixel mb-2" style={{ color: "var(--lob-kelp)" }}>
            ▸ What you can actually do
          </p>
          <ul className="space-y-2 leading-relaxed">
            <li className="flex gap-2">
              <span className="pixel" style={{ color: "var(--lob-kelp)" }}>
                ▸
              </span>
              <span>
                Refusing one plastic thing a day adds up — but the bigger
                lever is voting and asking your school, town, and country to
                make rules. Personal choices alone won't fix this. That's
                math, not opinion.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="pixel" style={{ color: "var(--lob-kelp)" }}>
                ▸
              </span>
              <span>
                Learn whose name is on the wrappers you find on the beach.
                That's the company that made it. Ledger has the company
                records.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="pixel" style={{ color: "var(--lob-kelp)" }}>
                ▸
              </span>
              <span>
                Pay attention to the words "production cap" in the news. That
                phrase is the difference between a treaty that works and a
                treaty that doesn't.
              </span>
            </li>
          </ul>
        </section>

        <footer className="pt-4 border-t-2 border-dashed border-[var(--lob-deep)] flex flex-wrap gap-3">
          <Link href="/lobster" className="lob-btn">
            Back to map
          </Link>
          <Link href="/lobster/court" className="lob-btn-ghost">
            Go to UN Court →
          </Link>
        </footer>
      </div>
    </main>
  );
}
