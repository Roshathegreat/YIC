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

type Variant = "ledger" | "wooby";

export interface WorldMapCountry {
  id: string;
  displayName: string;
  m49: number;
  accentColor: string;
  iconEmoji?: string;
}

interface WorldMapProps {
  variant: Variant;
  countries: WorldMapCountry[];
}

const STYLE: Record<
  Variant,
  { bg: string; defaultFill: string; defaultStroke: string }
> = {
  ledger: {
    bg: "bg-white",
    defaultFill: "#eef2f7",
    defaultStroke: "#ffffff",
  },
  wooby: {
    bg: "bg-transparent",
    defaultFill: "rgba(255,255,255,0.18)",
    defaultStroke: "rgba(255,255,255,0.35)",
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
    const map = new Map<string, WorldMapCountry>();
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
    variant === "ledger" ? `/countries/${id}` : `/wooby/countries/${id}`;

  return (
    <div className={`w-full ${style.bg} rounded-2xl overflow-hidden`}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165, center: [10, 5] }}
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
                      strokeWidth: 0.9,
                      outline: "none",
                      filter: isHighlighted ? "brightness(1.15)" : "none",
                      cursor: isHighlighted ? "pointer" : "default",
                    },
                    pressed: { fill, outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>

        {variant === "wooby" &&
          countries.map((c) => {
            const centroid = centroidsByCountryId.get(c.id);
            if (!centroid || !c.iconEmoji) return null;
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
                  {c.iconEmoji}
                </text>
              </Marker>
            );
          })}
      </ComposableMap>
    </div>
  );
}
