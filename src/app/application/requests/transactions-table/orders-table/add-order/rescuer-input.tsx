import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDemo({ data }: { data: any }) {
  return (
    <Select onValueChange={data.onChange} value={data.value || ""}>
      <SelectTrigger
        id="rescuer"
        name="rescuer"
        className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        {...data}
      >
        <SelectValue
          className="text-white"
          placeholder="Select available rescuers"
        />
      </SelectTrigger>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-black bg-white">
        <SelectGroup>
          <SelectItem value="John Doe">John Doe</SelectItem>
          <SelectItem value="Jane Doe">Jane Doe</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
