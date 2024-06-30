"use client";

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Question } from "@/lib/types";
import {
  deleteQuestionInQuiz,
  getQuizByAdmin,
  addQuestionInQuiz,
  updateQuizById,
} from "@/lib/api";
import { Pencil, Save, X } from "lucide-react";
import { toast } from "sonner";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useCurrentToken } from "@/hooks/use-current-token";

type Props = {
  quizId: string;
};

const CreateQuiz = ({ quizId }: Props) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quiz, setQuiz] = useState<any>(null);
  const token = useCurrentToken();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const quizData = await getQuizByAdmin(quizId, token);
        setQuiz(quizData);
        setQuestions(quizData.questions);
        setIsLoading(false);
      } catch (error) {
        toast.error("An error occurred while fetching the questions.");
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId, token]);

  const handleQuestionChange = (index: number, newQuestion: string) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, question: newQuestion } : q,
    );
    setQuestions(updatedQuestions);
  };

  const handleOptionsChange = (
    questionIndex: number,
    optionIndex: number,
    newOption: string,
  ) => {
    const updatedQuestions = questions.map((q, qi) =>
      qi === questionIndex
        ? {
            ...q,
            options: q.options.map((o, oi) =>
              oi === optionIndex ? { ...o, option: newOption } : o,
            ),
          }
        : q,
    );
    setQuestions(updatedQuestions);
  };

  const handleExplanationChange = (index: number, newExplanation: string) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, explanation: newExplanation } : q,
    );
    setQuestions(updatedQuestions);
  };

  const handleQuestionScoreChange = (index: number, newScore: number) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, questionScore: newScore } : q,
    );
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = questions.map((q, qi) =>
      qi === questionIndex
        ? {
            ...q,
            answer: q.answer.includes(optionIndex)
              ? q.answer.filter((a) => a !== optionIndex)
              : [...q.answer, optionIndex],
          }
        : q,
    );
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = async () => {
    if (questions.length >= 4) {
      toast.error("You can only add up to 4 questions.");
      return;
    }

    const newQuestion: Question = {
      question: "",
      answer: [],
      options: [{ option: "", _id: Date.now().toString() }],
      explanation: "",
      isEnabled: true,
      questionScore: 0,
      _id: Date.now().toString(),
    };
    try {
      await addQuestionInQuiz(quizId, newQuestion, token);
      setQuestions([...questions, newQuestion]);
      toast.success("Question added successfully.");
    } catch (error) {
      toast.error("An error occurred while adding the question.");
      console.error("Error adding question:", error);
    }
  };

  const handleRemoveQuestion = async (index: number) => {
    const questionToRemove = questions[index];
    try {
      await deleteQuestionInQuiz(quizId, questionToRemove._id, token);
      setQuestions(questions.filter((_, i) => i !== index));
      toast.success("Question deleted successfully");
    } catch (error) {
      toast.error("An error occurred while deleting the question.");
      console.error("Error deleting question:", error);
    }
  };

  const handleSaveQuestion = async () => {
    const updatedQuiz = { ...quiz, questions };
    try {
      await updateQuizById(quizId, updatedQuiz, token);
      toast.success("Question updated successfully");
    } catch (error) {
      toast.error("An error occurred while updating the question.");
      console.error("Error updating question:", error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading questions..." />;
  }

  const totalQuestionScore = questions.reduce(
    (total, question) => total + question.questionScore,
    0,
  );

  return (
    <div className="space-y-4 mt-2">
      {quiz.champScore && (
        <div className="flex items-center justify-between">
          <span className="text-md text-white">
            Remaining Score: {quiz.champScore - totalQuestionScore}
          </span>
        </div>
      )}

      <Accordion type="single" collapsible>
        {questions.map((q, qi) => (
          <AccordionItem
            key={qi}
            value={`question-${qi}`}
            className="border-2 rounded-[10px] px-4 py-2 space-y-2 mb-4"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex justify-between items-center">
                <span className="text-md text-white">{`Q${qi + 1}: ${q.question}`}</span>
                <div className="ml-2 flex space-x-2">
                  {editIndex === qi ? (
                    <Button
                      className="ml-2"
                      onClick={() => {
                        handleSaveQuestion();
                        setEditIndex(null);
                      }}
                    >
                      <Save className="mr-2" />
                      Save
                    </Button>
                  ) : (
                    <Button
                      className="ml-2"
                      onClick={() => setEditIndex(qi)}
                      variant="ghost"
                      size={"icon"}
                    >
                      <Pencil />
                    </Button>
                  )}
                  <DeleteConfirmation
                    onDelete={() => handleRemoveQuestion(qi)}
                    entityName="question"
                  />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <label
                  className="text-white font-bold"
                  htmlFor={`question-${qi}`}
                >
                  Question
                </label>
                <Input
                  id={`question-${qi}`}
                  type="text"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qi, e.target.value)}
                  placeholder="Type the question"
                  className="text-center border rounded py-2 px-4 placeholder-center w-full text-white placeholder:text-white"
                  readOnly={editIndex !== qi}
                />
              </div>
              <div className="space-y-2">
                <label className="text-white font-bold">Correct Options</label>
                <div className="grid grid-cols-2 gap-4">
                  {q.options.map((option, oi) => (
                    <div
                      key={option._id}
                      className="flex items-center space-x-2 relative"
                    >
                      <Checkbox
                        checked={q.answer.includes(oi)}
                        onCheckedChange={() => handleAnswerChange(qi, oi)}
                        disabled={editIndex !== qi}
                      />
                      <Input
                        type="text"
                        value={option.option}
                        onChange={(e) =>
                          handleOptionsChange(qi, oi, e.target.value)
                        }
                        readOnly={editIndex !== qi}
                        className="text-center border rounded py-2 px-4 w-full text-white"
                      />
                      {editIndex === qi && (
                        <X className="text-secondary absolute -top-3 -right-2 " />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-white font-bold"
                  htmlFor={`explanation-${qi}`}
                >
                  Explanation
                </label>
                <Input
                  id={`explanation-${qi}`}
                  type="text"
                  value={q.explanation}
                  onChange={(e) => handleExplanationChange(qi, e.target.value)}
                  placeholder="Explanation"
                  className="text-center border rounded py-2 px-4 placeholder-center w-full text-white placeholder:text-white"
                  readOnly={editIndex !== qi}
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-white font-bold"
                  htmlFor={`questionScore-${qi}`}
                >
                  Question Score
                </label>
                <Input
                  id={`questionScore-${qi}`}
                  type="number"
                  value={q.questionScore}
                  onChange={(e) =>
                    handleQuestionScoreChange(qi, parseInt(e.target.value))
                  }
                  placeholder="Question Score"
                  className="text-center border rounded py-2 px-4 placeholder-center w-full text-white placeholder:text-white"
                  readOnly={editIndex !== qi}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button onClick={handleAddQuestion} disabled={questions.length >= 4}>
        Add Question
      </Button>
    </div>
  );
};

export default CreateQuiz;
