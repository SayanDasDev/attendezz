"use client";

import { useUser } from "@/providers/UserProvider";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import classData from "@/Dummies/ClassData.json";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { backend_url, getAccessToken, getCurrentDay } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export default function Classes() {
  const user = useUser();

  const userId = user?.user?.user.id;

  const day = "SATURDAY";

  const queryFn = async () => {
    const access_token = getAccessToken();
    const response = await fetch(
      `${backend_url}/api/v1/user/routine/get-by-teacher-and-day-of-week`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, dayOfWeek: day }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const { isLoading, data } = useQuery({
    queryKey: ["getTodaysClasses"],
    queryFn,
  });

  const todaysClasses = data?.map((classItem: any) => ({
    routineId: classItem.routineId,
    courseId: classItem.course.courseName,
    courseName: classItem.course.subjectName,
    startTime: classItem.startTime,
    endTime: classItem.endTime,
  }));

  return (
    <main className="p-6">
      <SectionHeading title="Today's Classes" />
      {isLoading ? (
        "Loading..."
      ) : todaysClasses && todaysClasses.length > 0 ? (
        <DataTable columns={columns} data={todaysClasses} />
      ) : (
        <div className="text-center py-4 px-2 bg-red-100 text-red-500 text-xl font-bold rounded">
          No classes today
        </div>
      )}
    </main>
  );
}
