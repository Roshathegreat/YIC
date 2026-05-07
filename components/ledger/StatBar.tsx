interface StatBarProps {
  label: string;
  value: number;
  max: number;
  unit?: string;
  tone?: "default" | "good" | "danger";
  format?: (n: number) => string;
}

export default function StatBar({
  label,
  value,
  max,
  unit,
  tone = "default",
  format,
}: StatBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const display = format ? format(value) : value.toLocaleString();
  const cls = tone === "good" ? "statbar good" : tone === "danger" ? "statbar danger" : "statbar";
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs text-[var(--muted)]">
        <span>{label}</span>
        <span>
          {display}
          {unit ? ` ${unit}` : ""}
        </span>
      </div>
      <div className={cls} role="progressbar" aria-valuenow={value} aria-valuemax={max}>
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
