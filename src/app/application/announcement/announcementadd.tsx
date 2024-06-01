import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TextareaDemo } from "./textarea";

export function DialogDemoAnnoucement() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"> + Announce</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write Something!</DialogTitle>
          <DialogDescription>
            Please Use For Legitimate Reasons Only.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <TextareaDemo />
        </div>

        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
