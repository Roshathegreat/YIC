import type { ReactNode } from "react";

interface RecordCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children: ReactNode;
  lastUpdated?: string;
  anchorId?: string;
}

export function RecordCard({
  title,
  subtitle,
  badge,
  children,
  lastUpdated,
  anchorId,
}: RecordCardProps) {
  return (
    <article
      id={anchorId}
      className="border border-gray-200 rounded-md p-4 bg-white scroll-mt-20 target:ring-2 target:ring-amber-400"
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {subtitle ? (
            <p className="text-sm text-gray-600">{subtitle}</p>
          ) : null}
        </div>
        {badge ? (
          <span className="text-xs uppercase tracking-wide text-gray-500 border border-gray-200 rounded px-2 py-0.5">
            {badge}
          </span>
        ) : null}
      </header>
      <div className="mt-3 text-sm text-gray-800">{children}</div>
      {lastUpdated ? (
        <footer className="mt-3 text-xs text-gray-400">
          Last updated {lastUpdated}
        </footer>
      ) : null}
    </article>
  );
}
