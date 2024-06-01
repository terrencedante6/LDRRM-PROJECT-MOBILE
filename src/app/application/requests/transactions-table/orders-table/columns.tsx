"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ColumnDef } from "@tanstack/react-table";
import {
  CircleIcon,
  QuestionMarkCircledIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { FaEye } from "react-icons/fa";
import { allPurchaseRequestsDisplay } from "@/types";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

export const statuses = [
  {
    value: "Completed",
    label: "Completed",
    icon: CircleIcon,
  },
  {
    value: "Ongoing",
    label: "Ongoing",
    icon: CircleIcon,
  },
  {
    value: "Undetermined",
    label: "Undetermined",
    icon: CircleIcon,
  },
];

export const initialState = (branches: any) => {
  const columns: ColumnDef<allPurchaseRequestsDisplay>[] = [
    {
      id: "id",
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-black hover:bg-slate-50/70 hover:text-black"
              >
                <span>Request ID</span>
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
                className="hover:bg-applicationPrimary  text-black group"
              >
                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-black" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className="hover:bg-applicationPrimary text-black group"
              >
                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-black" />
                Desc
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex place-items-center gap-2">
            <div className="flex flex-col">
              <p className="max-w-[190px] 2xl:max-w-[220px] truncate font-semibold">
                {row.original.id}
              </p>
              <p className="max-w-[181px] truncate text-slate-500">
                {format(row.original.created_at, "PPPP")}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "requester_first_name",
      accessorKey: "requester_first_name",
      header: "Requester",
      cell: ({ row }) => {
        return (
          <p className="max-w-[110px] 2xl:max-w-[220px] truncate">
            {row.original.requester_first_name}{" "}
            {row.original.requester_last_name}
          </p>
        );
      },
    },
    {
      accessorKey: "employees",
      header: "Processed By",
      cell: ({ row }) => {
        return (
          <div className="flex place-items-center gap-2">
            <Avatar className="w-10 h-10 cursor-pointer z-0 rounded-md">
              <AvatarImage
                src={row.original.employees.image_url}
                alt={row.original.employees.first_name}
              />
              <AvatarFallback className="bg-slate-500 rounded-md text-white">
                {row.original.employees.first_name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p className="max-w-[100px] 2xl:max-w-[220px] truncate font-semibold">
                {row.original.employees.first_name}{" "}
                {row.original.employees.last_name}
              </p>
              <p className="max-w-[181px] truncate text-slate-500">
                {row.original.employees.roles.role}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "id",
      accessorKey: "calamity_types",
      header: "Calamity Type",
      cell: ({ row }) => {
        return (
          <p className="max-w-[110px] 2xl:max-w-[220px] truncate">
            {row.original.calamity_types.name}
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
                className="-ml-3 h-8 data-[state=open]:bg-applicationPrimary data-[state=open]:text-black hover:bg-slate-50/70 hover:text-black"
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
                className="hover:bg-applicationPrimary  text-black group"
              >
                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-black" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.toggleSorting(true)}
                className="hover:bg-applicationPrimary text-black group"
              >
                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70 group-hover:text-black" />
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
        if (item.value === "Completed") {
          return (
            <p
              className={
                "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-white bg-green-600 px-2 py-1 rounded-3xl border border-green-600"
              }
            >
              {item.value}
            </p>
          );
        } else if (item.value === "Ongoing") {
          return (
            <p
              className={
                "w-fit text-xs font-normal flex place-items-center gap-2 truncate text-white bg-yellow-600 px-2 py-1 rounded-3xl border border-yellow-600"
              }
            >
              {item.value}
            </p>
          );
        } else item.value === "Undetermined";
        {
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
    // {
    //   id: "coordinates",
    //   accessorKey: "coordinates",
    //   header: "Coordinates",
    //   cell: ({ row }) => {
    //     return (
    //       <div className="flex place-items-center gap-2">
    //         {/* <Avatar className="w-10 h-10 cursor-pointer z-0 rounded-md">
    //           <AvatarImage
    //             src={row.original.req.image_url}
    //             alt={row.original.employees.first_name}
    //           />
    //           <AvatarFallback className="bg-slate-500 rounded-md text-white">
    //             {row.original.employees.first_name[0]}
    //           </AvatarFallback>
    //         </Avatar> */}

    //         <div className="flex flex-col">
    //           <p className="max-w-[100px] 2xl:max-w-[220px] truncate font-semibold">
    //             {row.original.coordinates} {row.original.coordinates}
    //           </p>
    //           <p className="max-w-[181px] truncate text-slate-500">
    //             {row.original.coordinates}
    //           </p>
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <Link
            className="w-fit py-2 flex place-items-center justify-center text-slate-400 rounded-full px-4 hover:bg-applicationPrimary hover:text-black hover:border-applicationPrimary transition-all duration-300 primary-glow"
            href={`/application/requests/order/${id}`}
          >
            {/* <FaEye className="mr-2 " /> */}
            View
          </Link>
        );
      },
    },
    {
      id: "barcode",
      accessorKey: "barcode",
    },
    {
      id: "created_at",
      accessorKey: "created_at",
      accessorFn: (row) => format(new Date(row.created_at), "PPP"),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
  ];
  return columns;
};
