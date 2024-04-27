import { useState } from "react";
import { Button } from "../../ui/button";
import AnswerProposalInput from "./AnswerProposalInput";

type Props = {
  title: string;
  onElementAdded: () => void;
};

function AnswerProposalComponent({ title, onElementAdded }: Props) {
  const [inputs, setInputs] = useState<number[]>([]);

  const addInput = () => {
    if (inputs.length < 4) {
      setInputs([...inputs, inputs.length + 1]);
      onElementAdded();
    }
  };

  const removeInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
    onElementAdded();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="my-2 text-white font-bold">{title}</span>
        <Button className="size-6 p-1 rounded-[5px]" onClick={addInput}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
        </Button>
      </div>
      <div className="flex-1 h-full grid grid-cols-1 md:grid-cols-2 gap-3">
        {inputs.map((key, index) => (
          <div key={key} className="relative">
            <AnswerProposalInput />
            <button
              className="absolute top-0 right-1 p-1 h-full text-white"
              onClick={() => removeInput(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnswerProposalComponent;
