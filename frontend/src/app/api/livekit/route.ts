import { NextRequest, NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get('room');
  const username = req.nextUrl.searchParams.get('username');

  if (!room) {
    //return NextResponse.json({ error: 'Missing "room" query parameter' }, { status: 400 });
    return NextResponse.json({ errror: "there is no room" });
  } else if (!username) {
    //return NextResponse.json({ error: 'Missing "username" query parameter' }, { status: 400 });
    return NextResponse.json({ errror: "there is no username" });
  } 

  const apiKey = process.env.LIVEKIT_API_KEY;
  const secretKey = process.env.LIVEKIT_SECRET_KEY;
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !secretKey || !serverUrl) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const accessToken = new AccessToken(apiKey, secretKey, { identity: username, ttl: 3600 });
  accessToken.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

  return NextResponse.json(
    { token: await accessToken.toJwt() },
    { headers: { "Cache-Control": "no-store" } },
  );
  
}

