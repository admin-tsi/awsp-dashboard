import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Assignment from "@/components/courses/modals/Assignment";
import Lesson from "@/components/courses/modals/Lesson";
import Quiz from "@/components/courses/modals/Quiz";
import TopicHeader from "./TopicHeader";

type Props = {};

const Topic = (props: Props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="item-1"
        className="border-2 rounded-[10px] px-5 mt-5"
      >
        <AccordionTrigger>
          <TopicHeader title="Introduction" />
        </AccordionTrigger>
        <AccordionContent>
          <TopicHeader
            title="Introduction"
            className="border py-2 px-5 rounded-[10px]"
          />
          <div className="flex space-x-2 pt-5 overflow-scroll">
            <Lesson action="Lesson" />
            <Quiz action="Quiz" />
            <Assignment action="Assignments" />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Topic;