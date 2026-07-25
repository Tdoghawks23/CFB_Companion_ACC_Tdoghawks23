import Link from "next/link";
import { ChevronRight, Flame, Tv } from "lucide-react";
import type { Game, Team } from "@/lib/types";
import TeamLogo from "@/components/shared/TeamLogo";
import { clsx } from "clsx";

interface UpcomingGamesProps {
  games: Game[];
  teamsMap: Map<string, Team>;
  week: number;
}

export default function UpcomingGames({ games, teamsMap, week }: UpcomingGamesProps) {
  const featured = games.filter((g) => g.isFeatured).slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-[family-name:var(--font-oswald)] text-lg font-semibold uppercase tracking-wide">
          Week {week} Featured Games
        </h2>
        <Link
          href="/schedule"
          className="flex items-center gap-1 text-acc-blue text-sm hover:underline"
        >
          Full Schedule <ChevronRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((game) => {
          const home = teamsMap.get(game.homeTeamId);
          const away = teamsMap.get(game.awayTeamId);
          const isFinal = game.status === "final";

          return (
            <div
              key={game.id}
              className="relative bg-bg-card rounded-xl border border-acc-blue/10 p-5 hover:bg-bg-card-hover transition-colors overflow-hidden"
            >
              {game.isRivalry && (
                <div className="absolute top-3 right-3 flex items-center gap-1 text-featured text-[10px] font-semibold bg-featured/10 px-2 py-0.5 rounded-full">
                  <Flame size={10} />
                  {game.rivalryName || "Rivalry"}
                </div>
              )}

              <div className="flex items-center justify-between gap-4">
                {/* Away team */}
                <div className="flex flex-col items-center gap-2 flex-1">
                  <TeamLogo
                    abbreviation={away?.abbreviation || game.awayTeamName.substring(0, 3).toUpperCase()}
                    primaryColor={away?.primaryColor || "#4B5563"}
                    size={48}
                  />
                  <span className="text-xs font-medium text-center leading-tight">
                    {away?.name || game.awayTeamName.split(" ").slice(0, -1).join(" ")}
                  </span>
                </div>

                {/* VS / Score */}
                <div className="flex flex-col items-center">
                  {isFinal ? (
                    <>
                      <span className="text-[10px] uppercase tracking-wider text-featured font-semibold">
                        Final
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={clsx(
                            "font-[family-name:var(--font-oswald)] text-2xl font-bold",
                            game.awayScore! < game.homeScore! && "text-text-muted"
                          )}
                        >
                          {game.awayScore}
                        </span>
                        <span className="text-text-muted">-</span>
                        <span
                          className={clsx(
                            "font-[family-name:var(--font-oswald)] text-2xl font-bold",
                            game.homeScore! < game.awayScore! && "text-text-muted"
                          )}
                        >
                          {game.homeScore}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="font-[family-name:var(--font-oswald)] text-2xl font-bold text-text-muted">
                        VS
                      </span>
                      <span className="text-[10px] text-text-muted mt-1">
                        {game.gameTime}
                      </span>
                    </>
                  )}
                </div>

                {/* Home team */}
                <div className="flex flex-col items-center gap-2 flex-1">
                  <TeamLogo
                    abbreviation={home?.abbreviation || game.homeTeamName.substring(0, 3).toUpperCase()}
                    primaryColor={home?.primaryColor || "#4B5563"}
                    size={48}
                  />
                  <span className="text-xs font-medium text-center leading-tight">
                    {home?.name || game.homeTeamName.split(" ").slice(0, -1).join(" ")}
                  </span>
                </div>
              </div>

              {!isFinal && (
                <div className="flex items-center justify-center gap-1 mt-3 text-text-muted text-[10px]">
                  <Tv size={10} />
                  {game.network}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
