import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useState } from "react";

interface Role {
  id: string; // Updated to string for specificity
  role: string;
}

interface Rescuer {
  id: string; // Updated to string for specificity
  email: string;
  first_name: string;
  last_name: string;
  image_url: string;
  address: string;
  contact_number: string;
  gender: string;
  roles: Role[]; // Updated to use Role interface
  status: string;
  dob: Date; // Updated to Date assuming dob is a date
}

export const useRescuers = () => {
  const supabase = createSupabaseBrowserClient();
  const [allRescuerData, setAllRescuerData] = useState<Rescuer[]>([]);
  const [currentRescuerData, setCurrentRescuerData] = useState<Rescuer[]>([]);

  const getRescuers = async () => {
    console.log("Fetching all rescuers");
    const { data, error } = await supabase.from("employees_mobile").select(`
      id,
      email,
      first_name,
      last_name,
      image_url,
      address,
      contact_number,
      gender,
      roles (id, role),
      status,
      dob
    `);

    if (error) {
      console.error("Error fetching rescuers:", error);
      return;
    }

    setAllRescuerData(data);
    setCurrentRescuerData(data);
  };

  const signUpRescuer = async (rescuer: {
    email: string;
    first_name: string;
    last_name: string;
    password: string; // Ensure you handle password securely
    address: string;
    contact_number: string;
    gender: string;
    role: string; // Assuming role is a string to be matched in roles table
    dob: Date;
  }) => {
    // Assuming role needs to be resolved to an ID from roles table
    const { data: rolesData, error: rolesError } = await supabase
      .from("roles")
      .select("id")
      .eq("role", rescuer.role)
      .single();

    if (rolesError || !rolesData) {
      console.error("Role not found or error fetching role:", rolesError);
      return;
    }

    const { data, error } = await supabase.from("employees_mobile").insert([
      {
        email: rescuer.email,
        first_name: rescuer.first_name,
        last_name: rescuer.last_name,
        password: rescuer.password, // Ensure you hash the password before storing
        address: rescuer.address,
        contact_number: rescuer.contact_number,
        gender: rescuer.gender,
        roles: [{ id: rolesData.id }],
        dob: rescuer.dob,
        status: "active", // Assuming default status
      },
    ]);

    if (error) {
      console.error("Error creating rescuer account:", error);
      return;
    }

    // Optionally update state or do something with the result here
    console.log("Rescuer account created successfully:", data);
  };

  const signInRescuerWithEmailAndPassword = async (
    props: any,
    duration?: number
  ) => {
    const result = await supabase
      .from("employees_mobile")
      .select(
        `
        id,
        first_name,
        last_name,
        email,
        password,
        image_url,
        dob,
        gender,
        address,
        contact_number,    
        created_at
      `
      )
      .eq("email", props.email);
    if (result.error) return result;
    await new Promise((resolve) => setTimeout(resolve, duration));
    // setCurrentRescuerData(result.data); // Assuming you have a similar function for rescuers
    return result;
  };

  return {
    allRescuerData,
    currentRescuerData,
    signInRescuerWithEmailAndPassword,

    getRescuers,
    signUpRescuer,
  };
};
