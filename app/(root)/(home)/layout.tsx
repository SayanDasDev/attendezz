"use client"
import { backend_url, getAccessToken } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "sonner";

export default function Layout({
    ongoingclass,
    todaysclasses,
  }: {
    ongoingclass: React.ReactNode
    todaysclasses: React.ReactNode
  }) {
    const [isOngoingClass, setisOngoingClass] = useState(false);
    const day = "SATURDAY";

    const mutationFn = async () => {
      const access_token = getAccessToken();
      const response = await fetch(`${backend_url}/api/v1/teacher/current-class/is-current-class?dayOfWeek=${day}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "content-type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("An error occurred while saving location");
      }
  
      return response.json();
    };
  
    const { mutate, isPending } = useMutation({
      mutationKey: ["isOngoingClass"],
      mutationFn,
      onError: (error: any) => {
        toast.error("Something went wrong!");
        console.log(error);
      },
      onSuccess: (data) => {
        if (data.status) {
          setisOngoingClass(data.status);
        } else {
          toast.info("No class is live!");
        }
      },
    });

    useEffect(() => {
      mutate();
    }, []);


    return isOngoingClass ? ongoingclass : todaysclasses
  }