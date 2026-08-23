import type { CSSProperties } from "react";

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

/** A single shimmering placeholder block. Compose these to mirror a real
 * component's geometry so loading states don't shift layout on arrival. */
export function Skeleton({ className = "", style }: SkeletonProps) {
  return <div className={`skeleton ${className}`} style={style} />;
}

/** A block-level bar of text-line height, for title/label placeholders. */
export function SkeletonBar({ className = "", widthClass = "w-full" }: { className?: string; widthClass?: string }) {
  return <Skeleton className={`h-3.5 ${widthClass} ${className}`} />;
}

/** A row matching the shared list-row pattern: tile + name bar + record bar. */
export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3.5 px-5 py-3 border-t border-white/5">
      <Skeleton className="w-[22px] h-[22px] rounded-full shrink-0" />
      <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
      <Skeleton className="h-3.5 flex-1 rounded" />
      <Skeleton className="h-3.5 w-9 rounded shrink-0" />
    </div>
  );
}
