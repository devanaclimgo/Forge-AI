import { request } from "../lib/http";
import type { Sprint } from "../types/sprint";

export const sprintService = {
  getSprints: (projectId: string | number) =>
    request<Sprint[]>(`/projects/${projectId}/sprints`),

  createSprint: (
    projectId: string | number,
    data: Partial<Sprint>,
  ) =>
    request<Sprint>(
      `/projects/${projectId}/sprints`,
      {
        method: "POST",
        body: JSON.stringify({
          sprint: data,
        }),
      },
    ),

  updateSprint: (
    projectId: string | number,
    sprintId: string | number,
    data: Partial<Sprint>,
  ) =>
    request<Sprint>(
      `/projects/${projectId}/sprints/${sprintId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          sprint: data,
        }),
      },
    ),

  deleteSprint: (
    projectId: string | number,
    sprintId: string | number,
  ) =>
    request<null>(
      `/projects/${projectId}/sprints/${sprintId}`,
      {
        method: "DELETE",
      },
    ),
};