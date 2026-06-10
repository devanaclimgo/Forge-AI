export interface Project {
  id: number;
  name: string;
  description: string;
  summary?: string;
  visibility: string;
  progress: number;
  tasks_completed: number;
  total_tasks: number;
  active_sprint?: string;
  created_at: string;
  updated_at: string;
}