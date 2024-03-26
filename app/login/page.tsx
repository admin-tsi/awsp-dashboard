import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import React from "react";

export default function Page() {
  return (
    <main className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <Card className="w-full h-full sm:max-w-sm sm:h-auto sm:rounded-lg bg-muted">
        <CardHeader>
          <Link href="/" className="block h-full w-16 mx-auto sm:mx-0 sm:mr-4 ">
            <Image
              src={logo}
              alt="AWSP Logo"
              layout="responsive"
              width={72}
              height={64}
            />
          </Link>
          <CardTitle className="text-2xl text-center sm:text-left">
            Login
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 p-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/*  <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>*/}
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" variant="secondary" className="w-full">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
