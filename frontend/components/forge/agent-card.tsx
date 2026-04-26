import { cn } from "../../lib/utils";

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
        <button className="mt-3 w-full rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80">
          Trigger Agent
        </button>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: "active" | "idle" | "thinking" }) {
  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-success/20 text-success",
    },
    idle: {
      label: "Idle",
      className: "bg-secondary text-muted-foreground",
    },
    thinking: {
      label: "Thinking",
      className: "bg-accent/20 text-accent",
    },
  };

  const config = statusConfig[status];

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
