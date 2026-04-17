import { cn } from "../../lib/utils"
import { Calendar, Target, TrendingUp } from "lucide-react"

interface SprintCardProps {
  name: string
  startDate: string
  endDate: string
  progress: number
  tasksTotal: number
  tasksDone: number
  isActive?: boolean
}

export function SprintCard({
  name,
  startDate,
  endDate,
  progress,
  tasksTotal,
  tasksDone,
  isActive = false,
}: SprintCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-all duration-200",
        isActive
          ? "border-primary/50 bg-primary/5"
          : "border-border bg-card hover:border-border/80"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{name}</h3>
            {isActive && (
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                Ativo
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{startDate} - {endDate}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">{progress}%</p>
          <p className="text-xs text-muted-foreground">concluido</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isActive ? "bg-primary" : "bg-muted-foreground"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Stats */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Target className="h-4 w-4" />
          <span>{tasksDone}/{tasksTotal} tarefas</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <TrendingUp className="h-4 w-4" />
          <span>No prazo</span>
        </div>
      </div>
    </div>
  )
}
