import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ModuleItem from "@/components/courses/steps/step3/ModuleItem";
import { ModuleDetails } from "@/lib/types";
import { createModule, deleteModule, getMicrocredentialById } from "@/lib/api";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Step3Props {
  modules: ModuleDetails[];
  setModules: React.Dispatch<React.SetStateAction<ModuleDetails[]>>;
  microcredentialId: string;
  onPrevious: () => void;
  token: string | undefined;
}

const Step3: React.FC<Step3Props> = ({
  modules,
  setModules,
  microcredentialId,
  onPrevious,
  token,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isLoadingModules, setIsLoadingModules] = useState(false);

  const fetchModules = async () => {
    setIsLoadingModules(true);
    try {
      const microcredential = await getMicrocredentialById(
        microcredentialId,
        token,
      );
      setModules(microcredential.modules || []);
    } catch (error) {
      console.error("Failed to fetch microcredential", error);
      toast.error("An error occurred while fetching the microcredential.");
    } finally {
      setIsLoadingModules(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [microcredentialId, token]);

  const onCreateBigModule = async () => {
    setIsCreating(true);
    try {
      const newModuleData = {
        title: "New Module",
      };
      await createModule(microcredentialId, newModuleData, token);
      await fetchModules();
      toast.success("A new module has been created successfully.");
    } catch (error) {
      console.error("Failed to create module", error);
      toast.error("An error occurred while creating the module.");
    } finally {
      setIsCreating(false);
    }
  };

  const onDeleteModule = async (moduleId: string) => {
    try {
      await deleteModule(moduleId, token);
      await fetchModules();
      toast.success("Module has been deleted successfully.");
    } catch (error) {
      console.error("Failed to delete module", error);
      toast.error("An error occurred while deleting the module.");
    }
  };

  const hasModules = modules && modules.length > 0;

  return (
    <>
      <div className="w-full flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={onCreateBigModule}
          disabled={isCreating}
        >
          {isCreating ? (
            <LoadingSpinner text="Creating..." />
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Create Module
            </>
          )}
        </Button>
      </div>
      {isLoadingModules ? (
        <LoadingSpinner text="Loading modules..." />
      ) : !hasModules ? (
        <div className="text-center text-foreground font-semibold">
          No modules available
        </div>
      ) : (
        modules.map((moduleDetails) => (
          <ModuleItem
            key={moduleDetails._id}
            moduleDetails={moduleDetails}
            onDeleteModule={onDeleteModule}
          />
        ))
      )}
      <div className="flex space-x-4 mt-4">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
      </div>
    </>
  );
};

export default Step3;
