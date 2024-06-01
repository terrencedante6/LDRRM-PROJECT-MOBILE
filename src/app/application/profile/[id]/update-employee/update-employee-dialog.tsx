"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UpdateEmployeeForm from "./update-employee-form";
import { MdOutlineModeEdit } from "react-icons/md";

export default function UpdateEmployeeDialog({ employeeData, rolesData }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold flex gap-2 ">
          <MdOutlineModeEdit />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-darkComponentBg border border-lightBorder shadow-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>
            Make sure to input the new correct fields of the user
          </DialogDescription>
        </DialogHeader>
        <UpdateEmployeeForm
          setDialogOpen={setDialogIsOpen}
          dialogIsOpen={dialogIsOpen}
          employee={employeeData}
          roles={rolesData}
        />
      </DialogContent>
    </Dialog>
  );
}
