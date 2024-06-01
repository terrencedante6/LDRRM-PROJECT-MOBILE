import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import { useSelector } from "react-redux";

export default function SelectDemo({ data, rolesData }: any) {
  const userSession = useSelector((state: any) => state.currentSession);
  function findRoleById(idString: any) {
    const id = parseInt(idString);

    const foundItem = rolesData.find((item: any) => item.id === id);

    if (foundItem) {
      return foundItem.role;
    } else {
      return "Role not found";
    }
  }

  const roles = rolesData.filter(
    (role: any) => role.role !== "Manager" && role.role !== "Administrator"
  );
  return (
    <Select onValueChange={data.onChange}>
      <FormControl>
        <SelectTrigger
          id="role"
          name="role"
          className="w-full bg-lightComponentBg border-slate-600/50 rounded-lg "
          {...data}
          value={data.value}
        >
          <SelectValue
            className="text-white"
            placeholder={data ? findRoleById(data.value) : "Select a role"}
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent className="rounded-lg bg-lightComponentBg border-slate-600/50 text-black bg-white">
        <SelectGroup>
          {userSession.roles.role === "Administrator"
            ? rolesData.map((role: any) => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  {role.role}
                </SelectItem>
              ))
            : roles.map((role: any) => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  {role.role}
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
