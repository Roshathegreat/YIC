import Link from "next/link";
import type { ReactNode } from "react";

export default function LobsterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="tide min-h-screen">
      <header className="border-b-4 border-[var(--tide-border)] bg-[var(--tide-bg)]">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-end justify-between gap-4 flex-wrap">
          <Link href="/lobster" className="block no-underline">
            <p className="tide-mono text-xs uppercase tracking-widest text-[var(--tide-muted)]">
              Tide Report · Issue 001
            </p>
            <h1 className="tide-wordmark text-3xl sm:text-4xl mt-1">
              Wooby&apos;s Tide Report
            </h1>
            <p className="text-sm text-[var(--tide-muted)] mt-1">
              Plastic pollution news from the world&apos;s oceans.
            </p>
          </Link>
          <nav className="tide-mono text-sm flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/lobster" className="underline">
              Home
            </Link>
            <Link href="/lobster/news" className="underline">
              Tide Report
            </Link>
            <Link href="/lobster/beppu" className="underline">
              Beppu
            </Link>
            <Link href="/lobster/court" className="underline">
              UN Court
            </Link>
            <Link href="/" className="underline">
              Ledger →
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t-4 border-[var(--tide-border)] mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6 tide-mono text-xs text-[var(--tide-muted)]">
          Every story links back to a sourced record on the{" "}
          <Link href="/" className="underline">
            Ledger
          </Link>
          . Wooby is a crab. Ise is a lobster. The plastic, sadly, is real.
        </div>
      </footer>
    </div>
  );
}
