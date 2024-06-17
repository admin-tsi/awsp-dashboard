"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TopicHeader from "../../add-topics/TopicHeader";
import { ModuleDetails } from "@/lib/types";
import CourseModal from "@/components/courses/steps/step3/courses/CourseModal";
import { useCurrentToken } from "@/hooks/use-current-token";
import QuizModal from "@/components/courses/steps/step3/quizzes/QuizModal";

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
  const token = useCurrentToken();

  if (!module || !module.id) {
    return null;
  }

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
            {cours && (
              <CourseModal
                action="Course"
                courseData={cours}
                moduleId={cours._id}
                token={token}
              />
            )}
            {quizz && (
              <QuizModal
                action="Quiz"
                quizData={quizz}
                quizId={quizz._id}
                token={token}
              />
            )}
            {/*      <Assignment action="Assignments" />*/}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ModuleItem;
