import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRequests } from "@/hooks/useOrders";
import { toast } from "@/components/ui/use-toast";
import MultiSelect from "@/components/ui/multi-select";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "antd";
import { Link } from "lucide-react";

const RequestSchema = z.object({
  requester_first_name: z.string().nullable(),
  requester_last_name: z.string().nullable(),
  requester_contact_number: z.string().nullable(),
  coordinates: z.string(),
  calamity_type: z.string(),
});

interface RequestData {
  requester_first_name: string | null;
  requester_last_name: string | null;
  requester_contact_number: string | null;
  coordinates: string;
  calamity_type: string;
}

interface RequestFormProps {
  requestData: RequestData;
}

export default function RequestForm({ requestData }: RequestFormProps) {
  const { createRequest } = useRequests();
  const { getItem } = useLocalStorage("value");
  const currentUser = getItem();

  const form = useForm<RequestData>({
    resolver: zodResolver(RequestSchema),
    defaultValues: requestData,
  });

  type Coordinates = {
    latitude: number;
    longitude: number;
  };

  const [coords, setCoords] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords(position.coords);
        },
        (error) => {
          console.error(error);
        },
        {
          maximumAge: 60000,
          enableHighAccuracy: true,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const onSubmit = async (data: RequestData) => {
    console.log("onSubmit called");
    console.log(data);
    const result = await createRequest(data);

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Error napud",
        description: result.error.message,
      });
      return;
    }

    toast({
      className:
        "top-0 left-0 right-0 mx-auto max-w-[350px] rounded-2xl py-3 px-7 flex fixed top-3 md:top-4 bg-blue-600 text-white shadow-xl border-transparent font-medium",
      title: "✅ Success",
      description: `Request submitted successfully!`,
    });
    // Refresh the page
    window.location.reload();
  };

  //debugging zone

  //debugging zone

  return (
    <form
      className="w-full flex flex-col gap-2"
      onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log("Form errors:", errors);
      })}
    >
      <label className="text-sm font-bold text-white pointer-events-none">
        First Name
      </label>
      <input
        {...form.register("requester_first_name")}
        placeholder="First Name"
        className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-black border border-lightBorder"
        value={currentUser?.first_name}
      />
      <label className="text-sm font-bold text-white pointer-events-none">
        Last Name
      </label>
      <input
        {...form.register("requester_last_name")}
        placeholder="Last Name"
        className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-black border border-lightBorder"
        value={currentUser?.last_name}
      />
      <label className="text-sm font-bold text-white pointer-events-none">
        Contact Number
      </label>
      <input
        {...form.register("requester_contact_number")}
        placeholder="Contact Number"
        className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-black border border-lightBorder"
        value={currentUser?.contact_number}
      />
      <label className="text-sm font-bold text-white pointer-events-none">
        Incidents
      </label>
      <input
        {...form.register("calamity_type")}
        placeholder="Incidents"
        className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-black border border-lightBorder"
      />

      <label className="text-sm font-bold text-white pointer-events-none">
        Coordinates
      </label>
      <input
        {...form.register("coordinates")}
        placeholder="Coordinates"
        className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-black border border-lightBorder"
      />
      {coords ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(
                `${coords.latitude},${coords.longitude}`
              );
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-2 w-[80%]"
          >
            Copy Coordinates
          </button>
        </div>
      ) : (
        <p className="text-sm text-white">Waiting for your location...</p>
      )}
      <p className="text-sm text-white italic justify-center text-center">
        Please copy the coordinates and paste it to the form above. So we can
        better find your specific location.
      </p>
      <div className="flex justify-center w-full gap-3">
        <input
          type="submit"
          className="w-[30%] rounded-xl h-[50px] bg-emerald-600 transform active:scale-95 transition-transform text-lg text-white font-bold text-center cursor-pointer mt-1"
        />
        {/* <Link href="/application/rescuemepage/callforhelp">
          <a className="w-[30%] rounded-xl h-[50px] bg-emerald-600 transform active:scale-95 transition-transform text-lg text-white font-bold text-center cursor-pointer mt-1">
            Call for help
          </a>
        </Link> */}
      </div>
    </form>
  );
}

function createRequest(data: RequestData) {
  throw new Error("Function not implemented.");
}
