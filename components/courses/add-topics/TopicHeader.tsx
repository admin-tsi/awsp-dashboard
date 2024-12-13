import React, { useState } from "react";
import { AlignJustify, Pencil, Save } from "lucide-react";
import { updateModule } from "@/lib/api";
import { useCurrentToken } from "@/hooks/use-current-token";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import DeleteConfirmation from "@/components/DeleteConfirmation";

type Props = {
  title: string;
  moduleId: string;
  onDeleteModule: (moduleId: string) => void;
  isAccordionTrigger?: boolean;
};

function TopicHeader({
  title: initialTitle,
  moduleId,
  onDeleteModule,
  isAccordionTrigger,
}: Props) {
  const token = useCurrentToken();
  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsEditing(true);
  };

  const onSave = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    try {
      await updateModule(moduleId, { title }, token);
      toast.success("Module updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update module");
    }
  };

  const content = (
    <div className="flex items-center justify-between w-full gap-4">
      <div
        className="flex items-center space-x-3 flex-1"
        onClick={(e) => e.stopPropagation()}
      >
        <AlignJustify className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSave();
              } else if (e.key === "Escape") {
                setIsEditing(false);
                setTitle(initialTitle);
              }
            }}
            placeholder="Enter module title"
            autoFocus
          />
        ) : (
          <span className="text-foreground">{title}</span>
        )}
      </div>
      <div
        className="flex items-center gap-2 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {isEditing ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={onSave}
            className="flex items-center gap-1"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
        <DeleteConfirmation
          onDelete={() => onDeleteModule(moduleId)}
          entityName="module"
        />
      </div>
    </div>
  );

  return isAccordionTrigger ? (
    content
  ) : (
    <div className="w-full p-4 bg-card rounded-lg border border-border">
      {content}
    </div>
  );
}

export default TopicHeader;
