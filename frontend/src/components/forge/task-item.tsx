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
  Pencil,
  X,
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
  sprint_id?: number | null;
}

interface TaskItemProps extends Task {
  onStatusChange?: (id: string, status: Task["status"]) => void;
  onEdit?: (id: string, updates: Partial<Pick<Task, "title" | "description" | "priority" | "status">>) => void;
  onAddToSprint?: (id: string) => void;
  showAddToSprint?: boolean;
}

const priorityConfig = {
  low: { label: "Low", className: "bg-muted text-muted-foreground" },
  medium: { label: "Medium", className: "bg-primary/20 text-primary" },
  high: { label: "High", className: "bg-warning/20 text-warning" },
  critical: { label: "Critical", className: "bg-destructive/20 text-destructive" },
};

const statusConfig = {
  todo: { label: "To Do", icon: Circle, className: "text-muted-foreground" },
  "in-progress": { label: "In Progress", icon: Clock, className: "text-warning" },
  done: { label: "Done", icon: CheckCircle2, className: "text-success" },
  blocked: { label: "Blocked", icon: AlertCircle, className: "text-destructive" },
};

const statusOrder: Task["status"][] = ["todo", "in-progress", "done", "blocked"];

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
  onEdit,
  onAddToSprint,
  showAddToSprint = false,
}: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    title,
    description: description ?? "",
    priority,
    status,
  });

  const StatusIcon = statusConfig[currentStatus].icon;

  const cycleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = statusOrder[(statusOrder.indexOf(currentStatus) + 1) % statusOrder.length];
    setCurrentStatus(next);
    onStatusChange?.(id, next);
  };

  const handleEditSave = () => {
    onEdit?.(id, editForm);
    setShowEditModal(false);
  };

  const hasDetails = agentNotes || (subTasks && subTasks.length > 0);

  return (
    <>
      <div
        className={cn(
          "border-b border-border last:border-b-0 transition-colors",
          isExpanded && "bg-secondary/10",
        )}
      >
        {/* Main row */}
        <div
          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-secondary/20 transition-colors group"
          onClick={() => hasDetails && setIsExpanded(!isExpanded)}
        >
          {/* Expand chevron */}
          <button
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              if (hasDetails) setIsExpanded(!isExpanded);
            }}
          >
            {hasDetails ? (
              isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )
            ) : (
              <span className="w-4 h-4 block" />
            )}
          </button>

          {/* Status icon */}
          <button
            onClick={cycleStatus}
            className="hover:scale-110 transition-transform shrink-0"
            title="Click to change status"
          >
            <StatusIcon
              className={cn(
                "w-5 h-5 transition-colors duration-150",
                statusConfig[currentStatus].className,
              )}
            />
          </button>

          {/* Title + description inline */}
          <div className="flex-1 min-w-0">
            <span className="font-medium text-foreground text-sm">{title}</span>
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {description}
              </p>
            )}
          </div>

          {/* Badges + edit button */}
          <div className="flex items-center gap-2 shrink-0">
            <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", priorityConfig[priority].className)}>
              {priorityConfig[priority].label}
            </span>

            <span className={cn("px-2 py-0.5 rounded text-xs font-mono transition-colors duration-150", statusConfig[currentStatus].className)}>
              {statusConfig[currentStatus].label}
            </span>

            {assignedAgent && (
              <span className="px-2 py-0.5 rounded bg-background20 text-accent text-xs font-mono">
                {assignedAgent}
              </span>
            )}

            {showAddToSprint && (
              <button
                onClick={(e) => { e.stopPropagation(); onAddToSprint?.(id); }}
                className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-medium hover:bg-primary/30 transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Add to Sprint
              </button>
            )}

            {/* Edit button — visible on hover */}
            <button
              onClick={(e) => { e.stopPropagation(); setShowEditModal(true); }}
              className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground hover:bg-secondary"
              title="Edit task"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Expanded details */}
        {isExpanded && hasDetails && (
          <div className="px-12 pb-5 pt-1 space-y-4 animate-in slide-in-from-top-1 duration-150">
            {agentNotes && (
              <div className="p-3 rounded-lg bg-background10 border border-background20">
                <p className="text-xs font-mono text-accent mb-1.5">Agent Notes:</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{agentNotes}</p>
              </div>
            )}

            {subTasks && subTasks.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Sub-tasks:</p>
                <div className="space-y-1.5">
                  {subTasks.map((subTask) => (
                    <div key={subTask.id} className="flex items-center gap-2.5 pl-1">
                      {subTask.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                      )}
                      <span className={cn("text-sm", subTask.completed ? "text-muted-foreground line-through" : "text-foreground")}>
                        {subTask.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="relative w-full max-w-md mx-4 rounded-lg border border-border bg-card p-6 shadow-xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-foreground mb-4">Edit Task</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))}
                  autoFocus
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Priority</label>
                  <select
                    value={editForm.priority}
                    onChange={(e) => setEditForm((p) => ({ ...p, priority: e.target.value as Task["priority"] }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm((p) => ({ ...p, status: e.target.value as Task["status"] }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  disabled={!editForm.title.trim()}
                  className={cn(
                    "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    editForm.title.trim()
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-muted-foreground cursor-not-allowed",
                  )}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}