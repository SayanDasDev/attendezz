"use client";

import { navbarLinks } from "@/constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <section className="h-full select-none bg-accent-foreground px-3 pt-2 md:pt-8 flex flex-col justify-between pb-4">
      <div className="grid grid-cols-1 gap-4">
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
                ${isActive && `text-primary bg-muted/20`}
                ${!isActive && `invert-white`}
                flex justify-center flex-col text-center text-[10px] md:flex-row md:gap-3 md:text-base md:justify-start md:px-4 md:pr-10 items-center py-3 px-3 mx-auto w-full  rounded-lg font-bold hover:bg-muted/10 hover:text-primary hover:filter-none
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
      <Button variant={`none`} className="gap-3" onClick={() => logout(router)}>
        <LogOut size={16} />
        <span className="max-md:hidden">Logout</span>
      </Button>
    </section>
  );
};

export default Sidebar;
