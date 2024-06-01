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
        id="gender"
        name="gender"
        className="w-full  border-slate-600/50 rounded-lg "
        {...data}
      >
        <SelectValue
          className="text-black"
          placeholder={data ? data.value : "Select a sex"}
        />
      </SelectTrigger>
      <SelectContent className="rounded-lg border-slate-600/50 text-black">
        <SelectGroup>
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
