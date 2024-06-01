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

import VehicleForm from "./add-vehicle-form";
import { FaToolbox } from "react-icons/fa";

export default function VehicleDialog() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-md flex gap-2  transition-all duration-300">
          <FaToolbox /> New Vehicle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px] Bg border border-lightBorder shadow-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Vehicle</DialogTitle>
          <DialogDescription>
            Add a new Vehicle to your inventory
          </DialogDescription>
        </DialogHeader>
        <VehicleForm setDialogOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
