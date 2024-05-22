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
import { Button } from "../../ui/button";
import TextEditor from "@/components/courses/richtext-editor/TextEditor";
import { Input } from "../../ui/input";
import CreateQuiz from "@/components/courses/quiz-form/CreateQuiz";
import { Checkbox } from "@/components/ui/checkbox";
import { Quizz } from "@/lib/types"; // Import your QuizData type from the appropriate location

type Props = {
  action: string;
  quizData?: Quizz;
};

const Quiz = ({ action, quizData }: Props) => {
  const [showQuizInstructions, setShowQuizInstructions] = useState(true);
  const [quizName, setQuizName] = useState<string>(quizData?.name || "");
  const [quizInstructions, setQuizInstructions] = useState<string>(
    quizData?.instructions || "",
  );
  const [isEnabled, setIsEnabled] = useState<boolean>(
    quizData?.isEnabled || false,
  );
  const [duration, setDuration] = useState<string>(quizData?.duration || "");
  const [champScore, setChampScore] = useState<number>(
    quizData?.champScore || 0,
  );

  const handleContinueClick = () => {
    setShowQuizInstructions(!showQuizInstructions);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEnabled(e.target.checked);
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
      <AlertDialogContent className="overflow-y-scroll">
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
                    id="QuizName"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    placeholder="Quiz Name"
                    className="rounded-[10px] text-white"
                  />
                </div>
                <div className="flex flex-col w-full space-y-2 mt-5">
                  <span className="text-white font-bold text-left">
                    Duration
                  </span>
                  <Input
                    type="text"
                    id="QuizDuration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Duration (e.g., 30 minutes)"
                    className="rounded-[10px] text-white"
                  />
                </div>
                <div className="flex flex-col w-full space-y-2 mt-5">
                  <span className="text-white font-bold text-left">
                    Champion Score
                  </span>
                  <Input
                    type="number"
                    id="ChampScore"
                    value={champScore}
                    onChange={(e) => setChampScore(Number(e.target.value))}
                    placeholder="Champion Score"
                    className="rounded-[10px] text-white"
                  />
                </div>
                <div className="flex items-center space-x-2 mt-5">
                  <Checkbox
                    id="isEnabled"
                    checked={isEnabled}
                    /*
                    onChange={handleCheckboxChange}
*/
                  />
                  <label htmlFor="isEnabled" className="text-white">
                    Enabled
                  </label>
                </div>
                <div className="mb-28">
                  <TextEditor
                    title="Quiz instructions"
                    initialValue={quizInstructions}
                    /*
                    onChange={(newContent) => setQuizInstructions(newContent)}
*/
                  />
                </div>
              </>
            ) : (
              <CreateQuiz questionsData={quizData?.questions || []} />
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
