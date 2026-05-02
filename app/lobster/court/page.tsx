import Link from "next/link";

export default function LobsterCourtPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <nav className="mb-6 text-sm">
          <Link href="/lobster" className="underline text-slate-300">
            &larr; Ise's World
          </Link>
        </nav>
        <h1 className="text-3xl font-semibold">UN Court — coming week 3</h1>
        <p className="mt-3 text-slate-300">
          The marine animals will sit at the negotiating table here, each
          arguing their country's real treaty position. Until then, you can
          compare positions on the{" "}
          <Link href="/treaty" className="underline">
            Ledger treaty page
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
