"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Plus,
  X,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  updateCourseById,
  updateCourseFiles,
  deleteFileInCourse,
  getCourseById,
} from "@/lib/api";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Course } from "@/lib/types";
import TextEditor from "@/components/courses/steps/step3/richtext-editor/TextEditor";
import VideoUploadMux from "@/components/courses/steps/VideoUploadMux";

interface CourseModalProps {
  action: string;
  courseData: Course;
  moduleId: string;
  token?: string;
  onUpdate?: () => void;
}

interface FileUploadStatus {
  file: File;
  status: "pending" | "uploading" | "success" | "error";
  progress: number;
}

const MAX_FILES = 5;

const CourseModal: React.FC<CourseModalProps> = ({
  action,
  courseData,
  moduleId,
  token,
  onUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileStatuses, setFileStatuses] = useState<FileUploadStatus[]>([]);
  const [existingFiles, setExistingFiles] = useState<string[]>([]);

  useEffect(() => {
    if (!courseData) return;

    setTitle(courseData.title_en || "");
    setDescription(courseData.description_en || "");
    setVideo(courseData.video || "");
    setExistingFiles(courseData.courses_files || []);
  }, [courseData]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const acceptedFiles = Array.from(files);
    const totalFiles =
      acceptedFiles.length + fileStatuses.length + existingFiles.length;

    if (totalFiles > MAX_FILES) {
      toast.error(`Maximum ${MAX_FILES} files allowed`);
      return;
    }

    const newFileStatuses: FileUploadStatus[] = acceptedFiles.map((file) => ({
      file,
      status: "pending",
      progress: 0,
    }));

    setFileStatuses((prev) => [...prev, ...newFileStatuses]);
  };

  const handleFileRemove = (index: number) => {
    setFileStatuses((prev) => prev.filter((_, i) => i !== index));
  };

  const handleExistingFileRemove = async (fileUrl: string) => {
    if (!token || !courseData._id) return;

    try {
      setLoading(true);
      await deleteFileInCourse(courseData._id, fileUrl, token);
      setExistingFiles((prev) => prev.filter((f) => f !== fileUrl));
      toast.success("File removed successfully");
    } catch (error) {
      toast.error("Failed to remove file");
      console.error("Error removing file:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadFiles = async () => {
    if (!token || !courseData._id || fileStatuses.length === 0) return;

    try {
      setUploading(true);
      const pendingFiles = fileStatuses
        .filter((status) => status.status === "pending")
        .map((status) => status.file);

      setFileStatuses((prev) =>
        prev.map((status) =>
          status.status === "pending"
            ? { ...status, status: "uploading", progress: 0 }
            : status,
        ),
      );

      await updateCourseFiles(courseData._id, pendingFiles, token);

      setFileStatuses((prev) =>
        prev.map((status) =>
          status.status === "uploading"
            ? { ...status, status: "success", progress: 100 }
            : status,
        ),
      );

      const updatedCourse = await getCourseById(courseData._id, token);
      setExistingFiles(updatedCourse.courses_files || []);

      setTimeout(() => {
        setFileStatuses([]);
      }, 2000);

      toast.success("Files uploaded successfully");
    } catch (error) {
      setFileStatuses((prev) =>
        prev.map((status) =>
          status.status === "uploading"
            ? { ...status, status: "error", progress: 0 }
            : status,
        ),
      );
      toast.error("Failed to upload files");
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!token || !courseData._id) return;

    try {
      setLoading(true);
      const courseUpdate = {
        title_en: title.trim(),
        description_en: description.trim(),
        video,
        courses_files: existingFiles,
      };

      await updateCourseById(courseData._id, courseUpdate, token);
      toast.success("Course updated successfully");
      onUpdate?.();
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to update course");
      console.error("Error updating course:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderFileStatus = (status: FileUploadStatus) => {
    const statusColors = {
      pending: "text-primary",
      uploading: "text-primary animate-pulse",
      success: "text-green-500",
      error: "text-red-500",
    };

    const StatusIcon = {
      pending: Upload,
      uploading: LoadingSpinner,
      success: CheckCircle,
      error: AlertCircle,
    }[status.status];

    return (
      <div
        className={`flex items-center text-sm ${statusColors[status.status]}`}
      >
        <StatusIcon className="w-4 h-4 mr-2" />
        {status.status === "uploading"
          ? `Uploading... ${status.progress}%`
          : status.status}
      </div>
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="topicAction" className="hover:bg-muted">
          <Plus className="mr-2 h-4 w-4" />
          {action}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <div className="flex justify-between items-center border-b pb-3">
            <AlertDialogTitle>{action}</AlertDialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center p-4">
              <LoadingSpinner text="Processing..." />
            </div>
          ) : (
            <AlertDialogDescription asChild>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Details</CardTitle>
                    <CardDescription>Enter course information</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter course title"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <TextEditor
                          title=""
                          initialValue={description}
                          onChange={setDescription}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-lg font-semibold">Course Video</div>
                      <VideoUploadMux courseId={courseData._id} />
                    </div>

                    <div className="space-y-4">
                      <div className="text-lg font-semibold">
                        Course Materials
                      </div>
                      <div className="space-y-2">
                        <div className="flex gap-2 items-end">
                          <div className="flex-1">
                            <Label>Upload Files (Max {MAX_FILES})</Label>
                            <Input
                              type="file"
                              onChange={handleFileChange}
                              multiple
                              accept=".pdf,.doc,.docx,image/*"
                            />
                          </div>
                          <Button
                            onClick={uploadFiles}
                            disabled={fileStatuses.length === 0 || uploading}
                          >
                            {uploading ? (
                              <LoadingSpinner />
                            ) : (
                              <>
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Files
                              </>
                            )}
                          </Button>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Total files:{" "}
                          {(existingFiles?.length || 0) +
                            (fileStatuses?.length || 0)}
                          /{MAX_FILES}
                        </div>
                      </div>

                      {fileStatuses.length > 0 && (
                        <div className="space-y-2">
                          <div className="font-medium">Upload Queue</div>
                          {fileStatuses.map((status, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 rounded bg-muted"
                            >
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4 text-primary" />
                                <span className="truncate">
                                  {status.file.name}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                {renderFileStatus(status)}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleFileRemove(index)}
                                  disabled={status.status === "uploading"}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {existingFiles.length > 0 && (
                        <div className="space-y-2">
                          <div className="font-medium">Existing Files</div>
                          {existingFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 rounded bg-muted"
                            >
                              <a
                                href={file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-primary hover:underline"
                              >
                                <FileText className="w-4 h-4" />
                                <span className="truncate">
                                  {file.split("/").pop()}
                                </span>
                              </a>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleExistingFileRemove(file)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <AlertDialogFooter>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={loading}>
                      {loading ? (
                        <LoadingSpinner text="Saving..." />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </AlertDialogFooter>
              </div>
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourseModal;
