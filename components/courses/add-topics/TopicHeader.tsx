"use client";

import React, { useState } from "react";
import { AlignJustify, Pencil, Trash } from "lucide-react";
import { deleteModule, updateModule } from "@/lib/api";
import { useCurrentToken } from "@/hooks/use-current-token";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Props = {
  title: string;
  moduleId: string;
  onDeleteModule: (moduleId: string) => void;
};

function TopicHeader({ title: initialTitle, moduleId, onDeleteModule }: Props) {
  const token = useCurrentToken();
  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button
              aria-label="Delete"
              variant="ghost"
              size="sm"
              onClick={() => setIsDialogOpen(true)}
            >
              <Trash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                module and remove the data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-muted text-white hover:bg-red-500"
                onClick={() => {
                  onDeleteModule(moduleId);
                  setIsDialogOpen(false);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default TopicHeader;
