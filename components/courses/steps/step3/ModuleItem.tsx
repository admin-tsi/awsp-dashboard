"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TopicHeader from "../../add-topics/TopicHeader";
import { ModuleDetails, Course, Quizz } from "@/lib/types";
import CourseModal from "@/components/courses/steps/step3/courses/CourseModal";
import { useCurrentToken } from "@/hooks/use-current-token";
import QuizModal from "@/components/courses/steps/step3/quizzes/QuizModal";
import {
  createCourseInModule,
  createQuizInModule,
  getQuizByAdmin,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ModuleItemProps {
  moduleDetails: ModuleDetails;
  onDeleteModule: (moduleId: string) => void;
}

const ModuleItem: React.FC<ModuleItemProps> = ({
  moduleDetails,
  onDeleteModule,
}) => {
  const { module, cours, quizz } = moduleDetails;
  const [title, setTitle] = useState(module?.title || "");
  const [course, setCourse] = useState<Course | null>(cours);
  const [quiz, setQuiz] = useState<Quizz | null>(quizz);
  const token = useCurrentToken();

  if (!module || !module.id) {
    return null;
  }

  const handleCreateCourse = async () => {
    try {
      const newCourseData: Partial<Course> = {
        title: "New Course",
        description: "New description",
        video: "New video",
      };
      const createdCourse = await createCourseInModule(
        module.id,
        newCourseData,
        token,
      );
      toast.success("Course created successfully.");
      setCourse(createdCourse);
    } catch (error) {
      toast.error("Failed to create course.");
      console.error("Error creating course:", error);
    }
  };

  const handleCreateQuiz = async () => {
    try {
      const newQuizData: Partial<Quizz> = {
        name: "New Quiz",
        instructions: "New instructions",
        isEnabled: true,
        questions: [],
        duration: "30 minutes",
        champScore: 0,
      };
      const createdQuiz = await createQuizInModule(
        module.id,
        newQuizData,
        token,
      );
      toast.success("Quiz created successfully.");
      const fetchedQuiz = await getQuizByAdmin(createdQuiz._id, token);
      setQuiz(fetchedQuiz);
    } catch (error) {
      toast.error("Failed to create quiz.");
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={`item-${module.id}`}
        className="border-2 rounded-[10px] px-5 mt-5"
      >
        <AccordionTrigger className="hover:no-underline">
          <TopicHeader
            title={title}
            moduleId={module.id}
            onDeleteModule={onDeleteModule}
          />
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex space-x-2 pt-5 overflow-scroll">
            {course ? (
              <CourseModal
                action="Course"
                courseData={course}
                moduleId={course._id}
                token={token}
              />
            ) : (
              <Button onClick={handleCreateCourse} variant="topicAction">
                Create Course
              </Button>
            )}
            {quiz ? (
              <QuizModal
                action="Quiz"
                quizData={quiz}
                quizId={quiz._id}
                token={token}
              />
            ) : (
              <Button onClick={handleCreateQuiz} variant="topicAction">
                Create Quiz
              </Button>
            )}
            {/* <Assignment action="Assignments" /> */}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ModuleItem;