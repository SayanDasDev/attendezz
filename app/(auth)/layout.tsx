import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/providers/TanstackProvider";

const dmsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attendezz For Teachers",
  description: "Smart Classroom Attendance Management App for Teachers",
  icons: {
    icon: "/logo72x72.png",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmsans.className} min-h-screen bg-primary/40 w-full flex items-center justify-center relative`}
      >
        <Image
          src="/assets/attendezz_light.svg"
          alt="attendezz"
          fill
          className="rounded-md invert transition z-[-10] opacity-20"
        />
        <TanstackProvider>
          <Card className="min-[350px]:w-[350px] min-w-[350px] lg:w-[30%] rounded-[1.75rem] shadow-md">
            {children}
          </Card>
        </TanstackProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
