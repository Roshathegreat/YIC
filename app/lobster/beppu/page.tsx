import Link from "next/link";
import { getCountry } from "@/lib/db";
import { VocabBox } from "@/components/lobster/Vocab";
import { WOOBY_VOICE } from "@/lib/lobster-voice";

export default function BeppuPage() {
  const japan = getCountry("japan");
  const node = japan.deepNode;
  const beppuBrief = japan.lobsterBriefs.find((b) => b.refType === "beppu");

  return (
    <main className="tide-surface min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <nav className="mb-4 text-sm">
          <Link
            href="/lobster"
            className="underline decoration-dotted text-[var(--tide-foam)]/80"
          >
            &larr; back to {WOOBY_VOICE.name}'s Tide Report
          </Link>
        </nav>

        <header className="mb-6">
          <p className="pixel text-xs text-[var(--tide-sun)]">HOME PORT</p>
          <h1 className="pixel text-3xl text-[var(--tide-foam)] mt-1">
            BEPPU BAY
          </h1>
          <p className="text-[var(--tide-foam)]/80 italic mt-2">
            "This is where I live. Walk down to the beach with me." — Wooby
          </p>
        </header>

        {/* The story, told as a four-step journey from mountain to sea. */}
        <section className="space-y-4">
          <div className="pixel-card pixel-card--kelp p-4">
            <p className="pixel text-xs text-[var(--tide-sun)]">STEP 1 · UP TOP</p>
            <h2 className="pixel text-base text-[var(--tide-foam)] mt-1">
              THE MOUNTAINS BEHIND TOWN
            </h2>
            <p className="text-[var(--tide-foam)] mt-2 leading-relaxed">
              Beppu sits with steep mountains right behind it and the sea right
              in front. When it rains hard, water doesn't have time to soak in
              — it sprints downhill toward the ocean.
            </p>
          </div>

          <div className="pixel-card pixel-card--sun p-4">
            <p className="pixel text-xs text-[var(--tide-sun)]">STEP 2 · ON THE STREET</p>
            <h2 className="pixel text-base text-[var(--tide-foam)] mt-1">
              A PLASTIC BOTTLE GETS DROPPED
            </h2>
            <p className="text-[var(--tide-foam)] mt-2 leading-relaxed">
              Someone drops a bottle near a storm drain. Maybe it falls out of
              a bin. The wind nudges it. It waits.
            </p>
          </div>

          <div className="pixel-card p-4">
            <p className="pixel text-xs text-[var(--tide-sun)]">STEP 3 · THE RIVER</p>
            <h2 className="pixel text-base text-[var(--tide-foam)] mt-1">
              ONE BIG RAIN, ONE FAST RIDE
            </h2>
            <p className="text-[var(--tide-foam)] mt-2 leading-relaxed">
              The rain comes. The street flushes the bottle into a drain, the
              drain feeds a short steep river, and a few hours later that
              bottle is in Beppu Bay. That whole trip — street to sea — is
              called <strong>source-to-sea</strong>.
            </p>
          </div>

          <div className="pixel-card pixel-card--kelp p-4">
            <p className="pixel text-xs text-[var(--tide-sun)]">STEP 4 · THE BAY</p>
            <h2 className="pixel text-base text-[var(--tide-foam)] mt-1">
              WHERE I FIND IT (AND WHO HELPS)
            </h2>
            <p className="text-[var(--tide-foam)] mt-2 leading-relaxed">
              I find single-use packaging, broken bits of fishing gear, and
              tiny microplastics smaller than a grain of rice. Local cleanup
              groups walk the beach and pick what they can. But it's way
              easier to stop a bottle on the street than to chase it in the
              sea.
            </p>
          </div>
        </section>

        <section className="mt-6">
          <VocabBox
            terms={["watershed", "hydrology", "marine debris", "microplastics", "single-use"]}
          />
        </section>

        {/* Source-grounded section, drawn straight from Japan deep node. */}
        {node ? (
          <section className="mt-8 pixel-card p-4">
            <p className="pixel text-xs text-[var(--tide-sun)] mb-2">
              ◆ THE GROWN-UP DETAILS ◆
            </p>
            <p className="text-[var(--tide-foam)] text-sm leading-relaxed">
              <span className="font-semibold">What ends up here: </span>
              {node.marineDebrisData}
            </p>
            <p className="text-[var(--tide-foam)] text-sm mt-3 leading-relaxed">
              <span className="font-semibold">How the water moves: </span>
              {node.hydrology}
            </p>
            <p className="text-xs text-[var(--tide-foam)]/70 mt-3">
              Full source list:{" "}
              <Link
                href="/countries/japan#beppu"
                className="underline decoration-dotted"
              >
                Japan Ledger &rarr; Beppu deep node
              </Link>
              .
            </p>
          </section>
        ) : null}

        {beppuBrief ? (
          <p className="mt-6 text-xs text-[var(--tide-foam)]/70">
            This page expands brief{" "}
            <code className="bg-[var(--tide-deep)] px-1 py-0.5 rounded">
              {beppuBrief.id}
            </code>{" "}
            from the Japan country file.
          </p>
        ) : null}
      </div>
    </main>
  );
}
