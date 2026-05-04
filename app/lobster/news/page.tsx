import Link from "next/link";
import { getAllCountries } from "@/lib/db";
import { LOBSTER_STORIES } from "@/lib/lobster-content";

const TODAY = "2026-05-04";

type NewsCard = {
  countryId: "japan" | "usa" | "taiwan";
  tag: string;
  headline: string;
  body: string;
  ledgerHref: string;
  recordKind: "policy" | "company" | "treaty";
  recordRef: string;
};

const NEWS: NewsCard[] = [
  {
    countryId: "taiwan",
    tag: "Why Taiwan matters",
    headline: "Pīng's reminder: small country, big rules",
    body:
      "Taiwan can't sit at the UN table because it isn't a UN member. But it has decided to follow the plastic treaty anyway, and at home it is phasing out four single-use plastics — bags, straws, utensils, and cups — store category by store category. Pīng the white dolphin reminds us: the loudest voice isn't always the most important one.",
    ledgerHref: "/countries/taiwan",
    recordKind: "policy",
    recordRef: "twn-single-use-plastics-roadmap",
  },
  {
    countryId: "usa",
    tag: "Receipts",
    headline: "California vs. Coca-Cola: who pays for the trash?",
    body:
      "California's SB 54 says by 2032, every single-use plastic package sold in the state has to be recyclable or compostable — and the companies that make it have to pay to clean it up. That's called Extended Producer Responsibility. Coca-Cola is one of the most-found brands on world beach cleanups. Whether they hit California's rule will say a lot about whether the rest of the U.S. follows.",
    ledgerHref: "/countries/usa",
    recordKind: "policy",
    recordRef: "usa-ca-sb54",
  },
  {
    countryId: "japan",
    tag: "Home waters",
    headline: "Beppu Bay: where every river ends in plastic",
    body:
      "I live in Beppu. The rivers here are short and steep — what's dropped on a street can be in the bay by tomorrow. Japan has a law that pushes companies to design plastic so it can be recycled, and a rule that you have to pay for shopping bags. Both help. Neither is enough on its own. The real question is whether Japan will agree to limits on making new plastic in the first place.",
    ledgerHref: "/countries/japan",
    recordKind: "policy",
    recordRef: "jpn-plastic-resource-circulation-act",
  },
];

export default function LobsterNewsPage() {
  const countries = getAllCountries();
  const byId = new Map(countries.map((c) => [c.id, c]));
  return (
    <main className="lob-screen">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <nav className="mb-6 pixel">
          <Link href="/lobster" className="lob-link">
            ← Ise's World
          </Link>
        </nav>

        <header className="mb-8">
          <p className="pixel" style={{ color: "var(--lob-accent)" }}>
            ▸ News from Ise — week of {TODAY}
          </p>
          <h1 className="pixel-lg text-3xl mt-2">
            Three stories. Three sources.
          </h1>
          <p className="mt-3 leading-relaxed max-w-2xl">
            Every week I pick three things from the Ledger and re-tell them in
            plain language. Each story links to the original record so you can
            check me. If I'm not sure about something, I say so.
          </p>
        </header>

        <ul className="space-y-5">
          {NEWS.map((n, i) => {
            const country = byId.get(n.countryId);
            const story = LOBSTER_STORIES[n.countryId];
            const accent = country?.accentColor ?? "var(--lob-accent)";
            return (
              <li key={i} className="lob-card p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="h-2 w-10 rounded-sm"
                    style={{ backgroundColor: accent }}
                  />
                  <span
                    className="pixel"
                    style={{ color: "var(--lob-accent)" }}
                  >
                    {n.tag}
                  </span>
                  <span className="pixel" style={{ color: "var(--lob-dim)" }}>
                    · {country?.displayName}
                  </span>
                </div>
                <h2 className="pixel-lg text-xl">{n.headline}</h2>
                <p className="mt-3 leading-relaxed">{n.body}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/lobster/countries/${n.countryId}`}
                    className="lob-btn"
                  >
                    Meet {story.whoIsTheAnimal.split(" ")[0]} →
                  </Link>
                  <Link href={n.ledgerHref} className="lob-btn-ghost">
                    Source on the Ledger →
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        <p
          className="pixel mt-8 leading-relaxed text-sm"
          style={{ color: "var(--lob-dim)" }}
        >
          Soon, this page will refresh on its own once a day from the Ledger.
          Until then, I'm picking the stories by hand. — Ise
        </p>
      </div>
    </main>
  );
}
