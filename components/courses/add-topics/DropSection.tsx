import React from "react";

type Props = {
  title: string;
  videoSrc?: string;
  onChange: (videoSrc: string) => void;
};

const DropSection = ({ title, videoSrc, onChange }: Props) => {
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const videoUrl = URL.createObjectURL(file);
      onChange(videoUrl);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      {videoSrc && <video src={videoSrc} controls />}
    </div>
  );
};

export default DropSection;
