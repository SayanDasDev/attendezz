"use client";
import Image from "next/image";
import { Bell, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import HamburgerMenu from "./HamburgerMenu";
import { useUser } from "@/providers/UserProvider";
import { getShortName } from "@/lib/utils";

const Topbar = () => {
  const user = useUser();
  const authuser = user?.user;
  return (
    <div
      className={`w-full select-none p-2 bg-accent-foreground shadow-md pl-6 max-sm:pr-6 py-4 text-background flex justify-between items-center`}
    >
      <Image
        src={`/assets/attendezz_light.svg`}
        alt="attendezz"
        width={150}
        height={60}
      />
      <div className="gap-1 hidden sm:flex items-center">
        <Link className="flex gap-2 items-center" href={`/profile`}>
          <Avatar>
            <AvatarImage src={authuser?.avatar} alt="profilepic" />
            <AvatarFallback>
              {authuser &&
                getShortName(authuser?.user.firstname, authuser?.user.lastname)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <div className="text-sm font-bold">{`${authuser?.user.firstname} ${authuser?.user.lastname}`}</div>
            <div className="text-xs text-muted">{authuser?.user.uname}</div>
          </div>
        </Link>

        <Button variant={`link`} className="text-muted">
          <Bell size={18} />
        </Button>
      </div>
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="px-3 sm:hidden">
              <Menu size={16} />
            </Button>
          </SheetTrigger>
          <HamburgerMenu />
        </Sheet>
      </div>
    </div>
  );
};

export default Topbar;
