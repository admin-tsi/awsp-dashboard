import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, FilePenLine } from "lucide-react";
import {
  updateExerciseById,
  updateExerciseFile,
  getExerciseById,
} from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

interface ExerciseData {
  _id: string;
  exo_file?: string;
  description: string;
  instruction: string;
  students_reviews: any[];
}

interface ExerciseModalProps {
  action: string;
  exerciseData: ExerciseData;
  moduleId: string;
  token: string | undefined;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({
  action,
  exerciseData,
  moduleId,
  token,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState(exerciseData.description);
  const [instruction, setInstruction] = useState(exerciseData.instruction);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [currentFileName, setCurrentFileName] = useState(
    exerciseData.exo_file || "No file uploaded",
  );

  const fetchExerciseData = async () => {
    if (!token || !exerciseData._id) return;

    setIsFetching(true);
    try {
      const fetchedExercise = await getExerciseById(exerciseData._id, token);
      setDescription(fetchedExercise.description);
      setInstruction(fetchedExercise.instruction);
      setCurrentFileName(fetchedExercise.exo_file || "No file uploaded");
    } catch (error) {
      console.error("Error fetching exercise:", error);
      toast.error("Failed to fetch exercise details");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchExerciseData();
    }
  }, [isOpen, exerciseData._id, token]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("File size should not exceed 10MB");
        return;
      }
      setFile(selectedFile);
      setCurrentFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateExerciseById(
        exerciseData._id,
        {
          description,
          instruction,
        },
        token,
      );

      if (file) {
        await updateExerciseFile(exerciseData._id, file, token);
      }

      toast.success("Exercise updated successfully");
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating exercise:", error);
      toast.error("Failed to update exercise");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = () => {
    if (exerciseData.exo_file) {
      window.open(exerciseData.exo_file, "_blank");
    } else {
      toast.error("No file available for download");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[200px]">
          <FilePenLine className="mr-2 h-4 w-4" />
          {action}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Exercise</DialogTitle>
        </DialogHeader>

        {isFetching ? (
          <div className="flex justify-center items-center h-[300px]">
            <LoadingSpinner text="Loading exercise details..." />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Exercise description"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="instruction">Instructions</Label>
                <Textarea
                  id="instruction"
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  placeholder="Exercise instructions"
                  className="mt-1"
                />
              </div>

              <div className="space-y-2">
                <Label>Exercise File</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm text-muted-foreground truncate">
                      Current file: {currentFileName}
                    </p>
                  </div>
                  {exerciseData.exo_file && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={downloadFile}
                    >
                      Download
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    id="exercise-file"
                  />
                  <Label
                    htmlFor="exercise-file"
                    className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-accent"
                  >
                    <FileUp className="h-4 w-4" />
                    Upload New File
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Accepted file types: PDF, DOC, DOCX, TXT (Max 10MB)
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <LoadingSpinner text="Saving..." />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseModal;
