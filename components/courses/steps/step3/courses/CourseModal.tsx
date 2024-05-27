import React, { useState } from "react";
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
import DropSection from "@/components/courses/add-topics/DropSection";
import { Plus, X } from "lucide-react";
import { updateCourseById } from "@/lib/api";

type CourseData = {
  title: string;
  description: string;
  video: string;
};

type Props = {
  action: string;
  courseData?: CourseData;
  moduleId: string; // Add moduleId prop
  token: string | undefined; // Add token prop
};

const CourseModal = ({ action, courseData, moduleId, token }: Props) => {
  const [title, setTitle] = useState(courseData?.title || "");
  const [description, setDescription] = useState(courseData?.description || "");
  const [video, setVideo] = useState(courseData?.video || "");

  const handleSave = async () => {
    const data = {
      title,
      description,
      video,
    };

    try {
      await updateCourseById(moduleId, data, token);
      console.log("Module updated successfully");
      // Add any success handling logic here, e.g., close the modal
    } catch (error) {
      console.error("Error updating module:", error);
      // Add any error handling logic here
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
            <DropSection
              title="Course Video"
              videoSrc={video}
              onChange={setVideo}
            />
            <div className="flex flex-col w-full space-y-2 mt-5">
              <span className="text-white font-bold">
                Upload attachments files to the course
              </span>
              <Input
                type="file"
                id="CourseAttachments"
                className="rounded-[10px] text-white"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-[10px]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="rounded-[10px] text-black"
            onClick={handleSave}
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourseModal;
