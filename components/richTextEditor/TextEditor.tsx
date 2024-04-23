"use client";

import React, { useState } from "react";
import Tiptap from "./Tiptap";
import { v4 as uuidv4 } from "uuid";

type Props = {
  title: string;
};

const TextEditor = ({ title }: Props) => {
  const [content, setContent] = useState<string>("");
  const handleContentChange = (reason: any) => {
    setContent(reason);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      id: uuidv4(),
      content: content,
    };
    console.log(data);
    const existingDataString = localStorage.getItem("myData");
    const existingData = existingDataString
      ? JSON.parse(existingDataString)
      : [];
    const updatedData = [...existingData, data];
    localStorage.setItem("myData", JSON.stringify(updatedData));
    setContent("");
  };
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-3">
      <h1 className="font-bold text-white">{title}</h1>
      <Tiptap
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
      />
    </form>
  );
};

export default TextEditor;
