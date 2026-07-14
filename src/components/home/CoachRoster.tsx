"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { TeamCoach, Team } from "@/lib/types";
import TeamLogo from "@/components/shared/TeamLogo";

interface CoachRosterProps {
  coaches: TeamCoach[];
  teamsMap: Map<string, Team>;
}

const COLLAPSED_COUNT = 6;

export default function CoachRoster({ coaches, teamsMap }: CoachRosterProps) {
  const [expanded, setExpanded] = useState(false);

  const rows = coaches
    .map((coach) => ({ coach, team: teamsMap.get(coach.teamId) }))
    .filter((r): r is { coach: TeamCoach; team: Team } => Boolean(r.team))
    .sort((a, b) => {
      const aCpu = a.coach.coachName === "CPU";
      const bCpu = b.coach.coachName === "CPU";
      if (aCpu !== bCpu) return aCpu ? 1 : -1;
      return a.team.name.localeCompare(b.team.name);
    });

  return (
    <div className="bg-bg-card rounded-xl border border-acc-blue/10 overflow-hidden mb-8">
      <div className="flex items-center justify-between px-5 py-3 border-b border-acc-blue/10">
        <h2 className="font-[family-name:var(--font-oswald)] text-lg font-semibold uppercase tracking-wide">
          Dynasty Coaches
        </h2>
      </div>
      <div className="divide-y divide-white/5 md:grid md:grid-cols-2">
        {rows.map(({ coach, team }, index) => {
          const isCpu = coach.coachName === "CPU";
          const hiddenOnMobile = !expanded && index >= COLLAPSED_COUNT;
          return (
            <div
              key={coach.teamId}
              className={`${hiddenOnMobile ? "hidden md:flex" : "flex"} items-center gap-3 px-5 py-3 hover:bg-bg-card-hover transition-colors`}
              style={{ borderLeft: `3px solid ${team.primaryColor}` }}
            >
              <TeamLogo
                abbreviation={team.abbreviation}
                primaryColor={team.primaryColor}
                size={32}
              />
              <span className="flex-1 font-medium text-sm truncate">{team.name}</span>
              <span
                className={`text-sm ${isCpu ? "text-text-muted italic" : "text-text-secondary"}`}
              >
                {coach.coachName}
              </span>
            </div>
          );
        })}
      </div>
      {rows.length > COLLAPSED_COUNT && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="md:hidden w-full flex items-center justify-center gap-1 px-5 py-3 border-t border-acc-blue/10 text-acc-blue text-sm hover:bg-bg-card-hover transition-colors"
        >
          {expanded ? (
            <>
              Show fewer <ChevronUp size={14} />
            </>
          ) : (
            <>
              Show all {rows.length} teams <ChevronDown size={14} />
            </>
          )}
        </button>
      )}
    </div>
  );
}
