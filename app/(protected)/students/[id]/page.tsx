"use client";
import React, { useEffect, useState } from "react";
import { getUserById } from "@/lib/api";
import { useCurrentToken } from "@/hooks/use-current-token";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/schemas";
import { User } from "@/lib/types";
import {
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Loader } from "lucide-react";
import CustomBreadcrumb from "@/components/CustomBreadcumb";

type UserFormData = z.infer<typeof UserSchema>;

export default function Page({
  params,
}: {
  params: { id: string; token: string };
}) {
  const token = useCurrentToken();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const methods = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      _id: "",
      age: "",
      email: "",
      firstname: "",
      isverified: false,
      lastname: "",
      phone: "",
      role: "",
      clientData: null,
    },
  });

  const { setValue } = methods;

  useEffect(() => {
    setIsLoading(true);
    getUserById(params.id, token)
      .then((data) => {
        setUser(data);
        Object.keys(data).forEach((key) => {
          if (key in methods.getValues()) {
            setValue(key as keyof UserFormData, data[key as keyof User]);
          }
        });
      })
      .catch((error) => {
        console.error("Failed to fetch user", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.id, token, setValue, methods]);

  // Get the current path and extract parts

  return (
    <FormProvider {...methods}>
      <form className="w-full mx-auto p-5">
        <CustomBreadcrumb />
        {isLoading && (
          <div className="w-full flex justify-center items-center">
            <Loader className="animate-spin h-5 w-5 mr-3" />
            Loading...
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!isLoading && user && (
            <>
              <FormField
                name="firstname"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="firstname">First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="firstname"
                        placeholder="First Name"
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="lastname"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="lastname">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="lastname"
                        placeholder="Last Name"
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        placeholder="Email"
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="phone"
                        placeholder="Phone"
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="age"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="age">Age</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="age"
                        placeholder="Age"
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="role"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="role">Role</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="role"
                        placeholder="Role"
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="isverified"
                control={methods.control}
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor="isverified">Verified</FormLabel>
                    <FormControl>
                      <Switch
                        id="isverified"
                        checked={user?.isverified}
                        className="mt-1 block"
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
