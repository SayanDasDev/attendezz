"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { PresenceCheckbox } from "./PresenceCheckbox";
import { Separator } from "@/components/ui/separator";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    firstname: false,
    id: false,
  });

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <div className="flex flex-grow items-center space-x-2">
          <Input
            placeholder={"Search Students..."}
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm h-12 base-regular p-5 md:px-4 md:py-3 rounded-md bg-background"
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
        <PresenceCheckbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      </div>

      <div className="rounded-md">
        <Table className="border-separate border-spacing-y-4 p-1">
          <TableHeader className="hidden">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="grid gap-4 max-sm:grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="px-3 data-[state=selected]:bg-success/10 data-[state=selected]:outline-1 data-[state=selected]:outline data-[state=selected]:outline-success/50 !border bg-card hover:bg-muted drop-shadow-sm rounded-lg flex items-center"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="p-0 first:mr-2 [&:nth-child(3)]:truncate last:ml-auto"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="col-span-3 flex justify-center">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 flex items-center justify-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Separator />
      <div className="flex px-4 items-center">
        <div className="flex-grow text-base text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} out of{" "}
          {table.getCoreRowModel().rows.length} student(s) present.
        </div>
        <Button className="h-12 text-base">Submit</Button>
      </div>
    </div>
  );
}
