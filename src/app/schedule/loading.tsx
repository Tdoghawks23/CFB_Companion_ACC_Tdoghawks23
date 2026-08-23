import { Skeleton } from "@/components/ui/Skeleton";

export default function ScheduleLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <div className="mb-6 md:mb-8">
        <Skeleton className="h-2.5 w-24 mb-2" />
        <Skeleton className="h-8 w-40" />
      </div>
      <div className="flex gap-2 overflow-hidden mb-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-11 min-w-[47px] w-[47px] rounded-[11px] shrink-0" />
        ))}
      </div>
      <Skeleton className="h-3.5 w-56 mb-3" />
      <div className="grid grid-cols-1 gap-[10px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-[14px]" />
        ))}
      </div>
    </div>
  );
}
