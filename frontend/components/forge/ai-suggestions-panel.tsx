import { cn } from "../../lib/utils"
import { 
  Sparkles, 
  Lightbulb, 
  AlertTriangle, 
  ArrowRight,
  Check,
  X,
} from "lucide-react"
import { Button } from "../../components/ui/button"

interface Suggestion {
  id: string
  type: "task" | "warning" | "insight"
  title: string
  description: string
  agent: string
}

interface AISuggestionsPanelProps {
  suggestions: Suggestion[]
  className?: string
}

const typeConfig = {
  task: {
    icon: Sparkles,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
  },
  insight: {
    icon: Lightbulb,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
}

export function AISuggestionsPanel({ suggestions, className }: AISuggestionsPanelProps) {
  return (
    <div className={cn("rounded-xl border border-primary/30 bg-primary/5 p-4", className)}>
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-primary/20 p-2">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Sugestoes da IA</h3>
          <p className="text-xs text-muted-foreground">{suggestions.length} recomendacoes ativas</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {suggestions.map((suggestion) => {
          const config = typeConfig[suggestion.type]
          const Icon = config.icon

          return (
            <div
              key={suggestion.id}
              className={cn(
                "rounded-lg border p-3 transition-all duration-200 hover:shadow-md",
                config.borderColor,
                config.bgColor
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("rounded-lg p-1.5", config.bgColor)}>
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{suggestion.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                    {suggestion.description}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Sugerido por <span className={config.color}>{suggestion.agent}</span>
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Button size="sm" variant="ghost" className="h-7 flex-1 text-xs hover:bg-emerald-500/20 hover:text-emerald-400">
                  <Check className="mr-1 h-3 w-3" />
                  Aplicar
                </Button>
                <Button size="sm" variant="ghost" className="h-7 flex-1 text-xs hover:bg-red-500/20 hover:text-red-400">
                  <X className="mr-1 h-3 w-3" />
                  Ignorar
                </Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs">
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
