import React from "react";
import AddClasses from "./AddClasses";
import AllClasses from "./AllClasses";
import { TCourseData } from "@/types/types";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";

interface ClassesWrapperProps {
  userId: string | undefined;
  courses: TCourseData[];
  isLoading: boolean;
}

const ClassesWrapper: React.FC<ClassesWrapperProps> = ({
  userId,
  courses,
  isLoading,
}) => {
  return (
    <>
      {userId ? (
        <AllClasses userId={userId} />
      ) : (
        <Card className="border-none bg-background h-fit rounded-md md:rounded-tl-none p-6">
          <div className="flex gap-2">
            <Loader className="animate-spin animate-duration-[2000ms]" />
            Loading...
          </div>
        </Card>
      )}
      {userId && courses ? (
        <AddClasses userId={userId} courses={courses} isLoading={isLoading} />
      ) : (
        <Card className="border-none bg-background h-fit rounded-md max-md:rounded-tl-none p-6">
          <div className="flex gap-2">
            <Loader className="animate-spin animate-duration-[2000ms]" />
            Loading...
          </div>
        </Card>
      )}
    </>
  );
};

export default ClassesWrapper;