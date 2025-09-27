"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import useUploadStore from "@/store/useUploadStore";
import Image from "next/image";

export function AppSidebar() {
  const { editedPhotos, setShownPhotos, resetBadge } = useUploadStore();
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="text-xl">Izabrana odjeca</SidebarHeader>

      <SidebarContent>
        {/* <SidebarGroup>
          <SidebarGroupContent> */}
        <SidebarMenu>
          {editedPhotos &&
            editedPhotos.map((photo: { id: number; url: string }) => (
              <SidebarMenuItem key={photo.id}>
                <Image
                  src={photo.url}
                  width={100}
                  height={100}
                  style={{ paddingBottom: "20px" }}
                  alt="Edited photo"
                  onClick={() => {
                    setShownPhotos(photo.id);
                    toggleSidebar();
                    resetBadge();
                  }}
                />
                <SidebarSeparator />
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
        {/* </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
    </Sidebar>
  );
}
