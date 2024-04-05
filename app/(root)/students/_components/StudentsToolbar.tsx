"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import StudentData from "@/Dummies/StudentData.json";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StudentsToolbarProps<TData> {
  table: Table<TData>;
}

export function StudentsToolbar<TData>({ table }: StudentsToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const departments: { value: string }[] = Array.from(
    new Set(StudentData.map((student) => student.department))
  ).map((department) => ({ value: department }));

  const semesters: { value: string }[] = Array.from(
    new Set(StudentData.map((student) => student.semester))
  ).map((semester) => ({ value: semester }));

  const courses: { value: string }[] = Array.from(
    new Set(StudentData.map((student) => student.course))
  ).map((course) => ({ value: course }));

  return (
    <div className="flex items-center justify-between select-none">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={"Search Names..."}
          value={(table.getColumn("firstname")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("firstname")?.setFilterValue(event.target.value)
          }
          className="max-w-sm base-regular p-5 md:px-4 md:py-3 rounded-md bg-background"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            <span className="hidden md:inline-block">Reset</span>
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
