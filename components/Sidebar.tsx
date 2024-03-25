"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";

type Props = {};

import {
  LayoutDashboard,
  UsersRound,
  Settings,
  LibraryBig,
  Megaphone,
  Radio,
  ChevronRightIcon,
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[100px] border-r px-3  pb-10 pt-24 ">
      <Nav
        /*
        isCollapsed={mobileWidth ? true : isCollapsed}
*/
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Courses",
            href: "/courses",
            icon: LibraryBig,
            variant: "ghost",
          },
          {
            title: "Announcement",
            href: "/announcement",
            icon: Megaphone,
            variant: "ghost",
          },
          {
            title: "Lives",
            href: "/lives",
            icon: Radio,
            variant: "ghost",
          },
          {
            title: "Students",
            href: "/Students",
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
