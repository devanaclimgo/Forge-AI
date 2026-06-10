import { CheckCircle2 } from "lucide-react";

interface Agent {
  name: string;
  icon: React.ElementType;
  message: string;
}

interface ProcessingAgentsProps {
  agents: Agent[];
  currentAgentIndex: number;
  processedAgents: number[];
}

export function ProcessingAgents({
  agents,
  currentAgentIndex,
  processedAgents,
}: ProcessingAgentsProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Agents are processing your idea
        </h1>

        <p className="text-muted-foreground">
          Sit back while our AI team structures your project
        </p>
      </div>

      <div className="space-y-3">
        {agents.map((agent, index) => {
          const isProcessed =
            processedAgents.includes(index);

          const isCurrent =
            currentAgentIndex === index;

          return (
            <div
              key={agent.name}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                isProcessed
                  ? "border-success/50 bg-success/5"
                  : isCurrent
                    ? "border-background50 bg-background5 agent-glow"
                    : "border-border bg-card"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  isProcessed
                    ? "bg-success/20 text-success"
                    : isCurrent
                      ? "bg-background20 text-accent"
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                {isProcessed ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <agent.icon className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1">
                <p className="font-medium text-foreground">
                  {agent.name}
                </p>

                <p
                  className={`text-sm font-mono ${
                    isProcessed
                      ? "text-success"
                      : isCurrent
                        ? "text-accent"
                        : "text-muted-foreground"
                  }`}
                >
                  {isProcessed
                    ? "Completed"
                    : isCurrent
                      ? agent.message
                      : "Waiting..."}
                </p>
              </div>

              {isCurrent && (
                <span className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent thinking-dot" />
                  <span className="w-2 h-2 rounded-full bg-accent thinking-dot" />
                  <span className="w-2 h-2 rounded-full bg-accent thinking-dot" />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}