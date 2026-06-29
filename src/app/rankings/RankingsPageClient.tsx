"use client";

import { useRouter } from "next/navigation";
import WeekSelector from "@/components/rankings/WeekSelector";

interface RankingsPageClientProps {
  availableWeeks: number[];
  currentWeek: number;
}

export default function RankingsPageClient({ availableWeeks, currentWeek }: RankingsPageClientProps) {
  const router = useRouter();

  function handleSelectWeek(week: number) {
    router.push(`/rankings?week=${week}`);
  }

  return (
    <WeekSelector
      weeks={availableWeeks}
      currentWeek={currentWeek}
      onSelectWeek={handleSelectWeek}
    />
  );
}
