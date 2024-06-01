/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import Loading from "./skeleton";
import TransactionsContent from "./transactions-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast as sonner } from "sonner";
import { toast } from "@/components/ui/use-toast";
import { useRequests } from "@/hooks/useOrders";
import { HomeIcon } from "lucide-react";
import { setBranchesData } from "@/redux/slices/branchesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEquipments } from "@/hooks/useEquipments";
import { useFoodSupplies } from "@/hooks/useFoodSupplies";
import {
  setEquipmentsData,
  setFoodSuppliesData,
  setVehiclesData,
} from "@/redux/slices/orderCartOptionSlice";
import { useVehicles } from "@/hooks/useVehicles";

export default function Transactions() {
  const dispatch = useDispatch();

  const { getRequests, requestsData } = useRequests();
  // const { getBranches, allBranchesData } = useBranches();
  // const { getProducts, productsData } = useProducts();
  const { getEquipments, equipmentsData } = useEquipments();
  const { getFoodSupplies, allFoodSupplies } = useFoodSupplies();
  const { getVehicles, vehiclesData } = useVehicles();

  // const branchesData = allBranchesData.map((branch: any) => ({
  //   id: branch?.id,
  //   value: branch?.branch_name,
  //   label: branch?.branch_name,
  //   icon: HomeIcon,
  // }));

  const foodsuppliesCart = useSelector(
    (state: any) => state.requestCart.foodsuppliesCart
  );
  const equipmentsCart = useSelector(
    (state: any) => state.requestCart.equipmentsCart
  );
  const vehiclesCart = useSelector(
    (state: any) => state.requestCart.vehiclesCart
  );
  console.log(allFoodSupplies);

  // dispatch(setBranchesData(branchesData));

  dispatch(setFoodSuppliesData({ allFoodSupplies, foodsuppliesCart }));
  dispatch(setEquipmentsData({ equipmentsData, equipmentsCart }));
  dispatch(setVehiclesData({ vehiclesData, vehiclesCart }));

  // fetch all products
  useEffect(() => {
    const { error } = getRequests();

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
    // getBranches();
    getFoodSupplies();
    getEquipments();
    getVehicles();
  }, []);

  // listen for changes in the database
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel1 = supabase
      .channel("orders-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "requests" },
        (payload: any) => {
          getRequests();
        }
      )
      .subscribe();
    const subscribedChannel2 = supabase
      .channel("products-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "food_supplies" },
        (payload: any) => {
          getFoodSupplies();
          getRequests();
        }
      )
      .subscribe();
    const subscribedChannel3 = supabase
      .channel("equipments-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "equipments" },
        (payload: any) => {
          getEquipments();
          getRequests();
        }
      )
      .subscribe();
    const subscribedChannel4 = supabase
      .channel("vehicles-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "vehicles" },
        (payload: any) => {
          getVehicles();
          getRequests();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscribedChannel1);
      supabase.removeChannel(subscribedChannel2);
      supabase.removeChannel(subscribedChannel3);
      supabase.removeChannel(subscribedChannel4);
    };
  }, []);

  return (
    <div className="flex flex-col justify-start place-items-center w-full h-full gap-0 p-0">
      <div className="space-y-2 w-[90%] h-fit bg-opacity-85 p-4 rounded-2xl">
        <div className="w-full flex justify-center py-3.5 no-scrollbar ">
          {/* {requestsData.length === 0 ? (
            <Loading />
          ) : (
          )} */}
          <TransactionsContent dataRequests={requestsData} />
        </div>
      </div>
    </div>
  );
}
