import * as React from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  return (
    <>
      <CardHeader>
        <div>
          <CardTitle className="text-3xl font-bold">Hello,</CardTitle>
          <CardTitle className="text-xl">Welcome to Attendeez</CardTitle>
        </div>
        <CardDescription className="text-base">
          Sign up with WhatsApp to continue
        </CardDescription>
      </CardHeader>
      <SignUpForm />
    </>
  );
}