"use client";
import React from "react";
import Image from "next/image";
import { UserNav } from "@/components/UserNav";
import { SearchInput } from "@/components/Search";
import Link from "next/link";
import logo from "@/public/logo.svg";
import { Button } from "@/components/ui/button";
import { Bell, Globe } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";

const Header = () => {
  const user = useCurrentUser();
  return (
    <div className="relative min-w-full border-b-[1px] px-2 sm:px-4 py-4 flex items-center">
      <div className="flex items-center mr-4">
        <Link href="/" className="block h-full w-16 mr-4">
          <Image
            src={logo}
            alt="AWSP Logo"
            layout="responsive"
            width={72}
            height={64}
          />
        </Link>
        <SearchInput className="hidden sm:block" />
      </div>
      <div className="flex items-center ml-auto">
        {/*    <Button variant="outline" size="icon" className="rounded-full mr-2">
          <Globe size={20} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full mr-2 sm:mr-4"
        >
          <Bell size={20} />
        </Button>*/}
        <div className="hidden sm:block border-r-2 border-gray-200 h-6 mx-8"></div>
        <div className="flex items-center space-x-4">
          <UserNav />
          <h6 className="hidden sm:block text-md">
            {user?.email?.split("@")[0]}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Header;
