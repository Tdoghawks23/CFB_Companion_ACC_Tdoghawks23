import { getSeasonMeta, getRankings, getTeamsMap, getAvailableWeeksForRankings } from "@/lib/data";
import PageHeader from "@/components/layout/PageHeader";
import FullPoll from "@/components/rankings/FullPoll";
import EmptyState from "@/components/ui/EmptyState";
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
        eyebrow="Dynasty Poll"
        title="Top 25"
        subtitle={`Week ${selectedWeek} · Released every Tuesday`}
      />

      <RankingsPageClient
        availableWeeks={availableWeeks}
        currentWeek={selectedWeek}
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
