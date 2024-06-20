import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

function formatGoogleDriveLink(driveLink: string): string {
  const match = driveLink.match(/\/d\/([^/]+)\//);
  if (!match || match.length < 2) {
    throw new Error("Invalid Google Drive link format");
  }
  const fileId = match[1];
  return `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=0&confirm=t&uuid=922e5d7f-e567-4ada-b321-2d06282318ed&at=APZUnTWhU4-bCVorIc9v2b4ol_Ta%3A1717005919672`;
}

export async function POST(request: Request) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const formattedUrl = formatGoogleDriveLink(url);
    const asset = await mux.video.assets.create({
      input: [{ url: formattedUrl }],
      playback_policy: ["public"],
      encoding_tier: "baseline",
    });

    return NextResponse.json({ asset });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 400 },
    );
  }
}
