import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function POST(request: Request) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const asset = await mux.video.assets.create({
      input: [{ url }],
      playback_policy: ["public"],
      encoding_tier: "baseline",
    });

    return NextResponse.json({ asset });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
