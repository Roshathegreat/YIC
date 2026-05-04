import Link from "next/link";
import { getCountry } from "@/lib/db";

export default function BeppuFieldTripPage() {
  const japan = getCountry("japan");
  const node = japan.deepNode;
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <header className="mb-8">
        <p className="tide-byline">A field trip with Wooby & Ise</p>
        <h2 className="tide-wordmark text-3xl sm:text-4xl mt-1">
          Beppu Bay, Japan
        </h2>
        <p className="mt-2 italic text-[var(--tide-muted)]">
          &ldquo;This is home.&rdquo; — Ise
        </p>
        <div className="tide-callout mt-4">
          <strong>Why Beppu?</strong> Plastic in the ocean almost always
          starts on land. Beppu is one of the clearest places in the world to
          watch that happen, because rain falls on the mountains and reaches
          the sea in just a few hours.
        </div>
      </header>

      {node ? (
        <>
          <section className="mb-8 tide-card tide-card--water p-5">
            <h3 className="tide-wordmark text-xl">From land to sea</h3>
            <p className="tide-byline mt-1">Hydrology</p>
            <p className="mt-3 leading-relaxed">{node.hydrology}</p>
            <p className="tide-takeaway mt-4">
              Takeaway: when it rains hard upstream, the trash on the
              sidewalks can be in the bay before dinner.
            </p>
          </section>

          <section className="mb-8 tide-card p-5">
            <h3 className="tide-wordmark text-xl">What washes up</h3>
            <p className="tide-byline mt-1">Marine debris</p>
            <p className="mt-3 leading-relaxed">{node.marineDebrisData}</p>
          </section>

          <section className="mb-8 tide-card tide-card--kelp p-5">
            <h3 className="tide-wordmark text-xl">Who&apos;s cleaning up</h3>
            <p className="tide-byline mt-1">Local groups</p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              {node.cleanupOrgs.map((o, i) => (
                <li key={i}>
                  <span className="font-semibold">{o.name}</span> —{" "}
                  {o.description}
                </li>
              ))}
            </ul>
            <p className="tide-mono text-xs text-[var(--tide-muted)] mt-3">
              Field note: we&apos;re still gathering verified contacts for
              Beppu cleanup groups. Sourced data lives on the Ledger.
            </p>
          </section>
        </>
      ) : (
        <p>No deep-node data yet.</p>
      )}

      <section className="mb-8">
        <p className="tide-mono text-xs">
          <Link href="/countries/japan" className="underline">
            See every sourced record for Japan on the Ledger →
          </Link>
        </p>
      </section>
    </main>
  );
}
