# Handoff: Home Dashboard Redesign (CFB Companion ACC)

## Overview
A polished redesign of the CFB Companion ACC home dashboard (`/`). It replaces the generic "season banner" hero with a **Game of the Week broadcast hero**, adds a **season stat ribbon** beneath it, and refines the existing sections (featured games, standings, Top 25, coaches, weekly post) for tighter hierarchy and spacing.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing the intended look and behavior. They are **not production code to copy directly**. The task is to **recreate this design in the existing Next.js + Tailwind codebase** (`CFB_Companion_ACC_Tdoghawks23`), reusing its established components, design tokens, and data layer. Every value below is expressed in your existing Tailwind theme tokens (see Design Tokens) so the implementation is a natural fit, not a foreign layer.

- `Home Dashboard.dc.html` — the full design prototype. Open in any browser to see the target result.
- `assets/acc-logo.svg` — the ACC logo already in your repo at `public/assets/acc-logo.svg` (no new asset needed).

## Fidelity
**High-fidelity.** Colors, typography, spacing, and layout are final and map 1:1 to your `@theme` tokens in `src/app/globals.css`. Recreate pixel-for-pixel using existing Tailwind classes (`bg-acc-navy`, `text-acc-gold`, `font-[family-name:var(--font-oswald)]`, etc.).

## Target files (what changes)
| Area | Repo file | Change |
|------|-----------|--------|
| Hero | `src/components/home/SeasonBanner.tsx` | **Replace** the banner with the Game-of-the-Week hero (or add a new `GameOfWeekHero.tsx` and swap it in `page.tsx`). |
| Stat ribbon | *new* `src/components/home/SeasonStatRibbon.tsx` | **New** component, rendered directly under the hero. |
| Featured games | `src/components/home/UpcomingGames.tsx` | The top featured game is now promoted into the hero; this section becomes a compact **"Also This Week"** 2-up row + a "+N More" CTA card. |
| Standings | `src/components/home/QuickStandings.tsx` | Add an "ACC" gold eyebrow + Overall/Conf two-column record. Structure unchanged. |
| Top 25 | `src/components/home/QuickRankings.tsx` | Add a "Dynasty Poll" gold eyebrow; highlight the top ACC team's row with a gold left-border + gradient. |
| Weekly post | `src/components/home/RecentPost.tsx` | Spacing refinements only. |
| Page order | `src/app/page.tsx` | New order: Hero → StatRibbon → AlsoThisWeek → (Standings + Rankings grid) → CoachRoster → RecentPost. |

## Layout (page shell)
Unchanged container: `max-w-7xl mx-auto px-4 md:px-6`. The hero and stat ribbon are **full-bleed** (break out of the container to screen width, gradient edge-to-edge) with their inner content constrained back to `max-w-7xl`. Everything below stays inside the container. Vertical rhythm between sections: `mb-8` / `gap-6` (your existing scale).

## Components

### 1. Game of the Week Hero (replaces SeasonBanner)
- **Container:** full-bleed, `overflow-hidden`. Background gradient (see tokens) angled 115°: acc-navy → deep navy → deep maroon, representing the two teams' colors. Radial white highlight overlay at top-center (`rgba(255,255,255,0.08)`, ~8% opacity).
- **Inner:** constrained to `max-w-7xl mx-auto px-4 md:px-6`, padding ~`py-8`.
- **Header row** (flex, space-between):
  - Left: gold eyebrow `GAME OF THE WEEK · ACC CONFERENCE` — Oswald, 12px, `tracking-[0.22em]`, uppercase, `text-acc-gold`, weight 600. Sub-line below: `Saturday · Wallace Wade Stadium, Durham` — Oswald 14px, `text-white/70`.
  - Right: status pill `Upcoming` — Oswald 12px, `tracking-[0.12em]` uppercase, weight 700, `bg-featured/90` (`#F59E0B` @ 90%), `text-bg-primary`, `px-3 py-1 rounded-md`.
- **Matchup row** (flex, centered, `gap-12`):
  - Away block (right-aligned, flex-1): record eyebrow `AWAY · 1-2` (Oswald 12px, `text-white/65`, tracking-wide uppercase), team name `NC State` (Oswald 32px, weight 700, white), nickname `Wolfpack` (13px, `text-white/60`). Then a **76×76 rounded-2xl logo tile** (`bg` = team primary color, white Oswald 22px abbreviation `NCST`, shadow `0 12px 30px -8px rgba(0,0,0,0.6)`).
  - Center: `VS` — Oswald 26px, weight 600, `text-white/50`, `tracking-[0.1em]`.
  - Home block (mirrored, left-aligned): 76×76 tile first (`DUKE`, `#003087`), then `HOME · 3-0`, `Duke`, `Blue Devils`.
- **Data source:** the featured game with the highest priority from `schedule.games` (currently the first `isFeatured` game). Team colors/abbreviations come from `teamsMap` exactly as `UpcomingGames` already resolves them. Venue string: add to the game data or fall back to home team's stadium.

### 2. Season Stat Ribbon (new)
- **Container:** full-bleed `bg-acc-navy`, `border-b border-acc-blue/15`. Inner constrained to `max-w-7xl`.
- **Grid:** `grid-cols-[repeat(auto-fit,minmax(230px,1fr))]`, each cell `px-6 py-4`, `border-r border-acc-blue/12` (last cell no border).
- **Each cell:** label (11px, `tracking-[0.14em]` uppercase, `text-text-secondary`, `mb-1.5`) + value row (baseline flex, `gap-2`): big stat (Oswald 24px, weight 700) + accent figure (Oswald 16px weight 700, colored).
- **The four cells (current data):**
  1. ACC Top Ranked — `Wake Forest` + `#9` (`text-acc-gold`)
  2. Ranked ACC Teams — `3` + `of 15` (muted)
  3. Top Scoring Offense — `Duke` + `130 PF` (`text-win`)
  4. Stingiest Defense — `Clemson` + `7 PA` (`text-acc-blue`)
