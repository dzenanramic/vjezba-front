"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { Badge } from "./badge";
import useUploadStore from "@/store/useUploadStore";
import { MenuIcon } from "lucide-react";

export function CustomTrigger() {
  const { badgeCount, resetBadge } = useUploadStore();
  const { toggleSidebar } = useSidebar();

  return (
    <div className="fixed top-[calc(env(safe-area-inset-top)+32px)] left-[calc(env(safe-area-inset-left)+18px)] z-30 w-10 h-10">
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
