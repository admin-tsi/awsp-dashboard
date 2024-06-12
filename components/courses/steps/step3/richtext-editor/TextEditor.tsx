"use client";

import React, { useState } from "react";
import Tiptap from "./Tiptap";

type Props = {
  title: string;
  initialValue?: string;
  onChange: (content: string) => void; // Add onChange prop
};

const TextEditor = ({ title, initialValue, onChange }: Props) => {
  const [content, setContent] = useState<string>(initialValue || "");

  const handleContentChange = (reason: any) => {
    setContent(reason);
    onChange(reason);
  };

  return (
    <form className="w-full flex flex-col space-y-3 mb-3">
      <h1 className="font-bold text-left text-white">{title}</h1>
      <Tiptap
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
      />
    </form>
  );
};

export default TextEditor;
