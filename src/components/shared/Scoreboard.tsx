import { clsx } from "clsx";

interface ScoreboardProps {
  homeScore: number;
  awayScore: number;
  homeTeamName: string;
  awayTeamName: string;
}

export default function Scoreboard({ homeScore, awayScore, homeTeamName, awayTeamName }: ScoreboardProps) {
  const homeWon = homeScore > awayScore;
  return (
    <div className="text-center">
      <div className="text-[10px] uppercase tracking-wider text-featured font-semibold mb-1">
        Final
      </div>
      <div className="flex items-center justify-center gap-3">
        <span className={clsx("font-[family-name:var(--font-oswald)] text-lg", !homeWon && "text-text-muted")}>
          {awayScore}
        </span>
        <span className="text-text-muted text-xs">-</span>
        <span className={clsx("font-[family-name:var(--font-oswald)] text-lg", homeWon ? "" : "text-text-muted")}>
          {homeScore}
        </span>
      </div>
      <div className="text-[10px] text-text-muted mt-0.5">
        {homeWon ? homeTeamName : awayTeamName} wins
      </div>
    </div>
  );
}
