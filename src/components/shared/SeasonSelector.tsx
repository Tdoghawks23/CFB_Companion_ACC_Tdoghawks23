import Link from "next/link";
import { clsx } from "clsx";

interface SeasonSelectorProps {
  seasons: number[];
  selectedSeason: number;
  currentSeason: number;
  /** Page path the pills link back to, e.g. "/schedule". */
  basePath: string;
}

/** Season pill row for pages that can browse past seasons. Hidden until the
 * league has more than one season of data. The current season links to the
 * bare path so its URLs stay the same as before seasons were selectable. */
export default function SeasonSelector({ seasons, selectedSeason, currentSeason, basePath }: SeasonSelectorProps) {
  if (seasons.length < 2) return null;

  return (
    <div role="tablist" aria-label="Select season" className="flex gap-2 mb-4">
      {[...seasons].sort((a, b) => b - a).map((season) => {
        const isSelected = season === selectedSeason;
        return (
          <Link
            key={season}
            href={season === currentSeason ? basePath : `${basePath}?season=${season}`}
            role="tab"
            aria-selected={isSelected}
            className={clsx(
              "shrink-0 h-9 px-4 inline-flex items-center rounded-full font-[family-name:var(--font-oswald)] text-[13px] font-semibold transition-colors",
              isSelected
                ? "bg-acc-gold text-acc-navy"
                : "bg-bg-elevated text-text-secondary hover:text-text-primary active:text-text-primary"
            )}
          >
            {season}
          </Link>
        );
      })}
    </div>
  );
}
