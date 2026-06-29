import { clsx } from "clsx";
import type { RankedTeam, Team } from "@/lib/types";
import TeamLogo from "@/components/shared/TeamLogo";
import TrendArrow from "@/components/shared/TrendArrow";

interface RankedTeamCardProps {
  ranked: RankedTeam;
  team?: Team;
}

export default function RankedTeamCard({ ranked, team }: RankedTeamCardProps) {
  const color = team?.primaryColor || "#4B5563";

  return (
    <div
      className={clsx(
        "relative bg-bg-card rounded-xl border overflow-hidden p-4 flex flex-col items-center text-center hover:bg-bg-card-hover transition-all duration-200",
        ranked.isACC ? "border-acc-blue/30" : "border-acc-blue/10"
      )}
      style={{ borderTopColor: color, borderTopWidth: 3 }}
    >
      <span className="absolute top-2 left-3 font-[family-name:var(--font-oswald)] text-3xl font-bold text-white/10">
        {ranked.rank}
      </span>

      <div className="mb-2 mt-2">
        <TeamLogo
          abbreviation={team?.abbreviation || ranked.teamName.split(" ")[0]?.substring(0, 3).toUpperCase() || "?"}
          primaryColor={color}
          size={56}
        />
      </div>

      <h3 className={clsx("font-[family-name:var(--font-oswald)] text-sm font-semibold", ranked.isACC && "text-acc-blue")}>
        {ranked.teamName}
      </h3>

      {ranked.firstPlaceVotes > 0 && (
        <span className="text-text-muted text-[10px]">({ranked.firstPlaceVotes} first-place)</span>
      )}

      <div className="flex items-center gap-2 mt-2">
        <span className="text-text-secondary text-sm font-medium">{ranked.record}</span>
        <TrendArrow currentRank={ranked.rank} previousRank={ranked.previousRank} />
      </div>
    </div>
  );
}
