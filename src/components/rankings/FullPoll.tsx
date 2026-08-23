import { clsx } from "clsx";
import type { RankedTeam, OtherReceivingVotes, Team } from "@/lib/types";
import TrendArrow from "@/components/shared/TrendArrow";
import TeamTile from "@/components/ui/TeamTile";

interface FullPollProps {
  rankings: RankedTeam[];
  othersReceivingVotes: OtherReceivingVotes[];
  teamsMap: Map<string, Team>;
}

/** Full 25-row Top 25 list — the same row pattern used by QuickRankings on
 * the home page, extended to every row and with a First Five Out footnote. */
export default function FullPoll({ rankings, othersReceivingVotes, teamsMap }: FullPollProps) {
  const topAccRank = rankings.find((r) => r.isACC)?.rank;
  const firstFiveOut = othersReceivingVotes.slice(0, 5);

  return (
    <div>
      <div className="bg-bg-card rounded-2xl border border-acc-blue/12 overflow-hidden">
        {rankings.map((r) => {
          const isTopAcc = r.rank === topAccRank;
          const team = r.isACC ? teamsMap.get(r.teamId) : undefined;
          const name =
            team?.name || r.teamName.split(" ").slice(0, -1).join(" ") || r.teamName;

          return (
            <div
              key={r.rank}
              className={clsx(
                "flex items-center gap-3.5 min-h-12 px-5 py-2.5 border-t border-white/[0.04] first:border-t-0 hover:bg-bg-card-hover active:bg-bg-card-hover transition-colors",
                r.isACC && !isTopAcc && "border-l-[3px]",
                isTopAcc && "border-l-[3px] border-l-acc-gold"
              )}
              style={{
                borderLeftColor: r.isACC && !isTopAcc ? team?.primaryColor : undefined,
                background: isTopAcc
                  ? "linear-gradient(90deg, rgba(201,151,0,0.12), transparent)"
                  : undefined,
              }}
            >
              <span
                className={clsx(
                  "font-[family-name:var(--font-oswald)] text-[14px] font-bold w-6 text-right shrink-0",
                  isTopAcc ? "text-acc-gold" : "text-text-muted"
                )}
              >
                {r.rank}
              </span>
              {r.isACC && team && (
                <TeamTile abbreviation={team.abbreviation} primaryColor={team.primaryColor} size="xs" />
              )}
              <span
                className={clsx(
                  "flex-1 min-w-0 text-[13.5px] truncate",
                  isTopAcc ? "font-semibold" : r.isACC && "text-acc-blue"
                )}
              >
                {name}
              </span>
              <span className="text-[11px] text-text-muted w-14 text-right shrink-0">{r.record}</span>
              <div className="w-[30px] flex justify-end shrink-0">
                <TrendArrow currentRank={r.rank} previousRank={r.previousRank} />
              </div>
            </div>
          );
        })}
      </div>

      {firstFiveOut.length > 0 && (
        <p className="mt-3 px-1 text-[12.5px] italic text-text-muted">
          First Five Out:{" "}
          {firstFiveOut.map((t, i) => (
            <span key={t.teamName}>
              {t.teamName}
              {i < firstFiveOut.length - 1 && ", "}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
