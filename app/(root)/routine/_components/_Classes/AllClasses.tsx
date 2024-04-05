import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  backend_url,
  convertTo12Hour,
  getAccessToken,
  getCurrentDay,
} from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TAllClassesData } from "@/types/types";
import { FileClockIcon, TrashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerPortal,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "sonner";

const AllClasses = ({ userId }: { userId: string }) => {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const queryFn = async () => {
    const access_token = getAccessToken();
    const response = await fetch(
      `${backend_url}/api/v1/user/routine/get-by-teacher`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const { isLoading, data } = useQuery({
    queryKey: ["getRoutineByTeacher"],
    queryFn,
  });

  const dataByDay = (day: string) => {
    return data
      .filter((entry: TAllClassesData) => entry.dayOfWeek === day)
      .sort((a: TAllClassesData, b: TAllClassesData) => {
        return a.startTime.localeCompare(b.startTime);
      });
  };

  return (
    <Card className="border bg-card h-full rounded-md md:rounded-tl-none p-6 overflow-y-scroll no-scrollbar">
      <SectionHeading className="pb-4 md:hidden" title="Class List" />

      <Tabs defaultValue={getCurrentDay()} className="w-full h-full">
        <TabsList className="w-full justify-start h-10 overflow-x-scroll no-scrollbar">
          {weekdays.map((weekday) => {
            return (
              <TabsTrigger
                className="flex-grow h-full"
                key={weekday}
                value={weekday.toUpperCase()}
              >
                {weekday}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {isLoading && <Loading />}
        {!isLoading &&
          weekdays.map((weekday) => {
            const dataForDay = dataByDay(weekday.toUpperCase());
            return (
              <TabsContent
                className="h-[calc(100%-3rem)] py-2 space-y-4"
                key={weekday}
                value={weekday.toUpperCase()}
              >
                {dataForDay.map((entry: TAllClassesData) => (
                  <div
                    key={entry.course.courseId}
                    className="w-full border rounded-md border-muted-foreground/50"
                  >
                    <ClassCard entry={entry} />
                  </div>
                ))}
                <div className="h-6"></div>
              </TabsContent>
            );
          })}
      </Tabs>
    </Card>
  );
};

export default AllClasses;

const Loading = () => {
  return (
    <div className="h-full py-4 space-y-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="w-full h-16 border rounded-md bg-muted/80 border-muted-foreground/10 animate-pulse"
        />
      ))}
    </div>
  );
};

const ClassCard = ({ entry }: { entry: TAllClassesData }) => {
  
  const queryClient = useQueryClient();

  const mutationFn = async (courseId: number) => {
    const access_token = getAccessToken();
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ routineId: courseId }),
    };
    const response = await fetch(
      `${backend_url}/api/v1/user/routine`,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteClassMutation"],
    mutationFn,
    onError: (error: any) => {
      toast.error("Failed!");
      console.log(error);
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success("Class deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["getRoutineByTeacher"] })
      } else {
        toast.error("Something went wrong!");
      }
    },
  });
  
  function handleDelete(courseId: number) {
    mutate(courseId);
  }

  return (
    <div className="p-4 border grid grid-cols-[1fr_2rem] gap-1 rounded-md shadow-sm">
      <div className="space-y-1 ">
        <Badge className="h-fit" variant={"outline"}>
          {entry.course.courseName}
        </Badge>

        <p className="text-lg font-semibold text-foreground">
          {entry.course.subjectName}
        </p>
        <div className="grid grid-cols-[1rem_1fr] gap-1 items-center text-muted-foreground">
          <FileClockIcon size={16} />
          <span className="text-sm ">
            {convertTo12Hour(entry.startTime)} -{" "}
            {convertTo12Hour(entry.endTime)}
          </span>
        </div>
      </div>
      <div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant={"outline"}
              className="px-2 py-3  outline-destructive/75  focus-visible:ring-destructive hover:border-destructive/10 hover:bg-destructive/10 hover:text-destructive"
            >
              <TrashIcon size={16} />
            </Button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerContent className="lg:w-[60%] mx-auto rounded-t-lg px-2 pb-4 h-fit">
            <div className="text-lg pt-9 pb-9 w-full text-center">
                Are you sure you want to delete this class?
            </div>
              <div className="flex gap-4 px-4 mb-4">
                <DrawerClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-grow text-lg h-12"
                  >
                    Cancel
                  </Button>
                </DrawerClose>

                <Button
                  type="button"
                  onClick={() => handleDelete(entry.routineId)}
                  variant="destructive"
                  className="flex-grow h-12 text-lg"
                >
                  Delete
                </Button>
              </div>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </div>
    </div>
  );
};