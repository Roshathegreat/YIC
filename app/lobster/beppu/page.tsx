import Link from "next/link";
import { getCountry } from "@/lib/db";
import { resolveSourceRecord } from "@/lib/lobster";
import { SourceList } from "@/components/ledger/SourceCite";

export default function LobsterBeppuPage() {
  const japan = getCountry("japan");
  const node = japan.deepNode;
  const beppuTranslation = japan.lobsterTranslations.find(
    (t) => t.sourceRecordType === "beppu" && t.sourceRecordId === "beppu",
  );
  const beppuRecord = beppuTranslation
    ? resolveSourceRecord(japan, beppuTranslation)
    : null;

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <nav className="mb-6 text-sm">
          <Link href="/lobster" className="underline text-slate-300">
            &larr; Ise's World
          </Link>
        </nav>
        <h1 className="text-3xl font-semibold">Beppu Bay 🦞</h1>
        <p className="mt-3 text-slate-300 italic">This is home. — Ise</p>

        {beppuTranslation && beppuRecord ? (
          <article className="mt-8 border border-slate-700 rounded-md p-4 bg-slate-950/40">
            <header className="mb-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Local node
              </p>
              <h2 className="text-base font-medium text-slate-100">
                {beppuRecord.title}
              </h2>
            </header>
            <p className="text-slate-200 leading-relaxed whitespace-pre-line">
              {beppuTranslation.body}
            </p>
            <footer className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-2">
              <p>
                <Link
                  href={beppuRecord.ledgerHref}
                  className="underline text-slate-300"
                >
                  From the ledger: Japan &middot; Beppu deep node &rarr;
                </Link>
              </p>
              <div>
                <p className="uppercase tracking-wide text-slate-500">
                  Sources behind this
                </p>
                <SourceList sources={beppuRecord.sources} />
              </div>
              <p className="text-slate-600">
                Generated {beppuTranslation.generatedAt} ·{" "}
                {beppuTranslation.modelVersion}
              </p>
            </footer>
          </article>
        ) : node ? (
          <section className="mt-6 space-y-3 text-slate-200">
            <p>{node.marineDebrisData}</p>
            <p>{node.hydrology}</p>
            <p className="text-sm text-slate-400">
              Source records are on the{" "}
              <Link href="/countries/japan" className="underline">
                Japan ledger page
              </Link>
              .
            </p>
          </section>
        ) : (
          <p className="mt-6 text-slate-400">No deep node data yet.</p>
        )}
      </div>
    </main>
  );
}
