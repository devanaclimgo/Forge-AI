import { useEffect, useState } from "react";
import { taskService } from "../services/task.service";
import type { Task } from "../types/task";

export function useTasks(
  projectId: string | number,
) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data =
        await taskService.getTasks(projectId);

      setTasks(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load tasks",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      // fetchTasks();
    }
  }, [projectId]);

  return {
    tasks,
    loading,
    error,
    refetch: fetchTasks,
  };
}