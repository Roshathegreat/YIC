import type {
  Country,
  LobsterRecordType,
  LobsterTranslation,
  Source,
} from "./schema";

export interface ResolvedSourceRecord {
  type: LobsterRecordType;
  id: string;
  title: string;
  sources: Source[];
  ledgerHref: string;
  anchor: string;
}

export function ledgerAnchor(
  type: LobsterRecordType,
  id: string,
): string {
  return `${type}-${id}`;
}

export function resolveSourceRecord(
  country: Country,
  translation: LobsterTranslation,
): ResolvedSourceRecord | null {
  const { sourceRecordType: type, sourceRecordId: id } = translation;
  const ledgerHref = `/countries/${country.id}#${ledgerAnchor(type, id)}`;
  const anchor = ledgerAnchor(type, id);

  if (type === "treaty" && id === "current") {
    return {
      type,
      id,
      title: `${country.displayName} — UN Plastic Treaty position`,
      sources: country.treatyPosition.sources,
      ledgerHref,
      anchor,
    };
  }
  if (type === "policy") {
    const p = country.domesticPolicies.find((x) => x.id === id);
    if (!p) return null;
    return { type, id, title: p.name, sources: p.sources, ledgerHref, anchor };
  }
  if (type === "company") {
    const c = country.companies.find((x) => x.id === id);
    if (!c) return null;
    return { type, id, title: c.name, sources: c.sources, ledgerHref, anchor };
  }
  if (type === "news") {
    const n = country.newsFeed.find((x) => x.id === id);
    if (!n) return null;
    return {
      type,
      id,
      title: n.headline,
      sources: [
        {
          url: n.url,
          publisher: n.publisher,
          accessedDate: n.addedDate,
        },
      ],
      ledgerHref,
      anchor,
    };
  }
  if (type === "beppu" && id === "beppu" && country.deepNode) {
    return {
      type,
      id,
      title: "Beppu Bay deep node",
      sources: country.deepNode.sources,
      ledgerHref,
      anchor,
    };
  }
  return null;
}

export interface ResolvedTranslation {
  translation: LobsterTranslation;
  record: ResolvedSourceRecord;
}

export function resolveTranslations(country: Country): ResolvedTranslation[] {
  const out: ResolvedTranslation[] = [];
  for (const t of country.lobsterTranslations) {
    const record = resolveSourceRecord(country, t);
    if (record) out.push({ translation: t, record });
  }
  return out;
}
