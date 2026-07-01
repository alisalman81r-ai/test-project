import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  const submissions = await prisma.submission.findMany({
    orderBy: { submittedAt: "desc" },
  });

  return (
    <AdminDashboard
      initialSubmissions={submissions}
      userName={session?.user?.name || "Admin"}
    />
  );
}
