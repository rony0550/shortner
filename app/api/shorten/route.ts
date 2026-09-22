
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateShortCode(length = 6) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return result;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = body?.url?.trim();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Please enter a valid URL" },
        { status: 400 }
      );
    }

    let shortCode = generateShortCode();

    while (
      await prisma.shortUrl.findUnique({
        where: { shortCode },
      })
    ) {
      shortCode = generateShortCode();
    }

    const shortUrl = await prisma.shortUrl.create({
      data: {
        originalUrl: url,
        shortCode,
      },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    return NextResponse.json({
      shortCode: shortUrl.shortCode,
      shortUrl: `${baseUrl}/${shortUrl.shortCode}`,
    });
  } catch (error) {
    console.error("Shorten URL error:", error);

    return NextResponse.json(
      { error: "Failed to shorten URL" },
      { status: 500 }
    );
  }
}
