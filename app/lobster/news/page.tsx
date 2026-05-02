import Link from "next/link";

export default function LobsterNewsPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <nav className="mb-6 text-sm">
          <Link href="/lobster" className="underline text-slate-300">
            &larr; Ise's World
          </Link>
        </nav>
        <h1 className="text-3xl font-semibold">Daily News — coming week 2</h1>
        <p className="mt-3 text-slate-300">
          Once the translation layer is wired to the Anthropic API, Ise will
          post a daily news brief generated from the latest ledger entries.
          Every story will link back to the source record.
        </p>
      </div>
    </main>
  );
}
