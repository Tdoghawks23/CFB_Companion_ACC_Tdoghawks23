import { getSeasonMeta, getStandings, getTeamsMap } from "@/lib/data";
import PageHeader from "@/components/layout/PageHeader";
import StandingsTable from "@/components/standings/StandingsTable";
import EmptyState from "@/components/ui/EmptyState";

export default async function StandingsPage() {
  const meta = await getSeasonMeta();
  const standings = await getStandings(meta.currentSeason);
  const teamsMap = await getTeamsMap();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader
        eyebrow="ACC Conference"
        title="Standings"
        subtitle={`${meta.currentSeason} Season · Sorted by conference record`}
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
