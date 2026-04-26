import { useState } from "react";
import { cn } from "../../lib/utils";
import { api } from "../../lib/api";

interface AgentCardProps {
  name: string;
  role: string;
  description: string;
  status?: "active" | "idle" | "thinking";
  lastAction?: string;
  timestamp?: string;
  icon: React.ReactNode;
  showTrigger?: boolean;
  compact?: boolean;
}

export function AgentCard({
  name,
  role,
  description,
  status = "idle",
  lastAction,
  timestamp,
  icon,
  showTrigger = false,
  compact = false,
}: AgentCardProps) {
  const [triggerLoading, setTriggerLoading] = useState(false);
  const [triggerResult, setTriggerResult] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  const handleTrigger = async () => {
    if (!prompt.trim()) return;
    setTriggerLoading(true);
    setShowPrompt(false);
    try {
      const agentId = name.toLowerCase().replace(/\s+/g, "");
      const res = await api.runAgent(agentId, prompt);
      setTriggerResult(res.result);
      setShowResult(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setTriggerResult("Agent failed to respond.");
      setShowResult(true);
    } finally {
      setTriggerLoading(false);
      setPrompt("");
    }
  };

  return (
    <div
      className={cn(
        "group relative rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-border/80 hover:scale-[1.01]",
        status === "active" && "agent-glow border-accent/50",
        status === "thinking" && "border-accent/30",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            status === "active"
              ? "bg-accent/20 text-accent"
              : "bg-secondary text-muted-foreground",
          )}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{name}</h3>
            <StatusBadge status={status} />
          </div>
          <p className="text-sm text-accent font-mono">{role}</p>
          {!compact && (
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
          {lastAction && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground font-mono truncate">
                {lastAction}
              </p>
              {timestamp && (
                <p className="text-xs text-muted-foreground/60 font-mono mt-1">
                  {timestamp}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {showTrigger && (
        <div className="mt-3 space-y-2">
          {/* Loading state */}
          {triggerLoading && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-accent/10 border border-accent/20">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent thinking-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent thinking-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent thinking-dot" />
              </span>
              <span className="text-xs text-accent font-mono">
                Agent is thinking...
              </span>
            </div>
          )}

          {/* Result */}
          {showResult && !triggerLoading && (
            <div className="rounded-md bg-secondary/50 border border-border p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-mono text-accent">Result</p>
                <button
                  onClick={() => setShowResult(false)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  dismiss
                </button>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-6">
                {triggerResult}
              </p>
            </div>
          )}

          {/* Prompt input */}
          {showPrompt && !triggerLoading && (
            <div className="space-y-2">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`What should ${name} analyze?`}
                rows={2}
                autoFocus
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleTrigger}
                  disabled={!prompt.trim()}
                  className="flex-1 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-background transition-colors hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Run Agent
                </button>
                <button
                  onClick={() => {
                    setShowPrompt(false);
                    setPrompt("");
                  }}
                  className="px-3 py-1.5 rounded-md bg-secondary text-xs font-medium text-foreground hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Trigger button */}
          {!showPrompt && !triggerLoading && (
            <button
              onClick={() => {
                setShowResult(false);
                setShowPrompt(true);
              }}
              className="w-full rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
            >
              Trigger Agent
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: "active" | "idle" | "thinking" }) {
  const config = {
    active: { label: "Active", className: "bg-success/20 text-success" },
    idle: { label: "Idle", className: "bg-secondary text-muted-foreground" },
    thinking: { label: "Thinking", className: "bg-accent/20 text-accent" },
  }[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        config.className,
      )}
    >
      {status === "thinking" && (
        <span className="flex gap-0.5">
          <span className="w-1 h-1 rounded-full bg-current thinking-dot" />
          <span className="w-1 h-1 rounded-full bg-current thinking-dot" />
          <span className="w-1 h-1 rounded-full bg-current thinking-dot" />
        </span>
      )}
      {status === "active" && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {config.label}
    </span>
  );
}
