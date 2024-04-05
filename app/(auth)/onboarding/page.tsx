import * as React from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OnboardingForm from "./OnboardingForm";

export default function Onboarding() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Welcome Onboard</CardTitle>
        <CardDescription className="text-base">
          Let us know more about you...
        </CardDescription>
      </CardHeader>
      <React.Suspense fallback={<div>Loading...</div>}>
        <OnboardingForm />
      </React.Suspense>
    </>
  );
}