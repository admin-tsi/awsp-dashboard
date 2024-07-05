"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { updateMicrocredentialThumbnail } from "@/lib/api";
import { useCurrentToken } from "@/hooks/use-current-token";
import Image from "next/image";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Step2Props {
  onPrevious: () => void;
  onContinue: () => void;
  thumbnail: any;
  setThumbnail: (thumbnail: any) => void;
  microcredentialId: string;
}

const Step2: React.FC<Step2Props> = ({
  onPrevious,
  onContinue,
  thumbnail,
  setThumbnail,
  microcredentialId,
}) => {
  const token = useCurrentToken();
  const [isEditingThumbnail, setIsEditingThumbnail] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        };

        reader.readAsDataURL(file);

        setIsLoading(true);
        updateMicrocredentialThumbnail(microcredentialId, file, token)
          .then(() => {
            console.log("Thumbnail updated successfully", file);
            toast.success("Thumbnail updated successfully");
            setIsLoading(false);
          })
          .catch(() => {
            toast.error("Failed to update thumbnail");
            setIsLoading(false);
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
    disabled: !isEditingThumbnail || isLoading,
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
            {isLoading ? (
              <LoadingSpinner text="Uploading..." />
            ) : thumbnail.previewUrl && !imageError ? (
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={thumbnail.previewUrl}
                  width={300}
                  height={300}
                  alt="Thumbnail preview"
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
      </div>
      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button type="button" variant="outline" onClick={onContinue}>
          Save
        </Button>
      </div>
    </>
  );
};

export default Step2;
