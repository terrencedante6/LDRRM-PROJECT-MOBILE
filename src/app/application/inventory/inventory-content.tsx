import { DataTable as EquipmentsDataTable } from "./inventory-table/equipments-table/data-table";
import { DataTable as FoodSuppliesDataTable } from "./inventory-table/food-supplies-table/data-table";
import { DataTable as VehiclesDataTable } from "./inventory-table/vehicles-table/data-table";

import { initialState as initiateEquipmentsState } from "./inventory-table/equipments-table/columns";
import { initialState as initiateFood_suppliesState } from "./inventory-table/food-supplies-table/columns";
import { initialState as initiateVehiclesState } from "./inventory-table/vehicles-table/columns";

import {
  allEquipmentsDisplay,
  allFood_suppliesDisplay,
  allVehiclesDisplay,
} from "@/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiGearSixBold } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { FaAmbulance, FaToolbox } from "react-icons/fa";

export default function InventoryContent({
  dataEquipments,
  dataFood_supplies,
  dataVehicles,
}: {
  dataEquipments: allEquipmentsDisplay[];
  dataFood_supplies: allFood_suppliesDisplay[];
  dataVehicles: allVehiclesDisplay[];
}) {
  return (
    <Tabs
      defaultValue="equipments"
      className="w-full flex max-w-[1580px] flex-col justify-center place-items-center "
    >
      <div className="w-full">
        <TabsList className="h-fit rounded-lg gap-2 bg-white">
          <TabsTrigger
            value="equipments"
            className="data-[state=active]:bg- data-[state=inactive]:hover:bg-/80
            data-[state=inactive]:hover:text-slate-500
            data-[state=active]:text-white data-[state=active]:bg-primary rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
          >
            <FaToolbox />
            Equipments
          </TabsTrigger>
          <TabsTrigger
            value="food_supplies"
            className="data-[state=active]:bg- data-[state=inactive]:hover:bg-/80
            data-[state=inactive]:hover:text-slate-500
            data-[state=active]:text-white data-[state=active]:bg-primary rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
          >
            <BsBoxSeam />
            Food Supplies
          </TabsTrigger>
          <TabsTrigger
            value="vehicles"
            className="data-[state=active]:bg- data-[state=inactive]:hover:bg-/80
            data-[state=inactive]:hover:text-slate-500
            data-[state=active]:text-white data-[state=active]:bg-primary rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
          >
            <FaAmbulance />
            Vehicles
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="food_supplies" className="w-full h-full ">
        <FoodSuppliesDataTable
          columns={initiateFood_suppliesState()}
          data={dataFood_supplies}
        />
      </TabsContent>
      <TabsContent value="equipments" className="w-full h-full ">
        <EquipmentsDataTable
          columns={initiateEquipmentsState()}
          data={dataEquipments}
        />
      </TabsContent>
      <TabsContent value="vehicles" className="w-full h-full">
        <VehiclesDataTable
          columns={initiateVehiclesState()}
          data={dataVehicles}
        />
      </TabsContent>
    </Tabs>
  );
}
