import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workers",
  description: "Example dashboard app built using the components.",
};

export default function WorkersPage() {
  return (
    <div className="flex flex-col justify-start place-items-center w-full h-full gap-7 p-8 bg-transparent">
      Workers ni bai
    </div>
  );
}
