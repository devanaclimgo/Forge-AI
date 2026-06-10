import { request } from "../lib/http";
import type { AgentLog } from "../types/agent";

export const agentService = {
  getAgentLogs: () =>
    request<AgentLog[]>(`/agent_logs`),
};