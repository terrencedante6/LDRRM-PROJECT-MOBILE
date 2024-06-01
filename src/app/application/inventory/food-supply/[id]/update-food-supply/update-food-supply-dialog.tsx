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

import UpdateFoodSupplyForm from "./update-food-supply-form";
import { MdOutlineModeEdit } from "react-icons/md";

export default function UpdateFoodSupplyDialog({ foodSupplyData }: any) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-lg flex gap-2 ">
          <MdOutlineModeEdit />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[570] Bg border border-lightBorder shadow-2xl">
        <DialogHeader>
          <DialogTitle>Update Food Supply</DialogTitle>
          <DialogDescription>
            Make sure to input the new correct fields of the Food Supply
          </DialogDescription>
        </DialogHeader>
        <UpdateFoodSupplyForm
          setDialogOpen={setDialogIsOpen}
          dialogIsOpen={dialogIsOpen}
          foodSupply={foodSupplyData}
        />
      </DialogContent>
    </Dialog>
  );
}
