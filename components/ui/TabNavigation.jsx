"use client";
import useTabStore from "@/store/useTabStore";
import useUploadStore from "@/store/useUploadStore";
import TabButton from "../shared/TabButton";
import { Badge } from "./badge";

function TabNavigation() {
  const { uploading, setUploading } = useTabStore();
  const { badgeCount, resetBadge } = useUploadStore();

  return (
    <div className="flex gap-2 relative">
      <TabButton
        active={uploading}
        onClick={() => setUploading(true)}
        text="Odabir"
      />

      <TabButton
        active={!uploading}
        onClick={() => {
          setUploading(false);
          resetBadge();
        }}
        text="Ormar"
      />
      {badgeCount > 0 && (
        <Badge className="absolute -top-0 -right-0 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[12px]">
          {badgeCount}
        </Badge>
      )}
    </div>
  );
}

export default TabNavigation;
