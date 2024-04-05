import { DrawerClose, DrawerContent } from "@/components/ui/drawer";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { currentClassSetSchema } from "@/schemas";
import { PlayIcon } from "lucide-react";
import { backend_url, getAccessToken } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DurationDialogProps {
  routineId: number;
  locationId: number;
}

const DurationDialog: React.FC<DurationDialogProps> = (props) => {
  const durationFormSchema = currentClassSetSchema.omit({
    routineId: true,
    locationId: true,
  });

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof durationFormSchema>>({
    resolver: zodResolver(durationFormSchema),
    defaultValues: {
      attendanceDuration: 10,
    },
  });

  const mutationFn = async (values: z.infer<typeof currentClassSetSchema>) => {
    const access_token = getAccessToken();
    const response = await fetch(
      `${backend_url}/api/v1/teacher/current-class/set`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) {
      throw new Error("An error occurred while saving location");
    }

    return response.json();
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["saveLocation"],
    mutationFn,
    onError: (error: any) => {
      toast.error("Something went wrong! 400 error");
      console.log(error);
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success("Class Started!");
        window.location.reload();
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const onSubmit = (values: z.infer<typeof durationFormSchema>) => {
    const routineId = props.routineId;
    const locationId = props.locationId;
    const valueswithcoordinates: z.infer<typeof currentClassSetSchema> = {
      ...values,
      routineId,
      locationId,
    };
    mutate(valueswithcoordinates);
  };

  return (
    <DrawerContent className="md:w-[60%] lg:w-[50%] mx-auto px-4 pb-6 pt-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="attendanceDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-3">
                  Attendance Marking Duration
                  <span className="text-accent-foreground/70">
                    (in minutes)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input className="h-10" placeholder="Location" {...field} />
                </FormControl>
                <FormDescription className="pl-3">
                  The duration for which students can mark their attendance
                </FormDescription>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />
          <div className="flex gap-6 px-2 py-3">
            <DrawerClose asChild>
              <Button
                variant={"secondary"}
                className="flex-grow h-10 mx-auto"
                type="button"
              >
                Cancel
              </Button>
            </DrawerClose>
            <Button
              // disabled={isPending}
              className="flex-grow h-10 mx-auto"
              type="submit"
            >
              {isPending ? (
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-500 bg-primary-foreground"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-500 animate-delay-200 bg-primary-foreground"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-500 animate-delay-500 bg-primary-foreground"></div>
                </div>
              ) : (
                <>
                  <PlayIcon size={16} className="mr-2" />
                  Start Class
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DrawerContent>
  );
};

export default DurationDialog;
