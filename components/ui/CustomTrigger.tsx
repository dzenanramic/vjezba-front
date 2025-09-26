"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { Badge } from "./badge";
import useUploadStore from "@/store/useUploadStore";
import { MenuIcon } from "lucide-react";

export function CustomTrigger() {
  const { badgeCount, resetBadge } = useUploadStore();
  const { toggleSidebar } = useSidebar();

  return (
    <div
      style={{
        marginTop: "20px",
        marginLeft: "8px",
        position: "relative",
        width: "42px",
      }}
    >
      <button
        onClick={() => {
          toggleSidebar();
          resetBadge();
        }}
      >
        <MenuIcon />
      </button>
      {badgeCount > 0 && (
        <Badge className="absolute -top-3 -right-0 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[12px]">
          {badgeCount}
        </Badge>
      )}
    </div>
  );
}
