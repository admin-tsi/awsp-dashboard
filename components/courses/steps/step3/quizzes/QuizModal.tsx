"use client";

import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import TextEditor from "@/components/courses/steps/step3/richtext-editor/TextEditor";
import { Input } from "@/components/ui/input";
import CreateQuiz from "@/components/courses/quiz-form/CreateQuiz";
import { Checkbox } from "@/components/ui/checkbox";
import { Quizz } from "@/lib/types";
import { Plus, X } from "lucide-react";
import { updateQuizById, getQuizByAdmin } from "@/lib/api";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  action: string;
  quizData: Quizz;
  quizId: string;
  token: string | undefined;
};

const QuizModal = ({ action, quizData, quizId, token }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuizInstructions, setShowQuizInstructions] = useState(true);
  const [quizName, setQuizName] = useState<string>(quizData.name || "");
  const [quizInstructions, setQuizInstructions] = useState<string>(
    quizData.instructions_en || "",
  );
  const [isEnabled, setIsEnabled] = useState<boolean>(
    quizData.isEnabled || false,
  );
  const [duration, setDuration] = useState<string>(quizData.duration || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!token || !quizId) return;

      setLoading(true);
      try {
        const updatedQuiz = await getQuizByAdmin(quizId, token);
        setQuizName(updatedQuiz.name);
        setQuizInstructions(updatedQuiz.instructions_en);
        setIsEnabled(updatedQuiz.isEnabled);
        setDuration(updatedQuiz.duration);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        toast.error("Failed to fetch quiz details");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId, token, refreshKey]);

  const handleCheckboxChange = (checked: boolean) => {
    setIsEnabled(checked);
  };

  const handleSave = async () => {
    const data = {
      name: quizName,
      instructions_en: quizInstructions,
      isEnabled,
      duration,
      champScore: quizData.champScore || 100,
      questions: quizData.questions || [],
    };

    setLoading(true);
    try {
      await updateQuizById(quizId, data, token);
      toast.success("Quiz updated successfully");
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating quiz:", error);
      toast.error("An error occurred while updating the quiz.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinueClick = async () => {
    await handleSave();
    setShowQuizInstructions(false);
  };

  const handlePreviousClick = () => {
    setShowQuizInstructions(true);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="topicAction"
          onClick={() => setIsOpen(true)}
          aria-label={`${action} quiz`}
        >
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
          {action}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent
        className="max-w-3xl max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="quiz-modal-title"
        aria-modal="true"
      >
        <AlertDialogHeader className="space-y-6">
          <div className="flex justify-between items-center border-b pb-3">
            <AlertDialogTitle id="quiz-modal-title">{action}</AlertDialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <AlertDialogDescription asChild>
            <div>
              {loading ? (
                <div
                  className="flex justify-center items-center min-h-[200px]"
                  role="status"
                >
                  <LoadingSpinner text="Loading..." />
                </div>
              ) : (
                <div className="space-y-6">
                  {showQuizInstructions ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>Quiz Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label
                              htmlFor="QuizName"
                              className="text-sm font-medium"
                            >
                              Name of the Quiz
                            </label>
                            <Input
                              type="text"
                              id="QuizName"
                              value={quizName}
                              onChange={(e) => setQuizName(e.target.value)}
                              placeholder="Quiz Name"
                              className="rounded-lg"
                              aria-required="true"
                            />
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="QuizDuration"
                              className="text-sm font-medium"
                            >
                              Duration estimation
                            </label>
                            <Input
                              type="text"
                              id="QuizDuration"
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              placeholder="Duration (e.g., 30 minutes)"
                              className="rounded-lg"
                              aria-required="true"
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="isEnabled"
                              checked={isEnabled}
                              onCheckedChange={handleCheckboxChange}
                              aria-label="Enable quiz"
                            />
                            <label htmlFor="isEnabled" className="text-sm">
                              Enabled
                            </label>
                          </div>

                          <div className="space-y-2">
                            <div
                              className="text-sm font-medium"
                              id="instructions-label"
                            >
                              Quiz instructions
                            </div>
                            <div aria-labelledby="instructions-label">
                              <TextEditor
                                title=""
                                initialValue={quizInstructions}
                                onChange={setQuizInstructions}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <CreateQuiz quizId={quizId} />
                  )}

                  <AlertDialogFooter>
                    <div className="flex justify-end space-x-2">
                      {showQuizInstructions ? (
                        <>
                          <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            aria-label="Cancel quiz creation"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleContinueClick}
                            aria-label="Save and continue"
                          >
                            Continue
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            onClick={handlePreviousClick}
                            aria-label="Return to quiz settings"
                          >
                            Previous
                          </Button>
                          <Button
                            onClick={() => setIsOpen(false)}
                            aria-label="Close quiz modal"
                          >
                            Close
                          </Button>
                        </>
                      )}
                    </div>
                  </AlertDialogFooter>
                </div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QuizModal;
