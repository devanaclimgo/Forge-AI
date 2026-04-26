const API_URL = "http://localhost:3000/api/v1"

function getToken() {
  return localStorage.getItem("token") || ""
}

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...headers(), ...options?.headers },
  })

  if (res.status === 401) {
    localStorage.removeItem("token")
    window.location.href = "/login"
    throw new Error("Unauthorized")
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || "Request failed")
  }

  if (res.status === 204) return null as T
  return res.json()
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ token: string; user: { id: number; name: string; email: string } }>("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    request<{ token: string; user: { id: number; name: string; email: string } }>("/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),

  // Projects
  getProjects: () => request<Project[]>("/projects"),
  getProject:  (id: string | number) => request<Project>(`/projects/${id}`),
  createProject: (data: { name: string; description: string }) =>
    request<Project>("/projects", { method: "POST", body: JSON.stringify({ project: data }) }),

  // Tasks
  getTasks: (projectId: string | number) =>
    request<Task[]>(`/projects/${projectId}/tasks`),
  createTask: (projectId: string | number, data: Partial<Task>) =>
    request<Task>(`/projects/${projectId}/tasks`, {
      method: "POST",
      body: JSON.stringify({ task: data }),
    }),
  updateTask: (projectId: string | number, taskId: string | number, data: Partial<Task>) =>
    request<Task>(`/projects/${projectId}/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({ task: data }),
    }),
  deleteTask: (projectId: string | number, taskId: string | number) =>
    request<null>(`/projects/${projectId}/tasks/${taskId}`, { method: "DELETE" }),

  // Sprints
  getSprints: (projectId: string | number) =>
    request<Sprint[]>(`/projects/${projectId}/sprints`),
  createSprint: (projectId: string | number, data: Partial<Sprint>) =>
    request<Sprint>(`/projects/${projectId}/sprints`, {
      method: "POST",
      body: JSON.stringify({ sprint: data }),
    }),

  // Agent test
  runAgent: (agent: string, prompt: string) =>
    request<{ result: string; confidence: number; planning_ms: number }>("/agent_test", {
      method: "POST",
      body: JSON.stringify({ agent, prompt }),
    }),
}

// Types
export interface Project {
  id: number
  name: string
  description: string
  visibility: string
  progress: number
  tasks_completed: number
  total_tasks: number
  active_sprint?: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: number
  title: string
  description?: string
  status: "todo" | "in-progress" | "done" | "blocked"
  priority: "low" | "medium" | "high" | "critical"
  category?: string
  sprint_id?: number
  project_id: number
}

export interface Sprint {
  id: number
  name: string
  start_date?: string
  end_date?: string
  tasks: number
  completed: number
  status: "active" | "planned" | "completed"
}