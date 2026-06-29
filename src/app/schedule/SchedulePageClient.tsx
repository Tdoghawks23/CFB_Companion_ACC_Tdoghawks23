"use client";

import { useRouter } from "next/navigation";
import WeekSelector from "@/components/rankings/WeekSelector";

interface SchedulePageClientProps {
  availableWeeks: number[];
  currentWeek: number;
}

export default function SchedulePageClient({ availableWeeks, currentWeek }: SchedulePageClientProps) {
  const router = useRouter();

  function handleSelectWeek(week: number) {
    router.push(`/schedule?week=${week}`);
  }

  return (
    <WeekSelector
      weeks={availableWeeks}
      currentWeek={currentWeek}
      onSelectWeek={handleSelectWeek}
    />
  );
}
