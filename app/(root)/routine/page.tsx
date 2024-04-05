"use client";

import { useUser } from "@/providers/UserProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoursesWrapper from "./_components/_Courses/CoursesWrapper";
import { useQuery } from "@tanstack/react-query";
import { backend_url, getAccessToken } from "@/lib/utils";
import ClassesWrapper from "./_components/_Classes/ClassesWrapper";


export default function Routine() {

  const user = useUser();

  const userId = user?.user?.user.id;

  const queryFn = async () => {
    const access_token = getAccessToken();
    const response = await fetch(`${backend_url}/api/v1/user/course`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const { isLoading, data } = useQuery({
    queryKey: ["getUserCourse"],
    queryFn,
  });

  return (
    <main className="md:h-[calc(100%-48px)] m-4">
      <Tabs
        defaultValue="courses"
        className="md:h-full max-md:grid max-md:grid-cols-1 gap-x-4"
      >
        <div className="w-fit">
          <TabsList className="p-0 h-12 bg-accent-foreground/90 text-accent/50 shadow-md rounded-b-none w-full justify-start">
            <TabsTrigger
              className="w-full py-2 px-4 text-lg rounded-b-none data-[state=active]:border-t-4 data-[state=active]:bg-card border-primary"
              value="classes"
            >
              Classes
            </TabsTrigger>
            <TabsTrigger
              className="w-full py-2 px-4 text-lg rounded-b-none data-[state=active]:border-t-4 data-[state=active]:bg-card border-primary"
              value="courses"
            >
              Courses
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="h-fit md:h-[calc(100%-1rem)] w-full">
          <TabsContent className="mt-0 data-[state=inactive]:hidden flex flex-col-reverse gap-4 md:grid md:h-[calc(100%-2rem)] grid-cols-[3fr_2fr]" value="classes">
            <ClassesWrapper userId={userId} courses={data} isLoading={isLoading} />
          </TabsContent>
          <TabsContent className="mt-0 data-[state=inactive]:hidden flex flex-col-reverse gap-4 md:grid md:h-[calc(100%-2rem)] grid-cols-[3fr_2fr]" value="courses">
            <CoursesWrapper courses={data} isLoading={isLoading} />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}