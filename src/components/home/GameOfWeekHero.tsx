import type { Game, Team, TeamStanding } from "@/lib/types";

interface GameOfWeekHeroProps {
  game: Game;
  teamsMap: Map<string, Team>;
  standings: TeamStanding[];
}

interface HeroTeamTileProps {
  abbreviation: string;
  primaryColor: string;
}

function HeroTeamTile({ abbreviation, primaryColor }: HeroTeamTileProps) {
  return (
    <div
      className="flex items-center justify-center rounded-2xl font-[family-name:var(--font-oswald)] font-bold text-white text-[19px] sm:text-[22px] shrink-0 w-16 h-16 sm:w-[76px] sm:h-[76px]"
      style={{
        backgroundColor: primaryColor,
        boxShadow: "0 12px 30px -8px rgba(0,0,0,0.6)",
      }}
    >
      {abbreviation}
    </div>
  );
}

export default function GameOfWeekHero({ game, teamsMap, standings }: GameOfWeekHeroProps) {
  const away = teamsMap.get(game.awayTeamId);
  const home = teamsMap.get(game.homeTeamId);

  const recordFor = (teamId: string) => {
    const s = standings.find((t) => t.teamId === teamId);
    return s ? `${s.overallWins}-${s.overallLosses}` : "0-0";
  };

  const awayAbbr = away?.abbreviation || game.awayTeamName.substring(0, 4).toUpperCase();
  const homeAbbr = home?.abbreviation || game.homeTeamName.substring(0, 4).toUpperCase();
  const awayColor = away?.primaryColor || "#4B5563";
  const homeColor = home?.primaryColor || "#4B5563";

  // Non-conference opponents are stored without a mascot ("Old Dominion", "UAB"),
  // so fall back to the stored name as-is rather than dropping its last word.
  const awayName = away?.name || game.awayTeamName;
  const homeName = home?.name || game.homeTeamName;

  const venueName = game.location || home?.stadium || "";
  const venueCity = home?.location?.split(",")[0]?.trim();
  const venueLine = [venueName, venueCity].filter(Boolean).join(", ");

  const isFinal = game.status === "final";
  const statusLabel = isFinal ? "Final" : "Upcoming";

  // Broadcast gradient: away primary → acc-navy → home primary, angled 115°.
  const heroGradient = `linear-gradient(115deg, ${awayColor} 0%, #13294B 46%, ${homeColor} 100%)`;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: heroGradient }}
    >
      {/* Radial white highlight overlay at top-center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 140% at 50% -10%, rgba(255,255,255,0.08), transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-[22px] sm:py-[30px]">
        {/* Header row */}
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <div className="font-[family-name:var(--font-oswald)] text-[12px] tracking-[0.22em] uppercase text-acc-gold font-semibold">
              Game of the Week · ACC Conference
            </div>
            {venueLine && (
              <div className="font-[family-name:var(--font-oswald)] text-[13px] tracking-[0.04em] text-white/70 mt-1">
                Saturday · {venueLine}
              </div>
            )}
          </div>
          <span className="font-[family-name:var(--font-oswald)] text-[11px] tracking-[0.12em] uppercase font-bold bg-featured/90 text-bg-primary px-3 py-1 rounded-md shrink-0">
            {statusLabel}
          </span>
        </div>

        {/* Matchup — stacks vertically below sm, horizontal from sm up */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-12">
          {/* Away block */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 sm:flex-1 sm:justify-end">
            <div className="text-center sm:text-right order-2 sm:order-1">
              <div className="font-[family-name:var(--font-oswald)] text-[11px] sm:text-[12px] tracking-[0.1em] uppercase text-white/65">
                Away · {recordFor(game.awayTeamId)}
              </div>
              <div className="font-[family-name:var(--font-oswald)] text-[25px] sm:text-[32px] font-bold leading-[1.05] text-white">
                {awayName}
              </div>
              <div className="text-[12px] sm:text-[13px] text-white/60">{away?.mascot}</div>
            </div>
            <div className="order-1 sm:order-2">
              <HeroTeamTile abbreviation={awayAbbr} primaryColor={awayColor} />
            </div>
          </div>

          {/* VS — hairline rules either side on mobile only */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="h-px flex-1 bg-white/15 sm:hidden" />
            <div className="font-[family-name:var(--font-oswald)] text-[19px] sm:text-[26px] font-semibold text-white/50 tracking-[0.1em] shrink-0">
              VS
            </div>
            <div className="h-px flex-1 bg-white/15 sm:hidden" />
          </div>

          {/* Home block */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 sm:flex-1 sm:justify-start">
            <HeroTeamTile abbreviation={homeAbbr} primaryColor={homeColor} />
            <div className="text-center sm:text-left">
              <div className="font-[family-name:var(--font-oswald)] text-[11px] sm:text-[12px] tracking-[0.1em] uppercase text-white/65">
                Home · {recordFor(game.homeTeamId)}
              </div>
              <div className="font-[family-name:var(--font-oswald)] text-[25px] sm:text-[32px] font-bold leading-[1.05] text-white">
                {homeName}
              </div>
              <div className="text-[12px] sm:text-[13px] text-white/60">{home?.mascot}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
