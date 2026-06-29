import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";

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
        <Providers>
          <Navbar />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
