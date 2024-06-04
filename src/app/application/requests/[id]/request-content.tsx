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
      {request.map((request: any) => {
        return (
          <div
            className="w-full h-fit bg-darkComponentBg rounded-2xl p-4 shadow-xl flex flex-col gap-2 active:scale-95 transition-all duration-300"
            onClick={() => router.push(`/application/requests/${request.id}`)}
            key={request.id}
          >
            <div className="w-full flex flex-col">
              <div className="w-full flex justify-between place-items-center">
                <h1 className="text-white text-xs">
                  Requester:{" "}
                  <span className="text-white text-xs font-bold">
                    {request.requester_first_name} {request.requester_last_name}
                  </span>
                </h1>
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
                  Employee ID: {request.employees_id}
                </h3>
              </div>
              <div className="w-full flex justify-between place-items-center">
                <h3 className="w-full text-xs font-regular text-slate-200 ">
                  Coordinates: {request.coordinates}
                </h3>
              </div>
            </div>
            {/* ... */}
          </div>
        );
      })}
    </div>
  );
}
