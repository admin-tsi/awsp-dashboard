"use client";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDropzone } from "react-dropzone";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/courses/add-topics/Header";
import IndexTopic from "@/components/courses/add-topics/IndexTopic";

const FormSchema = z.object({
  title: z.string(),
  topic: z.string(),
  duration: z.string(),
  description: z.string(),
});

type FormData = z.infer<typeof FormSchema>;

export default function Page() {
  const [step, setStep] = useState(1);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [introVideo, setIntroVideo] = useState<File | null>(null);

  const formMethods = useForm<FormData>({
    resolver: zodResolver(FormSchema as unknown as ZodSchema<FormData>),
    defaultValues: {
      title: "",
      topic: "",
      duration: "",
      description: "",
    },
  });

  const { handleSubmit, control } = formMethods;

  const onThumbnailDrop = useCallback((acceptedFiles: File[]) => {
    setThumbnail(acceptedFiles[0]);
  }, []);

  const onVideoDrop = useCallback((acceptedFiles: File[]) => {
    setIntroVideo(acceptedFiles[0]);
  }, []);

  const onSubmit = (data: FormData) => {
    if (step === 1) {
      setStep(2);
    } else {
      console.log("Form data:", data);
      console.log("Thumbnail:", thumbnail);
      console.log("Intro Video:", introVideo);

      toast({
        title: "Form Submission",
        description: "Form and files have been logged to the console.",
      });
    }
  };

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    onDrop: onThumbnailDrop,
    accept: { "image/*": [] },
    maxSize: 10 * 1024 * 1024,
  });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } =
    useDropzone({
      onDrop: onVideoDrop,
      accept: { "video/*": [] },
      maxSize: 100 * 1024 * 1024,
    });

  return (
    <main className="w-full">
      <div className="col-span-2 p-4">
        <h2 className="text-2xl">Microcredential Info</h2>
        <Separator className="my-4" />
        <Form {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
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
                      <FormDescription>
                        The title of the microcredential.
                      </FormDescription>
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
                        Estimated completion time (e.g., &quot;4 weeks&quot;).
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-4">
                  <div className="thumbnail-form">
                    <h2 className="text-md">Thumbnail</h2>
                    <div
                      {...getThumbnailRootProps()}
                      className="border-2 border-dashed border-gray-300 p-20 text-center my-2"
                    >
                      <input {...getThumbnailInputProps()} />
                      {thumbnail ? (
                        <p>{thumbnail.name}</p>
                      ) : (
                        <p>
                          Drag &apos;n&apos; drop thumbnail here, or click to
                          select files
                        </p>
                      )}
                    </div>
                    <h3 className="text-md text-muted-foreground">
                      File Support: .jpg, .jpeg, .gif, or .png
                    </h3>
                  </div>
                  <div>
                    <h2 className="text-md">Introduction Video</h2>
                    <div
                      {...getVideoRootProps()}
                      className="border-2 border-dashed border-gray-300 p-20 text-center my-2"
                    >
                      <input {...getVideoInputProps()} />
                      {introVideo ? (
                        <p>{introVideo.name}</p>
                      ) : (
                        <p>
                          Drag &apos;n&apos; drop video here, or click to select
                          files
                        </p>
                      )}
                    </div>
                    <h3 className="text-md text-muted-foreground">
                      File format: .mp4
                    </h3>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(3)}
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <IndexTopic />
                <div className="flex space-x-4 mt-52">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                  >
                    Previous
                  </Button>
                  <Button type="button" variant="outline">
                    Submit
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </div>
    </main>
  );
}
