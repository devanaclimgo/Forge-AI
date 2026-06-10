import { useEffect, useState } from "react";
import { projectService } from "../services/project.service";
import type { Project } from "../types/project";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const data = await projectService.getProjects();

      setProjects(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load projects",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   // fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  };
}