import { Skeleton } from "@/components/ui/Skeleton";

export default function WeeklyPostLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <div className="mb-6 md:mb-8">
        <Skeleton className="h-2.5 w-28 mb-2" />
        <Skeleton className="h-8 w-44" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6 lg:gap-8">
        <div className="bg-bg-card rounded-2xl border border-acc-blue/12 p-5 md:p-[26px_28px]">
          <div className="flex items-center gap-2.5 mb-4">
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-6 w-[92%] mb-2" />
          <Skeleton className="h-6 w-[78%] mb-4" />
          <Skeleton className="h-3.5 w-full mb-1.5" />
          <Skeleton className="h-3.5 w-full mb-1.5" />
          <Skeleton className="h-3.5 w-2/3" />
        </div>
        <div className="bg-bg-card rounded-xl border border-acc-blue/10 overflow-hidden order-first lg:order-last">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-[10px] border-t border-white/5 first:border-t-0 h-[56px]">
              <Skeleton className="h-4 w-10 rounded-full shrink-0" />
              <Skeleton className="h-3.5 flex-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
