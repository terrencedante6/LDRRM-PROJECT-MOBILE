"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { EmployeesDisplay } from "@/types/index";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export const calamityTypes = [
  {
    value: "Earthquake",
    label: "Earthquake",
  },
  {
    value: "Flood",
    label: "Flood",
  },
  {
    value: "Fire",
    label: "Fire",
  },
  {
    value: "Tornado",
    label: "Tornado",
  },
  {
    value: "Hurricane",
    label: "Hurricane",
  },
  {
    value: "Volcano Eruption",
    label: "Volcano Eruption",
  },
  {
    value: "Blizzard",
    label: "Blizzard",
  },
  {
    value: "Drought",
    label: "Drought",
  },
  {
    value: "Wildfire",
    label: "Wildfire",
  },
  {
    value: "Tsunami",
    label: "Tsunami",
  },
  {
    value: "Cyclone",
    label: "Cyclone",
  },
];

export const calamityStatuses = [
  {
    value: "Available",
    label: "Available",
  },
  {
    value: "In Progress",
    label: "In Progress",
  },
  {
    value: "Unavailable",
    label: "Unavailable",
  },
];

export const roles = [
  {
    value: "Residence",
    label: "Residence",
  },
  {
    value: "Staff",
    label: "Staff",
  },
  {
    value: "Administrator",
    label: "Administrator",
  },
  {
    value: "Rescuer",
    label: "Rescuer",
  },
];

export const columns: ColumnDef<EmployeesDisplay>[] = [
  {
    id: "name",
    accessorKey: "first_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex place-items-center gap-2">
          <Avatar className="relative flex overflow-hidden w-10 h-10 cursor-pointer z-0 rounded-md items-center justify-center">
            <AvatarImage
              src={row.original.image_url}
              alt={row.original.first_name}
            />
            <AvatarFallback className="bg-slate-500 rounded-md text-white p-6">
              {row.original.first_name[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <p className="max-w-[190px] 2xl:max-w-[220px] truncate font-semibold">
              {row.original.first_name} {row.original.last_name}
            </p>
            <p className="max-w-[190px] 2xl:max-w-[220px] truncate font-semibold text-slate-500 ">
              {row.original.roles.role}
            </p>
          </div>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "role",
  //   accessorFn: (row) => row.roles.role,
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Role" />
  //   ),
  //   cell: ({ row }) => {
  //     const role = roles.find((role) => role.value === row.original.roles.role);

  //     if (!role) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex w-[150px] items-center">
  //         <span>{role.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const item = row.original;
      return item.email;
    },
  },
  {
    id: "contact_number",
    accessorKey: "contact_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Number" />
    ),
    cell: ({ row }) => {
      const item = row.original;
      return item.contact_number;
    },
  },
  // {
  //   id: "calamity_type",
  //   accessorKey: "calamity_type",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Full Name" />
  //   ),
  //   cell: ({ row }) => {
  //     const calamity_type = calamityTypes.find(
  //       (label) => label.value === row.getValue("calamity_type")
  //     );

  //     if (!calamity_type) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex space-x-2">
  //         <span className="max-w-[500px] truncate font-medium">
  //           {row.getValue("calamity_type")}
  //         </span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },

  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[150px] truncate">
            {row.getValue("address")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = calamityStatuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      let statusColor;
      switch (status.label) {
        case "Available":
          statusColor = "bg-green-600 border-green-600";
          break;
        case "In Progress":
          statusColor = "bg-yellow-600 border-yellow-600";
          break;
        case "Unavailable":
          statusColor = "bg-red-600 border-red-600";
          break;
        default:
          statusColor = "bg-green-600 border-green-600";
      }

      return (
        <div className="flex w-[150px] items-center">
          <p
            className={`w-fit text-xs font-normal flex place-items-center gap-2 truncate text-white px-2 py-1 rounded-3xl ${statusColor}`}
          >
            {status.label}
          </p>
        </div>
      );
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
        <div className="ml-4">
          <Link
            className="w-fit py-2 flex place-items-center justify-center text-slate-400 rounded-full px-4 hover:bg-applicationPrimary hover:text-black hover:border-applicationPrimary transition-all duration-300 primary-glow"
            href={`/application/employees/user/${id}`}
          >
            {/* <FaEye className="mr-2 " /> */}
            View
          </Link>
        </div>
      );
    },
  },
];
