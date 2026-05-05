import Link from "next/link";
import { getAllCountries } from "@/lib/db";
import type { Country, LobsterBrief } from "@/lib/schema";
import { BriefCard } from "@/components/lobster/BriefCard";
import { CountryDot } from "@/components/lobster/CountryMark";
import { WOOBY_VOICE } from "@/lib/lobster-voice";

type FlatBrief = { country: Country; brief: LobsterBrief };

function flattenBriefs(countries: Country[]): FlatBrief[] {
  return countries.flatMap((c) =>
    c.lobsterBriefs.map((brief) => ({ country: c, brief })),
  );
}

// Stable per-day pick: every kid loading on the same day sees the same
// "Story of the Day". Teachers can rely on it being predictable in class.
function dayIndex(): number {
  return Math.floor(Date.now() / (1000 * 60 * 60 * 24));
}

const QUESTIONS = [
  "If your country could ban ONE plastic thing first, which one would you pick — and why?",
  "Who should pay to clean up plastic in the ocean — the people who use it, or the companies that make it?",
  "Look around your house. What's something plastic that could easily be something else?",
  "If you were at the treaty meeting, what's the one rule you'd fight hardest for?",
  "Where does your trash go after the truck takes it away? Find out tonight.",
  "Pick one company on the Tide Report. Do you trust their promise? Why?",
  "What's the closest body of water to YOU? What plastic might end up in it?",
];

export default function WoobyNewsPage() {
  const countries = getAllCountries();
  const all = flattenBriefs(countries);
  const today = dayIndex();
  const top = all[today % all.length];
  const rest = all.filter((x) => x.brief.id !== top.brief.id);
  const question = QUESTIONS[today % QUESTIONS.length];

  // Very short ticker — just country + headline, comma-separated.
  const ticker = all
    .map(({ country, brief }) => `${country.displayName} — ${brief.headline}`)
    .join("    •    ");

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

        <header className="mb-6">
          <p className="eyebrow">Today&apos;s Tide Report</p>
          <h1 className="display text-4xl md:text-5xl mt-2">
            Marine plastic pollution news
          </h1>
          <p className="mt-3 text-[color:var(--muted)]">
            Hosted by Wooby. Edited by Ise. Every story links back to a real
            source so you can check us.
          </p>
        </header>

        {/* Ticker — single calm strip, sun-yellow */}
        <div className="marquee mb-10" aria-label="Headline ticker">
          <div className="marquee__track">
            {ticker} • {ticker}
          </div>
        </div>

        {/* Story of the day — gets full visual weight */}
        <section className="mb-10">
          <p className="eyebrow mb-2">Story of the day</p>
          <BriefCard country={top.country} brief={top.brief} />
        </section>

        {/* Question of the day — single calm callout */}
        <section className="mb-10 card card--coral">
          <p className="eyebrow">Wooby&apos;s question of the day</p>
          <p className="display text-2xl mt-2">{question}</p>
          <p className="text-sm mt-3 opacity-90">
            Teachers: a 5-minute classroom warm-up. New question every day.
          </p>
        </section>

        {/* Rest of the briefs, single column, calm spacing */}
        <section className="mb-10">
          <h2 className="display text-2xl mb-4">More from the tide</h2>
          <div className="space-y-5">
            {rest.map(({ country, brief }) => (
              <BriefCard key={brief.id} country={country} brief={brief} />
            ))}
          </div>
        </section>

        {/* Country desks — small directory at the bottom */}
        <section className="mb-10">
          <h2 className="display text-2xl mb-4">Country desks</h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {countries.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/lobster/countries/${c.id}`}
                  className="card block hover:translate-y-[-2px] transition-transform"
                >
                  <CountryDot id={c.id} />
                  <p className="display text-lg mt-2">{c.displayName}</p>
                  <p className="text-sm text-[color:var(--muted)] mt-1">
                    Read all {c.lobsterBriefs.length} briefs
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <footer className="text-sm text-[color:var(--muted)] border-t-2 border-[color:var(--rule)] pt-4">
          The Tide Report retells records from the YIC Ledger. If a story
          surprises you, follow the source link and check it yourself —
          that&apos;s how real reporters work.
        </footer>
      </div>
    </main>
  );
}
