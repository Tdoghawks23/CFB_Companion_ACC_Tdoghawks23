import { Skeleton, SkeletonRow } from "@/components/ui/Skeleton";

export default function StandingsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <div className="mb-6 md:mb-8">
        <Skeleton className="h-2.5 w-28 mb-2" />
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="bg-bg-card rounded-2xl border border-acc-blue/12 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    </div>
  );
}
