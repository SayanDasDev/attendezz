import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/providers/TanstackProvider";
import { UserProvider } from "@/providers/UserProvider";

const dmsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attendezz For Teachers",
  description: "Smart Classroom Attendance Management App for Teachers",
  icons: {
    icon: "/logo72x72.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmsans.className} min-h-screen`}>
        <TanstackProvider>
          <UserProvider>
            <Topbar />
            <div className="flex sm:h-[calc(100vh-72px)]">
              <div className="hidden sm:flex">
                <Sidebar />
              </div>
              <div className="no-scrollbar overflow-scroll w-full">
                {children}
              </div>
            </div>
          </UserProvider>
        </TanstackProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
