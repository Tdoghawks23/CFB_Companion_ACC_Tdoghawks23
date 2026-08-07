import Link from "next/link";
import type { Game, Team } from "@/lib/types";
import TeamLogo from "@/components/shared/TeamLogo";

interface UpcomingGamesProps {
  games: Game[];
  teamsMap: Map<string, Team>;
}

const MAX_CARDS = 2;

export default function UpcomingGames({ games, teamsMap }: UpcomingGamesProps) {
  const featured = games.filter((g) => g.isFeatured);
  // The marquee game is promoted into the hero; show the rest here.
  const alsoGames = featured.slice(1, 1 + MAX_CARDS);
  if (alsoGames.length === 0) return null;

  // Every other game happening this week beyond the hero and the cards shown.
  const moreCount = Math.max(0, games.length - 1 - alsoGames.length);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="font-[family-name:var(--font-oswald)] text-[15px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
          Also This Week
        </h2>
        <Link href="/schedule" className="text-acc-blue text-[13px] hover:underline">
          Full Schedule ›
        </Link>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {alsoGames.map((game) => {
          const away = teamsMap.get(game.awayTeamId);
          const home = teamsMap.get(game.homeTeamId);
          const awayName =
            away?.name || game.awayTeamName.split(" ").slice(0, -1).join(" ");
          const homeName =
            home?.name || game.homeTeamName.split(" ").slice(0, -1).join(" ");

          return (
            <div
              key={game.id}
              className="flex items-center gap-4 bg-bg-card border border-acc-blue/12 rounded-2xl px-5 py-4 hover:bg-bg-card-hover transition-colors"
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <TeamLogo
                  abbreviation={
                    away?.abbreviation ||
                    game.awayTeamName.substring(0, 3).toUpperCase()
                  }
                  primaryColor={away?.primaryColor || "#4B5563"}
                  size={40}
                />
                <span className="font-[family-name:var(--font-oswald)] text-[17px] font-semibold truncate">
                  {awayName}
                </span>
              </div>

              <span className="font-[family-name:var(--font-oswald)] text-[13px] text-text-muted">
                @
              </span>

              <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-end">
                <span className="font-[family-name:var(--font-oswald)] text-[17px] font-semibold truncate text-right">
                  {homeName}
                </span>
                <TeamLogo
                  abbreviation={
                    home?.abbreviation ||
                    game.homeTeamName.substring(0, 3).toUpperCase()
                  }
                  primaryColor={home?.primaryColor || "#4B5563"}
                  size={40}
                />
              </div>
            </div>
          );
        })}

        {moreCount > 0 && (
          <Link
            href="/schedule"
            className="flex items-center justify-center gap-2 bg-bg-card border border-dashed border-acc-blue/25 rounded-2xl px-5 py-4 font-[family-name:var(--font-oswald)] text-[14px] font-semibold tracking-[0.06em] uppercase text-acc-blue hover:bg-bg-card-hover transition-colors"
          >
            +{moreCount} More This Week ›
          </Link>
        )}
      </div>
    </div>
  );
}
