import { Flame, Tv, Shield } from "lucide-react";
import { clsx } from "clsx";
import type { Game, Team } from "@/lib/types";
import TeamLogo from "@/components/shared/TeamLogo";

interface GameCardProps {
  game: Game;
  teamsMap: Map<string, Team>;
}

export default function GameCard({ game, teamsMap }: GameCardProps) {
  const home = teamsMap.get(game.homeTeamId);
  const away = teamsMap.get(game.awayTeamId);
  const isFinal = game.status === "final";
  const homeWon = isFinal && game.homeScore !== null && game.awayScore !== null && game.homeScore > game.awayScore;
  const awayWon = isFinal && game.homeScore !== null && game.awayScore !== null && game.awayScore > game.homeScore;

  return (
    <div className="bg-bg-card rounded-xl border border-acc-blue/10 overflow-hidden hover:bg-bg-card-hover transition-all duration-200 group">
      {/* Top badges */}
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-2">
          {game.isConferenceGame && (
            <span className="flex items-center gap-1 text-acc-blue text-[10px] font-medium bg-acc-blue/10 px-2 py-0.5 rounded-full">
              <Shield size={8} /> ACC
            </span>
          )}
          {game.isRivalry && (
            <span className="flex items-center gap-1 text-featured text-[10px] font-medium bg-featured/10 px-2 py-0.5 rounded-full">
              <Flame size={8} /> {game.rivalryName || "Rivalry"}
            </span>
          )}
        </div>
        {isFinal ? (
          <span className="text-[10px] uppercase tracking-wider text-featured font-bold">
            Final
          </span>
        ) : (
          <div className="flex items-center gap-1 text-text-muted text-[10px]">
            <Tv size={10} /> {game.network}
          </div>
        )}
      </div>

      {/* Matchup */}
      <div className="px-4 py-4">
        {/* Away team */}
        <div className={clsx("flex items-center gap-3 py-2", awayWon && "font-bold")}>
          <TeamLogo
            abbreviation={away?.abbreviation || game.awayTeamName.substring(0, 3).toUpperCase()}
            primaryColor={away?.primaryColor || "#4B5563"}
            size={36}
          />
          <span className={clsx("flex-1 text-sm", awayWon ? "text-text-primary" : isFinal ? "text-text-secondary" : "text-text-primary")}>
            {game.awayTeamName}
          </span>
          {isFinal && (
            <span className={clsx("font-[family-name:var(--font-oswald)] text-xl", awayWon ? "text-text-primary" : "text-text-muted")}>
              {game.awayScore}
            </span>
          )}
        </div>

        <div className="border-t border-white/5 my-1" />

        {/* Home team */}
        <div className={clsx("flex items-center gap-3 py-2", homeWon && "font-bold")}>
          <TeamLogo
            abbreviation={home?.abbreviation || game.homeTeamName.substring(0, 3).toUpperCase()}
            primaryColor={home?.primaryColor || "#4B5563"}
            size={36}
          />
          <span className={clsx("flex-1 text-sm", homeWon ? "text-text-primary" : isFinal ? "text-text-secondary" : "text-text-primary")}>
            {game.homeTeamName}
          </span>
          {isFinal && (
            <span className={clsx("font-[family-name:var(--font-oswald)] text-xl", homeWon ? "text-text-primary" : "text-text-muted")}>
              {game.homeScore}
            </span>
          )}
        </div>
      </div>

      {/* Bottom info */}
      {!isFinal && (
        <div className="px-4 pb-3 text-text-muted text-xs text-center">
          {game.gameTime} &middot; {game.location}
        </div>
      )}
    </div>
  );
}
