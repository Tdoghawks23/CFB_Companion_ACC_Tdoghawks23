export interface Team {
  id: string;
  name: string;
  mascot: string;
  fullName: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  location: string;
  stadium: string;
  conference: string;
}

export interface SeasonMeta {
  currentSeason: number;
  currentWeek: number;
  seasonPhase: 'preseason' | 'regular' | 'postseason' | 'offseason';
  seasons: number[];
  totalWeeks: number;
  conferenceChampionshipWeek: number;
  bowlWeek: number;
  lastUpdated: string;
}

export interface TeamStanding {
  teamId: string;
  conferenceWins: number;
  conferenceLosses: number;
  overallWins: number;
  overallLosses: number;
  streak: string;
  pointsFor: number;
  pointsAgainst: number;
  conferenceRank: number;
}

export interface SeasonStandings {
  week: number;
  teams: TeamStanding[];
}

export interface RankedTeam {
  rank: number;
  teamId: string;
  teamName: string;
  record: string;
  previousRank: number | null;
  points: number;
  firstPlaceVotes: number;
  isACC: boolean;
}

export interface OtherReceivingVotes {
  teamName: string;
  points: number;
}

export interface WeekRankings {
  pollName: string;
  rankings: RankedTeam[];
  othersReceivingVotes: OtherReceivingVotes[];
}

export interface Game {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamName: string;
  awayTeamName: string;
  gameTime: string;
  network: string;
  location: string;
  isConferenceGame: boolean;
  isRivalry: boolean;
  rivalryName?: string;
  status: 'upcoming' | 'final';
  homeScore: number | null;
  awayScore: number | null;
  isFeatured: boolean;
}

export interface WeekSchedule {
  weekTitle: string;
  weekDate: string;
  games: Game[];
}

export interface PostSection {
  heading: string;
  content?: string;
  type: 'text' | 'stats' | 'highlight';
  stats?: PlayerStat[];
}

export interface PlayerStat {
  playerName: string;
  teamId: string;
  statLine: string;
}

export interface WeeklyPost {
  title: string;
  subtitle: string;
  author: string;
  publishDate: string;
  sections: PostSection[];
  tags: string[];
}
