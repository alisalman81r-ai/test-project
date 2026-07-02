"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CreditCard, HardHat } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
  { label: "Dashboard", href: "/admin",          icon: LayoutDashboard },
  { label: "Payments",  href: "/admin/payments",  icon: CreditCard },
];

export default function AppSidebar({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  const pathname = usePathname();
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      {/* Brand logo at very top */}
      <SidebarHeader className="px-4 pt-5 pb-3 border-b border-white/8">
        <Link href="/admin" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ffb274] text-[#07100f] shrink-0">
            <HardHat size={16} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-sm text-white/90 group-data-[state=collapsed]:hidden">
            Iron<span className="text-[#ffb274]">Peak</span>
          </span>
        </Link>
      </SidebarHeader>

      {/* User profile block — like the image's avatar+name section */}
      <div className="flex flex-col items-center px-4 py-6 border-b border-white/8 group-data-[state=collapsed]:hidden">
        <div className="w-16 h-16 rounded-full bg-[#ffb274]/20 border-2 border-[#ffb274]/40 flex items-center justify-center mb-3">
          <span className="text-xl font-bold text-[#ffb274]">{initials}</span>
        </div>
        <p className="text-sm font-semibold text-white/90 text-center leading-tight">{userName}</p>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-1 text-xs text-white/40 hover:text-[#ffb274] transition-colors"
        >
          Sign out
        </button>
      </div>

      {/* Navigation */}
      <SidebarContent className="pt-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className="data-[active=true]:bg-[#ffb274]/15 data-[active=true]:text-[#ffb274]"
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-white/8">
        <p className="text-[10px] text-white/25 text-center truncate group-data-[state=collapsed]:hidden">
          {userEmail}
        </p>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
