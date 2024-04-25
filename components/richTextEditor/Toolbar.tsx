"use client";

import React, { useEffect, useState } from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Undo,
  Redo,
} from "lucide-react";

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: Props) => {
  const [saveStatus, setSaveStatus] = useState("Save");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSaveStatus("Saving...");
      setTimeout(() => {
        setSaveStatus("Save");
      }, 2000);
    }, 500000);

    return () => clearInterval(intervalId);
  }, []);

  if (!editor) {
    return null;
  }
  return (
    <div
      className="px-4 py-3 flex justify-between items-center
    gap-5 w-full flex-wrap border rounded-t-[14px]"
    >
      <div className="flex justify-start items-center gap-2 w-full lg:w-10/12 flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-primary text-black h-10 w-10 rounded-[10px] p-2 flex items-center justify-center"
              : "text-white h-10 w-10 flex items-center justify-center"
          }
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-primary text-black h-10 w-10 rounded-[10px] p-2 flex items-center justify-center"
              : "text-white h-10 w-10 flex items-center justify-center"
          }
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-primary text-black h-10 w-10 rounded-[10px] p-2 flex items-center justify-center"
              : "text-white h-10 w-10 flex items-center justify-center"
          }
        >
          <Underline className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-primary text-black h-10 w-10 rounded-[10px] p-2 flex items-center justify-center"
              : "text-white h-10 w-10 flex items-center justify-center"
          }
        >
          <Strikethrough className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-primary text-black h-10 w-10 rounded-[10px] p-2 flex items-center justify-center"
              : "text-white h-10 w-10 flex items-center justify-center"
          }
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-primary text-black h-10 w-10 rounded-[10px] p-2 flex items-center justify-center"
              : "text-white h-10 w-10 flex items-center justify-center"
          }
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-primary text-black h-10 w-10 rounded-[10px] p-2 flex items-center justify-center"
              : "text-white h-10 w-10 flex items-center justify-center"
          }
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-primary text-black h-10 w-10 rounded-[10px] p-2 flex items-center justify-center"
              : "text-white h-10 w-10 flex items-center justify-center"
          }
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-primary text-black h-10 w-10 rounded-[10px] p-2 flex items-center justify-center"
              : "text-white h-10 w-10 flex items-center justify-center"
          }
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>
      {content && (
        <button
          type="submit"
          className="px-4 bg-primary text-black py-2 rounded-[10px]"
        >
          {saveStatus}
        </button>
      )}
    </div>
  );
};

export default Toolbar;
