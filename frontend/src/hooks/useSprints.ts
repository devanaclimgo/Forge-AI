import { useEffect, useState } from "react";
import { sprintService } from "../services/sprint.service";
import type { Sprint } from "../types/sprint";

export function useSprints(
  projectId: string | number,
) {
  const [sprints, setSprints] = useState<
    Sprint[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchSprints = async () => {
    try {
      setLoading(true);

      const data =
        await sprintService.getSprints(
          projectId,
        );

      setSprints(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load sprints",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      // fetchSprints();
    }
  }, [projectId]);

  return {
    sprints,
    loading,
    error,
    refetch: fetchSprints,
  };
}