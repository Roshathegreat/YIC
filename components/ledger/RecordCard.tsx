import type { ReactNode } from "react";

interface RecordCardProps {
  id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  children: ReactNode;
  lastUpdated?: string;
}

export function RecordCard({
  id,
  title,
  subtitle,
  badge,
  children,
  lastUpdated,
}: RecordCardProps) {
  return (
    <article id={id} className="card scroll-mt-24">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="display text-lg">{title}</h3>
          {subtitle ? (
            <p className="text-sm text-[color:var(--muted)]">{subtitle}</p>
          ) : null}
        </div>
        {badge ? <span className="tag">{badge}</span> : null}
      </header>
      <div className="mt-3 text-sm">{children}</div>
      {lastUpdated ? (
        <footer className="mt-3 text-xs text-[color:var(--muted)]">
          Last updated {lastUpdated}
        </footer>
      ) : null}
    </article>
  );
}
