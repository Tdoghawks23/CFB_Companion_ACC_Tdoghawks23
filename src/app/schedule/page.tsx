import { getSeasonMeta, getSchedule, getTeamsMap, getAvailableWeeksForSchedule } from "@/lib/data";
import PageHeader from "@/components/layout/PageHeader";
import GameCard from "@/components/schedule/GameCard";
import TeamLogo from "@/components/shared/TeamLogo";
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

      {schedule && schedule.byeTeamIds && schedule.byeTeamIds.length > 0 && (
        <div className="mt-8">
          <h2 className="font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-wide text-text-muted mb-3">
            On Bye
          </h2>
          <div className="flex flex-wrap gap-2">
            {schedule.byeTeamIds.map((teamId) => {
              const team = teamsMap.get(teamId);
              return (
                <span
                  key={teamId}
                  className="flex items-center gap-2 bg-bg-card border border-acc-blue/10 rounded-lg pl-2 pr-3 py-1.5 text-sm text-text-secondary"
                >
                  <TeamLogo
                    abbreviation={team?.abbreviation || teamId.substring(0, 3).toUpperCase()}
                    primaryColor={team?.primaryColor || "#4B5563"}
                    size={22}
                  />
                  {team?.name || teamId}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
