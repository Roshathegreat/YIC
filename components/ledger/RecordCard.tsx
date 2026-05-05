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
    <article
      id={id}
      className="ledger-rule border rounded-md p-4 bg-white scroll-mt-20"
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          {subtitle ? (
            <p className="text-sm text-gray-600">{subtitle}</p>
          ) : null}
        </div>
        {badge ? (
          <span className="text-xs uppercase tracking-wide text-gray-500 ledger-rule border rounded px-2 py-0.5">
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
