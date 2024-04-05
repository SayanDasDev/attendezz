"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getShortName } from "@/lib/utils";
import { useUser } from "@/providers/UserProvider";
import ProfileView from "./_components/ProfileView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileEdit from "./_components/ProfileEdit";
import { useState } from "react";

export default function Profile() {
  const user = useUser();
  const authuser = user?.user;
  const [tab, setTab] = useState<"view" | "edit">("view");
  return (
    <main className="flex w-full min-h-full items-center justify-center my-10 px-4">
      <Card className="overflow-clip w-full max-w-2xl shadow-lg">
        <CardHeader className="min-h-36 relative bg-secondary-foreground/80 text-background">
          <div className="flex relative items-center justify-between h-fit">
            <CardTitle className=" text-lg flex-grow text-center">
              Profile
            </CardTitle>
          </div>
          <div className="w-fit font-medium flex flex-col items-center justify-center gap-1 text-secondary-foreground text-center absolute left-[50%] translate-x-[-50%] bottom-0 translate-y-[50%]">
            <Avatar className="border-4 border-muted h-24 w-24 shadow-md">
              <AvatarImage
                className="bg-muted"
                src={authuser?.avatar}
                alt="profilepic"
              />
              <AvatarFallback className="base-medium scale-150 text-foreground/60 select-none">
                {authuser &&
                  getShortName(
                    authuser?.user.firstname,
                    authuser?.user.lastname
                  )}
              </AvatarFallback>
            </Avatar>
            {user?.isLoading ? (
              <div className="bg-primary/10 w-[150px] h-[17px] mt-1 animate-pulse animate-duration-1000 rounded-sm" />
            ) : (
              authuser?.user.uname
            )}
          </div>
        </CardHeader>
        <Tabs defaultValue="view" value={tab} className="w-full pt-20">
          <div className="w-full px-4 flex justify-center">
            {user?.isLoading ? (
              <div className="h-9 w-[130px] rounded-lg bg-muted animate-pulse animate-duration-1000" />
            ) : (
              <TabsList className="gap-4">
                <TabsTrigger value="view" onClick={() => setTab("view")}>
                  View
                </TabsTrigger>
                <TabsTrigger value="edit" onClick={() => setTab("edit")}>
                  Edit
                </TabsTrigger>
              </TabsList>
            )}
          </div>
          <TabsContent value="view">
            <ProfileView authuser={user} />
          </TabsContent>
          <TabsContent value="edit">
            <ProfileEdit authuser={user} setTab={setTab} />
          </TabsContent>
        </Tabs>
      </Card>
    </main>
  );
}