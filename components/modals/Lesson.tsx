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
import TextEditor from "../richTextEditor/TextEditor";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import DropSection from "../addTopics/dropSection";

type Props = {
  action: string;
};

const Lesson = ({ action }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="topicAction">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={15}
            height={16}
            fill="none"
          >
            <rect width={15} height={15} y={0.248} fill="#F2DD66" rx={5} />
            <path
              fill="#1B1F20"
              d="M10.56 8.472H8.472v2.136H6.528V8.472H4.44V6.636h2.088V4.488h1.944v2.148h2.088v1.836Z"
            />
          </svg>
          <span>{action}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="overflow-y-scroll">
        <AlertDialogHeader>
          <AlertDialogTitle className="border-b pb-3">
            {action}
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col space-y-5 w-full">
            <div className="flex flex-col w-full space-y-2 mt-5">
              <span className="text-white font-bold text-left">
                Name of the lesson
              </span>
              <Input
                type="text"
                id="TopciName"
                placeholder="Kinesiology"
                className="rounded-[10px] text-white"
              />
            </div>
            <TextEditor title="Lesson Description" />
            <DropSection title="Lesson Video" />
            <div className="flex flex-col w-full space-y-2 mt-5">
              <span className="text-white font-bold">
                Upload attachements files to the lesson
              </span>
              <Input
                type="file"
                id="TopciName"
                className="rounded-[10px] text-white"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-[10px]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="rounded-[10px] text-black">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Lesson;
