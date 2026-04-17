import { cn } from "../../lib/utils"
import { 
  ChevronRight, 
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react"
import type { AgentType } from "./agent-card"

interface Decision {
  id: string
  timestamp: string
  action: string
  reasoning: string
  outcome: "success" | "pending" | "failed"
  impact?: string
}

interface DecisionHistoryProps {
  agent: AgentType
  decisions: Decision[]
  className?: string
}

const outcomeConfig = {
  success: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    label: "Sucesso",
  },
  pending: {
    icon: Clock,
    color: "text-amber-400",
    label: "Pendente",
  },
  failed: {
    icon: XCircle,
    color: "text-red-400",
    label: "Falhou",
  },
}

export function DecisionHistory({ decisions, className }: DecisionHistoryProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h4 className="text-sm font-medium text-muted-foreground">Historico de Decisoes</h4>
      
      <div className="space-y-3">
        {decisions.map((decision, index) => {
          const outcomeInfo = outcomeConfig[decision.outcome]
          const OutcomeIcon = outcomeInfo.icon

          return (
            <div
              key={decision.id}
              className={cn(
                "relative rounded-lg border border-border bg-card/50 p-4 transition-all duration-200 hover:bg-card",
                index === 0 && "border-primary/30 bg-primary/5"
              )}
            >
              {/* Timeline connector */}
              {index < decisions.length - 1 && (
                <div className="absolute -bottom-3 left-6 h-3 w-px bg-border" />
              )}

              <div className="flex items-start gap-3">
                {/* Timeline dot */}
                <div className={cn(
                  "mt-1 flex h-3 w-3 items-center justify-center rounded-full",
                  index === 0 ? "bg-primary" : "bg-muted"
                )}>
                  {index === 0 && (
                    <div className="absolute h-3 w-3 animate-ping rounded-full bg-primary opacity-50" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{decision.timestamp}</span>
                    <div className={cn("flex items-center gap-1 text-xs", outcomeInfo.color)}>
                      <OutcomeIcon className="h-3 w-3" />
                      <span>{outcomeInfo.label}</span>
                    </div>
                  </div>
                  
                  <p className="mt-1 font-medium text-foreground">{decision.action}</p>
                  
                  <p className="mt-1 text-sm text-muted-foreground">
                    {decision.reasoning}
                  </p>

                  {decision.impact && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
                      <ArrowRight className="h-3 w-3" />
                      <span>{decision.impact}</span>
                    </div>
                  )}
                </div>

                {/* Expand button */}
                <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
