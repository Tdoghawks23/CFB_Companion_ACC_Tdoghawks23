import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { TeamStanding, Team } from "@/lib/types";
import TeamLogo from "@/components/shared/TeamLogo";

interface QuickStandingsProps {
  standings: TeamStanding[];
  teamsMap: Map<string, Team>;
}

export default function QuickStandings({ standings, teamsMap }: QuickStandingsProps) {
  const top5 = standings.slice(0, 5);

  return (
    <div className="bg-bg-card rounded-xl border border-acc-blue/10 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-acc-blue/10">
        <h2 className="font-[family-name:var(--font-oswald)] text-lg font-semibold uppercase tracking-wide">
          Conference Standings
        </h2>
        <Link
          href="/standings"
          className="flex items-center gap-1 text-acc-blue text-sm hover:underline"
        >
          Full Standings <ChevronRight size={14} />
        </Link>
      </div>
      <div className="divide-y divide-white/5">
        {top5.map((s) => {
          const team = teamsMap.get(s.teamId);
          if (!team) return null;
          return (
            <div
              key={s.teamId}
              className="flex items-center gap-3 px-5 py-3 hover:bg-bg-card-hover transition-colors"
              style={{ borderLeft: `3px solid ${team.primaryColor}` }}
            >
              <span className="text-text-muted text-sm w-5 text-right font-medium">
                {s.conferenceRank}
              </span>
              <TeamLogo
                abbreviation={team.abbreviation}
                primaryColor={team.primaryColor}
                size={32}
              />
              <span className="flex-1 font-medium text-sm">{team.name}</span>
              <span className="font-[family-name:var(--font-oswald)] text-sm text-text-secondary">
                {s.conferenceWins}-{s.conferenceLosses}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
