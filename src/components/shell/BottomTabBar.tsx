"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Home, BarChart3, Star, Calendar, FileText } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/standings", label: "Standings", icon: BarChart3 },
  { href: "/rankings", label: "Top 25", icon: Star },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/weekly-post", label: "Weekly", icon: FileText },
];

/**
 * Persistent primary navigation at every breakpoint (product decision, not
 * a mobile-only pattern): a fixed bottom tab bar under `lg`, a floating
 * centered dock at `lg` and up. Replaces the old horizontal Navbar links.
 */
export default function BottomTabBar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      role="tablist"
      aria-label="Primary"
      className={clsx(
        // Mobile: fixed to the viewport bottom, full width, safe-area padded.
        "fixed bottom-0 left-0 right-0 z-40 bg-acc-navy/97 backdrop-blur-[8px] border-t border-acc-blue/20 pb-safe",
        // Desktop: floating centered pill dock; content scrolls beneath it.
        "lg:fixed lg:inset-x-0 lg:bottom-4 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:w-max lg:bg-bg-elevated/95 lg:border lg:border-acc-blue/20 lg:rounded-full lg:px-1.5 lg:py-1.5 lg:pb-1.5 lg:backdrop-blur-xl lg:shadow-[0_18px_50px_-12px_rgba(0,0,0,0.65)]"
      )}
    >
      <div
        className="flex items-center justify-around lg:justify-center lg:gap-1"
        style={{ height: "var(--spacing-tabbar-h)" }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              role="tab"
              aria-selected={active}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                "min-w-[44px] min-h-[44px] px-3",
                "lg:flex-row lg:gap-2 lg:px-[18px] lg:py-[11px] lg:rounded-full lg:h-auto",
                active
                  ? "text-acc-blue lg:bg-acc-blue/15"
                  : "text-text-muted hover:text-text-secondary active:text-text-secondary"
              )}
            >
              <Icon size={22} strokeWidth={1.8} />
              <span className="text-[10px] font-semibold lg:text-[12px] lg:font-medium">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
