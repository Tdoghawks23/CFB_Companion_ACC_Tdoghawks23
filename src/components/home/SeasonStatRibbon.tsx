import { clsx } from "clsx";
import type { RankedTeam, Team, TeamStanding } from "@/lib/types";

interface SeasonStatRibbonProps {
  standings: TeamStanding[];
  rankings: RankedTeam[];
  teamsMap: Map<string, Team>;
}

interface StatCellProps {
  label: string;
  value: string;
  accent?: string;
  accentClassName?: string;
  index: number;
  total: number;
}

function StatCell({ label, value, accent, accentClassName, index, total }: StatCellProps) {
  // Base (< sm): fixed 2-col grid — right border on the left column, bottom
  // border on the first row. sm+ (auto-fit row): left border on every cell
  // but the first, no bottom border.
  const isLeftCol = index % 2 === 0;
  const isTopRow = index < total - (total % 2 === 0 ? 2 : 1);

  return (
    <div
      className={clsx(
        "px-4 py-[13px] sm:px-6 sm:py-[17px] border-acc-blue/12",
        isLeftCol && "border-r",
        isTopRow && "border-b",
        "sm:border-b-0 sm:border-r-0",
        index !== 0 && "sm:border-l"
      )}
    >
      <div className="text-[10px] sm:text-[11px] tracking-[0.13em] sm:tracking-[0.14em] uppercase text-text-secondary mb-1.5">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-[family-name:var(--font-oswald)] text-[17px] sm:text-2xl font-bold text-text-primary">
          {value}
        </span>
        {accent && (
          <span
            className={`font-[family-name:var(--font-oswald)] text-[13px] sm:text-base font-bold ${accentClassName ?? "text-text-muted"}`}
          >
            {accent}
          </span>
        )}
      </div>
    </div>
  );
}

export default function SeasonStatRibbon({ standings, rankings, teamsMap }: SeasonStatRibbonProps) {
  const teamName = (teamId: string, fallback: string) =>
    teamsMap.get(teamId)?.name ?? fallback;

  // 1. Highest-ranked ACC team in the poll.
  const topRankedAcc = rankings.find((r) => r.isACC);
  const topRankedName = topRankedAcc
    ? teamName(topRankedAcc.teamId, topRankedAcc.teamName.split(" ").slice(0, -1).join(" ") || topRankedAcc.teamName)
    : "—";

  // 2. Count of ranked ACC teams out of the full ACC field.
  const rankedAccCount = rankings.filter((r) => r.isACC).length;
  const totalAccTeams = standings.length;

  // 3. Top scoring offense (max points for).
  const topOffense = standings.reduce<TeamStanding | null>(
    (best, t) => (best === null || t.pointsFor > best.pointsFor ? t : best),
    null
  );

  // 4. Stingiest defense (min points against).
  const topDefense = standings.reduce<TeamStanding | null>(
    (best, t) => (best === null || t.pointsAgainst < best.pointsAgainst ? t : best),
    null
  );

  const cells = [
    {
      label: "ACC Top Ranked",
      value: topRankedName,
      accent: topRankedAcc ? `#${topRankedAcc.rank}` : undefined,
      accentClassName: "text-acc-gold",
    },
    {
      label: "Ranked ACC Teams",
      value: String(rankedAccCount),
      accent: `of ${totalAccTeams}`,
    },
    topOffense && {
      label: "Top Scoring Offense",
      value: teamName(topOffense.teamId, topOffense.teamId),
      accent: `${topOffense.pointsFor} PF`,
      accentClassName: "text-win",
    },
    topDefense && {
      label: "Stingiest Defense",
      value: teamName(topDefense.teamId, topDefense.teamId),
      accent: `${topDefense.pointsAgainst} PA`,
      accentClassName: "text-acc-blue",
    },
  ].filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className="bg-acc-navy border-b border-acc-blue/15">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">
        {cells.map((cell, i) => (
          <StatCell key={cell.label} {...cell} index={i} total={cells.length} />
        ))}
      </div>
    </div>
  );
}
