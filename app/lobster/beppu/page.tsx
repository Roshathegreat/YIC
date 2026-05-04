import Link from "next/link";
import { getCountry } from "@/lib/db";
import { BEPPU_DEEP } from "@/lib/lobster-content";

export default function LobsterBeppuPage() {
  const japan = getCountry("japan");
  const node = japan.deepNode;
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
            ▸ Beppu Bay, Oita, Japan
          </p>
          <h1 className="pixel-lg text-3xl mt-2">My home, in detail.</h1>
          <p className="mt-3 italic" style={{ color: "var(--lob-dim)" }}>
            "If you understand one bay, you start to understand the ocean." —
            Ise
          </p>
        </header>

        <section className="lob-card p-5 mb-6">
          <p className="pixel mb-2" style={{ color: "var(--lob-accent)" }}>
            ▸ Where I live
          </p>
          <p className="leading-relaxed">{BEPPU_DEEP.intro}</p>
        </section>

        <section className="mb-6">
          <p className="pixel mb-3" style={{ color: "var(--lob-accent)" }}>
            ▸ Why a small bay matters for a worldwide problem
          </p>
          <ul className="space-y-3">
            {BEPPU_DEEP.whyItMatters.map((p, i) => (
              <li key={i} className="lob-card-tight p-4 leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
        </section>

        {node ? (
          <section className="lob-card p-5 mb-6">
            <p className="pixel mb-2" style={{ color: "var(--lob-accent)" }}>
              ▸ What the field data says (researcher version)
            </p>
            <p className="leading-relaxed text-sm">
              <span className="pixel" style={{ color: "var(--lob-kelp)" }}>
                Marine debris:
              </span>{" "}
              {node.marineDebrisData}
            </p>
            <p className="mt-3 leading-relaxed text-sm">
              <span className="pixel" style={{ color: "var(--lob-kelp)" }}>
                Hydrology:
              </span>{" "}
              {node.hydrology}
            </p>
            <p className="pixel mt-4">
              <Link href="/countries/japan" className="lob-link">
                Sources & local cleanup orgs on the Ledger →
              </Link>
            </p>
          </section>
        ) : null}

        <section className="lob-card p-5 mb-8" style={{ borderColor: "var(--lob-kelp)" }}>
          <p className="pixel mb-2" style={{ color: "var(--lob-kelp)" }}>
            ▸ If you visit
          </p>
          <ul className="space-y-2 leading-relaxed">
            {BEPPU_DEEP.ifYouVisit.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span
                  className="pixel shrink-0"
                  style={{ color: "var(--lob-kelp)" }}
                >
                  ▸
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="pt-4 border-t-2 border-dashed border-[var(--lob-deep)] pixel text-sm">
          <span style={{ color: "var(--lob-dim)" }}>
            Researchers — full Beppu data is on the Ledger.{" "}
          </span>
          <Link href="/countries/japan" className="lob-link">
            Open Japan record →
          </Link>
        </footer>
      </div>
    </main>
  );
}
