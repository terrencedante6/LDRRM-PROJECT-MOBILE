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
    console.log("Fetched rescuers data:", data);
    setAllRescuerData(data);
  };

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    console.log("Signing in with email and password:", email);
    const { data, error } = await supabase
      .from("employees_mobile")
      .select(
        `
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
      `
      )
      .eq("email", email)
      .eq("password", password); // Assuming password check is done here for simplicity

    if (error) {
      console.error("Error signing in:", error);
      return;
    }
    console.log("Sign in successful, setting current rescuer data");
    setCurrentRescuerData(data);
  };

  const signUpWithEmailAndPassword = async (newRescuerData: Rescuer) => {
    console.log("Signing up with email and password:", newRescuerData.email);
    const { error } = await supabase
      .from("employees_mobile")
      .insert([newRescuerData])
      .single();

    if (error) {
      console.error("Error signing up:", error);
      return;
    }
    console.log("Sign up successful");
  };

  const getRescuer = async (email: string) => {
    console.log("Fetching rescuer data for:", email);
    const { data, error } = await supabase
      .from("employees_mobile")
      .select(
        `
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
      `
      )
      .eq("email", email);

    if (error) {
      console.error("Error fetching rescuer:", error);
      return;
    }

    console.log("Fetched rescuer data:", data);
    setCurrentRescuerData(data);
  };

  return {
    allRescuerData,
    currentRescuerData,
    getRescuer,
    getRescuers,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
  };
};
