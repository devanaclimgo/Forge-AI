export interface Sprint {
  id: number;
  name: string;
  start_date?: string;
  end_date?: string;
  tasks: number;
  completed: number;
  status: "active" | "planned" | "completed";
}