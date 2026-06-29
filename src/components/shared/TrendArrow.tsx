import { ChevronUp, ChevronDown, Minus } from "lucide-react";
import { clsx } from "clsx";
import { getRankMovement } from "@/lib/utils";

interface TrendArrowProps {
  currentRank: number;
  previousRank: number | null;
}

export default function TrendArrow({ currentRank, previousRank }: TrendArrowProps) {
  const { direction, amount } = getRankMovement(currentRank, previousRank);

  if (direction === "new") {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-bold text-featured bg-featured/15 px-1.5 py-0.5 rounded">
        NEW
      </span>
    );
  }

  if (direction === "same") {
    return <Minus size={14} className="text-text-muted" />;
  }

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-0.5 text-xs font-bold",
        direction === "up" ? "text-win" : "text-loss"
      )}
    >
      {direction === "up" ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      {amount}
    </span>
  );
}
