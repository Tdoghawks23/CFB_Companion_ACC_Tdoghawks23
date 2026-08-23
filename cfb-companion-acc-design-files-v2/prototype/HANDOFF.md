# Handoff: CFB Companion ACC — Mobile-First Redesign (v2)

## Overview

Round two of the CFB Companion ACC design. The v1 round (Home Dashboard broadcast
hero) is retained and extended, but the entire shell is reworked **mobile-first**
for the primary context: league members opening the app as a **Discord Activity
on their phones**. Every page now has a designed mobile layout, a persistent
bottom tab bar replaces the horizontal navbar, and loading/empty states are
specified for the first time.

Design principles, in priority order:

1. **Thumb-first** — navigation and primary actions live at the bottom; nothing
   important requires a hover or a precise tap.
2. **One column by default** — desktop layouts are enhancements of the phone
   layout, not the other way around.
3. **Never blank** — every data surface has a skeleton state and an empty state.
4. **Same tokens** — no new colors except skeleton placeholders. Everything maps
   to the existing `@theme` tokens in `src/app/globals.css`.

## About the design file

`cfb-companion-app.standalone.html` is a single interactive prototype containing
all five views with working navigation. Open it in a browser:

- Click the bottom tabs (or use `#/standings`, `#/top-25`, `#/schedule`,
  `#/weekly-post` deep links) to switch pages.
- Append `?frame=mobile` to preview the Discord-phone viewport (393px) on a PC.
- The dashed pill in the top bar cycles the demo state: **Loaded → Loading →
  Empty**. This is prototype chrome only — do not implement it in the app.
- It uses CSS container queries; any current Chrome/Safari/Firefox renders it
  correctly.

## Platform constraints (Discord Activity on phones)

| Constraint | Value / rule |
|---|---|
| Viewport width | ~360–430 CSS px typical phones; Activity iframe spans client width |
| Landscape | Height can drop below 400px — avoid tall sticky headers stacking |
| Safe areas | Notch/home indicator: tab bar adds `env(safe-area-inset-bottom)` via `.pb-safe`; meta viewport needs `viewport-fit=cover` |
| Hover | Does not exist on touch — every interactive element gets an `:active` pressed state instead |
| Touch targets | Minimum 44×44px for all interactive elements |
| Theme | Always dark; existing palette already matches Discord dark |
| Fonts | Oswald + Inter via `next/font`, same as v1 |

## Global shell

### Container

Unchanged: `max-w-[1180px] mx-auto px-4 md:px-6`. The v1 prototype's 44px gutters
are gone; 16/24px matches the original spec and frees ~10% width on phones.

Vertical rhythm between sections: `gap-6 md:gap-9` (26px / 36px), sections stack
in one column on all breakpoints.

### Top bar (replaces old Navbar brand area)

- Sticky top, `z-40`, `bg-acc-navy/95 backdrop-blur-[8px]`,
  `border-b border-acc-blue/20`, height **54px** (`--spacing-topbar-h`).
- Left: ACC logo (18px) + `CFB COMPANION` wordmark (Oswald 16px, tracking
  0.06em). Hide the wordmark below 380px viewport width — keep the mark.
- Right: **Week chip** — `WK 3 · 2027`, gold tint pill
  (`bg-acc-gold/15 border border-acc-gold/30 text-acc-gold`, Oswald 11px,
  tracking 0.09em), links to `/schedule`. Shows the current week from season meta.

### Bottom tab bar (new, primary navigation)

Persistent at **all** widths (per product decision). Five items, in order:
Home `/` · Standings `/standings` · Top 25 `/top-25` · Schedule `/schedule` · Weekly `/weekly-post`.

Mobile (`< lg`):

- Sticky bottom, `z-40`, `bg-acc-navy/97 backdrop-blur-[8px]`,
  `border-t border-acc-blue/20`, plus `.pb-safe`.
- Height **58px** (`--spacing-tabbar-h`) above safe-area padding.
- Each tab: flex-column, icon 22px (stroke 1.8, `stroke="currentColor"`) over a
  10px semibold label. Inactive `text-text-muted`; active `text-acc-blue`;
  pressed `text-text-secondary`.
- Icons: house (Home), bar chart (Standings), star (Top 25), calendar
  (Schedule), document lines (Weekly).

Desktop (`≥ lg`): floating centered dock —

