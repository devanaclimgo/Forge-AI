import { useEffect, useState } from "react";
import { projectService } from "../services/project.service";
import type { Project } from "../types/project";

export function useProject(
  projectId?: string | number,
) {
  const [project, setProject] =
    useState<Project | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchProject = async () => {
    if (!projectId) return;

    try {
      setLoading(true);

      const data =
        await projectService.getProject(projectId);

      setProject(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load project",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   // fetchProject();
  }, [projectId]);

  return {
    project,
    loading,
    error,
    refetch: fetchProject,
  };
}