import { getSeasonMeta, getWeeklyPost, getTeamsMap, getAvailableWeeksForPosts } from "@/lib/data";
import PageHeader from "@/components/layout/PageHeader";
import PostViewer from "@/components/weekly-post/PostViewer";
import WeekArchive from "@/components/weekly-post/WeekArchive";

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

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader
        title="Weekly Post"
        subtitle={`${meta.currentSeason} Season`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-8">
        <div>
          {post ? (
            <PostViewer post={post} teamsMap={teamsMap} />
          ) : (
            <div className="bg-bg-card rounded-xl border border-acc-blue/10 p-8 text-center">
              <p className="text-text-muted">No weekly post available for Week {selectedWeek}.</p>
            </div>
          )}
        </div>

        {availableWeeks.length > 0 && (
          <div className="order-first lg:order-last">
            <WeekArchive weeks={availableWeeks} currentWeek={selectedWeek} />
          </div>
        )}
      </div>
    </div>
  );
}
