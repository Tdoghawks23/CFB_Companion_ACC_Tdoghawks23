import Link from "next/link";
import { getSeasonMeta } from "@/lib/data";

/**
 * Sticky top bar: brand mark + wordmark on the left, current-week chip on
 * the right (links to the full schedule). Navigation itself lives in
 * BottomTabBar — this bar is chrome, not nav, on every breakpoint.
 */
export default async function TopBar() {
  const meta = await getSeasonMeta();

  return (
    <header
      className="sticky top-0 z-40 bg-acc-navy/95 backdrop-blur-[8px] border-b border-acc-blue/20"
      style={{ height: "var(--spacing-topbar-h)" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <img
            src="/assets/acc-logo.svg"
            alt="ACC"
            width={44}
            height={13}
            className="object-contain shrink-0"
          />
          <span className="hidden min-[380px]:inline min-w-0 font-[family-name:var(--font-oswald)] text-[16px] font-bold tracking-[0.06em] text-text-primary truncate">
            CFB COMPANION
          </span>
        </Link>

        <Link
          href="/schedule"
          className="shrink-0 font-[family-name:var(--font-oswald)] text-[11px] font-bold tracking-[0.09em] uppercase bg-acc-gold/15 border border-acc-gold/30 text-acc-gold px-2.5 py-[5px] rounded-full hover:bg-acc-gold/25 transition-colors"
        >
          WK {meta.currentWeek} · {meta.currentSeason}
        </Link>
      </div>
    </header>
  );
}
