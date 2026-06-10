import { useState } from "react";
import { projectService } from "../services/project.service";
import { extractProjectName } from "../utils/project-utils";
import type { Project } from "../types/project";

export function useBrainDump() {
  const [isProcessing, setIsProcessing] =
    useState(false);

  const [createdProject, setCreatedProject] =
    useState<Project | null>(null);

  const createFromContent = async (
    content: string,
  ) => {
    const name =
      extractProjectName(content);

    setIsProcessing(true);

    try {
      const project =
        await projectService.createProject({
          name,
          description: content,
        });

      const updatedProject =
        await projectService.getProject(
          project.id,
        );

      setCreatedProject(updatedProject);

      return updatedProject;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    createdProject,
    createFromContent,
  };
}