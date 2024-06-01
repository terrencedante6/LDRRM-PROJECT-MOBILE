// import { Button } from "@/components/ui/button";
// import { DialogFooter } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// import DobInput from "./dob-input";
// import RoleInput from "./roles-input";
// import GenderInput from "./gender-input";

// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { toast } from "@/components/ui/use-toast";
// import ImageInput from "./image-input";
// import { useTransition } from "react";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { cn } from "@/lib/utils";
// import { useEmployees } from "@/hooks/useEmployees";

// export const employeeSchema = z.object({
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
//   gender: z.string(),
//   dob: z
//     .date()
//     .min(new Date(1900, 1, 1), { message: "Date of birth is required" }),
//   role: z
//     .string()
//     .min(1, { message: "Role is required" })
//     .transform((arg) => new Number(arg)),
//   status: z.string().default("Available"),
// });

// export default function EmployeeForm({ setDialogOpen }: any) {
//   const [isPending, startTransition] = useTransition();
//   const { createEmployee } = useEmployees();

//   const form = useForm<z.infer<typeof employeeSchema>>({
//     resolver: zodResolver(employeeSchema),
//   });

//   async function onSubmit(data: z.infer<typeof employeeSchema>) {
//     startTransition(async () => {
//       const result = await createEmployee(data);

//       const { error } = JSON.parse(result);
//       if (error?.message) {
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: error.message,
//         });
//         console.log(error);
//         console.log(data);
//         return;
//       }

//       toast({
//         description: (
//           <pre className="mt-2 w-[340px] rounded-md border border-lightBorder bg-slate-950 p-4">
//             <code className="text-white">Successfully Registered!</code>
//             {/* <code className="text-white">{JSON.stringify(data, null, 2)}</code> */}
//           </pre>
//         ),
//       });
//       setDialogOpen(false);
//     });
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex flex-col gap-5 h-fit"
//       >
//         <div className="w-full flex flex-col gap-2">
//           <div className="w-full h-full flex flex-col gap-2">
//             {/* <FormField
//               control={form.control}
//               name="image_url"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <ImageInput data={field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             /> */}
//             <div className="w-full flex gap-4">
//               <div className="w-full flex flex-col">
//                 <FormField
//                   control={form.control}
//                   name="first_name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-xs">First Name</FormLabel>
//                       <FormControl>
//                         <Input
//                           className="rounded-lg  border-slate-600/50"
//                           {...field}
//                           type="text"
//                           placeholder="Enter First Name"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="w-full flex flex-col">
//                 <FormField
//                   control={form.control}
//                   name="last_name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-xs">Last Name</FormLabel>
//                       <FormControl>
//                         <Input
//                           className="rounded-lg  border-slate-600/50"
//                           {...field}
//                           type="text"
//                           placeholder="Enter Last Name"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>
//             <div className="w-full flex gap-4">
//               <div className="w-full flex flex-col">
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-xs">Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           className="rounded-lg  border-slate-600/50"
//                           {...field}
//                           type="text"
//                           placeholder="example@gmail.com"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>
//             <div className="w-full h-full flex gap-4">
//               <div className="w-full h-full flex flex-col">
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-xs">Password</FormLabel>
//                       <FormControl className="h-full">
//                         <Input
//                           className="rounded-lg  border-slate-600/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-9"
//                           type="text"
//                           {...field}
//                           placeholder="Password"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>
//           </div>
//           {/* <Separator orientation="vertical" className="bg-white/10" /> */}
//           <div className="w-full h-full flex flex-col gap-2">
//             <div className="w-full flex gap-4">
//               <div className="w-full flex flex-col gap-2">
//                 <FormField
//                   control={form.control}
//                   name="contact_number"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-xs">Contact Number</FormLabel>
//                       <FormControl>
//                         <Input
//                           className="rounded-lg  border-slate-600/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                           {...field}
//                           accept="number"
//                           type="number"
//                           placeholder="#"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="w-full flex flex-col gap-2">
//                 <FormField
//                   control={form.control}
//                   name="gender"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-xs">Sex</FormLabel>
//                       <FormControl>
//                         <GenderInput data={field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>
//             <div className="w-full flex gap-4">
//               <div className="w-full flex flex-col gap-2">
//                 <FormField
//                   control={form.control}
//                   name="dob"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-xs">Date Of Birth</FormLabel>
//                       <FormControl>
//                         <DobInput data={field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="w-full flex flex-col gap-2">
//                 <FormField
//                   control={form.control}
//                   name="role"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-xs">Role</FormLabel>
//                       <RoleInput data={field} />
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>
//             <div className="w-full flex gap-4"></div>
//             <div className="w-full h-full flex gap-4 place-items-end">
//               <div className="w-full h-full flex flex-col gap-2">
//                 <FormField
//                   control={form.control}
//                   name="address"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-xs">Address</FormLabel>
//                       <Textarea
//                         className=" border-slate-600/50 w-full h-full resize-none"
//                         placeholder="Address"
//                         {...field}
//                       />
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button
//             type="submit"
//             className="rounded-lg flex justify-center place-items-start w-[120px]"
//           >
//             <span className={cn({ hidden: isPending })}>Create User</span>
//             <AiOutlineLoading3Quarters
//               className={cn(" animate-spin", { hidden: !isPending })}
//             />
//           </Button>
//         </DialogFooter>
//       </form>
//     </Form>
//   );
// }
