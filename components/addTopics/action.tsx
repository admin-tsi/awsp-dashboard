import React from "react";
import { Button } from "../ui/button";

type Props = {
  action: string;
};

const Action: React.FC<Props> = ({ action }: Props) => {
  return (
    <Button variant="topicAction">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={15}
        height={16}
        fill="none"
      >
        <rect width={15} height={15} y={0.248} fill="#F2DD66" rx={5} />
        <path
          fill="#1B1F20"
          d="M10.56 8.472H8.472v2.136H6.528V8.472H4.44V6.636h2.088V4.488h1.944v2.148h2.088v1.836Z"
        />
      </svg>
      <span>{action}</span>
    </Button>
  );
};

export default Action;
