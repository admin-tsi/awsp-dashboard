"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import FormError from "@/components/login/FormError";
import FormSuccess from "@/components/login/FormSuccess";
import { login } from "@/actions/login";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Eye, EyeOff } from "lucide-react";

export default function Page() {
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((response) => {
        if (response?.error) {
          setError(response.error);
          setSuccess("");
        } else {
          // The redirect will be handled by NextAuth
          setError("");
          setSuccess("Login successful!");
        }
      });
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="fixed inset-0 bg-background flex items-center justify-center">
      <Card className="w-full h-full sm:max-w-sm sm:h-auto sm:rounded-lg bg-muted">
        <CardHeader>
          <Link
            href="/public"
            className="block h-full w-16 mx-auto sm:mx-0 sm:mr-4 "
          >
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john.doe@example.com"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  control={form.control}
                />
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            disabled={isPending}
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            required
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  control={form.control}
                />
              </div>
              <FormSuccess message={success} />
              <FormError message={error} />
              <Button
                type="submit"
                variant="outline"
                className={`w-full ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <LoadingSpinner text="Loading..." />
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
