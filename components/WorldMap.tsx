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
  { defaultFill: string; defaultStroke: string }
> = {
  ledger: {
    defaultFill: "#e7d9be",
    defaultStroke: "#fff8ee",
  },
  lobster: {
    defaultFill: "#f1dfb8",
    defaultStroke: "#fff8ee",
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
    <div className="w-full rounded-md overflow-hidden">
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
                      filter: isHighlighted ? "brightness(0.9)" : "none",
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

        {/* Country pins on the kid surface — simple round dot, country
            label underneath. No emoji. */}
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
                <circle
                  r={6}
                  fill={c.accentColor}
                  stroke="#0e2a3a"
                  strokeWidth={1.5}
                />
                <text
                  textAnchor="middle"
                  y={20}
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    fill: "#0e2a3a",
                    paintOrder: "stroke",
                    stroke: "#fff8ee",
                    strokeWidth: 3,
                  }}
                >
                  {c.displayName}
                </text>
              </Marker>
            );
          })}
      </ComposableMap>
    </div>
  );
}
