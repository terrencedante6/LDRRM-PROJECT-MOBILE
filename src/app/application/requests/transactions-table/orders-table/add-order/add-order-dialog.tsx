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

import RequestForm from "./add-order-form";
import { BsFillEnvelopeArrowUpFill } from "react-icons/bs";

export default function RequestDialog() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs font-bold rounded-md flex gap-2  transition-all duration-300">
          <BsFillEnvelopeArrowUpFill /> Create Request
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1170px] 2xl:max-w-[1570px] border border-lightBorder shadow-2xl bg-white">
        <DialogHeader>
          <DialogTitle>New Request</DialogTitle>
          <DialogDescription>Add a new request</DialogDescription>
        </DialogHeader>
        <RequestForm setDialogOpen={setDialogIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
