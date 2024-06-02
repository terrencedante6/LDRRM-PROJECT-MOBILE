"use Client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useFormContext, Controller } from "react-hook-form";

import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import React from "react";

import { DataTable as FoodSuppliesCart } from "./add-order-cart/products-cart/data-table";
import { DataTable as EquipmentsCart } from "./add-order-cart/parts-cart/data-table";
import { DataTable as VehiclesCart } from "./add-order-cart/vehicles-cart/data-table";

import { initiateColumns as initiateFoodSupplyCartColumns } from "./add-order-cart/products-cart/columns";
import { initiateColumns as initiateEquipmentsCartColumns } from "./add-order-cart/parts-cart/columns";
import { initiateColumns as initiateVehiclesCartColumns } from "./add-order-cart/vehicles-cart/columns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { toast as sonner } from "sonner";
import { useEffect, useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useRequests } from "@/hooks/useOrders";
import { useSelector } from "react-redux";
import RequestCartOptions from "./add-order-table/lists";
import { useDispatch } from "react-redux";
import { resetCart } from "@/redux/slices/orderCartSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import StatusInput from "./status-input";
import RescuerInput from "./rescuer-input";
import { resetRequestvehicleCart } from "@/redux/slices/orderVehicleCartSlice";
import { LocationSearch } from "./LocationSearch";
import MultiSelectFormField from "@/components/ui/multi-select";
import { TooltipContent } from "@/components/ui/tooltip";

