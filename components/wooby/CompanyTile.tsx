import Link from "next/link";
import type { Company } from "@/lib/schema";
import WaveScore from "./WaveScore";

interface CompanyTileProps {
  company: Company;
  combinedScore: number;
}

export default function CompanyTile({
  company,
  combinedScore,
}: CompanyTileProps) {
  return (
    <Link
      href={`/wooby/companies/${company.id}`}
      className="wooby-card p-4 flex items-start gap-3 hover:scale-[1.02] transition-transform"
    >
      <div
        className="rounded-full w-12 h-12 flex items-center justify-center text-2xl shrink-0"
        style={{ background: company.brandColor, color: "#fff" }}
        aria-hidden
      >
        {company.logoEmoji}
      </div>
      <div className="min-w-0">
        <div className="font-bold leading-tight">{company.name}</div>
        <div className="wooby-label mt-0.5">{company.sector}</div>
        <div className="mt-2">
          <WaveScore score={Math.max(0, combinedScore / 2)} />
        </div>
      </div>
    </Link>
  );
}
