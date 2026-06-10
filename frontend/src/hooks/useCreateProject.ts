import { useState } from "react";
import { projectService } from "../services/project.service";
import type { Project } from "../types/project";

interface CreateProjectInput {
  name: string;
  description: string;
  summary?: string;
}

export function useCreateProject() {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const createProject = async (
    data: CreateProjectInput,
  ): Promise<Project> => {
    try {
      setLoading(true);

      const project =
        await projectService.createProject(data);

      setError(null);

      return project;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to create project";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProject,
    loading,
    error,
  };
}