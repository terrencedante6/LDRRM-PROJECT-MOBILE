"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import UpdateEmployeeStatusForm from "./update-employee-status-form";

export default function UpdateEmployeeStatusDialog({ employeeData }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const employee = employeeData;

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "text-xs rounded-full py-1 px-2 border font-normal flex place-items-center gap-1 cursor-pointer",
            employee.status === "Available"
              ? "text-green-500 bg-green-500 bg-opacity-20 border-green-500"
              : employee.status === "Busy"
              ? "text-yellow-300 bg-yellow-300 bg-opacity-20 border-yellow-300"
              : "text-red-500 bg-red-500 bg-opacity-20 border-red-500"
          )}
        >
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              employee.status === "Available"
                ? " bg-green-500 "
                : employee.status === "Busy"
                ? "bg-yellow-300 "
                : "bg-red-500"
            )}
          ></div>
          {employee.status}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-darkComponentBg border border-lightBorder shadow-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Update user status</DialogTitle>
          <DialogDescription>
            Update user status. Status can be Available, In Progress or Inactive
          </DialogDescription>
        </DialogHeader>
        <UpdateEmployeeStatusForm setDialogIsOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
