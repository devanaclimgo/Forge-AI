import { cn } from "../../lib/utils"
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle,
  MoreHorizontal,
  Sparkles,
  GripVertical,
} from "lucide-react"
import { Button } from "../../components/ui/button"

export type TaskStatus = "todo" | "in-progress" | "done" | "blocked"
export type TaskPriority = "low" | "medium" | "high" | "urgent"

interface TaskCardProps {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assignee?: string
  dueDate?: string
  aiSuggested?: boolean
  tags?: string[]
  onClick?: () => void
}

const statusConfig = {
  todo: {
    icon: Circle,
    color: "text-muted-foreground",
    bgColor: "bg-muted/50",
    label: "A fazer",
  },
  "in-progress": {
    icon: Clock,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    label: "Em progresso",
  },
  done: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    label: "Concluido",
  },
  blocked: {
    icon: AlertCircle,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    label: "Bloqueado",
  },
}

const priorityConfig = {
  low: { color: "bg-muted", label: "Baixa" },
  medium: { color: "bg-blue-500/50", label: "Media" },
  high: { color: "bg-amber-500/50", label: "Alta" },
  urgent: { color: "bg-red-500/50", label: "Urgente" },
}

export function TaskCard({
  title,
  description,
  status,
  priority,
  dueDate,
  aiSuggested,
  tags = [],
  onClick,
}: TaskCardProps) {
  const StatusIcon = statusConfig[status].icon

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-md cursor-pointer",
        aiSuggested && "border-primary/20 bg-primary/5"
      )}
    >
      {/* AI Suggested Badge */}
      {aiSuggested && (
        <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-lg">
          <Sparkles className="h-3 w-3 text-primary-foreground" />
        </div>
      )}

      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <GripVertical className="mt-0.5 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 cursor-grab" />

        {/* Status Icon */}
        <button className={cn("mt-0.5 rounded-full p-0.5 transition-colors", statusConfig[status].bgColor)}>
          <StatusIcon className={cn("h-4 w-4", statusConfig[status].color)} />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-foreground line-clamp-1">{title}</h4>
            {/* Priority Indicator */}
            <div className={cn("h-2 w-2 rounded-full", priorityConfig[priority].color)} title={priorityConfig[priority].label} />
          </div>

          {description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p>
          )}

          {/* Tags & Meta */}
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {dueDate && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {dueDate}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100">
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  )
}