- `sticky bottom-4 mx-auto w-max rounded-full px-1.5 py-1.5 gap-1`
- `bg-bg-elevated/95 backdrop-blur-xl border border-acc-blue/20`
- shadow `0 18px 50px -12px rgba(0,0,0,0.65)`
- Tabs become inline pills (`px-[18px] py-[11px]`, label 12px); active pill adds
  `bg-acc-blue/15`. Wrapper is `pointer-events-none`, dock itself
  `pointer-events-auto`, so page content scrolls beneath it.

Page content gets bottom padding = `58px + env(safe-area-inset-bottom) + 20px`.

Active route semantics: `aria-current="page"` + `aria-selected` on tabs
(`role="tablist"/tab"`).

### New tokens (`src/app/globals.css`)

Added to the existing `@theme inline` block (see `design-tokens/globals.css` in
this bundle):

```css
--color-bg-skeleton: #161E2C;
--color-skeleton-sheen: #232E42;
--spacing-tabbar-h: 58px;
--spacing-topbar-h: 54px;
--spacing-touch-min: 44px;
```

Plus keyframes `shimmer` (skeletons) and `pulseDot` (live status), and a
`prefers-reduced-motion` block that disables animations. `theme.ts` mirrors these
(`bgSkeleton`, `skeletonSheen`, `shell.tabbarHeight`, …).

Breakpoints used throughout this spec map to Tailwind defaults:
`sm 640`, `md 768`, `lg 1024`.

---

## Page specs

### 1. Home (`/`) — order unchanged from v1

Hero → Stat Ribbon → Also This Week → (Quick Standings + Top 25) → Coaches →
Recent Post.

#### Game of the Week hero (replaces SeasonBanner)

Full-bleed gradient `linear-gradient(115deg, {away.primaryColor} 0%, #13294B
46%, {home.primaryColor} 100%)` with the radial white highlight overlay from v1
(`radial-gradient(90% 140% at 50% -10%, rgba(255,255,255,0.08), transparent 60%)`).

- Inner: container-constrained, `py-[22px] sm:py-[30px]`.
- Header row: gold eyebrow `GAME OF THE WEEK · ACC CONFERENCE` (12px, tracking
  0.22em) + subline `Saturday · Wallace Wade Stadium, Durham` (Oswald 13px,
  white/70); right: status pill (`bg-featured/90 text-bg-primary` Oswald 11px).
- **Matchup stacks vertically on `< sm`:** away block (record eyebrow 11px
  white/65 → name Oswald 700 25px → nickname 12px white/62 → logo tile), then a
  `VS` divider row (19px white/50 with hairline rules either side), then home
  block mirrored. Tiles are **64px**, `rounded-2xl`, Oswald 700 19px abbreviation,
  team-primary background, v1 shadow `0 12px 30px -8px rgba(0,0,0,0.6)`.
- **`≥ sm`:** switches to the v1 horizontal layout — away `[text→tile]`
  right-aligned, home `[tile→text]`, `gap-[44px]`, name 32px, VS 26px, rules
  hidden.
- Data source unchanged from v1: highest-priority `isFeatured` game; records,
  colors, abbreviations from `teamsMap`.

#### Season stat ribbon

Full-bleed `bg-acc-navy border-b border-acc-blue/15`, inner constrained.

- Grid: **`grid-cols-2` base** (2×2 on phones — fixes the single tall column
  collapse), `sm:grid-cols-[repeat(auto-fit,minmax(230px,1fr))]`.
- Cells: `px-4 py-[13px]` → `sm:px-6 sm:py-[17px]`; hairline dividers
  `rgba(75,156,211,0.12)` (bottom borders on first row when 2-col; left borders
  on non-first cells when auto-fit).
- Cell: label 10px uppercase tracking 0.13em secondary; value row baseline flex:
  big Oswald **17px → sm:23px** weight 700 + accent 13px → sm:15px colored
  (gold / muted / win / blue per v1 content).

#### Also This Week (UpcomingGames)

- Header: title 14px Oswald tracking 0.14em secondary + `Full Schedule ›` link.
  Links get the tap-target treatment: `min-h-[44px] p-2 -m-2` (expands hit area
  without changing visual position).
- Grid: `grid-cols-1 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(290px,1fr))]`.
- Game cards: `rounded-[14px] border acc-blue/12 px-4 py-[14px] min-h-[56px]`,
  tiles 40px, names Oswald 600 15px truncated. Pressable:
  `active:bg-bg-card-hover active:scale-[0.985]`.
