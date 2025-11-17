"use client";

import { useState } from "react";
import Sidebar from "@/components/shared/Sidebar";
import MobileMenuButton from "@/components/shared/MobileMenuButton";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile Menu Button */}
      <MobileMenuButton
        onClick={() => setSidebarOpen(!sidebarOpen)}
        isOpen={sidebarOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 pl-16 pt-16 pb-6 md:pl-4 md:pt-8 md:px-6 md:py-8 max-w-7xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
