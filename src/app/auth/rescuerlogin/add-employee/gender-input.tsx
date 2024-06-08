import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Assuming `value` and `onChange` are part of the `data` prop for simplicity
export default function SelectDemo({ data }: { data: any }) {
  return (
    <Select onValueChange={data.onChange}>
      <SelectTrigger
        id="gender"
        name="gender"
        className="w-full border-slate-600/50 rounded-lg"
      >
        <SelectValue
          placeholder={!data.value ? "Select a Sex" : undefined}
          className="placeholder:text-slate-400"
        >
          {data.value}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="rounded-lg text-slate-600">
        <SelectGroup>
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
