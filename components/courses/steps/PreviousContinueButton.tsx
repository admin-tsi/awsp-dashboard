"use client";
import React from "react";
import { Button } from "@/components/ui/button";

interface PreviousContinueButtonProps {
  onPrevious: () => void;
  onContinue: () => void;
}

const PreviousContinueButton: React.FC<PreviousContinueButtonProps> = ({
  onPrevious,
  onContinue,
}) => (
  <div className="flex space-x-4">
    <Button type="button" variant="outline" onClick={onPrevious}>
      Previous
    </Button>
    <Button type="button" variant="outline" onClick={onContinue}>
      Continue
    </Button>
  </div>
);

export default PreviousContinueButton;
