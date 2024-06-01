import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { toast as sonner } from "sonner";
import { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useEmployees } from "@/hooks/useEmployees";
import StatusInput from "./status-input";
import { useSelector } from "react-redux";

export const employeeStatusSchema = z.object({
  id: z.string(),
  status: z.string(),
});

export default function EmployeeForm({ setDialogIsOpen }: any) {
  const [isPending, startTransition] = useTransition();
  const { updateEmployeeStatus } = useEmployees();

  const employee = useSelector((state: any) => state.currentSession);
  const form = useForm<z.infer<typeof employeeStatusSchema>>({
    resolver: zodResolver(employeeStatusSchema),
    defaultValues: {
      id: employee.id,
      status: employee.status,
    },
  });

  async function onSubmit(data: any) {
    startTransition(async () => {
      const result = await updateEmployeeStatus(data, 1000);
      const { error } = JSON.parse(result);
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "⚠️ Error",
          description: error.message,
        });
        return;
      }

      // toast({
      //   description: (
      //     <pre className="mt-2 min-w-[340px] max-width-[840px] rounded-md border border-lightBorder bg-slate-950 p-4">
      //       <code className="text-white">Status Successfully Updated</code>
      //       {/* <code className="text-white">
      //         {JSON.stringify(result, null, 2)}
      //       </code> */}
      //     </pre>
      //   ),
      // });
      sonner("✨ Success", {
        description: `Status updated!`,
      });
      setDialogIsOpen(false);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="w-full">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <StatusInput data={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button
            // className="text-xs font-bold min-w-[120px] rounded-full flex gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300"
            type="submit"
          >
            <span className={cn({ hidden: isPending })}>Update</span>
            <AiOutlineLoading3Quarters
              className={cn(" animate-spin", { hidden: !isPending })}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
