"use client";

import React, { useState } from "react";
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
  const { control, handleSubmit } = useFormContext();
  const setFormData = useFormStore((state) => state.setFormData);
  const token = useCurrentToken();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const formData = {
        title: data.title,
        price_usd: Number(data.price_usd),
        topic_en: data.topic_en,
        description_en: data.description_en,
      };

      await updateMicrocredential(microcredentialId, formData, token);
      setFormData(microcredentialId, formData);
      toast.success("Microcredential has been updated successfully.");
      onContinue();
    } catch (error) {
      console.error("Failed to update microcredential", error);
      toast.error("An error occurred while updating the microcredential.");
    } finally {
      setIsLoading(false);
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
        name="price_usd"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price ($)</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                value={field.value || ""}
              />
            </FormControl>
            <FormDescription>Price of the microcredential.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="topic_en"
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
        name="description_en"
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
      <Button
        type="button"
        variant="outline"
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner text="Saving..." /> : "Save"}
      </Button>
    </>
  );
};

export default Step1;
