"use client";
import React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Badge } from "./badge";
import useUploadStore from "@/store/useUploadStore";
import { MenuIcon } from "lucide-react";

export function CustomTrigger() {
  const { badgeCount, resetBadge } = useUploadStore();
  const { toggleSidebar, state, isMobile } = useSidebar();

  // When the sidebar is expanded on desktop, shift the trigger so it doesn't sit under the sidebar.
  const leftPosition =
    !isMobile && state === "expanded"
      ? "calc(var(--sidebar-width) + 18px)"
      : "calc(env(safe-area-inset-left) + 18px)";

  return (
    <div
      className="fixed top-[calc(env(safe-area-inset-top)+32px)] z-30 w-10 h-10 transition-all duration-300 ease-linear"
      style={{ left: leftPosition }}
      data-sidebar-state={state}
    >
      <button
        onClick={() => {
          toggleSidebar();
          resetBadge();
        }}
        className="size-10 rounded-md bg-background/80 backdrop-blur-sm border flex items-center justify-center shadow-sm"
        aria-label="Open menu"
      >
        <MenuIcon className="w-5 h-5" />
      </button>
      {badgeCount > 0 && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[11px] shadow">
          {badgeCount}
        </Badge>
      )}
    </div>
  );
}