- CTA card: `+N More This Week ›` where `N = totalWeekGames − 1(hero) −
  cardsShown`. Dashed `border-acc-blue/30`, same footprint.

#### Quick standings / Top 25 duo

`grid grid-cols-1 lg:grid-cols-2 gap-6` — **single column until 1024px** (the v1
fixed two-column grid broke rows on tablets/phones).

Shared row pattern (used by standings, poll, coaches):

- `min-h-[48px] px-[14px] py-[10px] gap-[10px]` → `md:px-[22px] py-3 gap-[14px]`,
  `border-l-[3px]` in team primary color, top hairline `white/5`.
- Rank badge 22px circle `bg-white/5` Oswald 12px secondary.
- Team tile 32px `rounded-lg` Oswald 700 10px.
- Name 13.5px medium, `flex-1 truncate`.
- Overall record Oswald 700 14→15px, fixed 34→38px right column; conf record
  11px muted fixed 46→56px right column.

Top 25 card: trend column 30px right — `▲ N` win-green, `▼ N` loss-red, `—`
muted. Top-ranked ACC row keeps the v1 gold highlight: gold left border +
`linear-gradient(90deg, rgba(201,151,0,0.12), transparent)` wash, gold rank
badge tint, inline 26px team tile before the name, semibold name.

Column header strip (overall/conf labels) stays: 9px uppercase tracking 0.12em
muted.

#### Coach roster & recent post

Coaches: same row pattern without rank badge; coach first name right-aligned
13px secondary, `CPU` italic muted. Grid `grid-cols-1 sm:grid-cols-2`.
Recent post: v1 structure; body padding `p-5 md:p-[26px_28px]`; excerpt keeps
`line-clamp-3`.

---

### 2. Standings (`/standings`) — new design

- Page head: gold eyebrow `ACC CONFERENCE`, title `STANDINGS` (Oswald 21px),
  sub `2027 Season · Sorted by conference record` (12.5px muted).
- Card contains a **horizontally scrollable stats table** (this is the approved
  pattern for dense tables on phones):
  - `.table-scroll overflow-x-auto` (scrollbar hidden), min table width
    **640px**; columns: `# · Team · Overall · Conf · PF · PA · Strk`.
  - Right-edge fade: absolutely-positioned 30px gradient
    (`to left, bg-card → transparent`) + a `Swipe for more stats` hint strip
    under the table. Both hidden at `lg+`.
  - Header cells: 9px uppercase tracking 0.12em muted, right-aligned (Team col
    left, padded to align with rows).
  - Rows: `py-[11px] px-[10px]`, team cell = 32px tile + 13.5px truncated name
    (min-width 150px), PF/PA Oswald 600 secondary, streak colored W green /
    L red. Row accent: `box-shadow: inset 3px 0 0 {team.primaryColor}` on the
    first cell.
  - Sort rule: conference wins desc → overall wins desc → PF desc.
- Below the card: nothing else required. Keep the page focused.

### 3. Top 25 (`/top-25`) — new design

- Page head: eyebrow `DYNASTY POLL`, title `TOP 25`, sub `Week N · Released
  every Tuesday`.
- Full 25-row list reusing the home row pattern. Non-ACC rows show no tile and a
  transparent-badge rank number; **ACC rows** get their team-color left border +
  inline 26px tile; the top-ranked ACC team additionally gets the full gold
  highlight treatment described above.
- Footnote under the card: `First Five Out: …` italic 12.5px muted.

### 4. Schedule (`/schedule`) — new design (biggest functional upgrade)

- Page head: eyebrow `2027 SEASON`, title `SCHEDULE`, sub `All times ET ·
  Default view is the current week`.
- **Week selector:** horizontally scrollable pill rail
  (`flex gap-2 overflow-x-auto`, scrollbar hidden, `aria-label="Select week"`).
  Pills: `h-[44px] min-w-[47px] px-3 rounded-[11px] bg-bg-elevated` Oswald 600
  13px `W1…W15`. States:
  - past weeks: `opacity-55`;
  - current week (not selected): 4px gold dot pinned bottom-center;
  - selected: solid `bg-acc-gold text-acc-navy`;
  - active scroll-into-view centering on selection.
  Defaults to the app's current week (existing behavior per commissioner).
- **Day groups:** label row `THU · SEP 16 —— 1 game` (Oswald 12px tracking 0.14em
  secondary, trailing hairline, count 10.5px muted), then a `grid gap-[10px]`
  of game cards.
