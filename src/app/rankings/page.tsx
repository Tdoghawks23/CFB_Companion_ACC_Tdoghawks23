import { getSeasonMeta, getRankings, getTeamsMap, getAvailableWeeksForRankings } from "@/lib/data";
import PageHeader from "@/components/layout/PageHeader";
import RankingsBoard from "@/components/rankings/RankingsBoard";
import RankingsPageClient from "./RankingsPageClient";

export default async function RankingsPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>;
}) {
  const params = await searchParams;
  const meta = await getSeasonMeta();
  const teamsMap = await getTeamsMap();
  const availableWeeks = await getAvailableWeeksForRankings(meta.currentSeason);

  const selectedWeek = params.week ? parseInt(params.week) : meta.currentWeek;
  const rankings = await getRankings(meta.currentSeason, selectedWeek);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader
        title="Dynasty Poll — Top 25"
        subtitle={`${meta.currentSeason} Season — Week ${selectedWeek}`}
      />

      <RankingsPageClient
        availableWeeks={availableWeeks}
        currentWeek={selectedWeek}
      />

      {rankings ? (
        <RankingsBoard
          rankings={rankings.rankings}
          othersReceivingVotes={rankings.othersReceivingVotes}
          teamsMap={teamsMap}
        />
      ) : (
        <p className="text-text-muted">No rankings data available for Week {selectedWeek}.</p>
      )}
    </div>
  );
}
