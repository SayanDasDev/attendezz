"use client";

import { Button } from "@/components/ui/button";
import { TCourseData } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";

export const columns: ColumnDef<TCourseData>[] = [
  {
    accessorKey: "courseId",
    header: () => {
      return <div>Course ID</div>;
    },
    cell: ({ row }) => {
      return (
          <div className="flex-grow">
            {row.getValue("courseId")}
          </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "courseName",
    header: () => {
      return <div>Course ID</div>;
    },
    cell: ({ row }) => {
      return (
          <div className="flex-grow">
            {row.getValue("courseName")}
          </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "subjectName",
    header: () => {
      return <div>Course ID</div>;
    },
    cell: ({ row }) => {
      return (
          <div className="flex-grow">
            <h2 className="text-lg font-bold text-foreground">
              {row.getValue("courseName")}
            </h2>
            <p className="text-sm text-gray-500">{row.getValue("subjectName")}</p>
          </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const classinfo = row.original;

      return (
        <div className="flex w-full justify-end">

        <Button
          variant={"outline"}
          className="px-3 py-4"
          >
          <Pencil size={16} />
        </Button>
          </div>
      );
    },
  },
];
