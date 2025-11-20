import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ code: string }> } // TS expects Promise here
) {
  const { code } = await context.params; // await satisfies TS

  try {
    const link = await prisma.link.findUnique({ where: { code } });

    if (!link) {
      return NextResponse.json({ error: "Short link not found" }, { status: 404 });
    }

    // Update clicks and lastClicked
    await prisma.link.update({
      where: { code },
      data: {
        clicks: link.clicks + 1,
        lastClicked: new Date(),
      },
    });

    // Redirect to the actual URL
    return NextResponse.redirect(link.redirectUrl);
  } catch (error) {
    console.error("INTERNAL REDIRECT ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
