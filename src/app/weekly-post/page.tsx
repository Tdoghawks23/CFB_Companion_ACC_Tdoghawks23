import { getSeasonMeta, getWeeklyPost, getTeamsMap, getAvailableWeeksForPosts, resolveSeason } from "@/lib/data";
import PageHeader from "@/components/layout/PageHeader";
import PostViewer from "@/components/weekly-post/PostViewer";
import WeekArchive, { type ArchiveEntry } from "@/components/weekly-post/WeekArchive";
import EmptyState from "@/components/ui/EmptyState";
import SeasonSelector from "@/components/shared/SeasonSelector";

export default async function WeeklyPostPage({
  searchParams,
}: {
  searchParams: Promise<{ season?: string; week?: string }>;
}) {
  const params = await searchParams;
  const meta = await getSeasonMeta();
  const teamsMap = await getTeamsMap();
  const season = resolveSeason(params.season, meta);
  const isCurrentSeason = season === meta.currentSeason;
  const availableWeeks = await getAvailableWeeksForPosts(season);

  const selectedWeek = params.week
    ? parseInt(params.week)
    : availableWeeks[0] || meta.currentWeek;

  const post = await getWeeklyPost(season, selectedWeek);

  const archiveEntries: ArchiveEntry[] = (
    await Promise.all(
      availableWeeks.map(async (week) => {
        const weekPost = await getWeeklyPost(season, week);
        return weekPost ? { week, title: weekPost.title, publishDate: weekPost.publishDate } : null;
      })
    )
  ).filter((e): e is ArchiveEntry => e !== null);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader
        eyebrow={`${season} Season`}
        title="Weekly Post"
      />

      <SeasonSelector
        seasons={meta.seasons}
        selectedSeason={season}
        currentSeason={meta.currentSeason}
        basePath="/weekly-post"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6 lg:gap-8">
        <div>
          {post ? (
            <PostViewer post={post} week={selectedWeek} teamsMap={teamsMap} />
          ) : (
            <EmptyState
              title="No posts yet"
              description="Weekly recaps land here after each week is simulated."
            />
          )}
        </div>

        {archiveEntries.length > 0 && (
          <div className="order-first lg:order-last">
            <WeekArchive
              entries={archiveEntries}
              currentWeek={selectedWeek}
              season={isCurrentSeason ? undefined : season}
            />
          </div>
        )}
      </div>
    </div>
  );
}
