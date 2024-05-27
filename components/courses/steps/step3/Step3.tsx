import React from "react";
import { Button } from "@/components/ui/button";
import ModuleItem from "@/components/courses/steps/step3/ModuleItem";
import { ModuleDetails } from "@/lib/types";
import { createModule } from "@/lib/api";
import { Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Step3Props {
  modules: ModuleDetails[];
  microcredentialId: string;
  onPrevious: () => void;
  onSubmit: () => void;
  token: string | undefined;
}

const Step3: React.FC<Step3Props> = ({
  modules,
  microcredentialId,
  onPrevious,
  onSubmit,
  token,
}) => {
  const onCreateModule = async () => {
    try {
      const newModuleData = {
        title: "New Module",
      };
      const newModule = await createModule(
        microcredentialId,
        newModuleData,
        token,
      );
      console.log("New module created", newModule);
      toast({
        title: "Module Created",
        description: "A new module has been created successfully.",
      });
    } catch (error) {
      console.error("Failed to create module", error);
      toast({
        title: "Module Creation",
        description: "An error occurred while creating the module.",
      });
    }
  };

  return (
    <>
      <div className="w-full flex justify-end mb-4">
        <Button variant="outline" onClick={onCreateModule}>
          <Plus className="mr-2 h-4 w-4" />
          Create Module
        </Button>
      </div>
      {modules
        .filter((moduleDetails) => moduleDetails.module.id)
        .map((moduleDetails) => (
          <ModuleItem
            key={moduleDetails.module.id}
            moduleDetails={moduleDetails}
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
