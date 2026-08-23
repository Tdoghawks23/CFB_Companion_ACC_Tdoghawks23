"use client";

import { ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";

export interface ArchiveEntry {
  week: number;
  title: string;
  publishDate: string;
}

interface WeekArchiveProps {
  entries: ArchiveEntry[];
  currentWeek: number;
}

export default function WeekArchive({ entries, currentWeek }: WeekArchiveProps) {
  const router = useRouter();

  return (
    <div className="bg-bg-card rounded-xl border border-acc-blue/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-acc-blue/10 flex items-center gap-3">
        <h3 className="font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-wide text-text-muted">
          Archive
        </h3>
        <div className="h-px flex-1 bg-white/5" />
      </div>
      <div>
        {entries.map((entry) => (
          <button
            key={entry.week}
            type="button"
            onClick={() => router.push(`/weekly-post?week=${entry.week}`)}
            className={clsx(
              "w-full flex items-center gap-3 min-h-[56px] px-4 py-[10px] text-left border-t border-white/5 first:border-t-0 transition-colors hover:bg-bg-card-hover active:bg-bg-card-hover",
              entry.week === currentWeek && "bg-acc-blue/[0.06]"
            )}
          >
            <span className="shrink-0 bg-acc-gold/[0.16] text-acc-gold text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-[0.06em]">
              Wk {entry.week}
            </span>
            <span
              className={clsx(
                "flex-1 min-w-0 truncate text-[13.5px]",
                entry.week === currentWeek ? "text-acc-blue font-medium" : "text-text-secondary"
              )}
            >
              {entry.title}
            </span>
            <span className="shrink-0 text-[11px] text-text-muted">{entry.publishDate}</span>
            <ChevronRight size={14} className="shrink-0 text-text-muted" />
          </button>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-white/5 text-center text-[11px] uppercase tracking-[0.08em] text-text-muted">
        Start of Archive
      </div>
    </div>
  );
}