- **Data:** derive from `standings`/`rankings` (top ACC in poll = highest-ranked team whose conference is ACC; ranked count = ACC teams present in `rankings`; offense/defense = max PF / min PA across `standings.teams`).

### 3. Also This Week (restyled UpcomingGames)
Since the marquee game is now the hero, this section shows the **remaining** featured games as compact horizontal cards.
- Header: `Also This Week` — Oswald 15px, weight 600, `tracking-[0.14em]` uppercase, `text-text-secondary`; right-aligned `Full Schedule ›` link (`text-acc-blue`).
- Grid: `grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4`.
- **Game card:** `bg-bg-card border border-acc-blue/12 rounded-2xl px-5 py-4`, flex row: away (40×40 logo tile + name, Oswald 17px weight 600) · `@` separator (`text-text-muted`) · home (mirrored, right-aligned).
- **CTA card:** `+5 More This Week ›` — same footprint, `border-dashed border-acc-blue/25`, centered Oswald 14px uppercase `text-acc-blue`. The `5` is `featured.length − (cards shown) − 1(hero)` computed from schedule.

### 4. Quick Standings (refined)
Existing component + these additions:
- Header gets a gold eyebrow `ACC` above the title (Oswald 10px, `tracking-[0.18em]` uppercase, `text-acc-gold` weight 600, `mb-0.5`).
- Add a thin column header row (9px, `tracking-[0.12em]` uppercase, `text-text-muted`): blank · blank · flex · `Overall` (w-9 right) · `Conf` (w-14 right).
- Each row shows **both** records: Overall (Oswald 15px weight 700, w-9 right) and Conf (11px `text-text-muted`, w-14 right). Rank badge is a 22px circle (`bg-white/5`, Oswald 12px). Team tile 32px. Left border = `team.primaryColor` (already present).

### 5. Top 25 (refined)
Existing component + these additions:
- Gold eyebrow `Dynasty Poll` above the `Top 25` title.
- Each row: rank (Oswald 14px weight 700, `text-text-muted`, w-6 right) · name (13.5px) · record (11px muted) · **trend** (w-7 right): `▲ N` in `text-win`, `▼ N` in `text-loss`, `—` in `text-text-muted`. This uses your existing `TrendArrow` logic/colors.
- **Highlight the top-ranked ACC team's row:** `border-l-[3px] border-acc-gold`, background `linear-gradient(90deg, rgba(201,151,0,0.12), transparent)`, rank number in `text-acc-gold`, and a small 26px team tile inline before the name.

### 6. Coach Roster & Recent Post
Structure unchanged from current components. Coaches remain a 2-col grid with `border-left: team.primaryColor`, 30px tiles, coach first name right-aligned (`CPU` italic `text-text-muted` for unmanaged teams). Recent post: gold `Week N` pill, date, Oswald title, subtitle, `line-clamp-3` body — spacing per prototype.

## Interactions & Behavior
- All section header links (`Full Schedule ›`, `Full ›`, `Read Full Post ›`) navigate via `next/link` to their existing routes (`/schedule`, `/standings`, `/top-25`, `/weekly-post`).
- Cards keep the existing `hover:bg-bg-card-hover transition-colors` treatment.
- The hero is static (no autoplay); the `Upcoming`/`Final` pill follows `game.status` exactly like `UpcomingGames` does today.
- Fully responsive: on `< md`, the hero matchup stacks (away → VS → home) and the stat ribbon `auto-fit` collapses to fewer columns. Nav collapses per your existing Navbar behavior.

## State Management
No new client state. All data is fetched server-side in `page.tsx` via the existing `getSeasonMeta / getStandings / getRankings / getSchedule / getWeeklyPost / getTeamsMap / getCoaches` — the new hero and ribbon are derived from data already loaded. The prototype exposes two optional layout flags (`showRibbon`, `showAlsoThisWeek`) — implement as simple props/feature flags only if useful; both default on.

## Design Tokens
All map to existing `@theme` tokens in `src/app/globals.css` — **use the token names, not raw hex.**
- Colors: `acc-navy #13294B`, `acc-blue #4B9CD3`, `acc-gold #C99700`, `bg-primary #0A0E1A`, `bg-card #111827`, `bg-card-hover #1F2937`, `bg-elevated #1E293B`, `text-primary #F9FAFB`, `text-secondary #9CA3AF`, `text-muted #6B7280`, `win #22C55E`, `loss #EF4444`, `featured #F59E0B`.
- Hero gradient: `linear-gradient(115deg, #003087 0%, #13294B 46%, #7a0d0d 100%)` — team-colored (away primary → navy → home-region maroon). Consider deriving the two end stops from `away.primaryColor` / `home.primaryColor` at runtime.
- Fonts: display `var(--font-oswald)` (Oswald), body `var(--font-body)` (Inter).
- Radii: tiles `rounded-2xl` (18px) hero logos, `rounded-xl`/`rounded-2xl` (14–16px) cards, `rounded-full` rank circles & pills.
- Shadow (hero logo tiles): `0 12px 30px -8px rgba(0,0,0,0.6)`.

## Assets
- `assets/acc-logo.svg` — already in repo at `public/assets/acc-logo.svg`. No new assets. Team logos are the existing `TeamLogo` component (colored abbreviation tiles), not image files.

## Files in this bundle
- `Home Dashboard.dc.html` — the high-fidelity design prototype (open in a browser).
- `assets/acc-logo.svg` — reference copy of the logo.
- `README.md` — this document.
