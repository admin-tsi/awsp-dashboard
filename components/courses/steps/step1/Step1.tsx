"use client";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormStore } from "@/stores/courses/steps/useFormStore";
import { Textarea } from "@/components/ui/textarea";

interface Step1Props {
  onContinue: () => void;
  microcredentialId: string; // Add microcredentialId as a prop
}

const Step1: React.FC<Step1Props> = ({ onContinue, microcredentialId }) => {
  const { control, watch } = useFormContext();
  const setFormData = useFormStore((state) => state.setFormData);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name) {
        setFormData(microcredentialId, { [name]: value[name] });
        toast({
          title: "Step 1 Saved",
          description: `${name} has been saved.`,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setFormData, microcredentialId]);

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
      <Button type="button" variant="outline" onClick={onContinue}>
        Continue
      </Button>
    </>
  );
};

export default Step1;
