//mobile Landing page before going to auth
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Viewport } from "next";
import Link from "next/link";
import Onboarding from "@/images/LP_background.jpg";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect } from "react";
export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Home() {
  const router = useRouter();

  const { getItem } = useLocalStorage("value");
  const currentUser = getItem();
  if (currentUser) {
    redirect("/application");
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="hidden w-full min-h-screen md:flex justify-center place-items-center">
        <h1 className="text-black text-2xl">Download The App</h1>
      </div>
      <div
        className="md:hidden flex flex-col gap-8 h-screen max-h-screen w-full place-items-center justify-center py-8 px-5"
        style={{ backgroundColor: "rgb(31,31,31)" }}
      >
        <div className="w-full h-full flex flex-col gap-6 justify-center place-items-center">
          <Image
            src={Onboarding}
            alt="LP_background"
            className="w-full rounded-full pointer-events-none"
          />
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-white w-full text-center text-2xl font-bold leading-10">
              We
              <span
                className="text-white rounded-full px-4 py-.8 text-md"
                style={{ backgroundColor: "rgb(31,31,31)" }}
              >
                Risk{""}
              </span>
              Ourselves{""}
              <span
                className="text-white rounded-full px-4 py-.8 text-md"
                style={{ backgroundColor: "rgb(31,31,31)" }}
              >
                To Save Lives.
              </span>
            </h1>
            <p className="text-white text-center text-sm w-full">
              LDRRM is a dedicated rescue application, designed to simplify and
              expedite the process of calling for help.
            </p>
          </div>
        </div>

        <Button
          className="w-full rounded-xl h-[70px] bg-blue-500/75 hover:bg-applicationPrimary transform active:scale-95 transition-transform"
          onClick={() => router.push("/auth/login")}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
