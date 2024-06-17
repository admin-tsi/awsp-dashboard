"use client";

import React, { useState } from "react";
import { AlignJustify, Pencil } from "lucide-react";
import { updateModule } from "@/lib/api";
import { useCurrentToken } from "@/hooks/use-current-token";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import DeleteConfirmation from "@/components/DeleteConfirmation";

type Props = {
  title: string;
  moduleId: string;
  onDeleteModule: (moduleId: string) => void;
};

function TopicHeader({ title: initialTitle, moduleId, onDeleteModule }: Props) {
  const token = useCurrentToken();
  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = () => {
    setIsEditing(true);
  };

  const onSave = async () => {
    await updateModule(moduleId, { title }, token);
    toast.success("Module updated successfully");
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-2 w-full">
        <AlignJustify />
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded p-1 w-full"
          />
        ) : (
          <span>{title}</span>
        )}
      </div>
      <div className="flex space-x-2">
        {isEditing ? (
          <Button onClick={onSave} variant="ghost" size="sm">
            Save
          </Button>
        ) : (
          <Button onClick={onEdit} variant="ghost" size="sm">
            <Pencil />
          </Button>
        )}
        <DeleteConfirmation
          onDelete={() => onDeleteModule(moduleId)}
          entityName="module"
        />
      </div>
    </div>
  );
}

export default TopicHeader;
