import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../../ui/button";

type Props = {
  title: string;
  videoSrc?: string;
};

const DropSection = ({ title, videoSrc }: Props) => {
  const [introVideo, setIntroVideo] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(videoSrc || null);

  const onVideoDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setIntroVideo(file);
    setPreviewSrc(URL.createObjectURL(file));
  }, []);

  const removeVideo = () => {
    setIntroVideo(null);
    setPreviewSrc(null);
  };

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } =
    useDropzone({
      onDrop: onVideoDrop,
      accept: { "video/*": [] },
      maxSize: 100 * 1024 * 1024,
    });

  return (
    <div className="flex flex-col my-3">
      <h2 className="text-white font-bold text-left">{title}</h2>
      <div
        {...getVideoRootProps()}
        className="border-2 border-dashed rounded-[10px] h-96 border-gray-300 p-20 text-center flex flex-col items-center justify-center my-2"
      >
        <input {...getVideoInputProps()} />
        {previewSrc ? (
          <div className="flex flex-col items-center">
            <video
              className="mb-2"
              width="100%"
              height="auto"
              controls
              src={previewSrc}
            />
            <Button variant="topicAction" onClick={removeVideo}>
              <span className="font-bold">Remove Video</span>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="font-bold text-white">
              Drag and Drop your video
            </span>
            <span>
              File format: <span className="font-bold text-white">.mp4</span>
            </span>
            <span>or</span>
            <Button variant="topicAction">
              <span className="font-bold">Browse File</span>
            </Button>
          </div>
        )}
      </div>
      <h3 className="text-md text-muted-foreground">File format: .mp4</h3>
    </div>
  );
};

export default DropSection;
