import { getSeasonMeta, getStandings, getRankings, getSchedule, getWeeklyPost, getTeamsMap, getCoaches } from "@/lib/data";
import GameOfWeekHero from "@/components/home/GameOfWeekHero";
import SeasonStatRibbon from "@/components/home/SeasonStatRibbon";
import CoachRoster from "@/components/home/CoachRoster";
import QuickStandings from "@/components/home/QuickStandings";
import QuickRankings from "@/components/home/QuickRankings";
import UpcomingGames from "@/components/home/UpcomingGames";
import RecentPost from "@/components/home/RecentPost";
import EmptyState from "@/components/ui/EmptyState";

// Optional layout flags from the design handoff — both default on.
const showRibbon = true;
const showAlsoThisWeek = true;

export default async function HomePage() {
  const meta = await getSeasonMeta();
  const teamsMap = await getTeamsMap();
  const standings = await getStandings(meta.currentSeason);
  const rankings = await getRankings(meta.currentSeason, meta.currentWeek);
  const schedule = await getSchedule(meta.currentSeason, meta.currentWeek);
  const coaches = await getCoaches();

  let latestPost = await getWeeklyPost(meta.currentSeason, meta.currentWeek);
  let postWeek = meta.currentWeek;
  if (!latestPost && meta.currentWeek > 1) {
    latestPost = await getWeeklyPost(meta.currentSeason, meta.currentWeek - 1);
    postWeek = meta.currentWeek - 1;
  }

  const heroGame = schedule?.games.find((g) => g.isFeatured);

  // Nothing simulated yet this season — the whole page would otherwise
  // render as a stack of blank sections.
  if (!heroGame && !standings) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <EmptyState
          title="Season data warming up"
          description="Stats and standings appear here once Week 1 has been simulated."
          ctaLabel="View Schedule ›"
          ctaHref="/schedule"
        />
      </div>
    );
  }

  return (
    <div>
      {/* Full-bleed hero + stat ribbon */}
      {heroGame && standings && (
        <GameOfWeekHero
          game={heroGame}
          teamsMap={teamsMap}
          standings={standings.teams}
        />
      )}

      {showRibbon && standings && rankings && (
        <SeasonStatRibbon
          standings={standings.teams}
          rankings={rankings.rankings}
          teamsMap={teamsMap}
        />
      )}

      {/* Constrained content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
        {showAlsoThisWeek && schedule && (
          <UpcomingGames games={schedule.games} teamsMap={teamsMap} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {standings && (
            <QuickStandings standings={standings.teams} teamsMap={teamsMap} />
          )}
          {rankings && (
            <QuickRankings rankings={rankings.rankings} teamsMap={teamsMap} />
          )}
        </div>

        <CoachRoster coaches={coaches} teamsMap={teamsMap} />

        {latestPost && <RecentPost post={latestPost} week={postWeek} />}
      </div>
    </div>
  );
}
