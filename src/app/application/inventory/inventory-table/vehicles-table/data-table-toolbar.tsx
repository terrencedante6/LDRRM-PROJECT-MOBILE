"use client";
import { CiExport } from "react-icons/ci";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { statuses } from "./columns";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import AddVehicleButton from "./add-vehicle/add-vehicle-dialog";
import { toast } from "sonner";
import { useSelector } from "react-redux";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const branchesSlice = useSelector((state: any) => state.branches);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 flex-wrap gap-y-2">
        <Input
          className="w-[200px] 2xl:w-[250px] h-10 border border-slate-400 rounded-lg text-black"
          placeholder="Find Vehicle Name"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
        />
        {table.getColumn("branch") && (
          <DataTableFacetedFilter
            column={table.getColumn("branch")}
            title="Branch"
            options={branchesSlice}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3 hover:bg- hover:text-white"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex gap-4">
        {/* <Button
          className="text-xs text-black font-bold rounded-md flex gap-2 bg-white/90 hover:bg-white transition-all duration-300"
          onClick={() =>
            toast("🔔 Notification", {
              description: "Employee data exporting",
            })
          }
        >
          <CiExport />
          Export
        </Button> */}
        <AddVehicleButton />
      </div>
    </div>
  );
}
