import { promises as fs } from 'fs';
import path from 'path';
import type {
  Team,
  SeasonMeta,
  SeasonStandings,
  WeekRankings,
  WeekSchedule,
  WeeklyPost,
} from './types';

const dataDir = path.join(process.cwd(), 'data');

async function readJSON<T>(filename: string): Promise<T> {
  const filePath = path.join(dataDir, filename);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export async function getSeasonMeta(): Promise<SeasonMeta> {
  return readJSON<SeasonMeta>('season-meta.json');
}

export async function getTeams(): Promise<Team[]> {
  const data = await readJSON<{ teams: Team[] }>('teams.json');
  return data.teams;
}

export async function getTeamById(teamId: string): Promise<Team | undefined> {
  const teams = await getTeams();
  return teams.find((t) => t.id === teamId);
}

export async function getTeamsMap(): Promise<Map<string, Team>> {
  const teams = await getTeams();
  return new Map(teams.map((t) => [t.id, t]));
}

export async function getStandings(season: number): Promise<SeasonStandings | null> {
  const data = await readJSON<Record<string, SeasonStandings>>('standings.json');
  return data[String(season)] ?? null;
}

export async function getRankings(season: number, week: number): Promise<WeekRankings | null> {
  const data = await readJSON<Record<string, Record<string, WeekRankings>>>('rankings.json');
  return data[String(season)]?.[String(week)] ?? null;
}

export async function getSchedule(season: number, week: number): Promise<WeekSchedule | null> {
  const data = await readJSON<Record<string, Record<string, WeekSchedule>>>('schedule.json');
  return data[String(season)]?.[String(week)] ?? null;
}

export async function getWeeklyPost(season: number, week: number): Promise<WeeklyPost | null> {
  const data = await readJSON<Record<string, Record<string, WeeklyPost>>>('weekly-posts.json');
  return data[String(season)]?.[String(week)] ?? null;
}

export async function getAvailableWeeksForPosts(season: number): Promise<number[]> {
  const data = await readJSON<Record<string, Record<string, WeeklyPost>>>('weekly-posts.json');
  const seasonData = data[String(season)];
  if (!seasonData) return [];
  return Object.keys(seasonData).map(Number).sort((a, b) => b - a);
}

export async function getAvailableWeeksForSchedule(season: number): Promise<number[]> {
  const data = await readJSON<Record<string, Record<string, WeekSchedule>>>('schedule.json');
  const seasonData = data[String(season)];
  if (!seasonData) return [];
  return Object.keys(seasonData).map(Number).sort((a, b) => a - b);
}

export async function getAvailableWeeksForRankings(season: number): Promise<number[]> {
  const data = await readJSON<Record<string, Record<string, WeekRankings>>>('rankings.json');
  const seasonData = data[String(season)];
  if (!seasonData) return [];
  return Object.keys(seasonData).map(Number).sort((a, b) => a - b);
}
