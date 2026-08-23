import Link from "next/link";
import type { TeamStanding, Team } from "@/lib/types";
import TeamLogo from "@/components/shared/TeamLogo";

interface QuickStandingsProps {
  standings: TeamStanding[];
  teamsMap: Map<string, Team>;
}

export default function QuickStandings({ standings, teamsMap }: QuickStandingsProps) {
  const top5 = standings.slice(0, 5);

  return (
    <div className="bg-bg-card rounded-2xl border border-acc-blue/12 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-acc-blue/10">
        <div>
          <div className="font-[family-name:var(--font-oswald)] text-[10px] tracking-[0.18em] uppercase text-acc-gold font-semibold mb-0.5">
            ACC
          </div>
          <h2 className="font-[family-name:var(--font-oswald)] text-[17px] font-semibold uppercase tracking-[0.04em]">
            Conference Standings
          </h2>
        </div>
        <Link href="/standings" className="text-acc-blue text-[13px] hover:underline">
          Full ›
        </Link>
      </div>

      {/* Column header */}
      <div className="flex items-center gap-3.5 px-5 pt-2.5 pb-1.5 text-[9px] tracking-[0.12em] uppercase text-text-muted">
        <span className="w-[22px]" />
        <span className="w-8" />
        <span className="flex-1" />
        <span className="w-9 text-right">Overall</span>
        <span className="w-14 text-right">Conf</span>
      </div>

      <div>
        {top5.map((s) => {
          const team = teamsMap.get(s.teamId);
          if (!team) return null;
          return (
            <div
              key={s.teamId}
              className="flex items-center gap-3.5 min-h-12 px-5 py-3 border-t border-white/5 hover:bg-bg-card-hover active:bg-bg-card-hover transition-colors"
              style={{ borderLeft: `3px solid ${team.primaryColor}` }}
            >
              <span className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-white/5 font-[family-name:var(--font-oswald)] text-[12px] font-semibold text-text-secondary shrink-0">
                {s.conferenceRank}
              </span>
              <TeamLogo
                abbreviation={team.abbreviation}
                primaryColor={team.primaryColor}
                size={32}
              />
              <span className="flex-1 min-w-0 font-medium text-sm truncate">{team.name}</span>
              <span className="font-[family-name:var(--font-oswald)] text-[15px] font-bold w-9 text-right">
                {s.overallWins}-{s.overallLosses}
              </span>
              <span className="text-[11px] text-text-muted w-14 text-right">
                {s.conferenceWins}-{s.conferenceLosses}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
