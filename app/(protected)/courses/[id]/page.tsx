"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getMicrocredentialById, updateMicrocredential } from "@/lib/api";
import { useCurrentToken } from "@/hooks/use-current-token";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import Step1 from "@/components/courses/steps/step1/Step1";
import Step2 from "@/components/courses/steps/step2/Step2";
import Step3 from "@/components/courses/steps/step3/Step3";
import { ModuleDetails } from "@/lib/types";
import { useFormStore } from "@/stores/courses/steps/useFormStore";
import CustomBreadcrumb from "@/components/CustomBreadcumb";

const FormSchema = z.object({
  title: z.string(),
  topic: z.string(),
  duration: z.string(),
  description: z.string(),
  thumbnail: z.string(),
});

type FormData = z.infer<typeof FormSchema>;

interface ThumbnailState {
  file: File | null;
  previewUrl: string | null;
}

export default function Page({ params }: { params: { id: string } }) {
  const [step, setStep] = useState(1);
  const [thumbnail, setThumbnail] = useState<ThumbnailState>({
    file: null,
    previewUrl: null,
  });
  const [modules, setModules] = useState<ModuleDetails[]>([]);
  const [introVideo, setIntroVideo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useCurrentToken();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { formData, mergeFormData, clearFormData } = useFormStore((state) => ({
    formData: state.formData[params.id] || {},
    mergeFormData: state.mergeFormData,
    clearFormData: state.clearFormData,
  }));

  const formMethods = useForm<FormData>({
    resolver: zodResolver(FormSchema as unknown as ZodSchema<FormData>),
    defaultValues: formData,
  });

  const { handleSubmit, reset, control } = formMethods;

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);
    getMicrocredentialById(params.id, token)
      .then((data) => {
        setThumbnail({ file: null, previewUrl: data.thumbnail || "" });
        mergeFormData(params.id, data);
        reset({ ...data, ...formData });
        setModules(data.modules || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch microcredential", error);
        setIsLoading(false);
      });
  }, [params.id, token]);

  const onSubmit = async (data: FormData) => {
    try {
      await updateMicrocredential(params.id, data, token);
      clearFormData(params.id);
      toast({
        title: "Form Submission",
        description: "Microcredential has been updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update microcredential", error);
      toast({
        title: "Form Submission",
        description: "An error occurred while updating the microcredential.",
      });
    }
  };

  return (
    <main className="w-full">
      <CustomBreadcrumb />
      <div className="col-span-2 p-4">
        <div className="text-2xl">
          Microcredential Info <span className="font-bold">(Step {step})</span>
        </div>
        <Separator className="my-4" />
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <Step1
                onContinue={() => setStep(2)}
                microcredentialId={params.id}
              />
            )}
            {step === 2 && (
              <Step2
                onPrevious={() => setStep(1)}
                onContinue={() => setStep(3)}
                thumbnail={thumbnail}
                setThumbnail={setThumbnail}
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl}
                introVideo={introVideo}
                setIntroVideo={setIntroVideo}
                microcredentialId={params.id}
              />
            )}
            {step === 3 && (
              <Step3
                modules={modules}
                onPrevious={() => setStep(2)}
                onSubmit={handleSubmit(onSubmit)}
                microcredentialId={params.id}
                token={token}
              />
            )}
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
