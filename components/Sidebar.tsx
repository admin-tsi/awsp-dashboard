"use client";
import { useState } from "react";
import { Nav } from "./ui/nav";
import {
  LayoutDashboard,
  UsersRound,
  Settings,
  LibraryBig,
  Megaphone,
  Radio,
  ChevronRightIcon,
  ChevronRight,
} from "lucide-react";

type Props = {};

import { useWindowWidth } from "@react-hook/window-size";
import { Button } from "@/components/ui/button";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[100px] border-r px-3 pb-10 pt-24">
      {/* {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="outline"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}*/}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "ghost",
          },
          {
            title: "Courses",
            href: "/courses",
            icon: LibraryBig,
            variant: "ghost",
          },
          {
            title: "Announcement",
            href: "/announcements",
            icon: Megaphone,
            variant: "ghost",
          },
          { title: "Lives", href: "/lives", icon: Radio, variant: "ghost" },
          {
            title: "Students",
            href: "/students",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
