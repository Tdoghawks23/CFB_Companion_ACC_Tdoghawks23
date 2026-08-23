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
        <Link
          href="/schedule"
          className="min-h-[44px] p-2 -m-2 flex items-center text-acc-blue text-[13px] hover:underline"
        >
          Full Schedule ›
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(290px,1fr))] sm:gap-4">
        {alsoGames.map((game) => {
          const away = teamsMap.get(game.awayTeamId);
          const home = teamsMap.get(game.homeTeamId);
          // Non-conference opponents are stored without a mascot ("Old Dominion",
          // "UAB"), so fall back to the stored name as-is rather than dropping
          // its last word.
          const awayName = away?.name || game.awayTeamName;
          const homeName = home?.name || game.homeTeamName;

          return (
            <div
              key={game.id}
              className="flex items-center gap-4 bg-bg-card border border-acc-blue/12 rounded-[14px] px-4 py-[14px] min-h-[56px] hover:bg-bg-card-hover active:bg-bg-card-hover active:scale-[0.985] transition-colors transition-transform"
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
                <span className="font-[family-name:var(--font-oswald)] text-[15px] font-semibold truncate min-w-0">
                  {awayName}
                </span>
              </div>

              <span className="font-[family-name:var(--font-oswald)] text-[13px] text-text-muted">
                @
              </span>

              <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-end">
                <span className="font-[family-name:var(--font-oswald)] text-[15px] font-semibold truncate text-right min-w-0">
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
            className="flex items-center justify-center gap-2 bg-bg-card border border-dashed border-acc-blue/25 rounded-[14px] px-4 py-[14px] min-h-[56px] font-[family-name:var(--font-oswald)] text-[14px] font-semibold tracking-[0.06em] uppercase text-acc-blue hover:bg-bg-card-hover active:bg-bg-card-hover active:scale-[0.985] transition-colors transition-transform"
          >
            +{moreCount} More This Week ›
          </Link>
        )}
      </div>
    </div>
  );
}
