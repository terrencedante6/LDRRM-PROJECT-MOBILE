/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import Loading from "./skeleton";
import InventoryContent from "./inventory-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast as sonner } from "sonner";
import { toast } from "@/components/ui/use-toast";
import { useEquipments } from "@/hooks/useEquipments";
import { useFoodSupplies } from "@/hooks/useFoodSupplies";
import { useVehicles } from "@/hooks/useVehicles";
import { useDispatch } from "react-redux";

export default function Inventory() {
  const dispatch = useDispatch();

  const { getFoodSupplies, allFoodSupplies } = useFoodSupplies();
  const { getEquipments, equipmentsData } = useEquipments();
  const { getVehicles, vehiclesData } = useVehicles();
  useEffect(() => {
    const { error } = getFoodSupplies();

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
  }, []);

  // fetch all parts
  useEffect(() => {
    const { error } = getEquipments();

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
  }, []);

  // fetch all services
  useEffect(() => {
    const { error } = getVehicles();

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
  }, []);

  // listen for changes in the database
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel1 = supabase
      .channel("food-supplies-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "food_supplies" },
        (payload: any) => {
          getFoodSupplies();
        }
      )
      .subscribe();
    const subscribedChannel2 = supabase
      .channel("equipments-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "equipments" },
        (payload: any) => {
          getEquipments();
        }
      )
      .subscribe();
    const subscribedChannel3 = supabase
      .channel("vehicles-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "vehicles" },
        (payload: any) => {
          getVehicles();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscribedChannel1);
      supabase.removeChannel(subscribedChannel2);
      supabase.removeChannel(subscribedChannel3);
    };
  }, []);

  return (
    <div className="flex flex-col justify-start place-items-center w-full h-full gap-0 p-0">
      <div className="space-y-2 w-[90%] h-fit bg-opacity-85 p-4 rounded-2xl">
        <div className="w-full flex justify-center py-3.5 no-scrollbar ">
          {allFoodSupplies.length === 0 ? (
            <Loading />
          ) : (
            <InventoryContent
              dataFood_supplies={allFoodSupplies}
              dataEquipments={equipmentsData}
              dataVehicles={vehiclesData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
