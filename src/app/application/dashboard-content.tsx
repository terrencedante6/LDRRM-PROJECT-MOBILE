//Dashboard the boxes that appears on the dashboard mobile

"use client";

import type { Viewport } from "next";
import Link from "next/link";
import { allPurchaseRequestsVehicleDisplay } from "@/types";
import { useRouter } from "next/navigation";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function DashboardContent({
  currentUser,
  latestRequestServiceData,
}: any) {
  const router = useRouter();
  const data: allPurchaseRequestsVehicleDisplay = latestRequestServiceData[0];

  return (
    <div
      className="flex flex-col gap-8 w-full place-items-center justify-start p-6 relative"
      style={{ backgroundColor: "rgb(18,18,18)" }}
    >
      {/* <div className="w-full h-fit flex flex-col">
        <h1 className="text-lg text-white">Welcome Back,</h1>
        <h1 className="text-2xl text-white font-bold">
          {currentUser?.first_name} {currentUser?.last_name}
        </h1>
      </div> */}
      <div className="w-full h-fit flex flex-col gap-4">
        {latestRequestServiceData.length > 0 && (
          <div
            className="w-full h-fit rounded-2xl p-4 shadow-lg active:scale-90 transition-all duration-300"
            onClick={() => router.push(`/application/requests/${data?.id}`)}
          >
            <div className="w-full flex justify-between place-items-center">
              <h1 className="text-white text-xs font-semibold ">
                Latest Request
              </h1>
              <h1 className="text-applicationPrimary text-xs px-3 py-1 bg-white rounded-full font-semibold">
                {data?.status}
              </h1>
            </div>
            <div className="flex justify-between place-items-center gap-2 w-full">
              {/* <div className="h-full flex flex-col justify-center">
                <h2
                  className={cn(
                    "w-full text-center text-3xl font-extrabold text-white",
                    data?.progress_entries.length > 4 ? "text-green-300" : ""
                  )}
                >
                  <CountUp
                    start={0}
                    end={Math.round((data?.progress_entries.length / 5) * 100)}
                    duration={5}
                  />
                  %
                </h2>
                <span
                  className={cn(
                    "w-full text-center text-xs text-slate-300",
                    data?.progress_entries.length > 4 ? "text-green-300" : ""
                  )}
                >
                  Completion
                </span>
              </div> */}
              {/* <Image
                src={
                  data?.vehicle_entries[0].type === "small"
                    ? smallVehicle
                    : data?.vehicle_entries[0].type === "medium"
                    ? mediumVehicle
                    : largeVehicle
                }
                alt="Vehicle"
                className="rounded-xl w-[70%] pointer-events-none"
              /> */}
            </div>
          </div>
        )}
        <div className="w-full flex gap-4 justify-between">
          <div
            className="w-full h-[130px] flex flex-col justify-between rounded-2xl p-4 shadow-lg"
            style={{ backgroundColor: "rgb(31,31,31)" }}
          >
            <h1 className="text-white font-semibold text-sm">
              {/* Im not sure pa what to put here */}
            </h1>
            <h1 className="w-full h-full flex justify-center place-items-center font-bold text-center text-white text-3xl">
              {currentUser?.points}
            </h1>
          </div>
          <div
            className="w-[60%] h-[130px] flex flex-col justify-between rounded-2xl p-4 shadow-lg"
            style={{ backgroundColor: "rgb(31,31,31)" }}
          >
            {/* <h1 className="text-white font-semibold text-sm">Announcements</h1> */}

            <Link
              href="/application/announcements"
              className="w-full flex justify-center place-items-center active:scale-90"
            >
              {/* <Button className="w-full hover:bg-applicationPrimary/90 rounded-xl font-semibold text-sm">
                <FaAngleRight className="text-white" />
              </Button> */}
            </Link>
          </div>
        </div>
        <div
          className="w-full min-h-[240px] flex flex-col justify-between bg-darkComponentBg rounded-2xl gap-2 p-4 shadow-lg active:scale-95 transition-all duration-300"
          style={{ backgroundColor: "rgb(31,31,31)" }}
        >
          {/* <h1 className="text-white font-semibold text-lg">📣 What's New?</h1> */}
          <div className="w-full h-full flex justify-between place-items-start gap-2">
            {/* <Image
              src={Celebrate}
              alt="Celebrate"
              className="w-[38%] pointer-events-none"
            /> */}
            <div className="w-full h-full flex flex-col justify-between place-items-center">
              <div className="w-full h-full flex flex-col gap-1">
                {/* <h1 className="text-white font-semibold text-sm">
                  Mobile Platforms!
                </h1>
                <p className="text-xs text-white">
                  We are excited to announce that we are now available on both
                  Android and iOS platforms. This is a huge milestone for us and
                  we are excited to see you on the app.
                </p> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-full min-h-[240px] flex flex-col justify-between bg-darkComponentBg rounded-2xl gap-2 p-4 shadow-lg active:scale-95 transition-all duration-300"
          style={{ backgroundColor: "rgb(31,31,31)" }}
        >
          {/* <h1 className="text-white font-semibold text-lg">📣 What's New?</h1> */}
          <div className="w-full h-full flex justify-between place-items-start gap-2">
            {/* <Image
              src={Celebrate}
              alt="Celebrate"
              className="w-[38%] pointer-events-none"
            /> */}
            <div className="w-full h-full flex flex-col justify-between place-items-center">
              <div className="w-full h-full flex flex-col gap-1">
                {/* <h1 className="text-white font-semibold text-sm">
                  Mobile Platforms!
                </h1>
                <p className="text-xs text-white">
                  We are excited to announce that we are now available on both
                  Android and iOS platforms. This is a huge milestone for us and
                  we are excited to see you on the app.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
