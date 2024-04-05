"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileEditSchema } from "@/schemas";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TUserContext } from "@/providers/UserProvider";
import { backend_url, getAccessToken } from "@/lib/utils";

interface ProfileEditProps {
  authuser: TUserContext | undefined;
  setTab: (tab: "view" | "edit") => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ authuser, setTab }) => {
  type NoUserIdProfileEditSchema = z.infer<typeof profileEditSchema>;
  const NoUserIdProfileEditSchema = profileEditSchema.omit({ userId: true });
  const user = authuser?.user;
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof NoUserIdProfileEditSchema>>({
    resolver: zodResolver(NoUserIdProfileEditSchema),
    defaultValues: {
      address: `${user?.address}`,
      avatar: `${user?.avatar}`,
      collegeId: user?.collegeId,
    },
  });

  const mutationFn = async (values: z.infer<typeof profileEditSchema>) => {
    const access_token = getAccessToken();
    const response = await fetch(`${backend_url}/api/v1/user/details`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error("An error occurred while saving your profile");
    }

    return response.json();
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["profleEditMutation"],
    mutationFn,
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success("Profile updated successfully");
        queryClient.invalidateQueries({ queryKey: ["getUserDetails"] });
        setTab("view");
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const onSubmit = (values: z.infer<typeof NoUserIdProfileEditSchema>) => {
    if (!user) return;
    const userId = user?.user.id;
    const valuesWithUserId: z.infer<typeof profileEditSchema> = {
      ...values,
      userId,
    };
    mutate(valuesWithUserId);
  };

  return (
    <CardContent className="space-y-3 pt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="collegeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/50 pl-3">
                  ID
                </FormLabel>
                <FormControl>
                  <Input
                    inputMode="numeric"
                    className="rounded-sm text-md h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/50 pl-3">
                  Address
                </FormLabel>
                <FormControl>
                  <Input className="rounded-sm text-md h-12" {...field} />
                </FormControl>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/50 pl-3">
                  Avatar Link
                </FormLabel>
                <FormControl>
                  <Input className="rounded-sm text-md h-12" {...field} />
                </FormControl>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />
          <CardFooter className="pt-8">
            <Button
              type="submit"
              disabled={isPending}
              className="gap-2 mx-auto w-[104px]"
              variant={"secondary"}
            >
              {isPending ? (
                <div className="flex gap-2 px-4 py-1">
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-700 bg-background"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-700 animate-delay-200 bg-background"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-700 animate-delay-500 bg-background"></div>
                </div>
              ) : (
                <>
                  <Save size={16} />
                  Save
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </CardContent>
  );
};

export default ProfileEdit;