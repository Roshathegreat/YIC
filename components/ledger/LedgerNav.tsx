import Link from "next/link";

export default function LedgerNav() {
  return (
    <header className="border-b border-[var(--rule)] bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl ledger-h font-semibold">YIC · Ledger</span>
          <span className="text-xs text-[var(--muted)] hidden sm:inline">
            Plastic Governance Database
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:underline">Countries</Link>
          <Link href="/companies" className="hover:underline">Companies</Link>
          <Link href="/leaderboard" className="hover:underline">Leaderboard</Link>
          <Link
            href="/wooby"
            className="px-3 py-1.5 rounded-full bg-[var(--ocean-deep)] text-white hover:bg-[var(--ocean-mid)] transition-colors"
          >
            🐋 Wooby (kids)
          </Link>
        </nav>
      </div>
    </header>
  );
}
