import { Button } from "@/components/ui/button";
import { Calendar } from "./dob-calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export default function SampleDatePicker({ data }: { data: any }) {
  return (
    <Popover>
      <PopoverTrigger asChild id="dob" name="dob">
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal bg-lightComponentBg border-slate-600/50 rounded-lg text-black hover:bg-lightComponentBg",
            !data.value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-black" />
          {data.value ? (
            format(data.value, "PPP")
          ) : (
            <span className="text-black">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className=" w-auto p-0 border-none rounded-lg overflow-hidden shadow-2xl bg-white"
      >
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={data.value}
          onSelect={data.onChange}
          fromYear={1960}
          toYear={2900}
          className="text-black bg-lightComponentBg border-slate-600/50"
          {...data}
        />
      </PopoverContent>
    </Popover>
  );
}
