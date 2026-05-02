import Link from "next/link";
import WorldMap from "@/components/WorldMap";
import { getAllCountries } from "@/lib/db";
import { LOBSTER_VOICE } from "@/lib/lobster-voice";

export default function LobsterHome() {
  const countries = getAllCountries();
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <header className="mb-8">
          <p className="text-xs uppercase tracking-widest text-slate-400">
            {LOBSTER_VOICE.name}'s World
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-slate-100">
            Hi. I'm {LOBSTER_VOICE.name}. 🦞
          </h1>
          <p className="mt-2 text-slate-300 max-w-2xl">
            I live in Beppu Bay. I read the grown-up plastic news so you don't
            have to, and I tell you what's actually going on. Pick a country
            below.
          </p>
          <p className="mt-3 text-sm">
            <Link href="/" className="underline text-slate-300">
              (Researchers — go to the Ledger &rarr;)
            </Link>
          </p>
        </header>

        <section className="mb-10">
          <WorldMap variant="lobster" countries={countries} />
          <p className="mt-2 text-xs text-slate-400">
            Click an animal to meet that country's representative.
          </p>
        </section>

        <section>
          <ul className="grid gap-3 sm:grid-cols-3">
            {countries.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/lobster/countries/${c.id}`}
                  className="block border border-slate-700 rounded-md p-4 hover:bg-slate-800"
                >
                  <span className="text-3xl">{c.marineAnimal.emoji}</span>
                  <div className="mt-2 font-medium text-slate-100">
                    {c.displayName}
                  </div>
                  <div className="text-xs text-slate-400">
                    {c.marineAnimal.species}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <nav className="mt-10 text-sm space-x-4 text-slate-300">
          <Link href="/lobster/court" className="underline">
            UN Court
          </Link>
          <Link href="/lobster/news" className="underline">
            Daily News
          </Link>
          <Link href="/lobster/beppu" className="underline">
            Beppu
          </Link>
        </nav>
      </div>
    </main>
  );
}
