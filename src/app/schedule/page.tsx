import { getSeasonMeta, getSchedule, getTeamsMap, getAvailableWeeksForSchedule } from "@/lib/data";
import PageHeader from "@/components/layout/PageHeader";
import GameCard from "@/components/schedule/GameCard";
import SchedulePageClient from "./SchedulePageClient";

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>;
}) {
  const params = await searchParams;
  const meta = await getSeasonMeta();
  const teamsMap = await getTeamsMap();
  const availableWeeks = await getAvailableWeeksForSchedule(meta.currentSeason);

  const selectedWeek = params.week ? parseInt(params.week) : meta.currentWeek;
  const schedule = await getSchedule(meta.currentSeason, selectedWeek);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader
        title={schedule?.weekTitle || `Week ${selectedWeek} Schedule`}
        subtitle={schedule?.weekDate || `${meta.currentSeason} Season`}
      />

      <SchedulePageClient
        availableWeeks={availableWeeks}
        currentWeek={selectedWeek}
      />

      {schedule && schedule.games.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedule.games.map((game) => (
            <GameCard key={game.id} game={game} teamsMap={teamsMap} />
          ))}
        </div>
      ) : (
        <p className="text-text-muted">No games scheduled for Week {selectedWeek}.</p>
      )}
    </div>
  );
}
