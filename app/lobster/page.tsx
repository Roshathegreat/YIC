import Link from "next/link";
import WorldMap from "@/components/WorldMap";
import { getAllCountries } from "@/lib/db";
import { LOBSTER_VOICE } from "@/lib/lobster-voice";
import { LOBSTER_STORIES } from "@/lib/lobster-content";

export default function LobsterHome() {
  const countries = getAllCountries();
  return (
    <main className="lob-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="pixel" style={{ color: "var(--lob-accent)" }}>
              ★ Ise's World — A Field Guide to Plastic
            </p>
            <h1 className="pixel-lg mt-2 text-3xl sm:text-4xl">
              Hello. I'm {LOBSTER_VOICE.name}.
            </h1>
            <p className="mt-3 max-w-xl" style={{ color: "var(--lob-ink)" }}>
              I'm a young spiny lobster from Beppu Bay in Japan. I read the
              grown-up plastic news, the laws, and the company reports — then I
              tell you what's actually going on, in words that don't need a
              dictionary. Every fact you read here can be checked on the
              Ledger.
            </p>
          </div>
          <Link href="/" className="lob-btn-ghost shrink-0">
            Researcher? → Ledger
          </Link>
        </header>

        <section className="lob-card p-4 sm:p-6 mb-8">
          <p
            className="pixel mb-3"
            style={{ color: "var(--lob-accent)" }}
          >
            ▸ Pick a country
          </p>
          <WorldMap variant="lobster" countries={countries} />
          <p
            className="mt-3 pixel"
            style={{ color: "var(--lob-dim)" }}
          >
            Click an animal to meet your guide for that country.
          </p>
        </section>

        <section className="mb-10">
          <p className="pixel mb-3" style={{ color: "var(--lob-accent)" }}>
            ▸ Your three guides
          </p>
          <ul className="grid gap-4 sm:grid-cols-3">
            {countries.map((c) => {
              const story = LOBSTER_STORIES[c.id];
              return (
                <li key={c.id}>
                  <Link
                    href={`/lobster/countries/${c.id}`}
                    className="lob-card block p-4 hover:translate-y-[-2px] transition-transform"
                  >
                    <div
                      className="h-2 w-12 rounded-sm mb-3"
                      style={{ backgroundColor: c.accentColor }}
                    />
                    <div className="pixel-lg text-lg">{c.displayName}</div>
                    <div
                      className="pixel mt-1"
                      style={{ color: "var(--lob-dim)" }}
                    >
                      {c.marineAnimal.species.split("(")[0].trim()}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed">
                      {story.hookline}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="pixel" style={{ color: "var(--lob-dim)" }}>
                        Ambition
                      </span>
                      <span
                        className="pixel"
                        style={{ color: "var(--lob-accent)" }}
                      >
                        {story.ambitionScore}/100
                      </span>
                    </div>
                    <div className="mt-1 lob-bar">
                      <span style={{ width: `${story.ambitionScore}%` }} />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mb-10 grid gap-4 sm:grid-cols-2">
          <Link href="/lobster/learn" className="lob-card p-5 block">
            <p className="pixel" style={{ color: "var(--lob-accent)" }}>
              ▸ Start here
            </p>
            <h2 className="pixel-lg text-xl mt-2">Plastic 101</h2>
            <p className="text-sm mt-2 leading-relaxed">
              What plastic actually is, where it ends up, and why a worldwide
              treaty is being written about it. Five minutes. No jargon.
            </p>
          </Link>
          <Link href="/lobster/court" className="lob-card p-5 block">
            <p className="pixel" style={{ color: "var(--lob-accent)" }}>
              ▸ The big argument
            </p>
            <h2 className="pixel-lg text-xl mt-2">UN Court</h2>
            <p className="text-sm mt-2 leading-relaxed">
              Each country sends an animal to argue about the plastic treaty.
              The words are real — they come straight from the last UN
              negotiation.
            </p>
          </Link>
          <Link href="/lobster/news" className="lob-card p-5 block">
            <p className="pixel" style={{ color: "var(--lob-accent)" }}>
              ▸ This week
            </p>
            <h2 className="pixel-lg text-xl mt-2">News from Ise</h2>
            <p className="text-sm mt-2 leading-relaxed">
              Three short stories about plastic this week, written for you.
              Every story links back to the Ledger record it came from.
            </p>
          </Link>
          <Link href="/lobster/beppu" className="lob-card p-5 block">
            <p className="pixel" style={{ color: "var(--lob-accent)" }}>
              ▸ My home
            </p>
            <h2 className="pixel-lg text-xl mt-2">Beppu Bay</h2>
            <p className="text-sm mt-2 leading-relaxed">
              Why a small bay on a small island matters for a worldwide
              problem. Short steep rivers. A bathtub-shaped sea. And
              microplastic in the fish.
            </p>
          </Link>
        </section>

        <footer className="pt-6 border-t-2 border-dashed border-[var(--lob-deep)] text-sm">
          <p style={{ color: "var(--lob-dim)" }}>
            Ise speaks plain language, but never makes things up. When Ise
            isn't sure, Ise says so. Every claim links back to a sourced
            record on the{" "}
            <Link href="/" className="lob-link">
              Ledger
            </Link>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
