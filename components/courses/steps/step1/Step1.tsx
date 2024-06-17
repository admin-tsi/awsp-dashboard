"use client";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormStore } from "@/stores/courses/steps/useFormStore";
import { toast } from "sonner";
import { updateMicrocredential } from "@/lib/api";
import { useCurrentToken } from "@/hooks/use-current-token";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Step1Props {
  onContinue: () => void;
  microcredentialId: string;
}

const Step1: React.FC<Step1Props> = ({ onContinue, microcredentialId }) => {
  const { control, watch, handleSubmit } = useFormContext();
  const setFormData = useFormStore((state) => state.setFormData);
  const token = useCurrentToken();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name) {
        setFormData(microcredentialId, { [name]: value[name] });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setFormData, microcredentialId]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await updateMicrocredential(microcredentialId, data, token);
      setIsLoading(false);
      toast.success("Microcredential has been updated successfully.");
      onContinue();
    } catch (error) {
      console.error("Failed to update microcredential", error);
      toast.error("An error occurred while updating the microcredential.");
    }
  };

  return (
    <>
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>The title of the microcredential.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price ($)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>Price of the microcredential.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="topic"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Topic</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              Main topic covered by the microcredential.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Duration</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              Estimated completion time (e.g., "4 weeks").
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormDescription>
              Brief description of the microcredential.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="button" variant="outline" onClick={handleSubmit(onSubmit)}>
        {isLoading ? <LoadingSpinner text="Saving..." /> : "Continue"}
      </Button>
    </>
  );
};

export default Step1;
