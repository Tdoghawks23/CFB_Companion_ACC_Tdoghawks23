import { Star } from "lucide-react";
import { clsx } from "clsx";
import type { Game, Team } from "@/lib/types";
import TeamTile from "@/components/ui/TeamTile";

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

  const venueName = game.location || home?.stadium || "";
  const venueCity = home?.location?.split(",")[0]?.trim();
  const venueLine = [venueName, venueCity].filter(Boolean).join(", ");

  return (
    <div
      className={clsx(
        "min-w-0 rounded-[14px] border p-[12px_14px] hover:bg-bg-card-hover transition-colors",
        game.isFeatured
          ? "border-acc-gold/40 bg-bg-card"
          : "border-acc-blue/12 bg-bg-card"
      )}
      style={
        game.isFeatured
          ? { backgroundImage: "linear-gradient(90deg, rgba(201,151,0,0.08), transparent 60%)" }
          : undefined
      }
    >
      <div className="flex items-center gap-3 min-h-[44px]">
        {/* Away */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <TeamTile
            abbreviation={away?.abbreviation || game.awayTeamName.substring(0, 3).toUpperCase()}
            primaryColor={away?.primaryColor || "#4B5563"}
            size="md"
          />
          <span
            className={clsx(
              "font-[family-name:var(--font-oswald)] text-[15px] font-semibold truncate min-w-0",
              isFinal && !awayWon && "text-text-secondary"
            )}
          >
            {game.awayTeamName}
          </span>
        </div>

        {/* Center status column */}
        <div className="min-w-[74px] flex flex-col items-center shrink-0">
          {isFinal ? (
            <>
              <span className="font-[family-name:var(--font-oswald)] text-[15px] font-bold">
                {game.awayScore}–{game.homeScore}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-featured font-bold mt-0.5">
                Final
              </span>
            </>
          ) : (
            <>
              <span className="font-[family-name:var(--font-oswald)] text-[13px] text-text-secondary text-center">
                {game.gameTime || "TBD"}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-text-muted mt-0.5">
                Upcoming
              </span>
            </>
          )}
        </div>

        {/* Home */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-end">
          <span
            className={clsx(
              "font-[family-name:var(--font-oswald)] text-[15px] font-semibold truncate text-right min-w-0",
              isFinal && !homeWon && "text-text-secondary"
            )}
          >
            {game.homeTeamName}
          </span>
          <TeamTile
            abbreviation={home?.abbreviation || game.homeTeamName.substring(0, 3).toUpperCase()}
            primaryColor={home?.primaryColor || "#4B5563"}
            size="md"
          />
        </div>
      </div>

      {(venueLine || game.isFeatured || game.network || game.isRivalry) && (
        <div className="flex items-center justify-between gap-2 border-t border-white/[0.04] pt-[9px] mt-[9px]">
          <span className="text-[11px] text-text-muted truncate min-w-0">
            {[venueLine, game.isRivalry ? (game.rivalryName || "Rivalry") : null, game.network]
              .filter(Boolean)
              .join(" · ")}
          </span>
          {game.isFeatured && (
            <span className="shrink-0 inline-flex items-center gap-1 font-[family-name:var(--font-oswald)] text-[9.5px] font-bold uppercase tracking-[0.08em] text-acc-gold">
              <Star size={10} className="fill-acc-gold" /> Game of the Week
            </span>
          )}
        </div>
      )}
    </div>
  );
}
