import {
  DrawerClose,
  DrawerContent,
  DrawerPortal,
} from "@/components/ui/drawer";
import { locationSchema } from "@/schemas";
import * as z from "zod";
import { useGeolocation } from "@uidotdev/usehooks";
import React from "react";
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
import { backend_url, getAccessToken } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const SaveLocation = () => {

  const queryClient = useQueryClient();

	const LocationSaveSchema = locationSchema.omit({
		latitude: true,
    longitude: true,
  });

	const state = useGeolocation();

  const form = useForm<z.infer<typeof LocationSaveSchema>>({
    resolver: zodResolver(LocationSaveSchema),
    defaultValues: {
      approximate_distance: 5,
    },
  });

	const mutationFn = async (values: z.infer<typeof locationSchema>) => {
    const access_token = getAccessToken();
    const response = await fetch(`${backend_url}/api/v1/teacher/location`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("An error occurred while saving location");
    }

    return response.json();
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["saveLocation"],
    mutationFn,
    onError: (error: any) => {
      toast.error("Something went wrong!");
      console.log(error);
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success("Location Saved!");
        queryClient.invalidateQueries({ queryKey: ["getLocations"] });
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const onSubmit = (values: z.infer<typeof LocationSaveSchema>) => {
		if (!state || state.error || !state.latitude || !state.longitude) return;
    const latitude = state.latitude;
    const longitude = state.longitude;
    const valueswithcoordinates: z.infer<typeof locationSchema> = {
      ...values,
      latitude,
      longitude
    };
    mutate(valueswithcoordinates);
  };


  return (
    <DrawerPortal>
      <DrawerContent className="lg:w-[55%] h-fit mx-auto rounded-t-lg px-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="markedAs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-3">Location</FormLabel>
                  <FormControl>
                    <Input className="h-10" placeholder="Location" {...field} />
                  </FormControl>
                  <FormDescription className="pl-3">
                    Name of the location where the class is being held.
                  </FormDescription>
                  <FormMessage className="pl-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="approximate_distance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-3">
                    Approximate Radius{" "}
                    <span className="text-accent-foreground/70">
                      (in meters)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input className="h-10" {...field} />
                  </FormControl>
                  <FormDescription className="pl-3">
                    Enter the approximate radius of the classroom.
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
              <Button disabled={state.loading || isPending} className="flex-grow h-10 mx-auto" type="submit">
							{isPending ? (
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-500 bg-primary-foreground"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-500 animate-delay-200 bg-primary-foreground"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-500 animate-delay-500 bg-primary-foreground"></div>
                </div>
              ) : (
                "Save"
              )}
              </Button>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </DrawerPortal>
  );
};

export default SaveLocation;
