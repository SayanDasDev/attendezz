import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TCourseData } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Loader, Loader2, Pencil, Trash2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const AllCourses = ({
  courses,
  isLoading,
}: {
  courses: any;
  isLoading: boolean;
}) => {
  return (
    <Card className="border bg-card h-full rounded-md md:rounded-tl-none p-4 space-y-4 overflow-y-scroll no-scrollbar">
      <SectionHeading className="pb-0 md:hidden" title="Course List" />

      {isLoading ? (
        <div className="flex gap-2">
          <Loader className="animate-spin animate-duration-[2000ms]" />
          Loading...
        </div>
      ) : (
        courses &&
         <DataTable columns={columns} data={courses} />
      )}
    </Card>
  );
};

export default AllCourses;