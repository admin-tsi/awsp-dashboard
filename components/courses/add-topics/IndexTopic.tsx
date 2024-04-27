import React from "react";
import Header from "./Header";
import Topic from "./Topic";

type Props = {};

const IndexTopic = (props: Props) => {
  return (
    <div>
      <Header />
      <Topic />
      <Topic />
      <Topic />
      <Topic />
    </div>
  );
};

export default IndexTopic;
