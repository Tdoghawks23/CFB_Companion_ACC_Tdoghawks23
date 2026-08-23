import { getSeasonMeta, getSchedule, getTeamsMap } from "@/lib/data";
import PageHeader from "@/components/layout/PageHeader";
import GameCard from "@/components/schedule/GameCard";
import EmptyState from "@/components/ui/EmptyState";
import SchedulePageClient from "./SchedulePageClient";

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>;
}) {
  const params = await searchParams;
  const meta = await getSeasonMeta();
  const teamsMap = await getTeamsMap();

  const selectedWeek = params.week ? parseInt(params.week) : meta.currentWeek;
  const schedule = await getSchedule(meta.currentSeason, selectedWeek);

  // Full season range for the pill rail (W0 … W<totalWeeks>), not just the
  // weeks that already have data — future weeks are still browsable, they
  // just land on the empty state until they're populated.
  const weekRange = Array.from({ length: meta.totalWeeks + 1 }, (_, i) => i);

  const hasGames = !!schedule && schedule.games.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader
        eyebrow={`${meta.currentSeason} Season`}
        title="Schedule"
        subtitle="All times ET · Default view is the current week"
      />

      <SchedulePageClient
        weeks={weekRange}
        selectedWeek={selectedWeek}
        currentWeek={meta.currentWeek}
      />

      {schedule && (
        <h2 className="font-[family-name:var(--font-oswald)] text-sm font-semibold uppercase tracking-wide text-text-secondary mb-3">
          {schedule.weekTitle} <span className="text-text-muted font-normal normal-case">· {schedule.weekDate}</span>
        </h2>
      )}

      {hasGames ? (
        <div className="grid grid-cols-1 gap-[10px]">
          {schedule!.games.map((game) => (
            <GameCard key={game.id} game={game} teamsMap={teamsMap} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No games scheduled"
          description={
            schedule
              ? "Every ACC team is on bye this week."
              : `Week ${selectedWeek} hasn't been simulated yet.`
          }
          ctaLabel={selectedWeek !== meta.currentWeek ? `Jump to Week ${meta.currentWeek} ›` : undefined}
          ctaHref={selectedWeek !== meta.currentWeek ? `/schedule?week=${meta.currentWeek}` : undefined}
        />
      )}

      {schedule && schedule.byeTeamIds && schedule.byeTeamIds.length > 0 && (
        <p className="mt-6 text-[11.5px] text-text-muted">
          On bye:{" "}
          {schedule.byeTeamIds.map((teamId, i) => {
            const team = teamsMap.get(teamId);
            return (
              <span key={teamId}>
                <strong className="text-text-secondary font-medium">{team?.name || teamId}</strong>
                {i < schedule.byeTeamIds!.length - 1 && ", "}
              </span>
            );
          })}
        </p>
      )}
    </div>
  );
}
