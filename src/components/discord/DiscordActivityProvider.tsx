"use client";

import { useEffect } from "react";
import { DISCORD_CLIENT_ID } from "@/config/discord";

/**
 * Completes the Discord Embedded App SDK handshake when the site is running
 * inside a Discord Activity (the "Play" button loads it in an iframe served
 * through <app_id>.discordsays.com).
 *
 * Discord waits for the embedded page to call `ready()`; without it the
 * activity fails to load. We only initialize the SDK when Discord is actually
 * hosting us — detected via the `frame_id` query param Discord injects —
 * because constructing the SDK outside that iframe hangs forever waiting on a
 * handshake that never arrives. Outside Discord this component is a pass-through
 * and the normal website is unaffected.
 */
export default function DiscordActivityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("frame_id")) {
      // Not embedded in Discord — render the site as a normal web app.
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const { DiscordSDK } = await import("@discord/embedded-app-sdk");
        const sdk = new DiscordSDK(DISCORD_CLIENT_ID);
        await sdk.ready();
        if (cancelled) return;
      } catch (err) {
        console.error("Discord Embedded App SDK failed to initialize:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <>{children}</>;
}
