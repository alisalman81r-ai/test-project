import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <SidebarProvider>
      <AppSidebar
        userName={session.user.name || "Admin"}
        userEmail={session.user.email}
      />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
