"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { LayoutGrid, List } from "lucide-react";
import type { RankedTeam, OtherReceivingVotes, Team } from "@/lib/types";
import RankedTeamCard from "./RankedTeamCard";
import TrendArrow from "@/components/shared/TrendArrow";
import TeamLogo from "@/components/shared/TeamLogo";

interface RankingsBoardProps {
  rankings: RankedTeam[];
  othersReceivingVotes: OtherReceivingVotes[];
  teamsMap: Map<string, Team>;
}

export default function RankingsBoard({ rankings, othersReceivingVotes, teamsMap }: RankingsBoardProps) {
  const [viewMode, setViewMode] = useState<"board" | "list">("board");

  const top5 = rankings.slice(0, 5);
  const rest = rankings.slice(5);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setViewMode("board")}
          className={clsx(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors",
            viewMode === "board" ? "bg-acc-blue/20 text-acc-blue" : "text-text-muted hover:text-text-secondary"
          )}
        >
          <LayoutGrid size={14} /> Board
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={clsx(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors",
            viewMode === "list" ? "bg-acc-blue/20 text-acc-blue" : "text-text-muted hover:text-text-secondary"
          )}
        >
          <List size={14} /> List
        </button>
      </div>

      {viewMode === "board" ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {top5.map((r) => (
              <RankedTeamCard key={r.rank} ranked={r} team={teamsMap.get(r.teamId)} />
            ))}
          </div>
          <div className="bg-bg-card rounded-xl border border-acc-blue/10 overflow-hidden">
            <div className="divide-y divide-white/5">
              {rest.map((r) => {
                const team = r.isACC ? teamsMap.get(r.teamId) : undefined;
                return (
                  <div
                    key={r.rank}
                    className={clsx(
                      "flex items-center gap-3 px-5 py-3 hover:bg-bg-card-hover transition-colors",
                      r.isACC && "bg-acc-blue/5"
                    )}
                  >
                    <span className="font-[family-name:var(--font-oswald)] text-lg w-8 text-right font-bold text-text-muted">
                      {r.rank}
                    </span>
                    {team ? (
                      <TeamLogo abbreviation={team.abbreviation} primaryColor={team.primaryColor} size={32} />
                    ) : (
                      <div className="w-8 h-8 rounded bg-bg-elevated flex items-center justify-center text-[10px] text-text-muted shrink-0">
                        {r.teamName.split(" ")[0]?.substring(0, 3).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1">
                      <span className={clsx("font-medium text-sm", r.isACC && "text-acc-blue")}>{r.teamName}</span>
                    </div>
                    <span className="text-text-secondary text-sm">{r.record}</span>
                    <TrendArrow currentRank={r.rank} previousRank={r.previousRank} />
                    {r.points > 0 && <span className="text-text-muted text-xs w-12 text-right">{r.points} pts</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-bg-card rounded-xl border border-acc-blue/10 overflow-hidden">
          <div className="divide-y divide-white/5">
            {rankings.map((r) => {
              const team = r.isACC ? teamsMap.get(r.teamId) : undefined;
              return (
                <div
                  key={r.rank}
                  className={clsx(
                    "flex items-center gap-3 px-5 py-3 hover:bg-bg-card-hover transition-colors",
                    r.isACC && "bg-acc-blue/5"
                  )}
                >
                  <span className="font-[family-name:var(--font-oswald)] text-lg w-8 text-right font-bold text-text-muted">
                    {r.rank}
                  </span>
                  {team ? (
                    <TeamLogo abbreviation={team.abbreviation} primaryColor={team.primaryColor} size={32} />
                  ) : (
                    <div className="w-8 h-8 rounded bg-bg-elevated flex items-center justify-center text-[10px] text-text-muted shrink-0">
                      {r.teamName.split(" ")[0]?.substring(0, 3).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <span className={clsx("font-medium", r.isACC && "text-acc-blue")}>{r.teamName}</span>
                    {r.firstPlaceVotes > 0 && (
                      <span className="text-text-muted text-xs ml-1">({r.firstPlaceVotes})</span>
                    )}
                  </div>
                  <span className="text-text-secondary text-sm">{r.record}</span>
                  <TrendArrow currentRank={r.rank} previousRank={r.previousRank} />
                  {r.points > 0 && <span className="text-text-muted text-xs w-12 text-right">{r.points} pts</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {othersReceivingVotes.length > 0 && (
        <div className="mt-6 p-4 bg-bg-card rounded-xl border border-acc-blue/10">
          <h3 className="text-text-muted text-xs uppercase tracking-wider mb-2">Others Receiving Votes</h3>
          <p className="text-text-secondary text-sm">
            {othersReceivingVotes.map((t, i) => (
              <span key={t.teamName}>
                {t.teamName} ({t.points})
                {i < othersReceivingVotes.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
