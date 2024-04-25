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
import { Button } from "../ui/button";
import TextEditor from "../richTextEditor/TextEditor";
import { Input } from "../ui/input";
import CreateQuiz from "../QuizForm/CreateQuiz";

type Props = {
  action: string;
};

const Quiz = ({ action }: Props) => {
  const [showQuizInstructions, setShowQuizInstructions] = useState(true);

  const handleContinueClick = () => {
    setShowQuizInstructions(!showQuizInstructions);
  };

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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="border-b pb-3 text-left">
            {action}
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col space-y-5 w-full">
            {showQuizInstructions ? (
              <>
                <div className="flex flex-col w-full space-y-2 mt-5">
                  <span className="text-white font-bold text-left">
                    Name of the Quiz
                  </span>
                  <Input
                    type="text"
                    id="TopciName"
                    placeholder="Kinesiology"
                    className="rounded-[10px] text-white"
                  />
                </div>
                <div className="mb-28">
                  <TextEditor title="Quiz instructions" />
                </div>
              </>
            ) : (
              <CreateQuiz />
            )}
            <div className="flex justify-end items-center space-x-2">
              {showQuizInstructions ? (
                <AlertDialogCancel className="rounded-[10px]">
                  Cancel
                </AlertDialogCancel>
              ) : (
                <Button
                  variant="outline"
                  className="rounded-[10px]"
                  onClick={() => {
                    handleContinueClick();
                  }}
                >
                  Cancel
                </Button>
              )}

              {showQuizInstructions ? (
                <Button
                  className="rounded-[10px] text-black"
                  onClick={() => {
                    handleContinueClick();
                  }}
                >
                  Continue
                </Button>
              ) : (
                <AlertDialogAction className="rounded-[10px] text-black">
                  Close
                </AlertDialogAction>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Quiz;
