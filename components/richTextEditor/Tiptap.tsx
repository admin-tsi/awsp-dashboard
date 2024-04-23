"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";

const Tiptap = ({ onChange, content }: any) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 h-96 justify-start border text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-b-[10px] outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full">
      <Toolbar editor={editor} content={content} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;
