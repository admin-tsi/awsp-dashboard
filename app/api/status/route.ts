import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const assetId = searchParams.get("assetId");

  if (!assetId) {
    return NextResponse.json(
      { error: "Asset ID is required" },
      { status: 400 },
    );
  }

  try {
    const asset = await mux.video.assets.retrieve(assetId);
    return NextResponse.json({ asset });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
