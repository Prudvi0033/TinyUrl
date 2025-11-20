import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;

    const link = await prisma.link.findUnique({
      where: { code },
    });

    if (!link) {
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
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
