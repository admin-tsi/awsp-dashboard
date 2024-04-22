import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Action from "./action";
import TopicHeader from "./topicHeader";

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
            <Action action="Lesson" />
            <Action action="Quiz" />
            <Action action="Assignments" />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Topic;
