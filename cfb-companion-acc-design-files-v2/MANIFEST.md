# CFB Companion ACC — v2 Mobile-First Design Bundle

Round 2 of the UX/UI design files. Companion to (not a replacement of)
`../cfb-companion-acc-design-files/` — the v1 bundle is preserved untouched.
Everything in v1's Home Dashboard design carries forward; this round reworks the
app shell and every page for **Discord-on-phone as the primary platform**.

## Contents

```
prototype/
  cfb-companion-app.standalone.html   ← open this in a browser (all 5 pages, interactive)
  HANDOFF.md                          ← implementation spec (read this first)
  assets/
    acc-logo.svg
design-tokens/
  globals.css                         ← Tailwind @theme additions (source of truth)
  theme.ts                            ← same additions as TS constants
```

## What changed vs v1

| Area | v1 | v2 |
|---|---|---|
| Scope | Home Dashboard only | All five routes: Home, Standings, Top 25, Schedule, Weekly Post |
| Navigation | Horizontal top navbar (overflows on phones) | Persistent bottom tab bar; floating dock ≥1024px |
| Breakpoints | Desktop-only prototype | Mobile-first; stacked hero, 2×2 stat ribbon, single-column card grids |
| Touch | Hover-only affordances | Pressed states, ≥44px targets, safe-area padding |
| States | None specified | Skeleton loaders + empty states for every route |
| Dense data | — | Standings table w/ horizontal scroll + edge fade; week-selector pill rail on Schedule |

## How to review

1. Open `prototype/cfb-companion-app.standalone.html` in a current browser
   (needs internet once for Oswald/Inter; degrades gracefully offline).
2. Click the bottom tabs to move between pages. Deep links work too:
   `#/standings`, `#/top-25`, `#/schedule`, `#/weekly-post`.
3. On a PC, append `?frame=mobile` to see the 393px Discord-phone viewport.
4. Use the dashed pill in the top bar to cycle **Loaded → Loading → Empty** and
   review skeletons and empty states on every page. (Prototype-only control.)
5. On the Schedule page, tap through the week pills (W0–W15). W3 is the sample
   "current week" with a live game, a final, upcoming games, a Game-of-the-Week
   card, and a bye list.

## Notes

- The prototype uses CSS container queries — any 2023+ Chrome/Safari/Firefox is
  fine.
- Sample scores, records, poll positions, and article copy are internally
  consistent fiction for the 2027 season (e.g., Duke's 130 PF reconciles across
  ribbon, standings, and schedule slates). Swap freely for real data.
- Implementation values, component specs, data mapping, and repo file targets
  live in `prototype/HANDOFF.md`.
