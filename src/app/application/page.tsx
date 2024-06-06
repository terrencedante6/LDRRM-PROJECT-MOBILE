"use client";

import Image from "next/image";

import type { Viewport } from "next";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useRequestServices } from "@/hooks/useOrderService";
import { toast } from "@/components/ui/use-toast";
import createSupabaseBrowserClient from "@/lib/supabase/client";
// import RequestForm from "./rescuemepage-content";
import { useRequests } from "@/hooks/useOrders";
// import LocationSearch from "./LocationSearch";
import form from "antd/es/form";
import { allPurchaseRequestsDisplay } from "@/types";
import { cn } from "@/lib/utils";
import router from "next/router";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
// import LocateDevice from "./locatedevice";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Application() {
  const { getItem } = useLocalStorage("value");
  const currentUser = getItem();

  const [notificationCounter, setNotificationCounter] = useState(0);
  const { getRequestServicesLatest, latestRequestServiceData } =
    useRequestServices();

  useEffect(() => {
    const initialFetch = async () => {
      const result = getRequestServicesLatest(currentUser);
    };
    initialFetch();
    if (!currentUser) {
      redirect("/auth/login");
    }
  }, []);

  useEffect(() => {
    if (latestRequestServiceData.length > 0) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel(`latest-service-requests-follow-up-${currentUser.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "requests",
            filter: `mobile_user_id=eq.${currentUser.id}`,
          },
          (payload: any) => {
            getRequestServicesLatest(currentUser);
          }
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "requests",
            filter: `request_id=eq.${latestRequestServiceData[0].id}`,
          },
          (payload: any) => {
            getRequestServicesLatest(currentUser, 0);
            setNotificationCounter((prev) => prev + 1);

            setTimeout(() => {
              toast({
                className: cn(
                  "top-0 left-0 right-0 mx-auto max-w-[350px] rounded-2xl py-3 px-7 flex fixed top-3 md:top-4 bg-applicationPrimary text-white shadow-xl border-transparent font-medium"
                ),
                title: "📣 Notification",
                description: `Latest request has been updated!`,
              });
            }, 500);
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, [latestRequestServiceData]);

  const { control } = useForm();

  // ...

  <h1 className="text-applicationPrimary text-xs px-3 py-1 bg-white rounded-full font-semibold">
    {/* {data?.status} <LocationSearch control={control} /> */}
  </h1>;

  return (
    <div
      className="flex flex-col gap-8 w-full place-items-center justify-start p-6 relative"
      style={{ backgroundColor: "rgb(18,18,18)" }}
    >
      <div className="w-full h-fit flex flex-col">
        <h1 className="text-lg text-white">Welcome Back,</h1>
        <h1 className="text-2xl text-white font-bold">
          {currentUser?.first_name} {currentUser?.last_name}
        </h1>
      </div>
      <div className="w-full h-fit flex flex-col gap-4">
        {latestRequestServiceData.length > 0 && (
          <div
            className="w-full h-fit rounded-2xl p-4 shadow-lg active:scale-90 transition-all duration-300"
            // onClick={() => router.push(`/application/requests/${data?.id}`)}
          >
            <div className="w-full flex justify-between place-items-center">
              <h1 className="text-white text-xs font-semibold ">
                Latest Request
              </h1>
              <h1 className="text-applicationPrimary text-xs px-3 py-1 bg-white rounded-full font-semibold">
                {/* {data?.status} <LocationSearch control={control} /> */}
              </h1>
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
        <Link href="/application/mapping">
          <button
            className="w-full min-h-[240px] flex flex-col justify-between rounded-2xl gap-2 p-4 shadow-lg active:scale-95 transition-all duration-300 cursor-pointer bg-transparent border-none"
            style={{ backgroundColor: "rgb(31,31,31)" }}
          >
            <div>
              <h1 className="text-white font-semibold text-lg">
                Check out our Map!
              </h1>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}
