import Link from "next/link";
import type { RankedTeam, Team } from "@/lib/types";
import TrendArrow from "@/components/shared/TrendArrow";
import { clsx } from "clsx";

interface QuickRankingsProps {
  rankings: RankedTeam[];
  teamsMap: Map<string, Team>;
}

export default function QuickRankings({ rankings, teamsMap }: QuickRankingsProps) {
  const top10 = rankings.slice(0, 10);
  // The single highest-ranked ACC team gets the gold highlight treatment.
  const topAccRank = rankings.find((r) => r.isACC)?.rank;

  return (
    <div className="bg-bg-card rounded-2xl border border-acc-blue/12 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-acc-blue/10">
        <div>
          <div className="font-[family-name:var(--font-oswald)] text-[10px] tracking-[0.18em] uppercase text-acc-gold font-semibold mb-0.5">
            Dynasty Poll
          </div>
          <h2 className="font-[family-name:var(--font-oswald)] text-[17px] font-semibold uppercase tracking-[0.04em]">
            Top 25
          </h2>
        </div>
        <Link href="/rankings" className="text-acc-blue text-[13px] hover:underline">
          Full ›
        </Link>
      </div>

      <div>
        {top10.map((r) => {
          const isTopAcc = r.rank === topAccRank;
          const team = isTopAcc ? teamsMap.get(r.teamId) : undefined;
          const name =
            team?.name || r.teamName.split(" ").slice(0, -1).join(" ") || r.teamName;

          return (
            <div
              key={r.rank}
              className={clsx(
                "flex items-center gap-3.5 min-h-12 px-5 py-2.5 border-t border-white/[0.04] hover:bg-bg-card-hover active:bg-bg-card-hover transition-colors",
                isTopAcc && "border-l-[3px] border-l-acc-gold"
              )}
              style={
                isTopAcc
                  ? {
                      background:
                        "linear-gradient(90deg, rgba(201,151,0,0.12), transparent)",
                    }
                  : undefined
              }
            >
              <span
                className={clsx(
                  "font-[family-name:var(--font-oswald)] text-[14px] font-bold w-6 text-right",
                  isTopAcc ? "text-acc-gold" : "text-text-muted"
                )}
              >
                {r.rank}
              </span>
              {isTopAcc && team && (
                <div
                  className="flex items-center justify-center w-[26px] h-[26px] rounded-[7px] font-[family-name:var(--font-oswald)] font-bold text-white text-[8px] shrink-0"
                  style={{ backgroundColor: team.primaryColor }}
                >
                  {team.abbreviation}
                </div>
              )}
              <span
                className={clsx(
                  "flex-1 min-w-0 text-[13.5px] truncate",
                  isTopAcc && "font-semibold"
                )}
              >
                {name}
              </span>
              <span
                className={clsx(
                  "text-[11px]",
                  isTopAcc ? "text-text-secondary" : "text-text-muted"
                )}
              >
                {r.record}
              </span>
              <div className="w-7 flex justify-end">
                <TrendArrow currentRank={r.rank} previousRank={r.previousRank} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
