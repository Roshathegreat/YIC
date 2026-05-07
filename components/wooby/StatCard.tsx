interface StatCardProps {
  label: string;
  value: string | number;
  emoji?: string;
  caption?: string;
}

export default function StatCard({
  label,
  value,
  emoji,
  caption,
}: StatCardProps) {
  return (
    <div className="wooby-card p-5">
      <div className="wooby-label flex items-center gap-1">
        {emoji ? <span aria-hidden>{emoji}</span> : null} {label}
      </div>
      <div className="wooby-bigstat mt-2">{value}</div>
      {caption ? (
        <div className="text-sm text-white/85 mt-2 leading-snug">{caption}</div>
      ) : null}
    </div>
  );
}
