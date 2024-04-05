"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import StudentData from "@/Dummies/StudentData.json";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ClassesToolbarProps<TData> {
  table: Table<TData>;
}

export function ClassesToolbar<TData>({ table }: ClassesToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  
  const courses: { value: string }[] = Array.from(new Set(StudentData.map(student => student.course)))
  .map(course => ({ value: course }));

  return (
    <div className="flex items-center justify-between select-none">
      <div className="flex flex-1 items-center space-x-2">
      <Input
          placeholder={"Search Classes..."}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm base-regular p-5 md:px-4 md:py-3 rounded-full bg-background"
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