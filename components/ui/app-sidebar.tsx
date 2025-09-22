"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import useUploadStore from "@/store/useUploadStore";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { editedPhotos } = useUploadStore();
  return (
    <Sidebar>
      <SidebarHeader className="text-xl">Izabrana odjeca</SidebarHeader>

      <SidebarContent>
        {/* <SidebarGroup>
          <SidebarGroupContent> */}
        <SidebarMenu>
          {/* {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
          {editedPhotos &&
            editedPhotos.map((p: string) => (
              <SidebarMenuItem key={p}>
                <Image src={p} width={100} height={100} alt="Edited photo" />
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
