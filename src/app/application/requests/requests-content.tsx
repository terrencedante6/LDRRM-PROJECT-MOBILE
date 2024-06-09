"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";
// import smallVehicle from "@/images/vehicle-small-hd.png";
// import mediumVehicle from "@/images/vehicle-medium-hd.png";
// import largeVehicle from "@/images/vehicle-large-hd.png";
import { useRouter } from "next/navigation";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function RequestsContent({ request }: any) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-6 justify-between rounded-2xl pb-14">
      {request.map((request: any, index: number) => (
        <div
          key={index} // Updated to use index as key, consider using a unique identifier from request if available
          className="w-full h-fit bg-slate-700/20 rounded-2xl p-4 shadow-xl flex flex-col gap-2 active:scale-95 transition-all duration-300"
        >
          <div className="w-full flex flex-col">
            <div className="w-full flex justify-between place-items-center">
              <h3 className="w-full text-sm font-bold text-slate-200 ">
                Requester:{" "}
                <span className="text-white text-xs font-bold">
                  {request.requester_first_name} {request.requester_last_name}
                </span>
              </h3>
              <h1 className="text-white text-xs bg-applicationPrimary px-4 py-1 rounded-full">
                {request.status}
              </h1>
            </div>
            <div className="w-full flex justify-between place-items-center">
              <h3 className="w-full text-sm font-bold text-slate-200 ">
                Contact Number: {request.requester_contact_number}
              </h3>
            </div>
            <div className="w-full flex justify-between place-items-center">
              <h3 className="w-full text-xs font-regular text-slate-200 ">
                Coordinates: {request.coordinates}
              </h3>
            </div>
            <div className="w-full flex justify-between place-items-center">
              <h3 className="w-full text-xs font-regular text-slate-200 ">
                Incident: {request.calamity_type}
              </h3>
            </div>
          </div>
          {/* ... */}
        </div>
      ))}
    </div>
  );
}
