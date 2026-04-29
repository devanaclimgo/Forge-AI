import { useState } from "react";
import { cn } from "../../lib/utils";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  Plus,
} from "lucide-react";

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "todo" | "in-progress" | "done" | "blocked";
  assignedAgent?: string;
  agentNotes?: string;
  subTasks?: SubTask[];
  sprint_id?: number |null;
}

interface TaskItemProps extends Task {
  onStatusChange?: (id: string, status: Task["status"]) => void;
  onAddToSprint?: (id: string) => void;
  showAddToSprint?: boolean;
}

const priorityConfig = {
  low: { label: "Low", className: "bg-muted text-muted-foreground" },
  medium: { label: "Medium", className: "bg-primary/20 text-primary" },
  high: { label: "High", className: "bg-warning/20 text-warning" },
  critical: {
    label: "Critical",
    className: "bg-destructive/20 text-destructive",
  },
};

const statusConfig = {
  todo: { label: "To Do", icon: Circle, className: "text-muted-foreground" },
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    className: "text-warning",
  },
  done: { label: "Done", icon: CheckCircle2, className: "text-success" },
  blocked: {
    label: "Blocked",
    icon: AlertCircle,
    className: "text-destructive",
  },
};

const statusOrder: Task["status"][] = [
  "todo",
  "in-progress",
  "done",
  "blocked",
];

export function TaskItem({
  id,
  title,
  description,
  priority,
  status,
  assignedAgent,
  agentNotes,
  subTasks,
  onStatusChange,
  onAddToSprint,
  showAddToSprint = false,
}: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const StatusIcon = statusConfig[currentStatus].icon;

  const cycleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    const newStatus = statusOrder[nextIndex];
    setCurrentStatus(newStatus);
    onStatusChange?.(id, newStatus);
  };

  return (
    <div className="group border-b border-border last:border-b-0">
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-secondary/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <button
          className="text-muted-foreground hover:text-foreground transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={cycleStatus}
          className="hover:scale-110 transition-transform"
          title="Click to change status"
        >
          <StatusIcon
            className={cn(
              "w-5 h-5 transition-colors duration-150",
              statusConfig[currentStatus].className,
            )}
          />
        </button>

        <span className="flex-1 font-medium text-foreground">{title}</span>

        <span
          className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium",
            priorityConfig[priority].className,
          )}
        >
          {priorityConfig[priority].label}
        </span>

        <span
          className={cn(
            "px-2 py-0.5 rounded text-xs font-mono transition-colors duration-150",
            statusConfig[currentStatus].className,
          )}
        >
          {statusConfig[currentStatus].label}
        </span>

        {assignedAgent && (
          <span className="px-2 py-0.5 rounded bg-accent/20 text-accent text-xs font-mono">
            {assignedAgent}
          </span>
        )}

        {showAddToSprint && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToSprint?.(id);
            }}
            className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-medium hover:bg-primary/30 transition-colors flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Add to Sprint
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="px-12 pb-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}

          {agentNotes && (
            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
              <p className="text-xs font-mono text-accent mb-1">Agent Notes:</p>
              <p className="text-sm text-muted-foreground">{agentNotes}</p>
            </div>
          )}

          {subTasks && subTasks.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-mono text-muted-foreground">
                Sub-tasks:
              </p>
              {subTasks.map((subTask) => (
                <div key={subTask.id} className="flex items-center gap-2 pl-2">
                  {subTask.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span
                    className={cn(
                      "text-sm",
                      subTask.completed
                        ? "text-muted-foreground line-through"
                        : "text-foreground",
                    )}
                  >
                    {subTask.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
