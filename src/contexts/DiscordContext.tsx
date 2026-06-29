"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { DiscordSDK, patchUrlMappings } from "@discord/embedded-app-sdk";

interface DiscordUser {
  id: string;
  username: string;
  avatar: string | null;
  global_name: string | null;
}

interface DiscordContextValue {
  isDiscordEmbed: boolean;
  isLoading: boolean;
  user: DiscordUser | null;
  sdk: DiscordSDK | null;
}

const DiscordContext = createContext<DiscordContextValue>({
  isDiscordEmbed: false,
  isLoading: false,
  user: null,
  sdk: null,
});

export function useDiscord() {
  return useContext(DiscordContext);
}

function isRunningInDiscord(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.has("frame_id") && params.has("instance_id");
}

export function DiscordProvider({ children }: { children: ReactNode }) {
  const [sdk, setSdk] = useState<DiscordSDK | null>(null);
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDiscordEmbed, setIsDiscordEmbed] = useState(false);

  useEffect(() => {
    if (!isRunningInDiscord()) return;

    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
    if (!clientId) {
      console.error("Missing NEXT_PUBLIC_DISCORD_CLIENT_ID");
      return;
    }

    setIsDiscordEmbed(true);
    setIsLoading(true);

    const discordSdk = new DiscordSDK(clientId);
    setSdk(discordSdk);

    async function init() {
      try {
        await discordSdk.ready();

        const { code } = await discordSdk.commands.authorize({
          client_id: clientId!,
          response_type: "code",
          scope: ["identify"],
          prompt: "none",
        });

        const tokenRes = await fetch("/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const { access_token } = await tokenRes.json();

        const auth = await discordSdk.commands.authenticate({
          access_token,
        });

        if (auth.user) {
          setUser({
            id: auth.user.id,
            username: auth.user.username,
            avatar: auth.user.avatar ?? null,
            global_name: auth.user.global_name ?? null,
          });
        }
      } catch (err) {
        console.error("Discord SDK initialization failed:", err);
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, []);

  if (isDiscordEmbed && isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary">
        <img
          src="/assets/acc-logo.svg"
          alt="ACC"
          width={80}
          height={23}
          className="object-contain mb-6 animate-pulse"
        />
        <p className="text-text-secondary text-sm">
          Connecting to Discord&hellip;
        </p>
      </div>
    );
  }

  return (
    <DiscordContext.Provider value={{ isDiscordEmbed, isLoading, user, sdk }}>
      {children}
    </DiscordContext.Provider>
  );
}
