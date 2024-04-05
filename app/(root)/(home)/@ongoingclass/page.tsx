"use client";
import { Badge } from "@/components/ui/badge";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/providers/UserProvider";
import { backend_url, getAccessToken } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { TLiveClassData, TLiveClassStudentsData } from "@/types/types";

export default function OngoingClass() {
  const user = useUser();
  const authuser = user?.user;

  const queryFn = async () => {
    const access_token = getAccessToken();
    const response = await fetch(
      `${backend_url}/api/v1/teacher/current-class/get-current-class-by-user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["liveClassDetails"],
    queryFn,
  });

  const liveClassDetails: TLiveClassData = data;

  return (
    <main className="p-6">
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div className="flex gap-4">
            <Badge>
              {liveClassDetails &&
              liveClassDetails &&
              liveClassDetails.routine &&
              liveClassDetails.routine.course
                ? liveClassDetails.routine.course.courseName
                : `ClassCode`}
            </Badge>
            <div className="">Wed, Oct 12</div>
          </div>
          <div className="flex gap-4">
            <div className="text-[48px] font-bold leading-[120%] pt-1 tracking-tighter">
              {liveClassDetails &&
              liveClassDetails &&
              liveClassDetails.routine &&
              liveClassDetails.routine.course
                ? liveClassDetails.routine.course.subjectName
                : `SubjectName`}
            </div>
          </div>
          <Separator className="my-6" />
          {liveClassDetails &&
          liveClassDetails &&
          liveClassDetails.routine &&
          liveClassDetails.routine.course ? (
            <LiveClassStudentList
              courseId={liveClassDetails.routine.course.courseId}
            />
          ) : (
            `Loading...`
          )}
        </>
      )}
    </main>
  );
}

function LiveClassStudentList({ courseId }: { courseId: number }) {
  const queryFn = async () => {
    const access_token = getAccessToken();
    const response = await fetch(
      `${backend_url}/api/v1/user/enroll/get-all-enrolled-by-course`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId: courseId }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const { isLoading, data } = useQuery({
    queryKey: ["getAllEnrolledByCourse"],
    queryFn,
  });

  const liveClassStudents: TLiveClassStudentsData[] = data?.map((item: any) => ({
    firstname: item.user.firstname,
    lastname: item.user.lastname,
    id: item.user.id,
  }));

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable columns={columns} data={liveClassStudents} />
      )}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}
