import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { code: string } }) {
  try {
    const { code } = params;
    const link = await prisma.link.findUnique({
      where: {
        code: code,
      },
    });

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json(link);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE({ params }: { params: { code: string } }) {
  try {
    const { code } = params;

    const link = await prisma.link.findUnique({
      where: {
        code: code,
      },
    });

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    await prisma.link.delete({
      where: { code },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
