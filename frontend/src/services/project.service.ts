import { request } from "../lib/http";
import type { Project } from "../types/project";

export const projectService = {
  getProjects: () =>
    request<Project[]>("/projects"),

  getProject: (id: string | number) =>
    request<Project>(`/projects/${id}`),

  createProject: (data: {
    name: string;
    description: string;
    summary?: string;
  }) =>
    request<Project>("/projects", {
      method: "POST",
      body: JSON.stringify({
        project: data,
      }),
    }),

  deleteProject: (id: string | number) =>
    request<null>(`/projects/${id}`, {
      method: "DELETE",
    }),
};