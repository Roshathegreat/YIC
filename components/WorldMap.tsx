"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { feature as topoFeature } from "topojson-client";
import worldTopo from "world-atlas/countries-110m.json";
import type { Country } from "@/lib/schema";

type Variant = "ledger" | "lobster";

interface WorldMapProps {
  variant: Variant;
  countries: Pick<
    Country,
    "id" | "displayName" | "iso3" | "m49" | "accentColor" | "marineAnimal"
  >[];
}

const STYLE: Record<
  Variant,
  { bg: string; defaultFill: string; defaultStroke: string }
> = {
  ledger: {
    bg: "bg-white",
    defaultFill: "#e5e7eb",
    defaultStroke: "#ffffff",
  },
  lobster: {
    bg: "bg-slate-900",
    defaultFill: "#374151",
    defaultStroke: "#0f172a",
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TOPO: any = worldTopo;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FEATURES: any = topoFeature(TOPO, TOPO.objects.countries);

export default function WorldMap({ variant, countries }: WorldMapProps) {
  const router = useRouter();
  const style = STYLE[variant];

  const byM49 = useMemo(() => {
    const map = new Map<string, (typeof countries)[number]>();
    for (const c of countries) map.set(String(c.m49), c);
    return map;
  }, [countries]);

  const centroidsByCountryId = useMemo(() => {
    const map = new Map<string, [number, number]>();
    for (const c of countries) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const f = (FEATURES.features as any[]).find(
        (x) => String(x.id) === String(c.m49),
      );
      if (f) map.set(c.id, geoCentroid(f) as [number, number]);
    }
    return map;
  }, [countries]);

  const hrefFor = (id: string) =>
    variant === "ledger" ? `/countries/${id}` : `/lobster/countries/${id}`;

  return (
    <div className={`w-full ${style.bg} rounded-lg overflow-hidden`}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 155, center: [10, 10] }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={TOPO}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const match = byM49.get(String(geo.id));
              const isHighlighted = Boolean(match);
              const fill = match?.accentColor ?? style.defaultFill;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    if (match) router.push(hrefFor(match.id));
                  }}
                  style={{
                    default: {
                      fill,
                      stroke: style.defaultStroke,
                      strokeWidth: 0.5,
                      outline: "none",
                      cursor: isHighlighted ? "pointer" : "default",
                    },
                    hover: {
                      fill: isHighlighted ? fill : style.defaultFill,
                      stroke: style.defaultStroke,
                      strokeWidth: 0.75,
                      outline: "none",
                      filter: isHighlighted ? "brightness(0.85)" : "none",
                      cursor: isHighlighted ? "pointer" : "default",
                    },
                    pressed: {
                      fill,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {variant === "lobster" &&
          countries.map((c) => {
            const centroid = centroidsByCountryId.get(c.id);
            if (!centroid) return null;
            return (
              <Marker
                key={c.id}
                coordinates={centroid}
                onClick={() => router.push(hrefFor(c.id))}
                style={{ default: { cursor: "pointer" } }}
              >
                <text
                  textAnchor="middle"
                  y={5}
                  style={{ fontSize: 18, userSelect: "none" }}
                >
                  {c.marineAnimal.emoji}
                </text>
              </Marker>
            );
          })}
      </ComposableMap>
    </div>
  );
}
