import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;

  try {
    const link = await prisma.link.findUnique({
      where: { code },
    });

    if (!link) {
      console.error("No link found for:", code);
      return NextResponse.json({ error: "Short link not found" }, { status: 404 });
    }

    await prisma.link.update({
      where: { code },
      data: {
        clicks: link.clicks + 1,
        lastClicked: new Date(),
      },
    });

    return NextResponse.redirect(link.redirectUrl);
  } catch (error) {
    console.error("INTERNAL REDIRECT ERROR:", error);
    return NextResponse.json(
      "Internal Server Error",
      { status: 500 }
    );
  }
}
