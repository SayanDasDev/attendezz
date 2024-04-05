"use client";

import { Button } from "@/components/ui/button";

import {
  AlarmClockPlus,
  Edit2Icon,
  LocateFixed,
  Play,
  SaveIcon,
  Trash2Icon,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerPortal,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import SaveLocation from "./SaveLocation";
import DeleteLocation from "./DeleteLocation";
import { TLocationsData, TTodaysClassesData } from "@/types/types";
import { useUser } from "@/providers/UserProvider";
import { backend_url, getAccessToken } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import DurationDialog from "./DurationDialog";

interface LocationDrawerProps {
  classinfo: TTodaysClassesData;
}

const LocationDrawer: React.FC<LocationDrawerProps> = ({ classinfo }) => {
  const user = useUser();
  const teacherName = user?.user?.user.firstname.concat(
    " ",
    user?.user?.user.lastname
  );

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const handleLocationSelect = (value: string) => {
    setSelectedLocation((prevValue) => {
      return prevValue === value ? null : value;
    });
  };

  const [locationId, setLocationId] = useState<number | null>(null);

  const queryFn = async () => {
    const access_token = getAccessToken();
    const response = await fetch(
      `${backend_url}/api/v1/teacher/location?pageNo=1&pageSize=20`,
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

  const { isLoading, data } = useQuery({
    queryKey: ["getLocations"],
    queryFn,
  });

  return (
    <Drawer
      onClose={() => {
        setSelectedLocation(null);
      }}
    >
      <DrawerTrigger asChild>
        <Button className="p-4 mr-4 ml-auto flex gap-2 max-md:hover:animate-jump">
          <Play className="h-4 w-4" />
          <span className="hidden md:inline-block">Start Class</span>
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerContent className="lg:w-[60%] h-[80vh] mx-auto rounded-t-lg px-2 pb-4">
          <div className="w-full h-full flex flex-col justify-between pt-4">
            <div className="flex items-center px-4 flex-wrap max-[160px]:flex-col gap-2 max-[160px]:px-0 max-[160px]:mb-2">
              <div className="flex flex-col flex-grow">
                <div className="text-[24px] font-bold leading-[140%] tracking-tighter flex flex-col">
                  <Badge
                    variant="outline"
                    className="w-fit bg-background leading-none tracking-normal h-fit"
                  >
                    {classinfo.courseId}
                  </Badge>
                  {classinfo.courseName}
                </div>
                <div className="text-[16px] font-normal leading-[140%] text-foreground/70">
                  {teacherName}
                </div>
              </div>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    className="flex gap-2 h-10 ml-auto max-md:hover:animate-jump"
                    disabled={
                      selectedLocation && selectedLocation != "Current Location"
                        ? false
                        : true
                    }
                  >
                    <AlarmClockPlus size={20} />
                    Add Duration
                  </Button>
                </DrawerTrigger>
                <DrawerPortal>
                  {locationId && (
                    <DurationDialog
                      locationId={locationId}
                      routineId={classinfo.routineId}
                    />
                  )}
                </DrawerPortal>
              </Drawer>
            </div>
            <Separator className="my-2" />
            <div className="base-medium flex flex-wrap items-center px-8 py-2 text-foreground/50">
              <div className="flex-grow my-2">
                <span className="max-w-[240px]">
                  Select a location to continue
                </span>
              </div>
              {selectedLocation &&
                (selectedLocation === "Current Location" ? (
                  <Drawer nested={true}>
                    <DrawerTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center rounded-sm p-1 w-10 h-10 hover:bg-primary/10 hover:text-primary/80 hover:border-primary/30"
                      >
                        <SaveIcon className="w-5 h-5" />
                      </Button>
                    </DrawerTrigger>
                    <SaveLocation />
                  </Drawer>
                ) : (
                  <div className="flex gap-3 flex-wrap">
                    <Drawer nested={true}>
                      <DrawerTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex items-center justify-center rounded-sm p-1 w-10 h-10 hover:bg-destructive/20 hover:text-destructive/90 hover:border-destructive/30 focus-visible:ring-destructive"
                        >
                          <Trash2Icon className="w-5 h-5" />
                        </Button>
                      </DrawerTrigger>
                      <DeleteLocation />
                    </Drawer>
                  </div>
                ))}
            </div>
            <ToggleGroup
              type="single"
              className="grid m-2 rounded-lg bg-foreground/5 border border-foreground/5 h-full min-[250px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 px-6 py-4 gap-4 overflow-y-scroll no-scrollbar auto-rows-max text-lg"
            >
              <ToggleGroupItem
                value="current"
                variant="location"
                size="none"
                onClick={() => handleLocationSelect("Current Location")}
                className="min-[250px]:col-span-2 w-full h-full"
              >
                <div className="text-ellipsis flex gap-2 items-center overflow-hidden">
                  <LocateFixed className="h-5 w-5 text-opacity-10" />
                  <span className="max-[260px]:hidden">Current Location</span>
                </div>
              </ToggleGroupItem>
              {data?.map((location: TLocationsData) => {
                return (
                  <ToggleGroupItem
                    value={location.locationId.toString()}
                    key={location.locationId}
                    variant="location"
                    size="none"
                    onClick={() => {
                      handleLocationSelect(location.markedAs);
                      setLocationId(location.locationId);
                    }}
                  >
                    <div className="text-ellipsis overflow-hidden leading-none">
                      {location.markedAs}
                    </div>
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default LocationDrawer;
