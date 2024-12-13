"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getMicrocredentialById } from "@/lib/api";
import { useCurrentToken } from "@/hooks/use-current-token";
import { Separator } from "@/components/ui/separator";
import Step1 from "@/components/courses/steps/step1/Step1";
import Step2 from "@/components/courses/steps/step2/Step2";
import Step3 from "@/components/courses/steps/step3/Step3";
import { ModuleDetails } from "@/lib/types";
import { useFormStore } from "@/stores/courses/steps/useFormStore";
import CustomBreadcrumb from "@/components/CustomBreadcumb";
import CustomStepBreadcrumb from "@/components/courses/steps/CustomStepBreadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
  title: z.string(),
  price_usd: z.number(),
  topic_en: z.string(),
  description_en: z.string(),
  thumbnail: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

interface ThumbnailState {
  file: File | null;
  previewUrl: string | null;
}

const FormSkeleton = () => (
  <div className="space-y-8 w-full animate-pulse">
    <div className="space-y-4">
      {/* Title field skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Topic field skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Description field skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-32 w-full" />
      </div>

      {/* Price field skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-48" />
      </div>
    </div>

    {/* Button skeleton */}
    <div className="flex justify-end">
      <Skeleton className="h-10 w-32" />
    </div>
  </div>
);

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = parseInt(searchParams.get("step") || "1");
  const [step, setStep] = useState(initialStep);
  const [thumbnail, setThumbnail] = useState<ThumbnailState>({
    file: null,
    previewUrl: null,
  });
  const [modules, setModules] = useState<ModuleDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useCurrentToken();
  const { formData } = useFormStore((state) => ({
    formData: state.formData[params.id] || {},
  }));

  const formMethods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: formData,
  });

  // Update URL when step changes
  const handleStepChange = (newStep: number) => {
    setStep(newStep);
    const newUrl = `${window.location.pathname}?step=${newStep}`;
    window.history.pushState({ step: newStep }, "", newUrl);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const data = await getMicrocredentialById(params.id, token);
        setThumbnail({ file: null, previewUrl: data.thumbnail || "" });
        formMethods.reset(data);
        setModules(data.modules || []);
      } catch (error) {
        console.error("Failed to fetch microcredential", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id, token]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const step = event.state?.step || 1;
      setStep(step);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const steps = ["Step 1", "Step 2", "Step 3"];

  return (
    <main className="w-full">
      <CustomBreadcrumb />
      <div className="col-span-2 p-4">
        <div className="text-xl flex items-center gap-4">
          Microcredential Info
          {!isLoading && (
            <CustomStepBreadcrumb
              steps={steps}
              currentStep={step}
              setStep={handleStepChange}
            />
          )}
        </div>
        <Separator className="my-4" />

        {isLoading ? (
          <FormSkeleton />
        ) : (
          <FormProvider {...formMethods}>
            <div className="space-y-6">
              {step === 1 && (
                <Step1
                  onContinue={() => handleStepChange(2)}
                  microcredentialId={params.id}
                />
              )}
              {step === 2 && (
                <Step2
                  onPrevious={() => handleStepChange(1)}
                  onContinue={() => handleStepChange(3)}
                  thumbnail={thumbnail}
                  setThumbnail={setThumbnail}
                  microcredentialId={params.id}
                />
              )}
              {step === 3 && (
                <Step3
                  modules={modules}
                  setModules={setModules}
                  onPrevious={() => handleStepChange(2)}
                  microcredentialId={params.id}
                  token={token}
                />
              )}
            </div>
          </FormProvider>
        )}
      </div>
    </main>
  );
}
