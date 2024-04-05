"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import {
  Contact2,
  Fingerprint,
  LucideLogOut,
  Mail,
  MapPin,
  Smartphone,
} from "lucide-react";
import { ViewItem, ViewItemContent, ViewItemIcon } from "./ProfileViewItem";
import { formatPhNumber } from "@/lib/utils";
import { TUserContext } from "@/providers/UserProvider";
import ProfileLoading from "./ProfileLoading";

const ProfileView = ({ authuser }: { authuser: TUserContext | undefined }) => {
  const router = useRouter();
  const { logout } = useAuth();
  const user = authuser?.user;
  let phoneNumber;
  if (user) {
    phoneNumber = formatPhNumber(user.user.phoneNo);
  }
  return (
    <>
      {authuser?.isLoading ? (
        <ProfileLoading />
        ) : (
        <CardContent className="space-y-3 pt-3">
          <ViewItem>
            <ViewItemIcon>
              <Fingerprint />
            </ViewItemIcon>
            <ViewItemContent label="ID" value={user?.collegeId} />
          </ViewItem>

          <ViewItem>
            <ViewItemIcon>
              <Contact2 />
            </ViewItemIcon>
            <ViewItemContent
              className="capitalize truncate"
              label="Name"
              value={`${user?.user.firstname} ${user?.user.lastname}`}
            />
          </ViewItem>

          <ViewItem>
            <ViewItemIcon>
              <Mail />
            </ViewItemIcon>
            <ViewItemContent label="E-mail" value={user?.user.email} />
          </ViewItem>

          <ViewItem>
            <ViewItemIcon>
              <Smartphone />
            </ViewItemIcon>
            {phoneNumber && (
              <ViewItemContent label="Phone Number" value={phoneNumber} />
            )}
          </ViewItem>

          <ViewItem>
            <ViewItemIcon>
              <MapPin />
            </ViewItemIcon>
            <ViewItemContent label="Address" value={user?.address} />
          </ViewItem>

          <CardFooter>
            <Button
              className="gap-3 mt-8 mx-auto text-destructive bg-destructive/10 hover:bg-destructive/90 hover:text-background"
              variant={"secondary"}
              onClick={() => logout(router)}
            >
              <LucideLogOut size={16} />
              Logout
            </Button>
          </CardFooter>
        </CardContent>
      )}
    </>
  );
};

export default ProfileView;