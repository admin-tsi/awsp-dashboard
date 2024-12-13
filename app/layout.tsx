import React from "react";
import { Raleway } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";

const raleway = Raleway({
  variable: "--raleway-font",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={cn(raleway.className)}>
          <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 p-8 bg-muted overflow-y-auto">
                {children}
                <Toaster />
              </main>
            </div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
