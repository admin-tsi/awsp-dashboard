"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import ModuleItem from "@/components/courses/steps/step3/ModuleItem";
import { ModuleDetails } from "@/lib/types";
import { createModule, deleteModule } from "@/lib/api";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface Step3Props {
  modules: ModuleDetails[];
  setModules: React.Dispatch<React.SetStateAction<ModuleDetails[]>>;
  microcredentialId: string;
  onPrevious: () => void;
  onSubmit: () => void;
  token: string | undefined;
}

const Step3: React.FC<Step3Props> = ({
  modules,
  setModules,
  microcredentialId,
  onPrevious,
  onSubmit,
  token,
}) => {
  const onCreateBigModule = async () => {
    try {
      const newModuleData = {
        title: "New Module",
      };
      const newModule: ModuleDetails = await createModule(
        microcredentialId,
        newModuleData,
        token,
      );
      setModules((prevModules) => [...prevModules, newModule]);

      toast.success("A new module has been created successfully.");
    } catch (error) {
      console.error("Failed to create module", error);
      toast.error("An error occurred while creating the module.");
    }
  };

  const onDeleteModule = async (moduleId: string) => {
    try {
      await deleteModule(moduleId, token);
      setModules((prevModules) =>
        prevModules.filter((module) => module.module?.id !== moduleId),
      );
      toast.success("Module has been deleted successfully.");
    } catch (error) {
      console.error("Failed to delete module", error);
      toast.error("An error occurred while deleting the module.");
    }
  };

  return (
    <>
      <div className="w-full flex justify-end mb-4">
        <Button variant="outline" onClick={onCreateBigModule}>
          <Plus className="mr-2 h-4 w-4" />
          Create Module
        </Button>
      </div>
      {modules
        .filter(
          (moduleDetails) => moduleDetails.module && moduleDetails.module.id,
        )
        .map((moduleDetails) => (
          <ModuleItem
            key={moduleDetails.module?.id}
            moduleDetails={moduleDetails}
            onDeleteModule={onDeleteModule}
          />
        ))}
      <div className="flex space-x-4 mt-4">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button type="button" variant="outline" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default Step3;
