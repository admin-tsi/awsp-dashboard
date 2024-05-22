import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import AnswerProposalComponent from "./AnswerProposalComponent";
import { Question, Option } from "@/lib/types";

type Props = {
  questionsData?: Question[];
};

const CreateQuiz = ({ questionsData = [] }: Props) => {
  const [questions, setQuestions] = useState<Question[]>(questionsData);

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

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2 mt-2 h-fit flex flex-col">
      {questions.map((q, qi) => (
        <div
          key={qi}
          className="border-2 w-full h-fit rounded-[10px] px-4 py-2 space-y-2"
        >
          <div className="flex justify-between items-center">
            <Input
              type="text"
              value={q.question}
              onChange={(e) => handleQuestionChange(qi, e.target.value)}
              placeholder="Type the question"
              className="text-center border rounded py-2 px-4 placeholder-center w-full text-white placeholder:text-white"
            />
            <Button className="ml-2" onClick={() => handleRemoveQuestion(qi)}>
              Remove Question
            </Button>
          </div>
          <AnswerProposalComponent
            title="Options"
            options={q.options}
            onOptionChange={(oi, newOption) =>
              handleOptionsChange(qi, oi, newOption)
            }
          />
          <Input
            type="text"
            value={q.explanation}
            onChange={(e) => handleExplanationChange(qi, e.target.value)}
            placeholder="Explanation"
            className="text-center border rounded py-2 px-4 placeholder-center w-full text-white placeholder:text-white"
          />
        </div>
      ))}

      <Button onClick={handleAddQuestion}>Add Question</Button>
    </div>
  );
};

export default CreateQuiz;
