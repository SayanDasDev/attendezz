"use client";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { courseSchema } from "@/schemas";
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
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { backend_url, getAccessToken } from "@/lib/utils";

const AddCourses = () => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseName: "",
      subjectName: "",
    },
  });

  const mutationFn = async (values: z.infer<typeof courseSchema>) => {
    const access_token = getAccessToken();
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    };
    const response = await fetch(
      `${backend_url}/api/v1/teacher/course`,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["addCourseMuation"],
    mutationFn,
    onError: (error: any) => {
      toast.error("Something went wrong!");
      console.log(error);
    },
    onSuccess: (data) => {
      if(!data.courseID){
        toast.error(data.message);
      }else{
      toast.success("Course added successfully");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["getUserCourse"] });
      }
    },
  });

  function onSubmit(values: z.infer<typeof courseSchema>) {
    mutate(values);
  }

  return (
    <Card className="bg-card h-fit rounded-md max-md:rounded-tl-none p-6 border text-card-foreground">
      <SectionHeading className="pb-4" title="Add Course" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="courseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-3">Course Code</FormLabel>
                <FormControl>
                  <Input className="h-12 text-base" {...field} />
                </FormControl>
                <FormDescription className="pl-3">
                  Enter the course code e.g. CC-I
                </FormDescription>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subjectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-3">Subject Name</FormLabel>
                <FormControl>
                  <Input className="h-12 text-base" {...field} />
                </FormControl>
                <FormDescription className="pl-3">
                  Enter the name of the subject e.g. Value Education
                </FormDescription>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />
          <div className="w-full">
            <Button disabled={isPending} className="h-12 px-12 mx-auto text-base mb-4" type="submit">
            {isPending ? (
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse animate-duration-700 bg-primary-foreground"></div>
                <div className="w-2 h-2 rounded-full animate-pulse animate-duration-700 animate-delay-200 bg-primary-foreground"></div>
                <div className="w-2 h-2 rounded-full animate-pulse animate-duration-700 animate-delay-500 bg-primary-foreground"></div>
              </div>
            ) : (
              "Add Course"
            )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default AddCourses;