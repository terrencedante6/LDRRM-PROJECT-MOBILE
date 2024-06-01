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

import EquipmentForm from "./add-equipment-form";
import { PiGearSixBold } from "react-icons/pi";
import { FaToolbox } from "react-icons/fa";

export default function EquipmentDialog() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-md flex gap-2  transition-all duration-300">
          <FaToolbox /> New Equipment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px] Bg border border-lightBorder shadow-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Equipment</DialogTitle>
          <DialogDescription>
            Add a new equipment to your inventory
          </DialogDescription>
        </DialogHeader>
        <EquipmentForm setDialogOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
