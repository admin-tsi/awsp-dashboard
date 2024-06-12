import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function DELETE(request: Request) {
  const { playbackId } = await request.json();

  if (!playbackId) {
    return NextResponse.json(
      { error: "Playback ID is required" },
      { status: 400 },
    );
  }

  try {
    await mux.video.assets.delete(playbackId);
    return NextResponse.json({ message: "Video deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting video" },
      { status: 500 },
    );
  }
}
