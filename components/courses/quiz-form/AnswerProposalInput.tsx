import React from "react";
import { Input } from "../../ui/input";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly: boolean;
};

const AnswerProposalInput = ({ value, onChange, readOnly }: Props) => {
  return (
    <div className="flex justify-center">
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Type the answer"
        className="text-center border rounded py-2 px-4 h-full placeholder-center w-full text-white placeholder:text-white"
        readOnly={readOnly}
      />
    </div>
  );
};

export default AnswerProposalInput;
