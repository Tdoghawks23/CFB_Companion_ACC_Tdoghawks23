"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  Home,
  Trophy,
  Medal,
  Calendar,
  FileText,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/standings", label: "Standings", icon: Trophy },
  { href: "/rankings", label: "Top 25", icon: Medal },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/weekly-post", label: "Weekly", icon: FileText },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:block sticky top-0 z-50 bg-acc-navy/95 backdrop-blur-md border-b border-acc-blue/20">
        <div className="max-w-7xl mx-auto px-6 flex items-center h-16">
          <Link href="/" className="flex items-center gap-3 mr-10">
            <Image
              src="/assets/acc-logo.png"
              alt="ACC Logo"
              width={48}
              height={32}
              className="object-contain"
            />
            <span className="font-[family-name:var(--font-oswald)] text-xl font-bold tracking-wide text-text-primary">
              CFB COMPANION
            </span>
          </Link>
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-acc-blue bg-acc-blue/10"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-acc-blue rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-acc-navy/95 backdrop-blur-md border-t border-acc-blue/20">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors",
                  isActive
                    ? "text-acc-blue"
                    : "text-text-muted hover:text-text-secondary"
                )}
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
