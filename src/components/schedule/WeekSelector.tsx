"use client";

import { useEffect, useRef } from "react";
import { clsx } from "clsx";

interface WeekSelectorProps {
  /** Full season week range, e.g. [0, 1, 2, ... totalWeeks]. */
  weeks: number[];
  /** The week currently being viewed (drives the solid selected pill). */
  selectedWeek: number;
  /** The league's actual current week (drives the gold dot when not selected). */
  currentWeek: number;
  onSelectWeek: (week: number) => void;
}

export default function WeekSelector({ weeks, selectedWeek, currentWeek, onSelectWeek }: WeekSelectorProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [selectedWeek]);

  return (
    <div
      ref={railRef}
      role="tablist"
      aria-label="Select week"
      className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6"
    >
      {weeks.map((week) => {
        const isSelected = week === selectedWeek;
        const isCurrent = week === currentWeek;
        const isPast = week < currentWeek;

        return (
          <button
            key={week}
            ref={isSelected ? selectedRef : undefined}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectWeek(week)}
            className={clsx(
              "relative shrink-0 h-11 min-w-[47px] px-3 rounded-[11px] font-[family-name:var(--font-oswald)] text-[13px] font-semibold transition-colors",
              isSelected
                ? "bg-acc-gold text-acc-navy"
                : "bg-bg-elevated text-text-secondary hover:text-text-primary active:text-text-primary",
              isPast && !isSelected && "opacity-55"
            )}
          >
            W{week}
            {isCurrent && !isSelected && (
              <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-acc-gold" />
            )}
          </button>
        );
      })}
    </div>
  );
}
