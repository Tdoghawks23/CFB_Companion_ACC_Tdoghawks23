import { getSeasonMeta, getRankings, getTeamsMap, getAvailableWeeksForRankings, resolveSeason } from "@/lib/data";
import PageHeader from "@/components/layout/PageHeader";
import FullPoll from "@/components/rankings/FullPoll";
import EmptyState from "@/components/ui/EmptyState";
import SeasonSelector from "@/components/shared/SeasonSelector";
import RankingsPageClient from "./RankingsPageClient";

export default async function RankingsPage({
  searchParams,
}: {
  searchParams: Promise<{ season?: string; week?: string }>;
}) {
  const params = await searchParams;
  const meta = await getSeasonMeta();
  const teamsMap = await getTeamsMap();
  const season = resolveSeason(params.season, meta);
  const isCurrentSeason = season === meta.currentSeason;
  const availableWeeks = await getAvailableWeeksForRankings(season);

  // Past seasons open on their final poll instead of the current week.
  const defaultWeek = isCurrentSeason ? meta.currentWeek : availableWeeks.at(-1) ?? 0;
  const selectedWeek = params.week ? parseInt(params.week) : defaultWeek;
  const rankings = await getRankings(season, selectedWeek);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader
        eyebrow="Dynasty Poll"
        title="Top 25"
        subtitle={`${season} · Week ${selectedWeek} · Released every Tuesday`}
      />

      <SeasonSelector
        seasons={meta.seasons}
        selectedSeason={season}
        currentSeason={meta.currentSeason}
        basePath="/rankings"
      />

      <RankingsPageClient
        availableWeeks={availableWeeks}
        currentWeek={selectedWeek}
        season={isCurrentSeason ? undefined : season}
      />

      {rankings ? (
        <FullPoll
          rankings={rankings.rankings}
          othersReceivingVotes={rankings.othersReceivingVotes}
          teamsMap={teamsMap}
        />
      ) : (
        <EmptyState
          title="Poll not released"
          description="The Dynasty Poll drops Tuesdays, once that week's games have been played."
        />
      )}
    </div>
  );
}
