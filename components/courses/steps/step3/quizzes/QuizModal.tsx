import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../../../../ui/button";
import TextEditor from "@/components/courses/steps/step3/richtext-editor/TextEditor";
import { Input } from "../../../../ui/input";
import CreateQuiz from "@/components/courses/quiz-form/CreateQuiz";
import { Checkbox } from "@/components/ui/checkbox";
import { Quizz } from "@/lib/types";
import { Loader, Plus, X } from "lucide-react";
import { updateQuizById } from "@/lib/api";

type Props = {
  action: string;
  quizData?: Quizz;
  quizId: string;
  token: string | undefined;
};

const QuizModal = ({ action, quizData, quizId, token }: Props) => {
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
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const handleCheckboxChange = (checked: boolean) => {
    setIsEnabled(checked);
  };

  const handleSave = async () => {
    const data = {
      name: quizName,
      instructions: quizInstructions,
      isEnabled,
      duration,
      champScore,
      questions: quizData?.questions || [],
    };

    setLoading(true); // Show loader
    try {
      await updateQuizById(quizId, data, token);
      console.log("Quiz updated successfully");
      // Add any success handling logic here, e.g., close the modal
    } catch (error) {
      console.error("Error updating quiz:", error);
      // Add any error handling logic here
    }
    setLoading(false); // Hide loader
  };

  const handleContinueClick = async () => {
    await handleSave();
    setShowQuizInstructions(false);
  };

  const handlePreviousClick = () => {
    setShowQuizInstructions(true);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="topicAction">
          <Plus />
          <span>{action}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="overflow-y-scroll">
        <AlertDialogHeader>
          <AlertDialogTitle className="border-b pb-3 flex justify-between">
            {action}
            <AlertDialogCancel className="">
              <X />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col space-y-5 w-full">
            {loading ? (
              <div className="w-full flex items-center justify-center">
                <Loader className="animate-spin h-5 w-5 mr-3" />
                Loading...
              </div>
            ) : (
              <>
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
                        onCheckedChange={handleCheckboxChange}
                      />
                      <label htmlFor="isEnabled" className="text-white">
                        Enabled
                      </label>
                    </div>
                    <div className="mb-28">
                      <TextEditor
                        title="Quiz instructions"
                        initialValue={quizInstructions}
                        onChange={setQuizInstructions}
                      />
                    </div>
                  </>
                ) : (
                  <CreateQuiz
                    questionsData={quizData?.questions || []}
                    quizId={quizId}
                    token={token}
                  />
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
                      onClick={handlePreviousClick}
                    >
                      Previous
                    </Button>
                  )}

                  {showQuizInstructions ? (
                    <Button
                      className="rounded-[10px] text-black"
                      onClick={handleContinueClick}
                    >
                      Continue
                    </Button>
                  ) : (
                    <AlertDialogAction
                      className="rounded-[10px] text-black"
                      onClick={handleSave}
                    >
                      Save
                    </AlertDialogAction>
                  )}
                </div>
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QuizModal;
