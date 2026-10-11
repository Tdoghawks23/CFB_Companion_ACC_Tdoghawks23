"use client";

import { useRouter } from "next/navigation";
import WeekSelector from "@/components/rankings/WeekSelector";

interface RankingsPageClientProps {
  availableWeeks: number[];
  currentWeek: number;
  /** Set only when browsing a past season, so week links keep it. */
  season?: number;
}

export default function RankingsPageClient({ availableWeeks, currentWeek, season }: RankingsPageClientProps) {
  const router = useRouter();

  function handleSelectWeek(week: number) {
    router.push(season ? `/rankings?season=${season}&week=${week}` : `/rankings?week=${week}`);
  }

  return (
    <WeekSelector
      weeks={availableWeeks}
      currentWeek={currentWeek}
      onSelectWeek={handleSelectWeek}
    />
  );
}
