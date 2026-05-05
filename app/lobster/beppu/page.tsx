import Link from "next/link";
import { getCountry } from "@/lib/db";
import { VocabBox } from "@/components/lobster/Vocab";
import { WOOBY_VOICE } from "@/lib/lobster-voice";

const STEPS = [
  {
    n: 1,
    eyebrow: "Up top",
    title: "The mountains behind town",
    body:
      "Beppu sits with steep mountains right behind it and the sea right in front. When it rains hard, water doesn't have time to soak in — it sprints downhill toward the ocean.",
    flavor: "card--teal",
  },
  {
    n: 2,
    eyebrow: "On the street",
    title: "A plastic bottle gets dropped",
    body:
      "Someone drops a bottle near a storm drain. Maybe it falls out of a bin. The wind nudges it. It waits.",
    flavor: "card--sand",
  },
  {
    n: 3,
    eyebrow: "The river",
    title: "One big rain, one fast ride",
    body:
      "The rain comes. The street flushes the bottle into a drain, the drain feeds a short steep river, and a few hours later that bottle is in Beppu Bay. That whole trip — street to sea — is called source-to-sea.",
    flavor: "card--coral",
  },
  {
    n: 4,
    eyebrow: "The bay",
    title: "Where I find it",
    body:
      "I find single-use packaging, broken bits of fishing gear, and tiny microplastics smaller than a grain of rice. Local cleanup groups walk the beach and pick what they can — but it's way easier to stop a bottle on the street than to chase it in the sea.",
    flavor: "card--sun",
  },
];

export default function BeppuPage() {
  const japan = getCountry("japan");
  const node = japan.deepNode;
  const beppuBrief = japan.lobsterBriefs.find((b) => b.refType === "beppu");

  return (
    <main className="surface-paper--kid">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <nav className="mb-6 text-sm">
          <Link
            href="/lobster"
            className="font-semibold text-[color:var(--coral)] underline decoration-2 underline-offset-4"
          >
            &larr; Back to {WOOBY_VOICE.name}&apos;s Tide Report
          </Link>
        </nav>

        <header className="mb-8">
          <p className="eyebrow">Home port</p>
          <h1 className="display text-4xl md:text-5xl mt-2">Beppu Bay</h1>
          <p className="mt-3 text-lg italic">
            &ldquo;This is where I live. Walk down to the beach with me.&rdquo;
            — Wooby
          </p>
        </header>

        <section className="space-y-5">
          {STEPS.map((s) => (
            <article key={s.n} className={`card ${s.flavor}`}>
              <div className="flex items-baseline gap-3">
                <span className="display text-3xl">{s.n}</span>
                <p className="eyebrow">{s.eyebrow}</p>
              </div>
              <h2 className="display text-2xl mt-2">{s.title}</h2>
              <p className="mt-2">{s.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-8">
          <VocabBox
            terms={[
              "watershed",
              "hydrology",
              "marine debris",
              "microplastics",
              "single-use",
            ]}
          />
        </section>

        {node ? (
          <section className="mt-10 card">
            <p className="eyebrow">The grown-up details</p>
            <p className="mt-3 text-sm">
              <span className="font-bold">What ends up here: </span>
              {node.marineDebrisData}
            </p>
            <p className="mt-3 text-sm">
              <span className="font-bold">How the water moves: </span>
              {node.hydrology}
            </p>
            <p className="text-sm mt-4">
              <Link
                href="/countries/japan#beppu"
                className="font-semibold text-[color:var(--coral)] underline decoration-2 underline-offset-4"
              >
                Full sources on the Japan Ledger &rarr;
              </Link>
            </p>
          </section>
        ) : null}

        {beppuBrief ? (
          <p className="mt-6 text-xs text-[color:var(--muted)]">
            This page expands brief{" "}
            <code className="bg-white border border-[color:var(--rule)] px-1 py-0.5 rounded">
              {beppuBrief.id}
            </code>{" "}
            from the Japan country file.
          </p>
        ) : null}
      </div>
    </main>
  );
}
