"use client";

import { useState } from "react";
import { clsx } from "clsx";
import type { TeamStanding, Team } from "@/lib/types";
import { sortStandings, type SortField, getPointDifferential, formatDifferential, getStreakType } from "@/lib/utils";
import TeamLogo from "@/components/shared/TeamLogo";
import { ArrowUpDown } from "lucide-react";

interface StandingsTableProps {
  standings: TeamStanding[];
  teamsMap: Map<string, Team>;
}

const columns: { key: SortField; label: string; shortLabel: string }[] = [
  { key: "conferenceRank", label: "Rank", shortLabel: "#" },
  { key: "overallWins", label: "Overall", shortLabel: "Ovr" },
  { key: "pointsFor", label: "PF", shortLabel: "PF" },
  { key: "pointsAgainst", label: "PA", shortLabel: "PA" },
  { key: "differential", label: "+/-", shortLabel: "+/-" },
  { key: "streak", label: "Streak", shortLabel: "Strk" },
];

export default function StandingsTable({ standings, teamsMap }: StandingsTableProps) {
  const [sortField, setSortField] = useState<SortField>("conferenceRank");

  const sorted = sortStandings(standings, sortField);

  function handleSort(field: SortField) {
    setSortField(field);
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b border-acc-blue/20 text-text-muted text-xs uppercase tracking-wider">
            <th className="text-left py-3 px-3 w-8">#</th>
            <th className="text-left py-3 px-3">Team</th>
            <th className="text-center py-3 px-2">Conf</th>
            {columns.slice(1).map((col) => (
              <th key={col.key} className="text-center py-3 px-2">
                <button
                  onClick={() => handleSort(col.key)}
                  className={clsx(
                    "inline-flex items-center gap-1 hover:text-acc-blue transition-colors",
                    sortField === col.key && "text-acc-blue"
                  )}
                >
                  <span className="hidden md:inline">{col.label}</span>
                  <span className="md:hidden">{col.shortLabel}</span>
                  <ArrowUpDown size={10} />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((s, i) => {
            const team = teamsMap.get(s.teamId);
            if (!team) return null;
            const diff = getPointDifferential(s);
            const streakType = getStreakType(s.streak);

            return (
              <tr
                key={s.teamId}
                className="border-b border-white/5 hover:bg-bg-card-hover transition-colors group"
                style={{ borderLeft: `3px solid ${team.primaryColor}` }}
              >
                <td className="py-3 px-3 text-text-muted text-sm font-medium">
                  {i + 1}
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <TeamLogo
                      abbreviation={team.abbreviation}
                      primaryColor={team.primaryColor}
                      size={32}
                    />
                    <div>
                      <span className="font-medium text-sm">{team.name}</span>
                      <span className="text-text-muted text-xs ml-2 hidden md:inline">
                        {team.mascot}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <span className="font-[family-name:var(--font-oswald)] font-semibold">
                    {s.conferenceWins}-{s.conferenceLosses}
                  </span>
                </td>
                <td className="py-3 px-2 text-center text-text-secondary text-sm">
                  {s.overallWins}-{s.overallLosses}
                </td>
                <td className="py-3 px-2 text-center text-text-secondary text-sm">
                  {s.pointsFor}
                </td>
                <td className="py-3 px-2 text-center text-text-secondary text-sm">
                  {s.pointsAgainst}
                </td>
                <td className="py-3 px-2 text-center">
                  <span
                    className={clsx(
                      "text-sm font-medium",
                      diff > 0 ? "text-win" : diff < 0 ? "text-loss" : "text-text-muted"
                    )}
                  >
                    {formatDifferential(diff)}
                  </span>
                </td>
                <td className="py-3 px-2 text-center">
                  <span
                    className={clsx(
                      "text-sm font-medium px-2 py-0.5 rounded",
                      streakType === "win"
                        ? "text-win bg-win/10"
                        : streakType === "loss"
                        ? "text-loss bg-loss/10"
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
  );
}
