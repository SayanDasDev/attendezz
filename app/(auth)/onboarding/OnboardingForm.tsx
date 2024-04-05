"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { onboardingSchema } from "@/schemas";
import { Drawer } from "@/components/ui/drawer";
import OTPDrawer from "./OTPDrawer";
import React, { useCallback } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { PasswordInput } from "@/components/ui/password-input";
import { TNewUser } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";

export default function OnboardingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = React.useState<String>();
  const [phone, setPhone] = React.useState<string>();
  const [otpopen, setOtpopen] = React.useState(false);

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const { waId } = Object.fromEntries(searchParams);
  const { waAuth } = useAuth();

  const handleWaAuth = useCallback(async () => {
    const data = await waAuth(waId);
    setPhone(data.user.waNumber);
    const [firstname, ...lastnameParts] = data.user.waName.split(" ");
    const lastname = lastnameParts.length > 0 ? lastnameParts.join(" ") : "";
    form.setValue("firstname", firstname);
    form.setValue("lastname", lastname);
  }, [form, waAuth, waId]);


  React.useEffect(() => {
    if (!waId) {
      router.push("/signup");
      return;
    }
    handleWaAuth();
  }, []);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["Onboardig"],
    mutationFn: useAuth().register,
    onError: (error: any) => {
      toast.error("Email or Mobile Number already exits");
    },
    onSuccess: (data) => {
      if(data.access_token) {
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
  
        Cookies.set("access_token", accessToken);
        Cookies.set("refresh_token", refreshToken);
        setEmail(form.getValues("email"));
        toast.success("Account Created");
        console.log(data);
        setOtpopen(true);
      }else{
        toast.error(data.message);
      }
    },
  });

  async function onSubmit(values: z.infer<typeof onboardingSchema>) {
    if (!phone) {
      toast.error("Cant get phone number...");
      return;
    };

    const newUser: TNewUser = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      phoneNo: phone,
      password: values.password,
      role: "TEACHER",
    };

    mutate(newUser);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <CardContent className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-2">First name</FormLabel>
                <FormControl className="h-12 text-base capitalize">
                  <Input className="!mt-0" placeholder="Spot" {...field} />
                </FormControl>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-2">Last Name</FormLabel>
                <FormControl className="h-12 text-base capitalize">
                  <Input className="!mt-0" placeholder="On" {...field} />
                </FormControl>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-2">Email</FormLabel>
                <FormControl className="h-12 text-base">
                  <Input
                    className="!mt-0"
                    placeholder="spotlight@attendeez.io"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-2">Password</FormLabel>
                <FormControl className="h-12 text-base">
                  <PasswordInput
                    className="!mt-0"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-2">Confirm Password</FormLabel>
                <FormControl className="h-12 text-base">
                  <PasswordInput
                    className="!mt-0"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="pl-3" />
              </FormItem>
            )}
          />
        </CardContent>
        <Drawer open={otpopen} dismissible={false}>
          <CardFooter className="flex flex-col w-full">
          <Button
              className="w-[90%] rounded-full text-lg h-12 mb-2"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-500 bg-primary-foreground"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-500 animate-delay-200 bg-primary-foreground"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-500 animate-delay-500 bg-primary-foreground"></div>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </CardFooter>
          <OTPDrawer email={email} />
        </Drawer>
      </form>
    </Form>
  );
}