"use client";

import React from "react";
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type StepBreadcrumbProps = {
  steps: string[];
  currentStep: number;
  setStep: (step: number) => void;
};

const CustomStepBreadcrumb = ({
  steps,
  currentStep,
  setStep,
}: StepBreadcrumbProps) => {
  return (
    <BreadcrumbRoot>
      <BreadcrumbList>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index === currentStep - 1 ? (
                <BreadcrumbPage>{step}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <button onClick={() => setStep(index + 1)}>{step}</button>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < steps.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
};

export default CustomStepBreadcrumb;
