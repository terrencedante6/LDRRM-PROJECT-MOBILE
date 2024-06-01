import { DialogDemoAnnoucement } from "./announcementadd";
import { Metadata } from "next";
import { AlertDemo } from "./alert";

export const metadata: Metadata = {
  title: "Announcement",
  description: "Example dashboard app built using the components.",
};

export default function Announcement() {
  return (
    <div className="flex flex-col justify-start place-items-center w-full h-full gap-7 p-8">
      <div className="space-y-2 w-[90%] h-fit bg-white p-4 rounded-2xl">
        <DialogDemoAnnoucement />
        <AlertDemo />
        <AlertDemo />
        <AlertDemo />
        <AlertDemo />
        <AlertDemo />
        <AlertDemo />
      </div>
    </div>
  );
}
