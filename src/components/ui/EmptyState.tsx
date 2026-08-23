import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Shared "never blank" placeholder for any data surface with nothing to
 * show yet (pre-season, bye week, unreleased poll, no posts).
 */
export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  ctaLabel,
  ctaHref,
}: EmptyStateProps) {
  return (
    <div className="bg-bg-card rounded-2xl border border-acc-blue/12 min-h-[230px] flex flex-col items-center justify-center text-center p-[46px_24px]">
      <Icon size={38} color="#3A4661" className="mb-3" />
      <h3 className="font-[family-name:var(--font-oswald)] text-[15px] font-semibold uppercase tracking-[0.06em] text-text-secondary">
        {title}
      </h3>
      <p className="text-[12.5px] text-text-muted mt-1.5 max-w-[250px]">{description}</p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center min-h-[44px] px-4 mt-4 text-acc-blue text-[13px] font-medium hover:underline"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
