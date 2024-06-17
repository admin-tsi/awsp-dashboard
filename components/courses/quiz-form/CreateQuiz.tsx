"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import AnswerProposalComponent from "./AnswerProposalComponent";
import { Question } from "@/lib/types";
import { updateQuizById, deleteQuestionInQuiz } from "@/lib/api";
import { Pencil, Save } from "lucide-react";
import { toast } from "sonner";
import DeleteConfirmation from "@/components/DeleteConfirmation";

type Props = {
  questionsData?: Question[];
  quizId: string;
  token: string | undefined;
};

const CreateQuiz = ({ questionsData = [], quizId, token }: Props) => {
  const [questions, setQuestions] = useState<Question[]>(questionsData);
  const [editIndex, setEditIndex] = useState<number | null>(null);

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

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: [{ option: "", _id: Date.now().toString() }],
        explanation: "",
        isEnabled: true,
        questionScore: 0,
        _id: Date.now().toString(),
      },
    ]);
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

  const handleSaveQuestion = async (index: number) => {
    const questionToSave = questions[index];
    const updatedQuestions = questions.map((q, i) =>
      i === index ? questionToSave : q,
    );

    console.log("Saving question:", updatedQuestions);
    try {
      await updateQuizById(quizId, { questions: updatedQuestions }, token);
      toast.success("Question updated successfully");
    } catch (error) {
      toast.error("An error occurred while updating the question.");
      console.error("Error updating question:", error);
    }
  };

  return (
    <div className="space-y-4 mt-2">
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
                        handleSaveQuestion(qi);
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
              <Input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(qi, e.target.value)}
                placeholder="Type the question"
                className="text-center border rounded py-2 px-4 placeholder-center w-full text-white placeholder:text-white"
                readOnly={editIndex !== qi}
              />
              <AnswerProposalComponent
                title="Options"
                options={q.options}
                onOptionChange={(oi, newOption) =>
                  handleOptionsChange(qi, oi, newOption)
                }
                readOnly={editIndex !== qi}
              />
              <Input
                type="text"
                value={q.explanation}
                onChange={(e) => handleExplanationChange(qi, e.target.value)}
                placeholder="Explanation"
                className="text-center border rounded py-2 px-4 placeholder-center w-full text-white placeholder:text-white"
                readOnly={editIndex !== qi}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button onClick={handleAddQuestion}>Add Question</Button>
    </div>
  );
};

export default CreateQuiz;
