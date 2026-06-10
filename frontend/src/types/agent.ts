export interface AgentLog {
  id: number;
  agent_name: string;
  project_name: string;
  input: Record<string, string>;
  created_at: string;
}