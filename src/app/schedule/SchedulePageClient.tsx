"use client";

import { useRouter } from "next/navigation";
import WeekSelector from "@/components/schedule/WeekSelector";

interface SchedulePageClientProps {
  weeks: number[];
  selectedWeek: number;
  currentWeek: number;
  /** Set only when browsing a past season, so week links keep it. */
  season?: number;
}

export default function SchedulePageClient({ weeks, selectedWeek, currentWeek, season }: SchedulePageClientProps) {
  const router = useRouter();

  function handleSelectWeek(week: number) {
    router.push(season ? `/schedule?season=${season}&week=${week}` : `/schedule?week=${week}`);
  }

  return (
    <WeekSelector
      weeks={weeks}
      selectedWeek={selectedWeek}
      currentWeek={currentWeek}
      onSelectWeek={handleSelectWeek}
    />
  );
}
