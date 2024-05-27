import React from "react";
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
import { Button } from "../../ui/button";
import TextEditor from "@/components/courses/steps/step3/richtext-editor/TextEditor";
import { Input } from "../../ui/input";

type Props = {
  action: string;
};

const Assignment = ({ action }: Props) => {
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
                Assignment title
              </span>
              <Input
                type="text"
                id="TopciName"
                placeholder="Kinesiology"
                className="rounded-[10px] text-white"
              />
            </div>
            <div className="mb-28">
              {/*
              <TextEditor title="Summary" />
*/}
            </div>
            <div className="flex flex-col w-full space-y-2 mt-5">
              <span className="text-white font-bold">
                Maximum file size limit
              </span>
              <Input
                type="text"
                id="TopciName"
                className="rounded-[10px] text-white"
                placeholder="0"
              />
            </div>
            <div className="flex flex-col w-full space-y-2 mt-5">
              <span className="text-white font-bold">Upload attachements</span>
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

export default Assignment;
