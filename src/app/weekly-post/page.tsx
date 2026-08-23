import { getSeasonMeta, getWeeklyPost, getTeamsMap, getAvailableWeeksForPosts } from "@/lib/data";
import PageHeader from "@/components/layout/PageHeader";
import PostViewer from "@/components/weekly-post/PostViewer";
import WeekArchive, { type ArchiveEntry } from "@/components/weekly-post/WeekArchive";
import EmptyState from "@/components/ui/EmptyState";

export default async function WeeklyPostPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>;
}) {
  const params = await searchParams;
  const meta = await getSeasonMeta();
  const teamsMap = await getTeamsMap();
  const availableWeeks = await getAvailableWeeksForPosts(meta.currentSeason);

  const selectedWeek = params.week
    ? parseInt(params.week)
    : availableWeeks[0] || meta.currentWeek;

  const post = await getWeeklyPost(meta.currentSeason, selectedWeek);

  const archiveEntries: ArchiveEntry[] = (
    await Promise.all(
      availableWeeks.map(async (week) => {
        const weekPost = await getWeeklyPost(meta.currentSeason, week);
        return weekPost ? { week, title: weekPost.title, publishDate: weekPost.publishDate } : null;
      })
    )
  ).filter((e): e is ArchiveEntry => e !== null);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader
        eyebrow={`${meta.currentSeason} Season`}
        title="Weekly Post"
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
            <WeekArchive entries={archiveEntries} currentWeek={selectedWeek} />
          </div>
        )}
      </div>
    </div>
  );
}
