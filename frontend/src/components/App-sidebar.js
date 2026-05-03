"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { IoManSharp } from "react-icons/io5";
import { LuClipboardPen } from "react-icons/lu";
import { FaHome } from "react-icons/fa";

import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-white shadow-lg">

      {/* Header */}
      <SidebarHeader className="p-4 border-b">
        <h1 className="text-xl font-bold text-indigo-600 tracking-wide">
          Admin Panel
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Manage your system
        </p>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs px-2">
            MAIN
          </SidebarGroupLabel>

          <SidebarMenu>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-indigo-100 text-gray-700 transition-all duration-300"
                >
                  <FaHome size={25} /> Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/admin/member"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-indigo-100 text-gray-700 transition-all duration-300"
                >
                  <IoManSharp size={25} /> Show All Users
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href="/admin/tasks"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-indigo-100 text-gray-700 transition-all duration-300"
                >
                  <LuClipboardPen size={25} /> Show All Tasks
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t text-xs text-gray-400">
        © 2026 Admin Dashboard
      </SidebarFooter>

    </Sidebar>
  );
}