- **Game card:** `rounded-[14px] border acc-blue/12 p-[12px_14px]`; main row
  `min-h-[44px]`: away side (40px tile + Oswald 600 15px name) · center column
  (`min-w-[74px]`) · home side mirrored (name then tile).
  - Center column variants: **Upcoming** = kickoff time (Oswald 13px secondary)
    + `UPCOMING` tag 10px muted; **Final** = score (Oswald 700 15px, away–home
    order matching the sides) + `FINAL`; **Live** = score in win-green +
    `LIVE · Q4 8:42` with a pulsing 6px win-green dot.
  - Meta row (`border-t white/4 pt-[9px] mt-[9px]`): venue line 11px muted +
    optional `★ GAME OF THE WEEK` tag (Oswald 9.5px gold).
  - GOTW card variant: `border-acc-gold/40` + gold gradient wash like the hero.
- **Bye line** under the list: `On bye: <strong>North Carolina</strong>` 11.5px
  muted.
- Data mapping: week list + per-week games come from the existing schedule data
  layer (already week-indexed with current-week default and look-ahead).
  `game.status` drives Upcoming/Final/Live exactly as `UpcomingGames` does
  today; live clock/quarter renders when present.

### 5. Weekly post (`/weekly-post`) — new design

- Article card: body `p-5 md:p-[26px_28px]`; meta row (`WEEK N` gold pill +
  long-form date 12px muted); H1 Oswald 600 **21px → md:24px** lh 1.2; lede
  13.5→14.5px secondary; paragraphs 13.5→14px muted, lh 1.65.
- **Archive section:** heading `ARCHIVE` with trailing hairline; card of full-
  width pressable button rows (`min-h-[56px] px-4 py-[10px]`): Week pill ·
  truncated title 13.5px · date 11px muted · `›` chevron. Ends with a centered
  `START OF ARCHIVE` divider note (11px uppercase muted).

---

## Loading skeletons (new)

Shown while a view's data fetches (React `loading` flags / Suspense fallbacks).
Base class maps to a utility worth adding to globals.css:

```
.skeleton {
  background: linear-gradient(100deg, var(--color-bg-skeleton) 40%, var(--color-skeleton-sheen) 50%, var(--color-bg-skeleton) 60%);
  background-size: 200% 100%;
  animation: shimmer 1.3s linear infinite;
  border-radius: 8px;
}
```

Variants (see prototype `[data-skeleton]` blocks per view):

- Hero: eyebrow-width bar + status-pill block, then centered pair of 64px tile
  shapes with text bars.
- List/table rows: 32px tile dot + flexible bar + fixed-width record bars,
  stacked with `white/5` hairlines.
- Schedule: five 47×44px pill blocks + day-label bar + 96px game-card blocks.
- Post: pill+date row, 18px title bars at 85–95% widths, paragraph bars.

Rules: skeletons mirror the real layout's geometry (no layout shift on load);
respect `prefers-reduced-motion` (render static placeholder fills, no shimmer);
never show a spinner alone on mobile — always structural placeholders.

## Empty states (new)

Shared `EmptyState` component: centered column, 38px icon in `#3A4661`, Oswald
15px uppercase title (secondary), 12.5px muted explanation (max-w-[250px]), and
an optional 44px-min CTA link. Card-wrapped, `min-h-[230px] p-[46px_24px]`.

| Route | Trigger | Title / copy |
|---|---|---|
| `/` | Pre-season, no simulated games | "Season data warming up" / stats appear once Week 1 is simulated + `View Schedule ›` CTA |
| `/standings` | Before Week 1 results exist | "No standings yet" / publish after Week 1 |
| `/top-25` | Poll not released yet | "Poll not released" / drops Tuesdays once games are played |
| `/schedule` | Selected week has zero games | "No games scheduled" / bye week copy + `Jump to Week N ›` action that selects the next week with games |
| `/weekly-post` | No posts published | "No posts yet" / recaps land after each week |

The archive's `Start of archive` divider is a soft variant of the same system.

## Interactions & accessibility

- Pressed states replace hover everywhere: interactive surfaces get
  `active:bg-bg-card-hover active:scale-[0.985] transition` (cards/rows) — keep
  the existing hover classes too so desktop still feels alive.
- `-webkit-tap-highlight-color: transparent` globally (pressed states provide
  feedback instead).
