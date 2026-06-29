import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { code } = await request.json();

  if (!code || typeof code !== "string") {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Discord credentials not configured" },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    grant_type: "authorization_code",
  });

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await tokenRes.json();

  if (!tokenRes.ok) {
    return NextResponse.json(
      { error: data.error || "Token exchange failed" },
      { status: tokenRes.status }
    );
  }

  return NextResponse.json({ access_token: data.access_token });
}
