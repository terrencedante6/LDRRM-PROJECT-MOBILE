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
    <Select onValueChange={data.onChange}>
      <SelectTrigger
        id="status"
        name="status"
        className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg"
        {...data}
      >
        <SelectValue
          className="text-white"
          placeholder={data ? data.value : "Select Status"}
        />
      </SelectTrigger>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-black bg-white">
        <SelectGroup>
          <SelectItem value="Available">Available</SelectItem>
          <SelectItem value="Busy">Busy</SelectItem>
          <SelectItem value="Unavailable">Unavailable</SelectItem>
          <SelectItem value="Inactive">Inactive</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
