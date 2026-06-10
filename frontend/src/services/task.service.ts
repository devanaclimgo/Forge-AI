import { request } from "../lib/http";
import type { Task } from "../types/task";

export const taskService = {
  getTasks: (projectId: string | number) =>
    request<Task[]>(`/projects/${projectId}/tasks`),

  createTask: (
    projectId: string | number,
    data: Partial<Task>,
  ) =>
    request<Task>(
      `/projects/${projectId}/tasks`,
      {
        method: "POST",
        body: JSON.stringify({
          task: data,
        }),
      },
    ),

  updateTask: (
    projectId: string | number,
    taskId: string | number,
    data: Partial<Task>,
  ) =>
    request<Task>(
      `/projects/${projectId}/tasks/${taskId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          task: data,
        }),
      },
    ),

  deleteTask: (
    projectId: string | number,
    taskId: string | number,
  ) =>
    request<null>(
      `/projects/${projectId}/tasks/${taskId}`,
      {
        method: "DELETE",
      },
    ),
};