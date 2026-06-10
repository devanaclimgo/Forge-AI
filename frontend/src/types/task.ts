export interface Task {
  id: number;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done" | "blocked";
  priority: "low" | "medium" | "high" | "critical";
  category?: string;
  sprint_id?: number | null;
  project_id: number;
}