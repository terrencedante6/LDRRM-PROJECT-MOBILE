"use client";
import React from "react";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTransition } from "react";
import { toast as sonner } from "sonner";
import { signOut } from "@/lib/actions/index";
import { User } from "lucide-react";
import { DoorOpen } from "lucide-react";

import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/redux/slices/userSessionSlice";
import { useRouter } from "next/navigation";

export function UserNav({ data }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  dispatch(setCurrentUser(data));
  console.log(data);

  const [isPending, startTransition] = useTransition();
  const onSignOut = async () => {
    sonner("Loggin out...", {});
    startTransition(async () => {
      await signOut();
    });
  };

  const Page = () => {
    router.push(`/application/profile/${data.id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="w-12 h-12 cursor-pointer rounded-lg shadow-2xl duration-300">
            <AvatarImage
              src={data.image_url}
              className=" shadow-2xl rounded-md duration-300"
            />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {data && (
          <DropdownMenuLabel className="font-normal flex flex-col gap-1">
            <span>{`${data.first_name} ${data.last_name}`}</span>
            <span className="text-xs text-gray-900">{data.roles.role}</span>
          </DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="rounded-lg cursor-pointer hover:bg-blue-400 hover:text-white"
            onClick={() => {
              Page();
            }}
          >
            <User className="mr-2 h-7 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="rounded-lg cursor-pointer hover:bg-red-400 hover:text-white"
          onClick={() => {
            onSignOut();
          }}
        >
          <DoorOpen className="mr-2 h-7 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
