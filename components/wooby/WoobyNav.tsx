import Link from "next/link";
import Whale from "./Whale";

export default function WoobyNav() {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-4">
      <Link href="/wooby" className="flex items-center gap-3">
        <Whale size={56} className="wooby-swim" />
        <div>
          <div className="font-extrabold text-xl tracking-tight">Wooby</div>
          <div className="wooby-label">global plastic patrol</div>
        </div>
      </Link>
      <nav className="flex flex-wrap items-center gap-2 text-sm">
        <Link href="/wooby" className="wooby-pill">🌍 Map</Link>
        <Link href="/wooby/leaderboard" className="wooby-pill">🏆 Leaderboard</Link>
        <Link href="/wooby/companies" className="wooby-pill">🏷️ Brands</Link>
        <Link href="/wooby/teach" className="wooby-pill">👩‍🏫 Teachers</Link>
        <Link href="/" className="wooby-pill">📊 Researcher view</Link>
      </nav>
    </header>
  );
}
