"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PresenceCheckbox } from "./PresenceCheckbox";
import Link from "next/link";
import { TLiveClassStudentsData } from "@/types/types";
import { getShortName } from "@/lib/utils";

export const columns: ColumnDef<TLiveClassStudentsData>[] = [
  {
    accessorKey: "id",
    enableHiding: true,
  },
  {
    accessorKey: "avatar",
    header: () => (
      <div className="text-primary w-fit base-semibold px-4">Avatar</div>
    ),
    cell: ({ row }) => (
      <Link href={`/students/${row.getValue("id")}`}>
        <Avatar className="h-16 w-16 my-4">
          <AvatarImage
            src={row.getValue("avatar")}
            alt={row.getValue("name")}
          />
          <AvatarFallback className="h1-bold text-foreground/60 select-none scale-150">
            {getShortName(row.getValue("firstname"), row.getValue("lastname"))}
          </AvatarFallback>
        </Avatar>
      </Link>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "firstname",
    header: () => {
      return <div>Routine ID</div>;
    },
    cell: ({ row }) => {
      return (
          <div className="flex-grow">
            {row.getValue("firstname")}
          </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "lastname",
    header: () => (
      <div className="text-primary base-semibold">
        Student &nbsp;<span className="hidden md:inline-block">Name</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex pb-2 flex-col ">
        <div className="text-sm leading-none text-muted-foreground select-none">
        {/* {row.getValue("roll")} */}111
      </div>
      <div className="text-2xl font-semibold flex flex-col truncate space-y-2">
        {row.getValue("firstname")}&nbsp;{row.getValue("lastname")}
      </div>
      </div>
    ),
  },
  {
    id: "select",
    header: ({ table }) => <div>Presence</div>,
    cell: ({ row }) => (
      <PresenceCheckbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] my-1"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
