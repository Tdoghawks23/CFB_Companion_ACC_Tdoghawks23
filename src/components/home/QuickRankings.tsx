import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { RankedTeam, Team } from "@/lib/types";
import TrendArrow from "@/components/shared/TrendArrow";
import TeamLogo from "@/components/shared/TeamLogo";
import { clsx } from "clsx";

interface QuickRankingsProps {
  rankings: RankedTeam[];
  teamsMap: Map<string, Team>;
}

export default function QuickRankings({ rankings, teamsMap }: QuickRankingsProps) {
  const top10 = rankings.slice(0, 10);

  return (
    <div className="bg-bg-card rounded-xl border border-acc-blue/10 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-acc-blue/10">
        <h2 className="font-[family-name:var(--font-oswald)] text-lg font-semibold uppercase tracking-wide">
          Top 25 Poll
        </h2>
        <Link
          href="/rankings"
          className="flex items-center gap-1 text-acc-blue text-sm hover:underline"
        >
          Full Rankings <ChevronRight size={14} />
        </Link>
      </div>
      <div className="divide-y divide-white/5">
        {top10.map((r) => {
          const team = r.isACC ? teamsMap.get(r.teamId) : undefined;
          return (
            <div
              key={r.rank}
              className={clsx(
                "flex items-center gap-3 px-5 py-2.5 hover:bg-bg-card-hover transition-colors",
                r.isACC && "bg-acc-blue/5"
              )}
            >
              <span className="font-[family-name:var(--font-oswald)] text-sm w-6 text-right font-bold text-text-muted">
                {r.rank}
              </span>
              {team ? (
                <TeamLogo
                  abbreviation={team.abbreviation}
                  primaryColor={team.primaryColor}
                  size={28}
                />
              ) : (
                <div className="w-7 h-7 rounded bg-bg-elevated flex items-center justify-center text-[10px] text-text-muted shrink-0">
                  {r.teamName.split(" ")[0]?.substring(0, 3).toUpperCase()}
                </div>
              )}
              <span className={clsx("flex-1 text-sm", r.isACC && "font-semibold")}>
                {r.teamName.split(" ").slice(0, -1).join(" ") || r.teamName}
              </span>
              <span className="text-text-muted text-xs">{r.record}</span>
              <TrendArrow currentRank={r.rank} previousRank={r.previousRank} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
