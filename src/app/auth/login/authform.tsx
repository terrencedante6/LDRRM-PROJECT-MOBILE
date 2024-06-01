// "use client";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/components/ui/use-toast";
// import { redirect } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { signInWithEmailAndPassword } from "@/lib/actions";
// import { useTransition } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import Link from "next/link";

// const loginSchema = z.object({
//   email: z.string().email({ message: "Must be a valid email" }),
//   password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters" }),
// });

// export function Authform() {
//   const [isPending, startTransition] = useTransition();

//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//   });
//   async function onSubmit(data: z.infer<typeof loginSchema>) {
//     startTransition(async () => {
//       const result = await signInWithEmailAndPassword(data);

//       const { error } = JSON.parse(result);
//       if (error?.message) {
//         console.log(error);
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: error.message,
//         });
//         return;
//       }

//       toast({
//         description: "Login successful",
//       });
//       return redirect("/application");
//     });
//   }
//   return (
//     <Card className="w-[350px]">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <CardHeader>
//             <CardTitle>Login</CardTitle>
//             <CardDescription>Start your shift!</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid w-full items-center gap-4">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-xs">Email</FormLabel>
//                     <FormControl>
//                       <input
//                         title="email"
//                         type="text"
//                         placeholder="Enter your email"
//                         className="w-full text-sm px-5 py-2.5 rounded-md border text-black"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-xs">Password</FormLabel>
//                     <FormControl>
//                       <input
//                         type="password"
//                         placeholder="••••••••••"
//                         className="w-full text-sm px-5 py-2.5 rounded-md bg-foregroundBg text-black border"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </CardContent>

//           <CardFooter className="flex justify-between items-center">
//             <div className="text-black text-xs flex gap-3">
//               Issues logging in?{" "}
//               <Link
//                 href="#"
//                 className="text-xs font-bold underline underline-offset-4"
//               >
//                 Contact support
//               </Link>
//             </div>
//             {/* <Accadminreq /> */}
//             <Button type="submit">
//               <span className={cn({ hidden: isPending })}>Login</span>
//               <AiOutlineLoading3Quarters
//                 className={cn(" animate-spin", { hidden: !isPending })}
//               />
//             </Button>
//           </CardFooter>
//         </form>
//       </Form>
//     </Card>
//   );
// }
