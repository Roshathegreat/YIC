import Link from "next/link";
import { getAllCountries } from "@/lib/db";
import type { Country, LobsterBrief } from "@/lib/schema";
import { BriefCard } from "@/components/lobster/BriefCard";
import { WOOBY_VOICE } from "@/lib/lobster-voice";

type FlatBrief = { country: Country; brief: LobsterBrief };

function flattenBriefs(countries: Country[]): FlatBrief[] {
  return countries.flatMap((c) =>
    c.lobsterBriefs.map((brief) => ({ country: c, brief })),
  );
}

// Picks today's "top story" deterministically based on the calendar day, so
// every kid loading the page on the same day sees the same featured brief.
// Kids love a daily ritual; teachers can rely on it being stable in class.
function pickTopStory(items: FlatBrief[]): FlatBrief {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return items[dayIndex % items.length];
}

export default function WoobyNewsPage() {
  const countries = getAllCountries();
  const all = flattenBriefs(countries);
  const top = pickTopStory(all);
  const rest = all.filter((x) => x.brief.id !== top.brief.id);

  // Marquee strip: short ticker of every brief headline.
  const tickerText = all
    .map(({ country, brief }) => `[${country.displayName}] ${brief.headline}`)
    .join("    ★    ");

  // "Wooby's question of the day" — a teacher-prompt to discuss in class.
  const questionsOfTheDay = [
    "If your country had to pick ONE plastic to ban first, which one would you pick — and why?",
    "Who do you think should pay to clean up plastic in the ocean — the people who use it, or the people who make it?",
    "What's something plastic in your house that could easily be something else?",
    "If you were a treaty negotiator, what's the one rule you'd fight hardest for?",
    "Where does your trash actually go after the truck takes it away? Find out tonight and tell Wooby tomorrow.",
    "Pick one company on the Tide Report. Do you trust their promise? Why or why not?",
    "Wooby lives in Beppu Bay. What's the closest body of water to YOU? What plastic ends up in it?",
  ];
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const questionOfTheDay =
    questionsOfTheDay[dayIndex % questionsOfTheDay.length];

  return (
    <main className="tide-surface min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <nav className="mb-4 text-sm">
          <Link
            href="/lobster"
            className="underline decoration-dotted text-[var(--tide-foam)]/80"
          >
            &larr; back to {WOOBY_VOICE.name}'s Tide Report
          </Link>
        </nav>

        {/* Masthead */}
        <header className="mb-6 border-b-2 border-[var(--tide-foam)] pb-4">
          <p className="pixel text-xs text-[var(--tide-sun)]">
            ◆ TODAY'S TIDE REPORT ◆
          </p>
          <h1 className="pixel mt-1 text-2xl md:text-4xl text-[var(--tide-foam)] leading-tight">
            MARINE PLASTIC POLLUTION NEWS
          </h1>
          <p className="mt-2 text-sm text-[var(--tide-foam)]/80">
            Hosted by {WOOBY_VOICE.name} the crab. Edited by Ise the lobster.
            Every story links to the real source so you can check us.
          </p>
        </header>

        {/* Marquee headline ticker */}
        <div className="tide-marquee mb-8" aria-label="Headline ticker">
          <div className="tide-marquee__track pixel text-xs text-[var(--tide-sun)]">
            {tickerText}
            {"    ★    "}
            {tickerText}
          </div>
        </div>

        {/* Top story */}
        <section className="mb-10">
          <p className="pixel text-xs text-[var(--tide-coral)] mb-2">
            ★ STORY OF THE DAY ★
          </p>
          <BriefCard country={top.country} brief={top.brief} />
        </section>

        {/* Wooby's question of the day */}
        <section className="mb-10 pixel-card pixel-card--kelp p-4">
          <p className="pixel text-xs text-[var(--tide-sun)] mb-2">
            ❓ WOOBY'S QUESTION OF THE DAY
          </p>
          <p className="text-[var(--tide-foam)] text-lg leading-relaxed">
            {questionOfTheDay}
          </p>
          <p className="mt-2 text-xs text-[var(--tide-foam)]/70">
            Teachers: this is a 5-minute classroom warm-up. New question each
            day, automatically.
          </p>
        </section>

        {/* Country desks */}
        <section className="mb-10">
          <h2 className="pixel text-sm text-[var(--tide-sun)] mb-4">
            ◆ DESK BY DESK ◆
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {countries.map((c) => (
              <div key={c.id}>
                <p className="pixel text-xs text-[var(--tide-foam)] mb-2">
                  <span aria-hidden>{c.marineAnimal.emoji}</span>{" "}
                  {c.displayName.toUpperCase()} DESK
                </p>
                <ul className="space-y-3">
                  {c.lobsterBriefs.slice(0, 2).map((b) => (
                    <li key={b.id}>
                      <Link
                        href={`/lobster/countries/${c.id}#${b.id}`}
                        className="block pixel-card p-3 hover:translate-y-[-2px] transition-transform"
                      >
                        <p className="text-sm text-[var(--tide-foam)] font-semibold">
                          {b.headline}
                        </p>
                        <p className="text-xs text-[var(--tide-foam)]/70 mt-1">
                          read the full brief &rarr;
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Full brief stack */}
        <section className="mb-10">
          <h2 className="pixel text-sm text-[var(--tide-sun)] mb-4">
            ◆ MORE FROM THE TIDE ◆
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map(({ country, brief }) => (
              <BriefCard key={brief.id} country={country} brief={brief} />
            ))}
          </div>
        </section>

        <footer className="border-t-2 border-[var(--tide-foam)] pt-4 text-xs text-[var(--tide-foam)]/70">
          The Tide Report retells records from the YIC Ledger. If a story
          surprises you, follow the source link and check it yourself —
          that's how real reporters work.
        </footer>
      </div>
    </main>
  );
}