- Focus: `:focus-visible` ring `2px solid var(--color-acc-blue)`, offset 2px.
- Touch targets ≥ 44px: nav links use the `p-2 -m-2` expansion trick; archive
  rows and game cards exceed it naturally.
- Tab bar exposes `role="tablist"` / `role="tab"` + `aria-selected` +
  `aria-current="page"`; views are labelled `<section>`s.
- Live status dot and shimmer respect `prefers-reduced-motion`.

## State management & data

No new client state beyond: active tab (URL-driven), selected schedule week
(local `useState`, initialized from the schedule data layer's current week), and
loading flags per fetch. Everything else derives server-side exactly as v1:

- Hero: featured game priority, `teamsMap` for colors/abbrevs.
- Ribbon: derivations from `getStandings` / `getRankings` unchanged.
- Standings sort: conf wins → overall wins → PF.
- Poll ACC detection: `conference === 'ACC'` for borders/tiles/highlight.
- Schedule: week-indexed games (existing), grouped by date for day headers;
  venue strings fall back to home stadium.

## Implementation targets

| Area | Repo file | Change |
|---|---|---|
| Shell | `src/app/layout.tsx` | Add `TopBar` + `BottomTabBar`, main bottom padding, `viewport-fit=cover` |
| Navigation | *new* `src/components/shell/BottomTabBar.tsx`, `src/components/shell/TopBar.tsx` | Replace horizontal `Navbar` links |
| Tokens | `src/app/globals.css` | Merge additions from `design-tokens/globals.css` (tokens, shimmer/pulse keyframes, reduced-motion) |
| Home | `src/components/home/*` | Per-component specs above (v1 targets stand: `GameOfWeekHero`, `SeasonStatRibbon`, `UpcomingGames`, `QuickStandings`, `QuickRankings`, `RecentPost`) |
| Shared | *new* `src/components/ui/TeamTile.tsx` (sizes xs 26 / sm 32 / md 40 / xl 64), `EmptyState.tsx`, skeleton components | Build once, reuse everywhere |
| Standings | `src/app/standings/page.tsx` + *new* `StandingsTable.tsx` | Scrollable table per spec |
| Top 25 | `src/app/top-25/page.tsx` + *new* `FullPoll.tsx` | 25 rows + footnote |
| Schedule | `src/app/schedule/page.tsx` + *new* `WeekSelector.tsx`, `GameCard.tsx` | Pill rail + day groups + statuses |
| Weekly post | `src/app/weekly-post/page.tsx` + *new* `PostArticle.tsx`, `PostArchive.tsx` | Reading layout + archive |

## Prototype class ↔ Tailwind mapping (quick reference)

| Prototype class | Tailwind equivalent |
|---|---|
| `.container` | `max-w-[1180px] mx-auto px-4 md:px-6` |
| `.card` | `bg-bg-card border border-acc-blue/12 rounded-2xl overflow-hidden` |
| `.l-row` | `flex items-center gap-2.5 md:gap-3.5 min-h-12 px-3.5 py-2.5 md:px-[22px] border-l-[3px] border-t border-white/5` |
| `.tile-{xs,sm,md,xl}` | size/color utilities per spec (`w-8 h-8 rounded-lg` etc.) |
| `.pill-status` | `bg-featured/90 text-bg-primary font-display text-[11px] font-bold tracking-[0.12em] uppercase px-[11px] py-1 rounded-md` |
| `.pill-week` | `bg-acc-gold/15 text-acc-gold font-display text-[10px] font-bold tracking-[0.08em] uppercase px-2.5 py-[3px] rounded-full` |
| `.rank-badge` | `w-[22px] h-[22px] rounded-full bg-white/5 font-display text-xs font-semibold text-text-secondary flex items-center justify-center` |
| `.hl-gold` | `bg-[linear-gradient(90deg,rgba(201,151,0,0.12),transparent)] !border-l-acc-gold` |
| `.week-pill` | `h-11 min-w-[47px] px-3 rounded-[11px] bg-bg-elevated font-display text-[13px] font-semibold` (+state classes) |
| `.sk` / `.skeleton` | utility added to globals.css (above) |

## Fidelity

High-fidelity for layout, spacing, type scale, and behavior. Sample scores,
records, and article copy in the prototype are internally consistent fiction for
the 2027 dynasty season — swap freely for real data. The demo-state toggle and
`?frame=mobile` bezel are prototype-only affordances and must not ship.
