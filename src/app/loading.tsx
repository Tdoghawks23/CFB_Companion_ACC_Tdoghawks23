import { Skeleton, SkeletonRow } from "@/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="bg-acc-navy/40 border-b border-acc-blue/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-[22px] sm:py-[30px]">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-12">
            <Skeleton className="w-16 h-16 sm:w-[76px] sm:h-[76px] rounded-2xl" />
            <Skeleton className="h-5 w-10" />
            <Skeleton className="w-16 h-16 sm:w-[76px] sm:h-[76px] rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Ribbon skeleton */}
      <div className="bg-acc-navy border-b border-acc-blue/15">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-2.5 w-24 mb-2" />
              <Skeleton className="h-5 w-16" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <Skeleton className="h-3.5 w-32 mb-3.5" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-8">
          <Skeleton className="h-[56px] rounded-[14px]" />
          <Skeleton className="h-[56px] rounded-[14px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {Array.from({ length: 2 }).map((_, col) => (
            <div key={col} className="bg-bg-card rounded-2xl border border-acc-blue/12 overflow-hidden">
              <div className="px-5 py-4 border-b border-acc-blue/10">
                <Skeleton className="h-3 w-20 mb-2" />
                <Skeleton className="h-4 w-40" />
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
