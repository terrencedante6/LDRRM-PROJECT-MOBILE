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

import FoodSupplyForm from "./add-food-supply-form";
import { FaToolbox } from "react-icons/fa";

export default function FoodSupplyDialog() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-md flex gap-2  transition-all duration-300">
          <FaToolbox /> New Food Supply
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px] Bg border border-lightBorder shadow-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Food Supply</DialogTitle>
          <DialogDescription>
            Add a new FoodSupply to your inventory
          </DialogDescription>
        </DialogHeader>
        <FoodSupplyForm setDialogOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
