import { Button } from "@/components/ui/button";
import { DrawerContent } from "@/components/ui/drawer";
import Image from "next/image";
import { useState } from "react";
import OtpInput from "./OTPInput";
import { CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface OTPDrawerProps {
  email?: String;
}

const OTPDrawer = ({ email }: OTPDrawerProps) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [canVerify, setCanVerify] = useState(false);
  const onChange = (value: string) => {
    setOtp(value);
    value = value.trim();
    if (value.length === 4) {
      setCanVerify(true);
    } else {
      setCanVerify(false);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["OTP Verify"],
    mutationFn: useAuth().otpVerify,
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: (data) => {
      if (data.status) {
        toast.success("OTP Successfully Verified");
        router.push("/");
      } else {
        toast.error("Invalid OTP");
      }
    },
  });


  return (
    <DrawerContent className="md:w-[60%] lg:w-[50%] mx-auto pb-8">
      <div className="w-[80%] sm:w-[50%] flex flex-col pt-8 items-center m-auto space-y-6 ">
        <Image
          src="/assets/mail_sent.svg"
          alt="EmailSent"
          width={175}
          height={175}
        />
        <h1 className="text-2xl font-bold text-center">Verify Your Email</h1>
        <div>
          <p className="text-base text-center leading-tight">
            Please enter the 4 digit code sent to{" "}
            {email ? (
              <span className="font-bold text-primary text-nowrap">
                {email}
              </span>
            ) : (
              "your email address."
            )}
          </p>
          <p className="text-sm text-foreground/70 text-[10px] text-center pt-[2px]">
            If you can&apos;t find the e-mail please check spam folder.
          </p>
          <p className="text-base flex items-center gap-1 justify-center text-accent-foreground font-bold text-center pt-[2px]">
            <CircleAlert size={16} />
            Please do not refresh the page
          </p>
        </div>
        <OtpInput value={otp} valueLength={4} onChange={onChange} />
        <Button
          className="h-12 text-lg w-[50%] rounded-full"
          disabled={!canVerify || isPending}
          onClick={() => mutate(otp)}
        >
          {isPending ? (
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-500 bg-primary-foreground"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-500 animate-delay-200 bg-primary-foreground"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse animate-duration-500 animate-delay-500 bg-primary-foreground"></div>
                </div>
              ) : (
                "Verify"
              )}
        </Button>
      </div>
    </DrawerContent>
  );
};

export default OTPDrawer;