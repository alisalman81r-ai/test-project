import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const existing = await prisma.user.findUnique({
    where: { email: "admin@ironpeak.com" },
  });

  if (existing) {
    return NextResponse.json({ message: "Admin already exists" });
  }

  const hashed = await bcrypt.hash("Admin@1234", 12);

  const user = await prisma.user.create({
    data: {
      email: "admin@ironpeak.com",
      password: hashed,
      name: "IronPeak Admin",
      role: "admin",
    },
  });

  return NextResponse.json({
    message: "Admin user created",
    email: user.email,
    password: "Admin@1234",
  });
}
