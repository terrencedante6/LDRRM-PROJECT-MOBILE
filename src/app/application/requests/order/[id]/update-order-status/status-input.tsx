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
        className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
        {...data}
      >
        <SelectValue
          className="text-black"
          placeholder={data ? data.value : "Select Status"}
        />
      </SelectTrigger>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-white">
        <SelectGroup>
          <SelectItem value="Complete">Complete</SelectItem>
          <SelectItem value="Ongoing">Ongoing</SelectItem>
          <SelectItem value="Archived">Archived</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
