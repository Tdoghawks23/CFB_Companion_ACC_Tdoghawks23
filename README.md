# CFB Companion ACC

A college football companion web app for the ACC dynasty league. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Home Dashboard** — Season overview with standings snapshot, featured games, rankings preview, and latest weekly post
- **Conference Standings** — Full ACC standings table with sortable columns, team-color accents, and streak indicators
- **Top 25 Rankings** — National poll with board/list view toggle, trend arrows, and week-by-week navigation
- **Weekly Schedule** — Game cards for each week with rivalry badges, scores, and network info
- **Weekly Post** — Structured recaps with text, stats, and highlight sections plus a week archive

## Tech Stack

- **Next.js 16** (App Router) with TypeScript
- **Tailwind CSS** for styling with ACC-branded dark theme
- **Static JSON data files** — no database needed
- **Framer Motion** for animations
- **Lucide React** for icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Updating Data

All league data lives in the `/data` directory as JSON files:

| File | Purpose |
|------|---------|
| `season-meta.json` | Current season, week, and phase |
| `teams.json` | All 17 ACC team metadata (colors, names, stadiums) |
| `standings.json` | Conference standings by season |
| `rankings.json` | Top 25 poll by season and week |
| `schedule.json` | Game schedule by season and week |
| `weekly-posts.json` | Weekly recaps by season and week |

After each simulated week:
1. Update `season-meta.json` to advance the current week
2. Update `standings.json` with new records
3. Update `rankings.json` with the new poll
4. Update `schedule.json` with scores and next week's matchups
5. Write the weekly recap in `weekly-posts.json`
6. Commit and push — Vercel auto-deploys

## Deployment

Deploy to [Vercel](https://vercel.com) with zero configuration:

```bash
npx vercel
```
