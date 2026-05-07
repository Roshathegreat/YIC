import { waveScore } from "@/lib/wooby";

interface WaveScoreProps {
  score: number;
  outOf?: number;
  label?: string;
}

export default function WaveScore({
  score,
  outOf = 5,
  label,
}: WaveScoreProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-lg" aria-hidden>
        {waveScore(score)}
      </span>
      <span className="text-sm text-white/90">
        {Math.round(score * 10) / 10}/{outOf}
        {label ? ` · ${label}` : ""}
      </span>
    </div>
  );
}
