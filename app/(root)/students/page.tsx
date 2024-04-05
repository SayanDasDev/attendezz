"use client";

import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { backend_url, getAccessToken } from "@/lib/utils";
import { TUser } from "@/types/auth";

export default function Students() {
  const queryFn = async () => {
    const access_token = getAccessToken();
    const response = await fetch(
      `${backend_url}/api/v1/teacher/users-list?pageNo=1&pageSize=10`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response not ok");
    }

    return response.json();
  };

  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn,
  });

  const allStudents: TUser[] = data?.filter(
    (item: any) => item.role === "STUDENT"
  );

  return (
    <main className="p-6">
      <SectionHeading title="Students List" />
      {isLoading ? "Loading..." : <DataTable columns={columns} data={allStudents} />}
    </main>
  );
}
