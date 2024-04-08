"use client";

import { Button } from "@/components/ui/button";
import { TUser } from "@/types/auth";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: "roll",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-accent-foreground base-semibold"
        >
          Roll
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-4 base-regular select-none">
        {/* {row.getValue("roll")} */}111
      </div>
    ),
  },
  {
    accessorKey: "id",
    enableHiding: true,
  },
  {
    accessorKey: "firstname",
    enableHiding: true,
  },
  {
    accessorKey: "lastname",
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="text-accent-foreground base-semibold">
        Student &nbsp;<span className="hidden md:inline-block">Name</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="base-medium flex flex-col truncate py-3">
        <div className="text-accent-foreground leading-none text-lg font-bold">
        {row.getValue("firstname")}&nbsp;{row.getValue("lastname")}
        </div>
      </div>
    ),
  },
];
