import React from "react";
import { Input } from "../../ui/input";

type Props = {};

const AnswerProposalInput = (props: Props) => {
  return (
    <div className="flex justify-center">
      <Input
        type="text"
        placeholder="Type the answer"
        className="text-center border rounded py-2 px-4 h-full placeholder-center w-full text-white placeholder:text-white"
      />
    </div>
  );
};

export default AnswerProposalInput;
