"use client";

import { clsx } from "clsx";
import type { TeamStanding, Team } from "@/lib/types";
import { getStreakType } from "@/lib/utils";
import TeamTile from "@/components/ui/TeamTile";

interface StandingsTableProps {
  standings: TeamStanding[];
  teamsMap: Map<string, Team>;
}

// Fixed sort: conference wins desc → overall wins desc → PF desc.
function sortForDisplay(teams: TeamStanding[]): TeamStanding[] {
  return [...teams].sort((a, b) => {
    if (b.conferenceWins !== a.conferenceWins) return b.conferenceWins - a.conferenceWins;
    if (b.overallWins !== a.overallWins) return b.overallWins - a.overallWins;
    return b.pointsFor - a.pointsFor;
  });
}

const headerCell =
  "text-right py-3 px-[10px] text-[9px] uppercase tracking-[0.12em] text-text-muted font-normal whitespace-nowrap";

export default function StandingsTable({ standings, teamsMap }: StandingsTableProps) {
  const sorted = sortForDisplay(standings);

  return (
    <div className="relative">
      <div className="table-scroll overflow-x-auto scrollbar-hide">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-acc-blue/20">
              <th className={clsx(headerCell, "text-left w-8")}>#</th>
              <th className={clsx(headerCell, "text-left")}>Team</th>
              <th className={headerCell}>Overall</th>
              <th className={headerCell}>Conf</th>
              <th className={headerCell}>PF</th>
              <th className={headerCell}>PA</th>
              <th className={headerCell}>Strk</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s, i) => {
              const team = teamsMap.get(s.teamId);
              if (!team) return null;
              const streakType = getStreakType(s.streak);

              return (
                <tr
                  key={s.teamId}
                  className="border-b border-white/5 hover:bg-bg-card-hover transition-colors"
                >
                  <td
                    className="py-[11px] px-[10px] text-text-muted text-sm font-medium"
                    style={{ boxShadow: `inset 3px 0 0 ${team.primaryColor}` }}
                  >
                    {i + 1}
                  </td>
                  <td className="py-[11px] px-[10px]">
                    <div className="flex items-center gap-3 min-w-[150px]">
                      <TeamTile abbreviation={team.abbreviation} primaryColor={team.primaryColor} size="sm" />
                      <span className="text-[13.5px] font-medium truncate">{team.name}</span>
                    </div>
                  </td>
                  <td className="py-[11px] px-[10px] text-right text-text-secondary text-sm whitespace-nowrap">
                    {s.overallWins}-{s.overallLosses}
                  </td>
                  <td className="py-[11px] px-[10px] text-right whitespace-nowrap">
                    <span className="font-[family-name:var(--font-oswald)] font-semibold">
                      {s.conferenceWins}-{s.conferenceLosses}
                    </span>
                  </td>
                  <td className="py-[11px] px-[10px] text-right font-[family-name:var(--font-oswald)] font-semibold text-text-secondary text-sm">
                    {s.pointsFor}
                  </td>
                  <td className="py-[11px] px-[10px] text-right font-[family-name:var(--font-oswald)] font-semibold text-text-secondary text-sm">
                    {s.pointsAgainst}
                  </td>
                  <td className="py-[11px] px-[10px] text-right">
                    <span
                      className={clsx(
                        "text-sm font-medium",
                        streakType === "win"
                          ? "text-win"
                          : streakType === "loss"
                          ? "text-loss"
                          : "text-text-muted"
                      )}
                    >
                      {s.streak}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Right-edge fade + swipe hint — dense-table affordance, phones/tablets only */}
      <div
        className="lg:hidden pointer-events-none absolute top-0 right-0 bottom-9 w-[30px]"
        style={{ background: "linear-gradient(to left, var(--color-bg-card), transparent)" }}
      />
      <div className="lg:hidden text-center text-[11px] text-text-muted py-2 border-t border-white/5">
        Swipe for more stats
      </div>
    </div>
  );
}
