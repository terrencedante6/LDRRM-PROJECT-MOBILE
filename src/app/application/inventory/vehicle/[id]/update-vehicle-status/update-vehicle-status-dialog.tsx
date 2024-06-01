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
import UpdateServiceStatusForm from "./update-vehicle-status-form";

export default function UpdateServiceStatusDialog({ serviceData }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "text-xs rounded-full py-1 px-2 border font-normal flex place-items-center gap-1 cursor-pointer w-fit",
            serviceData.status === "Available"
              ? "text-green-500 bg-green-500 bg-opacity-20 border-green-500"
              : serviceData.status === "In Progress"
              ? "text-yellow-300 bg-yellow-300 bg-opacity-20 border-yellow-300"
              : "text-red-500 bg-red-500 bg-opacity-20 border-red-500"
          )}
        >
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              serviceData.status === "Available"
                ? " bg-green-500 "
                : serviceData.status === "In Progress"
                ? "bg-yellow-300 "
                : "bg-red-500"
            )}
          ></div>
          {serviceData.status}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] Bg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Update service status</DialogTitle>
          <DialogDescription>
            Update service status. Status can be Available or Unavailable
          </DialogDescription>
        </DialogHeader>
        <UpdateServiceStatusForm
          setDialogIsOpen={setDialogIsOpen}
          service={serviceData}
        />
      </DialogContent>
    </Dialog>
  );
}
