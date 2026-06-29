import type { TeamStanding } from './types';

export function getPointDifferential(standing: TeamStanding): number {
  return standing.pointsFor - standing.pointsAgainst;
}

export function formatRecord(wins: number, losses: number): string {
  return `${wins}-${losses}`;
}

export function formatDifferential(diff: number): string {
  return diff > 0 ? `+${diff}` : String(diff);
}

export function getStreakType(streak: string): 'win' | 'loss' | 'none' {
  if (streak.startsWith('W')) return 'win';
  if (streak.startsWith('L')) return 'loss';
  return 'none';
}

export function getRankMovement(current: number, previous: number | null): { direction: 'up' | 'down' | 'same' | 'new'; amount: number } {
  if (previous === null) return { direction: 'new', amount: 0 };
  if (current < previous) return { direction: 'up', amount: previous - current };
  if (current > previous) return { direction: 'down', amount: current - previous };
  return { direction: 'same', amount: 0 };
}

export type SortField = 'conferenceRank' | 'overallWins' | 'pointsFor' | 'pointsAgainst' | 'differential' | 'streak';

export function sortStandings(teams: TeamStanding[], field: SortField, ascending: boolean = true): TeamStanding[] {
  return [...teams].sort((a, b) => {
    let valA: number;
    let valB: number;

    switch (field) {
      case 'conferenceRank':
        valA = a.conferenceRank;
        valB = b.conferenceRank;
        break;
      case 'overallWins':
        valA = a.overallWins;
        valB = b.overallWins;
        ascending = false;
        break;
      case 'pointsFor':
        valA = a.pointsFor;
        valB = b.pointsFor;
        ascending = false;
        break;
      case 'pointsAgainst':
        valA = a.pointsAgainst;
        valB = b.pointsAgainst;
        break;
      case 'differential':
        valA = getPointDifferential(a);
        valB = getPointDifferential(b);
        ascending = false;
        break;
      case 'streak': {
        const streakVal = (s: string) => {
          const num = parseInt(s.slice(1)) || 0;
          return s.startsWith('W') ? num : -num;
        };
        valA = streakVal(a.streak);
        valB = streakVal(b.streak);
        ascending = false;
        break;
      }
      default:
        valA = a.conferenceRank;
        valB = b.conferenceRank;
    }

    return ascending ? valA - valB : valB - valA;
  });
}
