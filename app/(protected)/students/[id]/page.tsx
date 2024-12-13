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
import CustomBreadcrumb from "@/components/CustomBreadcumb";
import LoadingSpinner from "@/components/LoadingSpinner";

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
      type_compte: "",
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

  return (
    <FormProvider {...methods}>
      <form className="w-full mx-auto p-5">
        <CustomBreadcrumb />
        {isLoading && (
          <div className="w-full flex justify-center items-center">
            <LoadingSpinner text="Loading..." />
          </div>
        )}
        {!isLoading && user && (
          <div className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="firstname"
                  control={methods.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="firstname">First Name</FormLabel>
                      <FormControl>
                        <Input {...field} id="firstname" disabled />
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
                        <Input {...field} id="lastname" disabled />
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
                        <Input {...field} id="email" disabled />
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
                        <Input {...field} id="phone" disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Account Information Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Account Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="role"
                  control={methods.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="role">Role</FormLabel>
                      <FormControl>
                        <Input {...field} id="role" disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="type_compte"
                  control={methods.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="type_compte">Account Type</FormLabel>
                      <FormControl>
                        <Input {...field} id="type_compte" disabled />
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
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Client Data Section */}
            {user.clientData && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Additional Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input value={user.clientData.sex} disabled />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input value={user.clientData.awsp_country} disabled />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input value={user.clientData.nationality} disabled />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Locality</FormLabel>
                    <FormControl>
                      <Input value={user.clientData.locality} disabled />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input value={user.clientData.state} disabled />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Profession</FormLabel>
                    <FormControl>
                      <Input value={user.clientData.profession} disabled />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Education</FormLabel>
                    <FormControl>
                      <Input value={user.clientData.education} disabled />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Communication Preference</FormLabel>
                    <FormControl>
                      <Input value={user.clientData.communication} disabled />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Passions</FormLabel>
                    <FormControl>
                      <Input
                        value={user.clientData.passions.join(", ")}
                        disabled
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Sports</FormLabel>
                    <FormControl>
                      <Input
                        value={user.clientData.sports.join(", ")}
                        disabled
                      />
                    </FormControl>
                  </FormItem>
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </FormProvider>
  );
}
