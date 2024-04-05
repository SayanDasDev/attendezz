"use client";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { classSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SectionHeading } from "@/components/shared/SectionHeading";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import React from "react";
import { TCourseData } from "@/types/types";
import { TimePicker } from "@/components/ui/date-time-picker/time-picker";
import {
  backend_url,
  generateEndTime,
  getAccessToken,
  getCurrentDay,
  timeToString,
} from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WeekSelect from "@/components/shared/WeekSelect";
import { Input } from "@/components/ui/input";
import CourseSelect from "@/components/shared/CourseSelect";

interface AddClassesProps {
  userId: string;
  courses: TCourseData[];
  isLoading: boolean;
}

const AddClasses: React.FC<AddClassesProps> = ({
  userId,
  courses,
  isLoading,
}) => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof classSchema>>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      userId: userId,
      dayOfWeek: getCurrentDay(),
    },
  });

  const mutationFn = async (values: z.infer<typeof classSchema>) => {
    const access_token = getAccessToken();
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    };
    const response = await fetch(`${backend_url}/api/v1/user/routine`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["addClassMutation"],
    mutationFn,
    onError: (error: any) => {
      toast.error("Failed!");
      console.log(error);
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success("Class added successfully");
        queryClient.invalidateQueries({ queryKey: ["getRoutineByTeacher"] });
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  function onSubmit(values: z.infer<typeof classSchema>) {
    mutate(values);
  }

  return (
    <Card className="border bg-card h-fit rounded-md max-md:rounded-tl-none p-6">
      <SectionHeading className="pb-4" title="Add Class" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="courseId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="pl-3">Course</FormLabel>
                <Select
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select course..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <CourseSelect courses={courses} />
                  </SelectContent>
                </Select>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dayOfWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-3">Day</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select day..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <WeekSelect />
                  </SelectContent>
                </Select>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-3">Start Time</FormLabel>
                  <FormControl>
                    {/* <Input className="h-12 text-base" {...field} /> */}
                    <TimePicker
                      onChange={(value) => {
                        const startTime = timeToString(value);
                        form.setValue(field.name, startTime);
                        form.setValue("endTime", generateEndTime(startTime, 1));
                        form.trigger(field.name);
                        form.trigger("endTime");
                      }}
                    />
                  </FormControl>
                  <FormMessage className="pl-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-3">End Time</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 text-base focus-visible:ring-transparent"
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage className="pl-3" />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <Button
              disabled={isPending}
              className="h-12 px-12 mx-auto text-base mb-4"
              type="submit"
            >
              {isPending ? (
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-700 bg-primary-foreground"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-700 animate-delay-200 bg-primary-foreground"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-700 animate-delay-500 bg-primary-foreground"></div>
                </div>
              ) : (
                "Add Class"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default AddClasses;
