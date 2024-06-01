import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ImageInput({ data }: { data: any }) {
  return (
    <Avatar className="w-36 h-36 rounded-lg  cursor-pointer z-0">
      <AvatarImage className="rounded-lg" src={""} alt={"something"} />
      <AvatarFallback className="bg-slate-300 text-white rounded-lg">
        +
      </AvatarFallback>
    </Avatar>
  );
}
