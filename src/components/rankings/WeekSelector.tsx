"use client";

import { clsx } from "clsx";

interface WeekSelectorProps {
  weeks: number[];
  currentWeek: number;
  onSelectWeek: (week: number) => void;
}

export default function WeekSelector({ weeks, currentWeek, onSelectWeek }: WeekSelectorProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
      {weeks.map((week) => (
        <button
          key={week}
          onClick={() => onSelectWeek(week)}
          className={clsx(
            "shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            week === currentWeek
              ? "bg-acc-blue text-white"
              : "bg-bg-card text-text-secondary hover:bg-bg-card-hover hover:text-text-primary border border-acc-blue/10"
          )}
        >
          Week {week}
        </button>
      ))}
    </div>
  );
}
