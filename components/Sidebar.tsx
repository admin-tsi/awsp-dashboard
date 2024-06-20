"use client";
import { Nav } from "./ui/nav";
import {
  LayoutDashboard,
  UsersRound,
  Settings,
  LibraryBig,
  Megaphone,
  Radio,
} from "lucide-react";

type Props = {};

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}: Props) {
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  return (
    <div className="relative min-w-[100px] border-r px-3 pb-10 pt-24">
      <Nav
        isCollapsed={mobileWidth}
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
          /*
          { title: "Lives", href: "/lives", icon: Radio, variant: "ghost" },
*/
          {
            title: "Students",
            href: "/students",
            icon: UsersRound,
            variant: "ghost",
          },
          /*          {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            variant: "ghost",
          },*/
        ]}
      />
    </div>
  );
}