export default function RequestForm({ setDialogOpen }: any) {
  const currentUser = useSelector((state: any) => state.currentSession);
  const [isPending, startTransition] = useTransition();
  const { createRequest } = useRequests();
  const dispatch = useDispatch();
  const router = useRouter();

  const requestCart = useSelector((state: any) => state.requestCart);
  const requestCartOptions = useSelector(
    (state: any) => state.requestCartOptionSlice
  );

  //Debugging zone

  const rescuersFromState = useSelector(
    (state: any) => state.allEmployees.allRescuers
  );

  const allRescuers = rescuersFromState
    ? rescuersFromState
        .map((rescuer: any) => ({
          value: rescuer.id,
          label: rescuer.first_name + " " + rescuer.last_name,
        }))
        .filter((rescuer: any) => rescuer.value !== currentUser.id)
        .filter((rescuer: any) => {
          if (currentUser.roles.role === "Administrator") {
            return true;
          } else {
            return true;
          }
        })
    : [];

  const calamitytypesFromState = useSelector(
    (state: any) => state.allEmployees.allCalamityTypes
  );

  const allCalamityTypes = calamitytypesFromState
    ? calamitytypesFromState
        .map((calamity: any) => ({
          value: calamity.id,
          label: calamity.name,
        }))
        .filter((calamity: any) => calamity.value !== currentUser.id)
        .filter((calamity: any) => {
          if (currentUser.roles.role === "Administrator") {
            return true;
          } else {
            return true;
          }
        })
    : [];

  //Debugging zone

  // Log the final allRescuers array

  const [minTotalPrice] = useState(0);

  const RequestSchema: any = z.object({
    requester_first_name: z.string().nullable(),
    requester_last_name: z.string().nullable(),
    requester_email: z.string().nullable(),
    requester_contact_number: z.coerce.number().nullable(),
    status: z.string(),
    total_stocks_used: z.coerce.number().nullable(),
    employee_id: z.string(),
    rescuer_id: z.string(),
    calamity_types_id: z.string(),
    coordinates: z.string(),

    use_equipments: z.array(
      z.object({
        equipment_id: z.coerce.number(),
        name: z.string(),
        description: z.string(),
        image_url: z.string(),
        quantity: z.coerce.number(),
      })
    ),
    use_foodsupplies: z.array(
      z.object({
        foodsupply_id: z.coerce.number(),
        name: z.string(),
        description: z.string(),
        image_url: z.string(),
        quantity: z.coerce.number(),
      })
    ),
    use_vehicles: z.array(
      z.object({
        vehicle_id: z.coerce.number(),
        name: z.string(),
        description: z.string(),
        image_url: z.string(),
        quantity: z.coerce.number(),
      })
    ),
    rescuer_entries: z.array(
      z.object({
        request_id: z.coerce.number(),
        employee_id: z.coerce.number(),
      })
    ),
  });
  const form = useForm<z.infer<typeof RequestSchema>>({
    resolver: zodResolver(RequestSchema),
    defaultValues: {
      requester_first_name: "",
      requester_last_name: "",
      requester_email: "",
      requester_contact_number: 0,
      employee_id: "",
      rescuer_id: "",
      calamity_types_id: "",
      total_stocks_used: 0,
      use_equipments: [],
      use_foodsupplies: [],
      use_vehicles: [],
      status: "Completed",
      coordinates: "",
      rescuer_entries: [],
    },
  });

  useEffect(
    () => {
      // if form has error then console.log
      console.log(form.formState.errors);
      console.log(requestCart);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form.formState.errors, requestCart]
  );

  form.setValue("use_equipments", requestCart.equipmentsCart);
  form.setValue("use_foodsupplies", requestCart.foodsuppliesCart);
  form.setValue("use_vehicles", requestCart.vehiclesCart);
  form.setValue(
    "total_stocks_used",
    (
      requestCart.equipmentsCart.reduce(
        (acc: any, equipment: any) => acc + equipment.quantity,
        0
      ) +
      requestCart.foodsuppliesCart.reduce(
        (acc: any, foodsupply: any) => acc + foodsupply.quantity,
        0
      ) +
      requestCart.vehiclesCart.reduce(
        (acc: any, vehicle: any) => acc + vehicle.quantity,
        0
      )
    ).toFixed(3)
  );
  form.setValue(
    "total_price",
    Number(
      (
        requestCart.equipmentsCart.reduce(
          (acc: any, equipment: any) => acc + equipment.quantity,
          0
        ) +
        requestCart.foodsuppliesCart.reduce(
          (acc: any, foodsupply: any) => acc + foodsupply.quantity,
          0
        ) +
        requestCart.vehiclesCart.reduce(
          (acc: any, vehicle: any) => acc + vehicle.quantity,
          0
        )
      )
        .toFixed(3)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    )
  );
  [
    requestCart.foodsuppliesCart,
    requestCart.equipmentsCart,
    requestCart.vehiclesCart,
    minTotalPrice,
    form,
  ];

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await createRequest(data, 500);

      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "⚠️Error",
          description: error.message,
        });
        return;
      }

      setDialogOpen(false);
      sonner("✨Success", {
        description: `Service Order Successful!`,
      });

      new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
        dispatch(resetCart());
        dispatch(resetRequestvehicleCart());
      });
    });
  }

  function onCancel(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    dispatch(resetCart());
    dispatch(resetRequestvehicleCart());
    setDialogOpen(false);
    sonner("✨Cancelled", {
      description: `Service Order Cancelled!`,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="w-full flex justify-between gap-4">
          <div className="w-[60%] 2xl:w-[50%] h-full rounded-lg overflow-hidden">
            <RequestCartOptions />
          </div>
          <ScrollArea className="w-full h-[553px] 2xl:h-[657px] flex flex-col justify-between bg-darkBg rounded-lg border border-lightBorder p-0 px-4 gap-0 relative">
            <div className="w-full h-full flex flex-col gap-6 justify-between relative">
              <Accordion
                type="multiple"
                className="w-full rounded-none relative"
                defaultValue={[
                  "item-0",
                  "item-1",
                  "item-2",
                  "item-3",
                  "item-4",
                ]}
              >
                <AccordionItem value="item-0">
                  <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                    requester
                  </AccordionTrigger>
                  <AccordionContent className="bg-darkComponentBg rounded-xl">
                    <div className="w-full flex flex-col gap-4 px-2">
                      <div className="w-full flex gap-4">
                        <div className="w-[75%] flex flex-col">
                          <FormField
                            control={form.control}
                            name="requester_first_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  First Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="text"
                                    placeholder="Enter First Name"
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[75%] flex flex-col">
                          <FormField
                            control={form.control}
                            name="requester_last_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Last Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="text"
                                    placeholder="Enter Last Name"
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-full flex flex-col">
                          <FormField
                            control={form.control}
                            name="requester_contact_number"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Contact Number
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    {...field}
                                    accept="number"
                                    type="number"
                                    placeholder="#"
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full flex gap-4">
                        <div className="w-[75%] flex flex-col ">
                          <FormField
                            control={form.control}
                            name="requester_email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Email</FormLabel>
                                <FormControl>
                                  <Input
                                    className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                    {...field}
                                    type="text"
                                    placeholder="example@gmail.com"
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[75%] flex flex-col">
                          <FormField
                            control={form.control}
                            name="use_calamity_types"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="text-xs">
                                  Calamity Types
                                </FormLabel>
                                <FormControl className="bg-white">
                                  <MultiSelectFormField
                                    options={allCalamityTypes}
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Select Calamity Types"
                                    animation={2}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-full flex flex-col ">
                          <FormField
                            control={form.control}
                            name="rescuer_entries"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel className="text-xs">
                                  Rescuers
                                </FormLabel>
                                <FormControl className="bg-white">
                                  <MultiSelectFormField
                                    options={allRescuers}
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Select Rescuers"
                                    animation={2}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-[29%] flex flex-col">
                        <FormField
                          control={form.control}
                          name="coordinates"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">
                                Coordinates
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="rounded-lg bg-lightComponentBg border-slate-600/50"
                                  {...field}
                                  type="text"
                                  placeholder="Enter the coordinates"
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                    Equipments Summary
                  </AccordionTrigger>
                  <AccordionContent className="bg-darkComponentBg rounded-xl">
                    <EquipmentsCart
                      columns={initiateEquipmentsCartColumns(
                        dispatch,
                        requestCartOptions.equipmentsData
                      )}
                      data={requestCart.equipmentsCart}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                    Food Supply Summary
                  </AccordionTrigger>
                  <AccordionContent className="bg-darkComponentBg rounded-xl">
                    <FoodSuppliesCart
                      columns={
                        requestCartOptions &&
                        requestCartOptions.foodsuppliesData
                          ? initiateFoodSupplyCartColumns(
                              dispatch,
                              requestCartOptions.foodsuppliesData
                            )
                          : []
                      }
                      data={requestCart.foodsuppliesCart}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                    Vehicles Summary
                  </AccordionTrigger>
                  <AccordionContent className="bg-darkComponentBg rounded-xl">
                    <VehiclesCart
                      columns={
                        requestCartOptions && requestCartOptions.vehiclesData
                          ? initiateVehiclesCartColumns(
                              dispatch,
                              requestCartOptions.vehiclesData
                            )
                          : []
                      }
                      data={requestCart.vehiclesCart}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="font-bold bg-darkBg sticky top-0">
                    Search Location
                  </AccordionTrigger>
                  <AccordionContent className="rounded-xl flex flex-row">
                    <div className="flex flex-row gap-4 px-4 py-2 w-full">
                      <div className="flex flex-col">
                        <LocationSearch control={form.control} />
                        {/* <MapContainer></MapContainer> */}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="w-full flex-col relative">
                <div className="w-full py-2 flex gap-8 position sticky bottom-[-4px] bg-darkBg m-0 text-sm">
                  <span className="w-full text-end text-slate-400">
                    Subtotal
                  </span>
                  <span className="w-[20%] text-end">
                    {(requestCart.foodsuppliesCart?.reduce(
                      (acc: any, foodsupply: any) =>
                        acc + (foodsupply.quantity ?? 0),
                      0
                    ) ?? 0) +
                      (requestCart.vehiclesCart?.reduce(
                        (acc: any, vehicle: any) =>
                          acc + (vehicle.quantity ?? 0),
                        0
                      ) ?? 0) +
                      (requestCart.equipmentsCart?.reduce(
                        (acc: any, equipment: any) =>
                          acc + (equipment.quantity ?? 0),
                        0
                      ) ?? 0)}
                  </span>
                </div>

                <div className="w-full py-6 flex gap-8 position sticky bottom-[-4px] bg-darkBg m-0 text-lg font-bold">
                  <span className="w-full text-end">Total</span>
                  <span className="w-[20%] text-end">
                    {requestCart.foodsuppliesCart.reduce(
                      (acc: any, foodsupply: any) => acc + foodsupply.quantity,
                      0
                    ) +
                      requestCart.vehiclesCart.reduce(
                        (acc: any, vehicle: any) => acc + vehicle.quantity,
                        0
                      ) +
                      requestCart.equipmentsCart.reduce(
                        (acc: any, equipment: any) => acc + equipment.quantity,
                        0
                      )}
                  </span>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
        <DialogFooter>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-red-500 primary-glow transition-all duration-300"
            onClick={(event) => onCancel(event)}
          >
            Cancel
          </Button>
          <Button
            className="text-xs font-bold rounded-lg min-w-[105px] flex justify-center place-items-center gap-2 bg-primary/90 hover:bg-primary primary-glow transition-all duration-300"
            type="submit"
          >
            <span className={cn({ hidden: isPending })}>Create Request</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
