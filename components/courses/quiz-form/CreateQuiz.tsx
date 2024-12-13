import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Save, Plus } from "lucide-react";
import { toast } from "sonner";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useCurrentToken } from "@/hooks/use-current-token";
import {
  deleteQuestionInQuiz,
  getQuizByAdmin,
  addQuestionInQuiz,
  updateQuizById,
} from "@/lib/api";

type Props = {
  quizId: string;
};

const CreateQuiz = ({ quizId }: Props) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quiz, setQuiz] = useState<any>(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);
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

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [`${field}_en`]: value } : q,
    );
    setQuestions(updatedQuestions);
  };

  const handleOptionsChange = (
    questionIndex: number,
    optionIndex: number,
    newOption: string,
  ) => {
    const updatedQuestions = questions.map((q, qi) => {
      if (qi === questionIndex) {
        const options = q.options_en || [];
        const updatedOptions = [...options];
        if (!updatedOptions[optionIndex]) {
          updatedOptions[optionIndex] = { option: "" };
        }
        updatedOptions[optionIndex] = {
          ...updatedOptions[optionIndex],
          option: newOption,
        };
        return {
          ...q,
          options_en: updatedOptions,
        };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = questions.map((q, qi) =>
      qi === questionIndex
        ? {
            ...q,
            answer: q.answer?.includes(optionIndex)
              ? q.answer.filter((a: number) => a !== optionIndex)
              : [...(q.answer || []), optionIndex],
          }
        : q,
    );
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = async () => {
    setIsAddingQuestion(true);
    const newQuestion = {
      question_en: "What is that question?",
      options_en: [
        { option: "Option 1" },
        { option: "Option 2" },
        { option: "Option 3" },
        { option: "Option 4" },
      ],
      answer: [0],
      questionScore: 5,
      explanation_en: "",
      isEnabled: true,
    };

    const totalQuestionScore = questions.reduce(
      (total, question) => total + (question.questionScore || 0),
      0,
    );

    if (totalQuestionScore + newQuestion.questionScore > quiz.champScore) {
      toast.error("Cannot add question. Not enough remaining score.");
      setIsAddingQuestion(false);
      return;
    }

    try {
      await addQuestionInQuiz(quizId, newQuestion, token);
      setQuestions([...questions, newQuestion]);
      toast.success("Question added successfully.");
      setEditIndex(questions.length);
    } catch (error) {
      toast.error("An error occurred while adding the question.");
    } finally {
      setIsAddingQuestion(false);
    }
  };

  const handleSaveQuestion = async () => {
    const updatedQuiz = { ...quiz, questions };
    const hasCorrectOption = questions.every(
      (q) => (q.answer || []).length > 0,
    );
    if (!hasCorrectOption) {
      toast.error(
        "Please select at least one correct option for each question.",
      );
      return;
    }
    try {
      await updateQuizById(quizId, updatedQuiz, token);
      toast.success("Questions updated successfully");
      setEditIndex(null);
    } catch (error) {
      toast.error("An error occurred while updating the questions.");
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
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading questions..." />;
  }

  const totalQuestionScore = questions.reduce(
    (total, question) => total + (question.questionScore || 0),
    0,
  );

  const remainingScore = quiz.champScore - totalQuestionScore;

  return (
    <div className="space-y-4 mt-2">
      <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
        <span className="text-md text-foreground">
          Available Score: {remainingScore} / {quiz.champScore}
        </span>
        <Button
          onClick={handleAddQuestion}
          disabled={remainingScore === 0 || isAddingQuestion}
          variant="secondary"
        >
          {isAddingQuestion ? (
            <LoadingSpinner text="Adding..." />
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </>
          )}
        </Button>
      </div>

      {questions.length === 0 ? (
        <div className="text-center p-8 bg-muted rounded-lg">
          <span className="text-muted-foreground">No questions available.</span>
        </div>
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {questions.map((q, qi) => (
            <AccordionItem
              key={qi}
              value={`question-${qi}`}
              className="border border-border rounded-lg bg-card"
            >
              <AccordionTrigger className="px-4 py-2 hover:no-underline">
                <div className="flex justify-between items-center w-full">
                  <span className="text-md text-card-foreground">
                    {`Question ${qi + 1}: ${q.question_en || "Untitled Question"}`}
                  </span>
                  <div className="flex space-x-2">
                    {editIndex === qi ? (
                      <Button onClick={handleSaveQuestion} variant="outline">
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    ) : (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditIndex(qi);
                        }}
                        variant="ghost"
                        size="icon"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                    <DeleteConfirmation
                      onDelete={() => handleRemoveQuestion(qi)}
                      entityName="question"
                    />
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Question Text
                  </label>
                  <Input
                    value={q.question_en || ""}
                    onChange={(e) =>
                      handleQuestionChange(qi, "question", e.target.value)
                    }
                    placeholder="Type your question here"
                    className="mt-1"
                    readOnly={editIndex !== qi}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Options
                  </label>
                  <div className="grid gap-4">
                    {Array.from({ length: 4 }).map((_, oi) => (
                      <div key={oi} className="flex items-center space-x-3">
                        <Checkbox
                          checked={(q.answer || []).includes(oi)}
                          onCheckedChange={() => handleAnswerChange(qi, oi)}
                          disabled={editIndex !== qi}
                        />
                        <Input
                          value={q.options_en?.[oi]?.option || ""}
                          onChange={(e) =>
                            handleOptionsChange(qi, oi, e.target.value)
                          }
                          placeholder={`Option ${oi + 1}`}
                          className="flex-1"
                          readOnly={editIndex !== qi}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">
                    Explanation
                  </label>
                  <Input
                    value={q.explanation_en || ""}
                    onChange={(e) =>
                      handleQuestionChange(qi, "explanation", e.target.value)
                    }
                    placeholder="Add an explanation for the correct answer"
                    className="mt-1"
                    readOnly={editIndex !== qi}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">
                    Question Score
                  </label>
                  <Input
                    type="number"
                    value={q.questionScore || 0}
                    onChange={(e) =>
                      handleQuestionChange(qi, "questionScore", e.target.value)
                    }
                    placeholder="Score value"
                    className="mt-1"
                    readOnly={editIndex !== qi}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default CreateQuiz;
