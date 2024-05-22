import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TopicHeader from "../../add-topics/TopicHeader";
import { ModuleDetails } from "@/lib/types";
import Assignment from "@/components/courses/modals/Assignment";
import Quiz from "@/components/courses/modals/Quiz";
import CourseModal from "@/components/courses/steps/step3/courses/CourseModal";

interface ModuleItemProps {
  moduleDetails: ModuleDetails;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ moduleDetails }) => {
  const { module, cours, quizz } = moduleDetails;
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(module.title);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={`item-${module.id}`}
        className="border-2 rounded-[10px] px-5 mt-5"
      >
        <AccordionTrigger className="hover:no-underline">
          <TopicHeader title={title} moduleId={module.id} />
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex space-x-2 pt-5 overflow-scroll">
            <CourseModal action="Course" courseData={cours} />
            <Quiz action="Quiz" quizData={quizz} />
            <Assignment action="Assignments" />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ModuleItem;
