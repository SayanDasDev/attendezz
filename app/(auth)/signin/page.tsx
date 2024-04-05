import * as React from "react"
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignInForm from "./SignInForm"

export default function SignIn() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Sign in</CardTitle>
        <CardDescription className="text-base text-muted-foreground">Welcome back to Attendezz</CardDescription>
      </CardHeader>
      <SignInForm />
    </>
  )
}