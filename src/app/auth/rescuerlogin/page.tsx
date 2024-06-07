// "use client";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { redirect, useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState, useTransition } from "react";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { Toaster } from "@/components/ui/toaster";
// import { toast } from "@/components/ui/use-toast";
// import { motion } from "framer-motion";
// import { AnimatePresence } from "framer-motion";
// import { useRescuers } from "@/hooks/useRescuerMobile";
// import { useLocalStorage } from "@/hooks/useLocalStorage";
// import Image from "next/image";
// import amlanldrrmlogo from "@/images/amlanldrrmlogo.png";

// import DobInput from "./add-employee/dob-input";
// import RoleInput from "./add-employee/roles-input";
// import GenderInput from "./add-employee/gender-input";

// // Assuming your schema is defined as signUpSchema
// const signUpSchema = z.object({
//   first_name: z.string().min(1, { message: "First name is required" }),
//   last_name: z.string().min(1, { message: "Last name is required" }),
//   email: z.string().email({ message: "Must be a valid email" }),
//   password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters" }),
//   image_url: z.string().default("something"),
//   address: z.string().min(1, { message: "Address is required" }),
//   contact_number: z.coerce
//     .number()
//     .min(1, { message: "Contact number is required" }),
//   gender: z.string().default("Male"),
//   dob: z
//     .date()
//     .min(new Date(1900, 1, 1), { message: "Date of birth is required" }),
//   role: z
//     .string()
//     .min(1, { message: "Role is required" })
//     .transform((arg) => Number(arg)),
//   status: z.string().default("Available"),
// });

// export default function RescuerRegister() {
//   const router = useRouter();
//   const [authSwitch, setAuthSwitch] = useState(false);
//   const [isPending, startTransition] = useTransition();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(signUpSchema),
//   });

//   const { setItem, getItem } = useLocalStorage("value");
//   const currentUser = getItem();
//   if (currentUser) {
//     router.push("/application");
//   }

//   const { signInWithEmailAndPassword, signUpWithEmailAndPassword } =
//     useRescuers();
//   const form1 = useForm<z.infer<typeof signUpSchema>>({
//     resolver: zodResolver(signUpSchema),
//   });

//   async function onSignUpSubmit(data: z.infer<typeof signUpSchema>) {
//     startTransition(async () => {
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       const result = await signUpWithEmailAndPassword(data);

//       const rescuerData: Rescuer = {
//         ...data,
//         contact_number: data.contact_number.toString(), // Ensure contact_number is a string
//         roles: [{ id: "role_id", role: "role" }], // Example transformation, adjust based on actual form data
//       };

//       const result = await signUpWithEmailAndPassword(rescuerData);

//       if (result.error?.message) {
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: "Email already exists",
//         });
//         return;
//       }

//       toast({
//         className: cn(
//           "top-0 left-0 right-0 mx-auto max-w-[350px] rounded-2xl py-3 px-7 flex fixed top-3 md:top-4 bg-blue-600 text-white shadow-xl border-transparent font-medium"
//         ),
//         title: "✅ Success",
//         description: `Signup Successful!`,
//       });

//       router.push("/auth/login");
//     });
//   }

//   return (
//     <div className="w-full min-h-screen flex flex-col">
//       <div className="hidden w-full min-h-screen md:flex justify-center place-items-center">
//         <h1 className="text-white">Download The App</h1>
//       </div>
//       <div
//         className="md:hidden flex flex-col place-items-start justify-start w-full max-h-screen h-screen overflow-hidden"
//         style={{ backgroundColor: "rgb(18,18,18)" }}
//       >
//         <motion.div
//           className="w-full h-fit pt-8 pb-4 flex flex-col justify-center place-items-center gap-4 relative"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//         >
//           <Image
//             src={amlanldrrmlogo}
//             alt=""
//             className="mx-auto pointer-events-none cursor-pointer w-[30%] z-50"
//             onClick={() => router.push("/")}
//           />
//           <motion.div
//             className="w-full z-10 absolute top-0"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.7 }}
//           ></motion.div>
//         </motion.div>

