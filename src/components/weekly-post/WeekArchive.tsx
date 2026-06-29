"use client";

import { clsx } from "clsx";
import { useRouter } from "next/navigation";

interface WeekArchiveProps {
  weeks: number[];
  currentWeek: number;
}

export default function WeekArchive({ weeks, currentWeek }: WeekArchiveProps) {
  const router = useRouter();

  return (
    <div className="bg-bg-card rounded-xl border border-acc-blue/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-acc-blue/10">
        <h3 className="font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-wide text-text-muted">
          Week Archive
        </h3>
      </div>
      <div className="p-2">
        {weeks.map((week) => (
          <button
            key={week}
            onClick={() => router.push(`/weekly-post?week=${week}`)}
            className={clsx(
              "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
              week === currentWeek
                ? "bg-acc-blue/15 text-acc-blue font-medium"
                : "text-text-secondary hover:bg-bg-card-hover hover:text-text-primary"
            )}
          >
            Week {week} Recap
          </button>
        ))}
      </div>
    </div>
  );
}
