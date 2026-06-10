import { request } from "../lib/http";
import type { AgentLog } from "../types/agent";

export const agentService = {
  getAgentLogs: (projectId: string | number, agentId: string | number) =>
    request<AgentLog[]>(`/projects/${projectId}/agents/${agentId}/logs`),
};