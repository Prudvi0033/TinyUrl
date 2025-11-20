import { generateShortCode } from "@/app/lib/generateShortCode";
import { generateTitleFromUrl } from "@/app/lib/generateTitleFromUrl";
import { prisma } from "@/app/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const links = await prisma.link.findMany({
    where: { userId },
    orderBy: { lastClicked: "desc" },
  });

  return NextResponse.json(links);
}

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.emailAddresses[0]?.emailAddress;
    const userId = user.id;

    const { redirectUrl, code, title } = await req.json();

    const finalTitle = title?.trim() || generateTitleFromUrl(redirectUrl);

    // If user provides custom code
    if (code) {
      const exists = await prisma.link.findUnique({
        where: { code: code },
      });

      if (exists) {
        return NextResponse.json(
          { error: "Code already exists" },
          { status: 409 }
        );
      }

      const link = await prisma.link.create({
        data: {
          userId,
          title: finalTitle,
          redirectUrl,
          clicks: 0,
          code,
        },
      });

      return NextResponse.json(link);
    }

    // Auto-code generation
    const autoCode = await generateShortCode(email);

    const link = await prisma.link.create({
      data: {
        userId,
        title: finalTitle,
        redirectUrl,
        clicks: 0,
        code: autoCode,
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