//         <AnimatePresence>
//           {/* {authSwitch && (
//           <motion.div
//             key="login"
//             initial={{ opacity: 0, y: 300 }}
//             animate={{ opacity: 1, y: 30 }}
//             exit={{ opacity: 0, y: 300 }}
//             transition={{ duration: 0.3, delay: 0.5 }}
//             className="w-full h-[80%] rounded-t-[20px] p-8 flex flex-col gap-6 absolute bottom-0 z-50 overflow-hidden "
//             style={{ backgroundColor: "rgb(31,31,31)" }}
//           >
//             <div className="w-full flex flex-col ">
//               <h1 className="w-full text-white text-2xl font-bold">
//                 Welcome Back!
//               </h1>
//               <span className="text-white text-sm">Login to continue</span>
//             </div>
//             <div
//               className="w-full flex flex-col justify-center place-items-center h-fit gap-11 z-50"
//               style={{ backgroundColor: "rgb(31,31,31)" }}
//             >
//               <Form {...form1}>
//                 <form
//                   className="flex flex-col w-full gap-4"
//                   onSubmit={form1.handleSubmit(onSignUpSubmit)}
//                 >
//                   <div className="flex flex-col w-full gap-2">
//                     <div className="flex flex-col w-full gap-3">
//                       <FormField
//                         control={form1.control}
//                         name="email"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-xs text-white pointer-events-none">
//                               Email
//                             </FormLabel>
//                             <FormControl>
//                               <input
//                                 title="email"
//                                 type="text"
//                                 placeholder="Enter your email"
//                                 className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-black border border-lightBorder "
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <div className="flex flex-col w-full gap-3">
//                       <FormField
//                         control={form1.control}
//                         name="password"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-xs text-white pointer-events-none">
//                               Password
//                             </FormLabel>
//                             <FormControl>
//                               <input
//                                 type="password"
//                                 placeholder="••••••••••"
//                                 className="w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-black border border-lightBorder "
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full flex gap-4 text-white text-lg px-5 py-2.5 h-[50px] text-center rounded-xl  bg-blue-500/75 hover:bg-applicationPrimary transform active:scale-95 transition-transform duration-300 "
//                   >
//                     <span
//                       className={cn("pointer-events-none", {
//                         hidden: isPending,
//                       })}
//                     >
//                       Login
//                     </span>
//                     <AiOutlineLoading3Quarters
//                       className={cn("pointer-events-none animate-spin", {
//                         hidden: !isPending,
//                       })}
//                     />
//                   </Button>
//                 </form>
//               </Form>
//             </div>
//             <motion.div className="w-full flex justify-center">
//               <span className="w-full text-center text-white">
//                 Dont have an account?{" "}
//                 <span
//                   onClick={() => setAuthSwitch(!authSwitch)}
//                   className="text-applicationPrimary font-bold hover:underline"
//                 >
//                   SignUp
//                 </span>
//               </span>
//             </motion.div>
//           </motion.div>
//         )} */}
//           {!authSwitch && (
//             <motion.div
//               key="signup"
//               initial={{ opacity: 0, y: 300 }}
//               animate={{ opacity: 1, y: 30 }}
//               exit={{ opacity: 0, y: 300 }}
//               transition={{ duration: 3, delay: 0.5 }}
//               className="w-full h-[100%] rounded-t-[20px] p-8 flex flex-col gap-2 absolute bottom-0 z-50 overflow-hidden "
//               style={{ backgroundColor: "rgb(31,31,31)" }}
//             >
//               <div className="w-full flex flex-col justify-center place-items-center text-center">
//                 <h1 className="w-full text-white text-2xl font-bold">
//                   LDRRMO AMLAN APP
//                 </h1>
//                 <span className="text-green-600 text-sm italic pt-2">
//                   "We Risk Ourselves To Save Lives"
//                 </span>
//               </div>
//               <div className="w-full flex flex-col justify-center place-items-center h-fit gap-11 z-40">
//                 <Form {...form1}>
//                   <form
//                     className="flex flex-col w-full gap-2"
//                     onSubmit={form1.handleSubmit(onSignUpSubmit)}
//                   >
//                     <div className="w-full flex justify-between gap-3">
//                       <div className="flex flex-col w-full gap-3">
//                         <FormField
//                           control={form1.control}
//                           name="first_name"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel className="text-xs text-white pointer-events-none">
//                                 First name
//                               </FormLabel>
//                               <FormControl>
//                                 <input
//                                   title="first_name"
//                                   type="text"
//                                   placeholder="First Name"
//                                   className="w-full text-sm px-4 h-[45px] rounded-xl bg-lightBorder text-black border border-lightBorder"
//                                   {...field}
//                                 />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                       <div className="flex flex-col w-full gap-3">
//                         <FormField
//                           control={form1.control}
//                           name="last_name"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel className="text-xs text-white pointer-events-none">
//                                 Last name
//                               </FormLabel>
//                               <FormControl>
//                                 <input
//                                   title="last_name"
//                                   type="text"
//                                   placeholder="Last Name"
//                                   className="w-full text-sm px-4 h-[45px] rounded-xl bg-lightBorder text-black border border-lightBorder"
//                                   {...field}
//                                 />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                     </div>
//                     <div className="flex flex-col w-full gap-3">
//                       <FormField
//                         control={form1.control}
//                         name="address"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-xs text-white pointer-events-none">
//                               Address
//                             </FormLabel>
//                             <FormControl>
//                               <input
//                                 title="address"
//                                 type="text"
//                                 placeholder="Address"
//                                 className="w-full text-sm px-4 h-[45px] rounded-xl bg-lightBorder text-black border border-lightBorder"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <div className="flex flex-col w-full gap-3">
//                       <FormField
//                         control={form1.control}
//                         name="contact_number"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-xs text-white pointer-events-none">
//                               Contact Number
//                             </FormLabel>
//                             <FormControl>
//                               <input
//                                 title="contact_number"
//                                 type="number"
//                                 placeholder="Contact Number"
//                                 className="w-full text-sm px-4 h-[45px] rounded-xl bg-lightBorder text-black border border-lightBorder"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <div className="flex flex-col w-full gap-3">
//                       <FormField
//                         control={form1.control}
//                         name="gender"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-xs text-white pointer-events-none">
//                               Sex
//                             </FormLabel>
//                             <FormControl>
//                               <GenderInput data={field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form1.control}
//                         name="role"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-xs text-white pointer-events-none">
//                               Role
//                             </FormLabel>
//                             <RoleInput data={field} />
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <div className="flex flex-col w-full gap-3">
//                       <FormField
//                         control={form1.control}
//                         name="dob"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-xs text-white pointer-events-none">
//                               Date Of Birth
//                             </FormLabel>
//                             <FormControl>
//                               <DobInput data={field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <div className="flex flex-col w-full gap-3">
//                       <FormField
//                         control={form1.control}
//                         name="password"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-xs text-white pointer-events-none">
//                               Password
//                             </FormLabel>
//                             <FormControl>
//                               <input
//                                 type="password"
//                                 placeholder="••••••••••"
//                                 className="w-full text-sm px-4 h-[45px] rounded-xl bg-lightBorder text-black border border-lightBorder"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <Button
//                       type="submit"
//                       className="w-full flex gap-0 text-white text-sm  text-center hover:bg-applicationPrimary/70 font-bold rounded-xl transition-all duration-300 "
//                     >
//                       <span
//                         className={cn("pointer-events-none", {
//                           hidden: isPending,
//                         })}
//                       >
//                         Signup
//                       </span>
//                       <AiOutlineLoading3Quarters
//                         className={cn("pointer-events-none animate-spin", {
//                           hidden: !isPending,
//                         })}
//                       />
//                     </Button>
//                   </form>
//                 </Form>
//               </div>
//               {/* <motion.div className="w-full flex justify-center">
//                 <span className="w-full text-center text-white">
//                   Already have an account?{" "}
//                   <span
//                     onClick={() => setAuthSwitch(!authSwitch)}
//                     className="text-applicationPrimary font-bold hover:underline"
//                   >
//                     Login
//                   </span>
//                 </span>
//               </motion.div> */}
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <Toaster />
//       </div>
//     </div>
//   );
// }
