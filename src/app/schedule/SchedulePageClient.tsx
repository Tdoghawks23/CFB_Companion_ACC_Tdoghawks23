"use client";

import { useRouter } from "next/navigation";
import WeekSelector from "@/components/schedule/WeekSelector";

interface SchedulePageClientProps {
  weeks: number[];
  selectedWeek: number;
  currentWeek: number;
}

export default function SchedulePageClient({ weeks, selectedWeek, currentWeek }: SchedulePageClientProps) {
  const router = useRouter();

  function handleSelectWeek(week: number) {
    router.push(`/schedule?week=${week}`);
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
