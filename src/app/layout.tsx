import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/shell/TopBar";
import BottomTabBar from "@/components/shell/BottomTabBar";
import Footer from "@/components/layout/Footer";
import DiscordActivityProvider from "@/components/discord/DiscordActivityProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0E1A",
};

export const metadata: Metadata = {
  title: "CFB Companion ACC",
  description:
    "College Football Companion App for the ACC Dynasty League — standings, rankings, schedules, and weekly recaps.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CFB Companion",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary font-[family-name:var(--font-inter)]">
        <DiscordActivityProvider>
          <TopBar />
          {/* Bottom padding clears the fixed mobile tab bar (+ safe area);
              at lg+ the tab bar becomes a floating dock content scrolls
              beneath, so padding drops back to the normal page rhythm. */}
          <main className="flex-1 pb-[calc(var(--spacing-tabbar-h)+env(safe-area-inset-bottom,0px)+20px)] lg:pb-10">
            {children}
          </main>
          <Footer />
          <BottomTabBar />
        </DiscordActivityProvider>
      </body>
    </html>
  );
}
