import Link from "next/link";
import { getAllCountries } from "@/lib/db";

export default function UNCourtPage() {
  const countries = getAllCountries();
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <header className="mb-8">
        <p className="tide-byline">A trip to the UN with Wooby</p>
        <h2 className="tide-wordmark text-3xl sm:text-4xl mt-1">
          The big plastic promise
        </h2>
        <div className="tide-callout mt-4">
          <strong>What we&apos;re learning today:</strong> a{" "}
          <em>treaty</em> is a promise countries write down together and
          agree to follow. Right now, countries are trying to write one about
          plastic — and they don&apos;t all want the same thing.
        </div>
        <p className="mt-4 leading-relaxed">
          The meeting is called the INC, short for{" "}
          <strong>International Negotiating Committee</strong>. The most
          recent round was held in Geneva in August 2025 and was called
          INC-5.2. It ended without a final treaty. Below is what each of our
          three countries was asking for at the table.
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-3">
        {countries.map((c) => (
          <article key={c.id} className="tide-card p-5">
            <div
              className="h-2 w-12 rounded mb-3"
              style={{ backgroundColor: c.accentColor }}
            />
            <p className="tide-byline">{c.marineAnimal.emoji} INC-5.2</p>
            <h3 className="tide-wordmark text-xl mt-1">{c.displayName}</h3>
            <p className="mt-3 text-sm leading-relaxed">
              {c.treatyPosition.currentStance}
            </p>
            <p className="tide-mono text-xs mt-4">
              <Link
                href={`/treaty#treaty-${c.id}`}
                className="underline"
              >
                Full position on the Ledger →
              </Link>
            </p>
          </article>
        ))}
      </section>

      <section className="mt-8">
        <div className="tide-card tide-card--kelp p-5">
          <p className="tide-byline">Wooby explains</p>
          <h3 className="tide-wordmark text-xl mt-1">
            The big argument: a production cap
          </h3>
          <p className="mt-3 leading-relaxed">
            One group of countries — called the <em>High Ambition
            Coalition</em> — wants the treaty to put a limit on how much
            <strong> brand-new plastic</strong> the world is allowed to make
            each year. That is called a <strong>production cap</strong>.
            Other countries, including the United States and Japan, want to
            focus more on cleaning up plastic <em>after</em> it&apos;s made.
            That is the argument the world is still having.
          </p>
          <p className="tide-takeaway mt-4">
            Takeaway: when you hear about the plastics treaty, listen for
            two words: <em>production cap</em>. That tells you which side
            someone is on.
          </p>
        </div>
      </section>
    </main>
  );
}
