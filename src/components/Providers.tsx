"use client";

import { DiscordProvider } from "@/contexts/DiscordContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <DiscordProvider>{children}</DiscordProvider>;
}
