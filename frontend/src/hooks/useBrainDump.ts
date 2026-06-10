import { useState } from "react";
import { projectService } from "../services/project.service";
import { extractProjectName } from "../utils/project-utils";
import type { Project } from "../types/project";
import { brainDumpAgents } from "../constants/brainDumpAgents";

export function useBrainDump() {
  const [content, setContent] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);

  const [processedAgents, setProcessedAgents] = useState<number[]>([]);

  const [showResult, setShowResult] = useState(false);

  const [createdProject, setCreatedProject] = useState<Project | null>(null);

  const [createdProjectId, setCreatedProjectId] = useState("");

  const handleSubmit = async () => {
    if (!content.trim() || isProcessing) {
      return;
    }

    setIsProcessing(true);
    setCurrentAgentIndex(0);
    setProcessedAgents([]);

    let index = 0;

    const interval = setInterval(() => {
      setProcessedAgents((prev) => [...prev, index]);

      index++;

      setCurrentAgentIndex(index);

      if (index >= brainDumpAgents.length) {
        clearInterval(interval);
      }
    }, 1200);

    try {
      const name = extractProjectName(content);

      const project = await projectService.createProject({
        name,
        description: content,
      });

      const updatedProject = await projectService.getProject(project.id);

      setCreatedProject(updatedProject);

      setTimeout(
        () => {
          setCreatedProjectId(String(updatedProject.id));

          setShowResult(true);

          setIsProcessing(false);
        },
        brainDumpAgents.length * 1200 + 500,
      );
    } catch (error) {
      clearInterval(interval);

      setIsProcessing(false);

      console.error(error);

      alert("Failed to create project. Is the server running?");
    }
  };

  return {
    content,
    setContent,

    isProcessing,

    currentAgentIndex,
    processedAgents,

    showResult,

    createdProject,
    createdProjectId,

    handleSubmit,
  };
}
