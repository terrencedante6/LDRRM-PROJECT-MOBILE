"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { allFood_suppliesDisplay } from "@/types";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const statuses = [
  {
    value: "Available",
    label: "Available",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Low Stock",
    label: "Low Stock",
    icon: CircleIcon,
  },
  {
    value: "Unavailable",
    label: "Unavailable",
    icon: CheckCircledIcon,
  },
];

export const initialState = () => {
  const columns: ColumnDef<allFood_suppliesDisplay>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-primary data-[state=open]:text-white hover:bg-slate-50/40"
              >
                <span>Name</span>
                {column.getIsSorted() === "desc" ? (
                  <ArrowDownIcon className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === "asc" ? (
                  <ArrowUpIcon className="ml-2 h-4 w-4" />
                ) : (
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-white shadow-2xl border-darkGray border-none"
            >
              <DropdownMenuItem
                onClick={() => column.toggleSorting(false)}
                className="hover:bg-primary  text-black group"
              >
                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className="hover:bg-primary text-black group"
              >
                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Desc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex place-items-center gap-2">
            <Avatar className="w-10 h-10 cursor-pointer z-0 rounded-md">
              <AvatarImage
                src={row.original.image_url}
                // alt={row.original.barcode}
              />
              <AvatarFallback className="bg-slate-500 rounded-md text-white">
                {row.original.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p className="max-w-[190px] 2xl:max-w-[220px] truncate font-semibold">
                {row.original.name}
              </p>
              <p className="max-w-[190px] 2xl:max-w-[220px] truncate font-semibold text-slate-500 ">
                {/* {`barcode: ${row.original.barcode}`} */}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "stock_quantity",
      accessorKey: "stock_quantity",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-primary data-[state=open]:text-white hover:bg-slate-50/40"
              >
                <span>Quantity</span>
                {column.getIsSorted() === "desc" ? (
                  <ArrowDownIcon className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === "asc" ? (
                  <ArrowUpIcon className="ml-2 h-4 w-4" />
                ) : (
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-white shadow-2xl border-darkGray border-none"
            >
              <DropdownMenuItem
                onClick={() => column.toggleSorting(false)}
                className="hover:bg-primary  text-black group"
              >
                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className="hover:bg-primary text-black group"
              >
                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Desc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        return (
          <p className="max-w-[200px] 2xl:max-w-[450px] truncate">
            {row.getValue("description")}
          </p>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-primary data-[state=open]:text-white hover:bg-slate-50/40"
              >
                <span>Status</span>
                {column.getIsSorted() === "desc" ? (
                  <ArrowDownIcon className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === "asc" ? (
                  <ArrowUpIcon className="ml-2 h-4 w-4" />
                ) : (
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-white shadow-2xl border-darkGray border-none"
            >
              <DropdownMenuItem
                onClick={() => column.toggleSorting(false)}
                className="hover:bg-primary  text-black group"
              >
                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className="hover:bg-primary text-black group"
              >
                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Desc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },

      cell: ({ row }) => {
        const item = statuses.find(
          (item) => item.value === row.getValue("status")
        );

        if (!item) {
          return null;
        }
        if (item.value === "Available") {
          return (
            <p
              className={
                "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-white bg-green-600 px-2 py-1 rounded-3xl border border-green-600"
              }
            >
              {item.value}
            </p>
          );
        } else if (item.value === "Low Stock") {
          return (
            <p
              className={
                "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-white bg-yellow-600 px-2 py-1 rounded-3xl border border-yellow-600"
              }
            >
              {item.value}
            </p>
          );
        } else {
          return (
            <p
              className={
                "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-white bg-red-600 px-2 py-1 rounded-3xl border border-red-600"
              }
            >
              {item.value}
            </p>
          );
        }
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <Link
            className="w-fit py-2 flex place-items-center justify-center text-slate-400 rounded-full px-4  hover:text-black hover:border- transition-all duration-300 primary-glow"
            href={`/application/inventory/food-supply/${id}`}
          >
            View
          </Link>
        );
      },
    },
    {
      id: "barcode",
      accessorKey: "barcode",
    },
  ];
  return columns;
};
