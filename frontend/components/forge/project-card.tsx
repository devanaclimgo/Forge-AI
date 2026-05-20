import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

interface ProjectCardProps {
  id: string;
  name: string;
  description?: string;
  summary?: string;
  progress: number;
  status: "active" | "planning" | "completed" | "paused";
  lastAgentActivity: string;
  tasksCompleted: number;
  totalTasks: number;
  activeSprint?: string;
}

const statusConfig = {
  active: { label: "Active", className: "bg-[#34d399]/20 text-success" },
  planning: { label: "Planning", className: "bg-[#0b0f14]20 text-accent" },
  completed: { label: "Completed", className: "bg-primary/20 text-primary" },
  paused: { label: "Paused", className: "bg-muted text-[#94a3b8]" },
};

export function ProjectCard({
  id,
  name,
  description,
  summary,
  progress,
  status,
  lastAgentActivity,
  tasksCompleted,
  totalTasks,
  activeSprint,
}: ProjectCardProps) {
  return (
    <Link to={`/project/${id}`}>
      <div className="group relative rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:scale-[1.01] cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            {(description || summary) && (
              <p className="text-sm text-[#94a3b8] mt-1 line-clamp-2">
                {summary || description}
              </p>
            )}
          </div>
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium shrink-0",
              statusConfig[status].className,
            )}
          >
            {statusConfig[status].label}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-[#94a3b8]">Progress</span>
              <span className="font-mono text-foreground">{progress}%</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-[#94a3b8]">Tasks</span>
            <span className="font-mono text-foreground">
              {tasksCompleted}/{totalTasks}
            </span>
          </div>

          {activeSprint && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#94a3b8]">Sprint</span>
              <span className="font-mono text-primary">{activeSprint}</span>
            </div>
          )}

          <div className="pt-3 border-t border-border">
            <p className="text-xs text-[#94a3b8] font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {lastAgentActivity}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
