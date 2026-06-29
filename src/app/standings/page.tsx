import { getSeasonMeta, getStandings, getTeamsMap } from "@/lib/data";
import PageHeader from "@/components/layout/PageHeader";
import StandingsTable from "@/components/standings/StandingsTable";

export default async function StandingsPage() {
  const meta = await getSeasonMeta();
  const standings = await getStandings(meta.currentSeason);
  const teamsMap = await getTeamsMap();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader
        title="ACC Standings"
        subtitle={`${meta.currentSeason} Season — Week ${meta.currentWeek}`}
      />
      {standings ? (
        <div className="bg-bg-card rounded-xl border border-acc-blue/10 overflow-hidden">
          <StandingsTable standings={standings.teams} teamsMap={teamsMap} />
        </div>
      ) : (
        <p className="text-text-muted">No standings data available.</p>
      )}
    </div>
  );
}
