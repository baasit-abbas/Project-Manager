"use client";

import { AppSidebar } from "@/components/App-sidebar";
import Chatbot from "@/components/Chatbot";
import LoggedIn from "@/components/LoggedIn";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AddUser from "@/components/AddUser";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
    <LoggedIn />
      <div className="flex min-h-screen w-full bg-gray-100">

        <AppSidebar />
        <AddUser />
        <main className="flex-1 flex flex-col">

          <div className="h-14 flex items-center px-4 border-b bg-white shadow-sm">
            <SidebarTrigger />
          </div>
          <Chatbot />
          <div className="flex-1 p-6 overflow-y-auto">
            {children}
          </div>

        </main>

      </div>

    </SidebarProvider>
  );
}