import { useEffect, useState } from "react";
import { agentService } from "../services/agent.service";
import type { AgentLog } from "../types/agent";

export function useAgentLogs() {
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null,
  );

  const fetchLogs = async () => {
    try {
      setLoading(true);

      const data =
        await agentService.getAgentLogs();

      setLogs(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load logs",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   // fetchLogs();
  }, []);

  return {
    logs,
    loading,
    error,
    refetch: fetchLogs,
  };
}