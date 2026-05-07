import { useState } from "react"
import { cn } from "../../lib/utils"
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Clock, AlertCircle, Plus } from "lucide-react"

interface SubTask {
  id: string
  title: string
  completed: boolean
}

export interface Task {
  id: string
  title: string
  description?: string
  priority: "low" | "medium" | "high" | "critical"
  status: "todo" | "in-progress" | "done" | "blocked"
  assignedAgent?: string
  agentNotes?: string
  subTasks?: SubTask[]
  sprint_id?: number | null
}

interface TaskItemProps extends Task {
  onStatusChange?: (id: string, status: Task["status"]) => void
  onAddToSprint?: (id: string) => void
  showAddToSprint?: boolean
}

const priorityConfig = {
  low:      { label: "Low",      className: "bg-muted text-muted-foreground" },
  medium:   { label: "Medium",   className: "bg-primary/20 text-primary" },
  high:     { label: "High",     className: "bg-warning/20 text-warning" },
  critical: { label: "Critical", className: "bg-destructive/20 text-destructive" },
}

const statusConfig = {
  "todo":        { label: "To Do",       icon: Circle,       className: "text-muted-foreground" },
  "in-progress": { label: "In Progress", icon: Clock,        className: "text-warning" },
  "done":        { label: "Done",        icon: CheckCircle2, className: "text-success" },
  "blocked":     { label: "Blocked",     icon: AlertCircle,  className: "text-destructive" },
}

const statusOrder: Task["status"][] = ["todo", "in-progress", "done", "blocked"]

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
  const [isExpanded, setIsExpanded]     = useState(false)
  const [currentStatus, setCurrentStatus] = useState(status)
  const StatusIcon = statusConfig[currentStatus].icon

  const cycleStatus = (e: React.MouseEvent) => {
    e.stopPropagation()
    const next = statusOrder[(statusOrder.indexOf(currentStatus) + 1) % statusOrder.length]
    setCurrentStatus(next)
    onStatusChange?.(id, next)
  }

  const hasDetails = agentNotes || (subTasks && subTasks.length > 0)

  return (
    <div className={cn(
      "border-b border-border last:border-b-0 transition-colors",
      isExpanded && "bg-secondary/10"
    )}>
      {/* Main row */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-secondary/20 transition-colors"
        onClick={() => hasDetails && setIsExpanded(!isExpanded)}
      >
        {/* Expand chevron */}
        <button
          className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          onClick={(e) => { e.stopPropagation(); if (hasDetails) setIsExpanded(!isExpanded) }}
        >
          {hasDetails
            ? isExpanded
              ? <ChevronDown className="w-4 h-4" />
              : <ChevronRight className="w-4 h-4" />
            : <span className="w-4 h-4 block" />
          }
        </button>

        {/* Status icon */}
        <button
          onClick={cycleStatus}
          className="hover:scale-110 transition-transform shrink-0"
          title="Click to change status"
        >
          <StatusIcon className={cn("w-5 h-5 transition-colors duration-150", statusConfig[currentStatus].className)} />
        </button>

        {/* Title + description inline */}
        <div className="flex-1 min-w-0">
          <span className="font-medium text-foreground text-sm">{title}</span>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{description}</p>
          )}
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 shrink-0">
          <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", priorityConfig[priority].className)}>
            {priorityConfig[priority].label}
          </span>

          <span className={cn("px-2 py-0.5 rounded text-xs font-mono transition-colors duration-150", statusConfig[currentStatus].className)}>
            {statusConfig[currentStatus].label}
          </span>

          {assignedAgent && (
            <span className="px-2 py-0.5 rounded bg-accent/20 text-accent text-xs font-mono">
              {assignedAgent}
            </span>
          )}

          {showAddToSprint && (
            <button
              onClick={(e) => { e.stopPropagation(); onAddToSprint?.(id) }}
              className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-medium hover:bg-primary/30 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add to Sprint
            </button>
          )}
        </div>
      </div>

      {/* Expanded details */}
      {isExpanded && hasDetails && (
        <div className="px-12 pb-5 pt-1 space-y-4 animate-in slide-in-from-top-1 duration-150">
          {agentNotes && (
            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
              <p className="text-xs font-mono text-accent mb-1.5">Agent Notes:</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{agentNotes}</p>
            </div>
          )}

          {subTasks && subTasks.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Sub-tasks:
              </p>
              <div className="space-y-1.5">
                {subTasks.map(subTask => (
                  <div key={subTask.id} className="flex items-center gap-2.5 pl-1">
                    {subTask.completed
                      ? <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      : <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                    }
                    <span className={cn(
                      "text-sm",
                      subTask.completed ? "text-muted-foreground line-through" : "text-foreground"
                    )}>
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
  )
}