import { request } from "../lib/http";
import type { AgentLog } from "../types/agent";

export const agentService = {
  getAgentLogs: () =>
    request<AgentLog[]>(`/agent_logs`),
  runAgent: (agent: string, prompt: string) =>
    request<{ result: string; confidence: number; planning_ms: number }>(
      "/agent_test",
      {
        method: "POST",
        body: JSON.stringify({ agent, prompt }),
      },
    ),
};