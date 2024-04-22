import React from "react";
import Header from "./header";
import Topic from "./Topic";

type Props = {};

const Index = (props: Props) => {
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

export default Index;
