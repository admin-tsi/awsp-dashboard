"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
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
import TextEditor from "@/components/courses/steps/step3/richtext-editor/TextEditor";
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Plus, X } from "lucide-react";
import {
  updateCourseById,
  updateCourseFiles,
  deleteFileInCourse,
} from "@/lib/api";
import { toast } from "sonner";
import VideoUploadMux from "@/components/courses/steps/VideoUploadMux";
import { Course } from "@/lib/types";
import LoadingSpinner from "@/components/LoadingSpinner";

type Props = {
  action: string;
  courseData?: Course;
  moduleId: string;
  token: string | undefined;
};

const CourseModal = ({ action, courseData, moduleId, token }: Props) => {
  const [title, setTitle] = useState(courseData?.title || "");
  const [description, setDescription] = useState(courseData?.description || "");
  const [loading, setLoading] = useState(false);
  const [coursesFiles, setCoursesFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<string[]>(
    courseData?.courses_files || [],
  );

  useEffect(() => {
    setExistingFiles(courseData?.courses_files || []);
  }, [courseData]);

  const handleSave = async () => {
    const data = {
      title,
      description,
    };

    setLoading(true);
    try {
      await updateCourseById(moduleId, data, token);
      if (coursesFiles.length > 0) {
        await updateCourseFiles(moduleId, coursesFiles, token);
      }
      toast.success("Course has been updated successfully.");
      setCoursesFiles([]); // Reset files after saving
    } catch (error) {
      toast.error("There was an error updating the course.");
      console.error("Error updating module:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const acceptedFiles = Array.from(files);
    if (acceptedFiles.length + coursesFiles.length + existingFiles.length > 5) {
      toast.error("You can only upload up to 5 files.");
      return;
    }
    setCoursesFiles([...coursesFiles, ...acceptedFiles]);
    console.log("Files after change:", [...coursesFiles, ...acceptedFiles]); // Log files after change
  };

  const handleFileRemove = (index: number) => {
    const newFiles = [...coursesFiles];
    newFiles.splice(index, 1);
    setCoursesFiles(newFiles);
    console.log("Files after removal:", newFiles); // Log files after removal
  };

  const handleExistingFileRemove = async (file: string) => {
    setLoading(true);
    try {
      await deleteFileInCourse(moduleId, file, token);
      setExistingFiles(
        existingFiles.filter((existingFile) => existingFile !== file),
      );
      toast.success("File has been deleted successfully.");
    } catch (error) {
      toast.error("There was an error deleting the file.");
      console.error("Error deleting file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="topicAction">
          <Plus />
          <span>{action}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="overflow-y-scroll">
        <AlertDialogHeader>
          <AlertDialogTitle className="border-b pb-3 flex justify-between">
            {action}
            <AlertDialogCancel className="">
              <X />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col space-y-5 w-full">
            <div className="flex flex-col w-full space-y-2 mt-5">
              <span className="text-white font-bold text-left">
                Name of the course
              </span>
              <Input
                type="text"
                id="CourseName"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter course title"
                className="rounded-[10px] text-white"
              />
            </div>
            <TextEditor
              title="Course Description"
              initialValue={description}
              onChange={setDescription}
            />
            <div className="text-foreground">
              <h2 className="text-md py-2">Introduction Video</h2>
              <VideoUploadMux moduleId={moduleId} />
            </div>
            <div className="flex flex-col w-full space-y-2 mt-5">
              <span className="text-white font-bold">
                Upload attachments files to the course (Max 5 files)
              </span>
              <Input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                className="my-2"
              />
              <div className="text-sm text-foreground font-bold">
                Total uploaded files:
                {existingFiles.length + coursesFiles.length}/5
              </div>
              <div className="flex flex-col space-y-2">
                {coursesFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-white">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFileRemove(index)}
                    >
                      <X />
                    </Button>
                  </div>
                ))}
                {existingFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <li className="text-foreground underline text-ellipsis">
                      <a href={file}>{file}</a>
                    </li>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleExistingFileRemove(file)}
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-[10px]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="rounded-[10px] text-black flex items-center"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? <LoadingSpinner text="Loading..." /> : null} Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourseModal;
