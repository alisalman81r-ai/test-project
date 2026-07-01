import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await prisma.submission.findMany({
    orderBy: { submittedAt: "desc" },
  });

  return NextResponse.json(submissions);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const submission = await prisma.submission.create({
    data: {
      source: body.source ?? "contact",
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      projectType: body.projectType ?? null,
      message: body.message ?? null,
    },
  });

  return NextResponse.json(submission, { status: 201 });
}
