"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { redirect, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useMobileUsers } from "@/hooks/useMobileUsers";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Image from "next/image";
import amlanldrrmlogo from "@/images/amlanldrrmlogo.png";

const signUpScheema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  repeat_password: z.string().min(8, { message: "Passwords must match" }),
});
export default function RescuerLogin() {
  const router = useRouter();
  const [authSwitch, setAuthSwitch] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { signInWithEmailAndPassword, signUpWithEmailAndPassword } =
    useMobileUsers();
  const form1 = useForm<z.infer<typeof signUpScheema>>({
    resolver: zodResolver(signUpScheema),
  });

  async function onSignUpSubmit(data: z.infer<typeof signUpScheema>) {
    startTransition(async () => {
      if (data.password !== data.repeat_password) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Passwords do not match",
        });
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const result = await signUpWithEmailAndPassword(data);

      const { error } = result;
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Email already exists",
        });
        return;
      }

      toast({
        className: cn(
          "top-0 left-0 right-0 mx-auto max-w-[350px] rounded-2xl py-3 px-7 flex fixed top-3 md:top-4 bg-blue-600 text-white shadow-xl border-transparent font-medium"
        ),
        title: "✅ Sucess",
        description: `Signup Successful!`,
      });

      router.push("/auth/login");

      return setAuthSwitch(!authSwitch);
    });
  }

  //debuggin zone

  // const axios = require('axios');

  // async function sendVerificationCode(phoneNumber, code) {
  //   const response = await axios.post('https://api.infobip.com/sms/1/text/single', {
  //     from: 'YourAppName',
  //     to: phoneNumber,
  //     text: `Your verification code is ${code}`
  //   }, {
  //     headers: {
  //       'Authorization': 'Basic ' + Buffer.from('yourInfobipUsername:yourInfobipPassword').toString('base64'),
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   });

  //   return response.data;
  // }

  //debuggin zone

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="hidden w-full min-h-screen md:flex justify-center place-items-center">
        <h1 className="text-white">Download The App</h1>
      </div>
      <div
        className="md:hidden flex flex-col place-items-start justify-start w-full max-h-screen h-screen overflow-hidden"
        style={{ backgroundColor: "rgb(18,18,18)" }}
      >
        <motion.div
          className="w-full h-fit pt-8 pb-4 flex flex-col justify-center place-items-center gap-4 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Image
            src={amlanldrrmlogo}
            alt=""
            className="mx-auto pointer-events-none cursor-pointer w-[30%] z-50"
            onClick={() => router.push("/")}
          />
          <motion.div
            className="w-full z-10 absolute top-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          ></motion.div>
        </motion.div>

        <AnimatePresence>
          {!authSwitch && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, y: 300 }}
              animate={{ opacity: 1, y: 30 }}
              exit={{ opacity: 0, y: 300 }}
              transition={{ duration: 0.2, delay: 0.5 }}
              className="w-full h-[80%] rounded-t-[20px] p-8 flex flex-col gap-2 absolute bottom-0 z-50 overflow-hidden "
              style={{ backgroundColor: "rgb(31,31,31)" }}
            >
              <div className="w-full flex flex-col gap-3">
                <h1 className="w-full text-white text-3xl font-bold items-center text-center ">
                  LDRRMO AMLAN
                </h1>
                <h2 className="w-full text-white text-xl font-bold items-center text-center">
                  Employee portal
                </h2>
              </div>
              <span className="w-full text-green-600 text-lg font-bold items-center text-center italic pt-6">
                "We Risk Ourselves To Save Lives"
              </span>
              <div className="w-full flex flex-col justify-center place-items-center h-fit gap-11 z-40">
                <Form {...form1}>
                  <form
                    className="flex flex-col w-full gap-2"
                    onSubmit={form1.handleSubmit(onSignUpSubmit)}
                  >
                    {/* <span>First/Last Name</span> */}
                    <div className="w-full flex justify-between gap-3">
                      <div className="flex flex-col w-full gap-3">
                        <FormField
                          control={form1.control}
                          name="first_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-white pointer-events-none">
                                First name
                              </FormLabel>
                              <FormControl>
                                <input
                                  title="first_name"
                                  type="text"
                                  placeholder="First Name"
                                  className="w-full text-sm px-4 h-[45px] rounded-xl bg-lightBorder text-black border border-lightBorder"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col w-full gap-3">
                        <FormField
                          control={form1.control}
                          name="last_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-white pointer-events-none">
                                Last name
                              </FormLabel>
                              <FormControl>
                                <input
                                  title="last_name"
                                  type="text"
                                  placeholder="Last Name"
                                  className="w-full text-sm px-4 h-[45px] rounded-xl bg-lightBorder text-black border border-lightBorder"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    {/* <span>Email/Password/Repeat Password</span> */}
                    <div className="flex flex-col w-full gap-1">
                      <div className="flex flex-col w-full gap-3">
                        <FormField
                          control={form1.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-white pointer-events-none">
                                Email
                              </FormLabel>
                              <FormControl>
                                <input
                                  title="email"
                                  type="text"
                                  placeholder="Enter your email"
                                  className="w-full text-sm px-4 h-[45px] rounded-xl bg-lightBorder text-black border border-lightBorder"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex flex-col w-full gap-3">
                        <FormField
                          control={form1.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-white pointer-events-none">
                                Password
                              </FormLabel>
                              <FormControl>
                                <input
                                  type="password"
                                  placeholder="••••••••••"
                                  className="w-full text-sm px-4 h-[45px] rounded-xl bg-lightBorder text-black border border-lightBorder"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col w-full gap-0">
                        <FormField
                          control={form1.control}
                          name="repeat_password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-white pointer-events-none">
                                Repeat Password
                              </FormLabel>
                              <FormControl>
                                <input
                                  type="password"
                                  placeholder="••••••••••"
                                  className="w-full text-sm px-4 h-[45px] rounded-xl bg-lightBorder text-black border border-lightBorder"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* <span>button area</span> */}
                    <div className="w-full flex text-center justify-center mt-2">
                      <Button
                        type="submit"
                        className="text-xl w-[40%] h-[110%] rounded-xl text-center transform active:scale-90 transition-transform"
                      >
                        <span
                          className={cn("pointer-events-none", {
                            hidden: isPending,
                          })}
                        >
                          Sign Up
                        </span>
                        <AiOutlineLoading3Quarters
                          className={cn("pointer-events-none animate-spin", {
                            hidden: !isPending,
                          })}
                        />
                      </Button>
                    </div>
                    {/* <span>button area</span> */}
                  </form>
                </Form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <Toaster />
      </div>
    </div>
  );
}
