"use client";

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TopicHeader from "../../add-topics/TopicHeader";
import { Course, ModuleDetails, Quizz } from "@/lib/types";
import CourseModal from "@/components/courses/steps/step3/courses/CourseModal";
import { useCurrentToken } from "@/hooks/use-current-token";
import QuizModal from "@/components/courses/steps/step3/quizzes/QuizModal";
import {
  createCourseInModule,
  createQuizInModule,
  getQuizByAdmin,
  getCourseById,
  createExerciseInModule,
  getExerciseById,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Exercise {
  _id: string;
  exo_file: string;
  description: string;
  instruction: string;
  students_reviews: any[];
}

interface ModuleItemProps {
  moduleDetails: ModuleDetails;
  onDeleteModule: (moduleId: string) => void;
}

const ModuleItem: React.FC<ModuleItemProps> = ({
  moduleDetails,
  onDeleteModule,
}) => {
  const [title, setTitle] = useState(moduleDetails.title);
  const [course, setCourse] = useState<Course | null>(null);
  const [quiz, setQuiz] = useState<Quizz | null>(null);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isLoadingCourse, setIsLoadingCourse] = useState(false);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  const [isLoadingExercise, setIsLoadingExercise] = useState(false);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [isCreatingExercise, setIsCreatingExercise] = useState(false);
  const token = useCurrentToken();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      if (moduleDetails.cours) {
        setIsLoadingCourse(true);
        try {
          const fetchedCourse = await getCourseById(moduleDetails.cours, token);
          setCourse(fetchedCourse);
        } catch (error) {
          console.error("Error fetching course:", error);
          toast.error("Failed to fetch course details");
        } finally {
          setIsLoadingCourse(false);
        }
      }

      if (moduleDetails.quizz) {
        setIsLoadingQuiz(true);
        try {
          const fetchedQuiz = await getQuizByAdmin(moduleDetails.quizz, token);
          setQuiz(fetchedQuiz);
        } catch (error) {
          console.error("Error fetching quiz:", error);
          toast.error("Failed to fetch quiz details");
        } finally {
          setIsLoadingQuiz(false);
        }
      }

      if (moduleDetails.exercise) {
        setIsLoadingExercise(true);
        try {
          const fetchedExercise = await getExerciseById(
            moduleDetails.exercise,
            token,
          );
          setExercise(fetchedExercise);
        } catch (error) {
          console.error("Error fetching exercise:", error);
          toast.error("Failed to fetch exercise details");
        } finally {
          setIsLoadingExercise(false);
        }
      }
    };

    fetchData();
  }, [moduleDetails, token]);

  const handleCreateCourse = async () => {
    if (!token) return;

    setIsCreatingCourse(true);
    try {
      const newCourseData = {
        title_en: "New Course",
        title_fr: "",
        description_en: "New description",
        video: "",
        courses_files: [],
      };
      const createdCourse = await createCourseInModule(
        moduleDetails._id,
        newCourseData,
        token,
      );
      setCourse(createdCourse);
      toast.success("Course created successfully");
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
    } finally {
      setIsCreatingCourse(false);
    }
  };

  const handleCreateQuiz = async () => {
    if (!token) return;

    setIsCreatingQuiz(true);
    try {
      const newQuizData = {
        name: "New Quiz",
        instructions_en: "Quiz instructions",
        isEnabled: false,
        questions: [],
        duration: "30 minutes",
        champScore: 100,
      };
      const createdQuiz = await createQuizInModule(
        moduleDetails._id,
        newQuizData,
        token,
      );
      setQuiz(createdQuiz);
      toast.success("Quiz created successfully");
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast.error("Failed to create quiz");
    } finally {
      setIsCreatingQuiz(false);
    }
  };

  const handleCreateExercise = async () => {
    if (!token) return;

    setIsCreatingExercise(true);
    try {
      const newExerciseData = {
        description: "New exercise description",
        instruction: "Exercise instructions",
        students_reviews: [],
      };
      const createdExercise = await createExerciseInModule(
        moduleDetails._id,
        newExerciseData,
        token,
      );
      setExercise(createdExercise);
      toast.success("Exercise created successfully");
    } catch (error) {
      console.error("Error creating exercise:", error);
      toast.error("Failed to create exercise");
    } finally {
      setIsCreatingExercise(false);
    }
  };

  const renderCourseSection = () => {
    if (isLoadingCourse) {
      return <LoadingSpinner text="Loading course..." />;
    }

    if (course) {
      return (
        <CourseModal
          action="Course"
          courseData={course}
          moduleId={moduleDetails._id}
          token={token}
        />
      );
    }

    return (
      <Button
        onClick={handleCreateCourse}
        variant="outline"
        className="w-[200px]"
        disabled={isCreatingCourse}
      >
        {isCreatingCourse ? (
          <LoadingSpinner text="Creating..." />
        ) : (
          "Create Course"
        )}
      </Button>
    );
  };

  const renderQuizSection = () => {
    if (isLoadingQuiz) {
      return <LoadingSpinner text="Loading quiz..." />;
    }

    if (quiz) {
      return (
        <QuizModal
          action="Quiz"
          quizData={quiz}
          quizId={quiz._id}
          token={token}
        />
      );
    }

    return (
      <Button
        onClick={handleCreateQuiz}
        variant="outline"
        className="w-[200px]"
        disabled={isCreatingQuiz}
      >
        {isCreatingQuiz ? <LoadingSpinner text="Creating..." /> : "Create Quiz"}
      </Button>
    );
  };

  /*
  const renderExerciseSection = () => {
    if (isLoadingExercise) {
      return <LoadingSpinner text="Loading exercise..." />;
    }

    if (exercise) {
      return (
        <ExerciseModal
          action="Exercise"
          exerciseData={exercise}
          moduleId={moduleDetails._id}
          token={token}
        />
      );
    }

    return (
      <Button
        onClick={handleCreateExercise}
        variant="topicAction"
        className="w-[200px]"
        disabled={isCreatingExercise}
      >
        {isCreatingExercise ? (
          <LoadingSpinner text="Creating..." />
        ) : (
          "Create Exercise"
        )}
      </Button>
    );
  };
*/

  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={`item-${moduleDetails._id}`}
        className="border-2 rounded-lg px-5 mt-5"
      >
        <AccordionTrigger className="hover:no-underline">
          <TopicHeader
            title={title}
            moduleId={moduleDetails._id}
            onDeleteModule={onDeleteModule}
            isAccordionTrigger={true}
          />
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
            {renderCourseSection()}
            {renderQuizSection()}
            {/*
            {renderExerciseSection()}
*/}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ModuleItem;
