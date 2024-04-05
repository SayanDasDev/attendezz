"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navbarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import React from "react";
import { Button } from "../ui/button";
import { Bell, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/providers/UserProvider";
import { getShortName } from "@/lib/utils";

const HamburgerMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const user = useUser();
  const authuser = user?.user;

  return (
    <SheetContent className="bg-amber-50 flex flex-col justify-between">
      <div className="pt-8">
        {navbarLinks.map((link) => {
          const isActive =
            link.route === "/"
              ? pathname === link.route
              : pathname.startsWith(link.route);
          if (!link.mobileOnly) {
            return (
              <Link
                key={link.label}
                href={link.route}
                className={`
                ${isActive && `bg-muted/40`}
                flex flex-row gap-3 text-base text-primary justify-start px-4 items-center  py-3 mx-auto w-full  rounded-lg font-bold hover:bg-muted/10 hover:text-primary hover:filter-none
              `}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={20}
                  height={20}
                />
                <div className="pt-[0.15rem]">{link.label}</div>
              </Link>
            );
          }
        })}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex">
          <Link className="flex flex-grow gap-2 items-center" href={`/profile`}>
            <Avatar>
              <AvatarImage src={authuser?.avatar} />
              <AvatarFallback>
              {authuser &&
                getShortName(authuser?.user.firstname, authuser?.user.lastname)}
            </AvatarFallback>
            </Avatar>
            <div className="flex-col items-start ">
              <div className="text-sm font-bold">{`${authuser?.user.firstname} ${authuser?.user.lastname}`}</div>
              <div className="text-xs text-accent-foreground/80">{authuser?.user.uname}</div>
            </div>
          </Link>
          <Button
            variant={`link`}
            className="text-accent-foreground/90 ml-auto"
          >
            <Bell size={18} />
          </Button>
        </div>
        <Button variant={`ghost`} className="gap-3" onClick={() => logout(router)}>
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </SheetContent>
  );
};

export default HamburgerMenu;
