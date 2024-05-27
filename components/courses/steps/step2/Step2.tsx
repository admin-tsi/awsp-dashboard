"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { updateMicrocredentialThumbnail } from "@/lib/api";
import { useCurrentToken } from "@/hooks/use-current-token";
import Image from "next/image";

interface Step2Props {
  onPrevious: () => void;
  onContinue: () => void;
  thumbnail: any;
  setThumbnail: (thumbnail: any) => void;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
  introVideo: File | null;
  setIntroVideo: (file: File | null) => void;
  microcredentialId: string;
}

const Step2: React.FC<Step2Props> = ({
  onPrevious,
  onContinue,
  thumbnail,
  setThumbnail,
  previewUrl,
  setPreviewUrl,
  introVideo,
  setIntroVideo,
  microcredentialId,
}) => {
  const token = useCurrentToken();
  const [isEditingThumbnail, setIsEditingThumbnail] = useState(false);
  const [imageError, setImageError] = useState(false);

  const onThumbnailDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onloadend = () => {
          setThumbnail({
            file: file,
            previewUrl: reader.result as string,
          });
          toast({
            title: "Step 2 Saved",
            description: "Thumbnail has been saved.",
          });
        };

        reader.readAsDataURL(file);

        updateMicrocredentialThumbnail(microcredentialId, file, token)
          .then(() => {
            toast({
              title: "Thumbnail Updated",
              description:
                "Microcredential thumbnail has been updated successfully.",
            });
          })
          .catch((error) => {
            toast({
              title: "Error",
              description: error.message,
            });
          });
      }
    },
    [setThumbnail, microcredentialId, token],
  );

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    onDrop: onThumbnailDrop,
    accept: { "image/*": [] },
    maxSize: 10 * 1024 * 1024,
    disabled: !isEditingThumbnail,
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setIntroVideo(file);
      setPreviewUrl(URL.createObjectURL(file));
      toast({
        title: "Step 2 Saved",
        description: "Intro video has been saved.",
      });
    },
    [setIntroVideo, setPreviewUrl],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: !!previewUrl,
    noKeyboard: !!previewUrl,
    accept: { "video/*": [] },
  });

  return (
    <>
      <div className="space-y-4">
        <div className="thumbnail-form">
          <h2 className="text-md">Thumbnail</h2>
          <div
            {...getThumbnailRootProps()}
            className={`border-2 border-dashed border-gray-300 p-20 text-center my-2 ${isEditingThumbnail ? "cursor-pointer" : ""}`}
          >
            <input {...getThumbnailInputProps()} />
            {thumbnail.previewUrl && !imageError ? (
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={thumbnail.previewUrl}
                  width={300}
                  height={300}
                  alt="Thumbnail preview"
                  onError={() => setImageError(true)}
                  style={{ width: "50%", height: "auto" }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => setIsEditingThumbnail(true)}
                >
                  Edit Thumbnail
                </Button>
              </div>
            ) : imageError ? (
              <p>Failed to load image.</p>
            ) : (
              <p>
                Drag &apos;n&apos; drop thumbnail here, or click to select files
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
            {...getRootProps()}
            className="text-xl bg-primary/10 border-2 border-dashed border-muted-foreground rounded-lg p-4 sm:p-6 md:p-10 text-center w-full h-[300px] flex flex-col justify-center items-center overflow-hidden"
          >
            <input {...getInputProps()} />
            {previewUrl ? (
              <>
                <video
                  src={previewUrl}
                  className="max-h-full max-w-full rounded-lg shadow-md mb-4"
                  controls
                />
              </>
            ) : isDragActive ? (
              <p>Drop the video here ...</p>
            ) : (
              <p>Drag & drop a video here, or click to select a video</p>
            )}
          </div>
          <h3 className="text-md text-muted-foreground">File format: .mp4</h3>
        </div>
      </div>
      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button type="button" variant="outline" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </>
  );
};

export default Step2;
