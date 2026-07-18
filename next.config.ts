import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Allow Discord to embed the app in its Activity iframe. Only
        // `frame-ancestors` is set (not a full CSP) so asset/script loading
        // is unaffected. Vercel sets no X-Frame-Options by default.
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://discord.com https://discordsays.com https://*.discordsays.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
