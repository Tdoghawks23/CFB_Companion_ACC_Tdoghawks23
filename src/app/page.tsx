import { getSeasonMeta, getStandings, getRankings, getSchedule, getWeeklyPost, getTeamsMap, getCoaches } from "@/lib/data";
import SeasonBanner from "@/components/home/SeasonBanner";
import CoachRoster from "@/components/home/CoachRoster";
import QuickStandings from "@/components/home/QuickStandings";
import QuickRankings from "@/components/home/QuickRankings";
import UpcomingGames from "@/components/home/UpcomingGames";
import RecentPost from "@/components/home/RecentPost";

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

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <SeasonBanner meta={meta} />

      {schedule && (
        <UpcomingGames
          games={schedule.games}
          teamsMap={teamsMap}
          week={meta.currentWeek}
        />
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
  );
}
