import type { Country } from "@/lib/schema";

const DOT_CLASS: Record<Country["id"], string> = {
  japan: "dot--jp",
  usa: "dot--us",
  taiwan: "dot--tw",
};

export function CountryDot({ id, size = 14 }: { id: Country["id"]; size?: number }) {
  return (
    <span
      className={`dot ${DOT_CLASS[id]}`}
      aria-hidden
      style={{ width: size, height: size }}
    />
  );
}

export function CountryMark({ country }: { country: Pick<Country, "id" | "displayName"> }) {
  return (
    <span className="inline-flex items-center gap-2 font-semibold">
      <CountryDot id={country.id} />
      {country.displayName}
    </span>
  );
}
