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
import { CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { signInSchema } from "@/schemas";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: useAuth().signin,
    onError: (error: any) => {
      toast.error("Email or Password incorrect");
    },
    onSuccess: (data) => {
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;

      Cookies.set("access_token", accessToken);
      Cookies.set("refresh_token", refreshToken);

      toast.success("Login successful");
      router.push("/");
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <CardContent className="flex flex-col gap-4">
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
        </CardContent>
        <CardFooter className="flex flex-col w-full">
          <Button
            className="w-full rounded-full text-lg h-12"
          >
            Sign In
          </Button>
          <CardDescription className="text-sm mt-3 w-full text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary font-semibold">
              Sign up
            </Link>
          </CardDescription>
        </CardFooter>
      </form>
    </Form>
  );
}