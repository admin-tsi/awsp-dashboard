import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AnswerProposalComponent from "./AnswerProposalComponent";

type Props = {};

function CreateQuiz({}: Props) {
  const [elementsAdded, setElementsAdded] = useState(false);

  const handleElementAdded = () => {
    setElementsAdded(!elementsAdded);
  };

  return (
    <div className="space-y-2 mt-2 h-fit flex flex-col">
      <div className="border-2 w-full h-fit rounded-[10px] px-4 py-2 space-y-2">
        <div className="flex justify-center">
          <Input
            type="text"
            placeholder="Type the question"
            className="text-center border rounded py-2 px-4 placeholder-center w-full text-white placeholder:text-white"
          />
        </div>
        <div>
          <AnswerProposalComponent
            title="Good Answer"
            onElementAdded={handleElementAdded}
          />
          <AnswerProposalComponent
            title="wrong Answer"
            onElementAdded={handleElementAdded}
          />
        </div>
        {elementsAdded && (
          <div className="w-full flex justify-end items-center pt-5">
            <Button className="h-8 rounded-[8px] text-black">Add</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateQuiz;
