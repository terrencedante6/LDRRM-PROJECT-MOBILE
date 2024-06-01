import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const useRequests: any = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [requestsData, setRequestsData] = useState<any>([]);
  const [currentRequestData, setCurrentRequestData] = useState<any>([]);

  const createRequest = async (props: any, duration?: any) => {
    const result: any = await supabase
      .from("requests")
      .insert({
        requester_first_name: props.requester_first_name,
        requester_last_name: props.requester_last_name,
        requester_contact_number: props.requester_contact_number,
        requester_email: props.requester_email,
        status: props.status,
        employee_id: props.employee_id,
        coordinates: props.coordinates,
      })
      .select();

    if (result.error) {
      return result.error;
    }

    const foodsupplyResult = await supabase
      .from("use_foodsupplies")
      .insert(
        props.use_foodsupply.map((foodsupply: any) => ({
          request_id: result.data[0].id,
          foodsupply_id: foodsupply.foodsupply_id,
          name: foodsupply.name,
          description: foodsupply.description,
          image_url: foodsupply.image,
          quantity: foodsupply.quantity,
        }))
      )
      .select();

    const vehicleResult = await supabase
      .from("use_vehicles")
      .insert(
        props.use_vehicle.map((vehicle: any) => ({
          request_id: result.data[0].id,
          vehicle_id: vehicle.vehicle_id,
          name: vehicle.name,
          description: vehicle.description,
          platenumber: vehicle.plate_number,
          image_url: vehicle.image,
          quantity: vehicle.quantity,
        }))
      )
      .select();

    const EquipmentResult = await supabase
      .from("use_equipments")
      .insert(
        props.use_equipments.map((equipment: any) => ({
          request_id: result.data[0].id,
          equipment_id: equipment.equipment_id,
          name: equipment.name,
          description: equipment.description,
          image_url: equipment.image,
          quantity: equipment.quantity,
        }))
      )
      .select();

    const rescuerResult = await supabase.from("rescuer_entries").insert(
      props.rescuer_entries.map((rescuer: any) => ({
        order_id: result.data[0].id,
        employee_id: rescuer,
      }))
    );

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };
  const getRequests = async (props?: any) => {
    if (props?.roles?.role !== "Administrator") {
      return;
    }

    const { data, error } = await supabase
      .from("requests")
      .select(
        'id,created_at, status, requester_first_name, requester_last_name, coordinates, employees(id, first_name, last_name, image_url, contact_number, email, roles(role)), use_calamity_types(id, name, description),rescuer_entries("*",rescuer:employees!rescuer_entries_employee_id_fkey(id,first_name,last_name,image_url,contact_number,email,roles(role)))'
      )
      .order("created_at", { ascending: false });

    if (error) {
      return error;
    }

    return setRequestsData(data);
  };
  const getRequest = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("requests")
      .select(
        `
        id,
        requester_first_name,
        requester_last_name,
        requester_contact_number,
        requester_email,
        coordinates,
        employees(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          )
        ),
        use_food_supplies(
          id,
          product_id,
          name,
          description,
          barcode,
          image_url,
          price,
          quantity,
          uom_name
        ),
        use_equipments(
          id,
          part_id,
          name,
          description,
          barcode,
          image_url,
          price,
          quantity,
          brand
        ),
        use_vehicles(
          id,
          part_id,
          name,
          description,
          barcode,
          image_url,
          price,
          quantity,
          brand
        ),
        use_calamity_types(
          id,
          name,
          description,
          image_url,
        ),
        rescuer_entries("*",
          rescuer:employees!rescuer_entries_employee_id_fkey(
            id,
            first_name,
            last_name,
            image_url,
            contact_number,
            email,
            roles(
              role
            )
          )
        ),

        status,
        created_at
    `
      )

      .eq("id", id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    setCurrentRequestData(data);
    return error;
  };
  const updateRequest = async (props: any, duration?: number) => {
    const result = await supabase
      .from("requests")
      .update({
        name: props.name,
        description: props.description,
        image_url: props.image_url,
        barcode: props.barcode,
        uom_id: props.uom_id,
        stock_quantity: props.stock_quantity,
        price: props.price,
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };
  const updateRequestStatus = async (props: any, duration?: number) => {
    const result = await supabase
      .from("requests")
      .update({
        status: props.status,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteRequest = async (props: any, duration: number = 2000) => {
    const result = await supabase.from("requests").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };

  return {
    // states
    requestsData,
    currentRequestData,

    // methods
    createRequest,
    getRequest,
    getRequests,
    updateRequest,
    updateRequestStatus,
    deleteRequest,
  };
};
