"use client";

import { ColumnDef } from "@tanstack/react-table";

import LocationDrawer from "./LocationDrawer";
import { TTodaysClassesData } from "@/types/types";

export const columns: ColumnDef<TTodaysClassesData>[] = [
  {
    accessorKey: "routineId",
    header: () => {
      return <div>Routine ID</div>;
    },
    cell: ({ row }) => {
      return (
          <div className="flex-grow">
            {row.getValue("routineId")}
          </div>
      );
    },
    enableHiding: true,
  },
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
    accessorKey: "startTime",
    header: () => {
      return <div>Course ID</div>;
    },
    cell: ({ row }) => {
      return (
          <div className="flex-grow">
            {row.getValue("startTime")}
          </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "endTime",
    header: () => {
      return <div>Course ID</div>;
    },
    cell: ({ row }) => {
      return (
          <div className="flex-grow">
            {row.getValue("endTime")}
          </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "courseName",
    header: () => (
      <div className="text-primary base-semibold">
        <span className="md:inline-block pr-1">Class</span>Name
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-lg font-medium pl-4">{row.getValue("courseName")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const classinfo = row.original;

      return (
        <LocationDrawer classinfo={classinfo} />
      );
    },
  },
];
