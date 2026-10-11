import { getSeasonMeta, getStandings, getTeamsMap, resolveSeason } from "@/lib/data";
import PageHeader from "@/components/layout/PageHeader";
import StandingsTable from "@/components/standings/StandingsTable";
import EmptyState from "@/components/ui/EmptyState";
import SeasonSelector from "@/components/shared/SeasonSelector";

export default async function StandingsPage({
  searchParams,
}: {
  searchParams: Promise<{ season?: string }>;
}) {
  const params = await searchParams;
  const meta = await getSeasonMeta();
  const season = resolveSeason(params.season, meta);
  const standings = await getStandings(season);
  const teamsMap = await getTeamsMap();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader
        eyebrow="ACC Conference"
        title="Standings"
        subtitle={`${season} Season · Sorted by conference record`}
      />

      <SeasonSelector
        seasons={meta.seasons}
        selectedSeason={season}
        currentSeason={meta.currentSeason}
        basePath="/standings"
      />
      {standings && standings.teams.length > 0 ? (
        <div className="bg-bg-card rounded-2xl border border-acc-blue/12 overflow-hidden">
          <StandingsTable standings={standings.teams} teamsMap={teamsMap} />
        </div>
      ) : (
        <EmptyState
          title="No standings yet"
          description="Standings publish once Week 1 results are in."
        />
      )}
    </div>
  );
}
