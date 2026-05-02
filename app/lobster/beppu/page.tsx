import Link from "next/link";
import { getCountry } from "@/lib/db";

export default function LobsterBeppuPage() {
  const japan = getCountry("japan");
  const node = japan.deepNode;
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <nav className="mb-6 text-sm">
          <Link href="/lobster" className="underline text-slate-300">
            &larr; Ise's World
          </Link>
        </nav>
        <h1 className="text-3xl font-semibold">Beppu Bay 🦞</h1>
        <p className="mt-3 text-slate-300 italic">
          This is home. — Ise
        </p>
        {node ? (
          <section className="mt-6 space-y-3 text-slate-200">
            <p>{node.marineDebrisData}</p>
            <p>{node.hydrology}</p>
            <p className="text-sm text-slate-400">
              Full local content lands in week 2. Source records are on the{" "}
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
