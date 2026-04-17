import { cn } from "../../lib/utils"
import { 
  Layers, 
  GitBranch, 
  ListTodo, 
  Bug, 
  TrendingUp, 
  Users,
  Loader2 
} from "lucide-react"

export type AgentType = "planner" | "architect" | "task" | "debug" | "progress" | "community"
export type AgentStatus = "active" | "idle" | "thinking"

interface AgentCardProps {
  type: AgentType
  status: AgentStatus
  lastAction?: string
  compact?: boolean
  onClick?: () => void
}

const agentConfig = {
  planner: {
    name: "Planner Agent",
    description: "Cria estrutura de features e sprints",
    icon: Layers,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    glowClass: "glow-purple",
  },
  architect: {
    name: "Architect Agent",
    description: "Define design do sistema",
    icon: GitBranch,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    glowClass: "glow-blue",
  },
  task: {
    name: "Task Manager",
    description: "Sugere e atualiza tarefas",
    icon: ListTodo,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    glowClass: "glow-green",
  },
  debug: {
    name: "Debug Agent",
    description: "Ajuda com bugs e erros",
    icon: Bug,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    glowClass: "glow-red",
  },
  progress: {
    name: "Progress Analyst",
    description: "Analisa performance do projeto",
    icon: TrendingUp,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    glowClass: "glow-yellow",
  },
  community: {
    name: "Community Agent",
    description: "Melhora perguntas e respostas",
    icon: Users,
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    glowClass: "glow-purple",
  },
}

const statusConfig = {
  active: {
    label: "Ativo",
    dotColor: "bg-emerald-500",
    animate: false,
  },
  idle: {
    label: "Inativo",
    dotColor: "bg-muted-foreground",
    animate: false,
  },
  thinking: {
    label: "Processando...",
    dotColor: "bg-amber-500",
    animate: true,
  },
}

export function AgentCard({ type, status, lastAction, compact = false, onClick }: AgentCardProps) {
  const agent = agentConfig[type]
  const statusInfo = statusConfig[status]
  const Icon = agent.icon

  if (compact) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 rounded-lg border p-3 transition-all duration-200 hover:scale-[1.02]",
          agent.borderColor,
          agent.bgColor,
          status === "active" && agent.glowClass
        )}
      >
        <div className={cn("rounded-lg p-2", agent.bgColor)}>
          <Icon className={cn("h-4 w-4", agent.color)} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-foreground">{agent.name}</p>
          <div className="flex items-center gap-1.5">
            <div className={cn(
              "h-1.5 w-1.5 rounded-full",
              statusInfo.dotColor,
              statusInfo.animate && "animate-pulse"
            )} />
            <span className="text-xs text-muted-foreground">{statusInfo.label}</span>
          </div>
        </div>
      </button>
    )
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:scale-[1.02]",
        agent.borderColor,
        agent.bgColor,
        status === "active" && agent.glowClass
      )}
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className={cn("absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl", agent.bgColor)} />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className={cn("rounded-xl p-2.5", agent.bgColor)}>
            {status === "thinking" ? (
              <Loader2 className={cn("h-5 w-5 animate-spin", agent.color)} />
            ) : (
              <Icon className={cn("h-5 w-5", agent.color)} />
            )}
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-background/50 px-2 py-1">
            <div className={cn(
              "h-2 w-2 rounded-full",
              statusInfo.dotColor,
              statusInfo.animate && "animate-pulse"
            )} />
            <span className="text-xs font-medium text-muted-foreground">{statusInfo.label}</span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          <h3 className="font-semibold text-foreground">{agent.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{agent.description}</p>
        </div>

        {/* Last Action */}
        {lastAction && (
          <div className="mt-4 rounded-lg bg-background/30 p-2.5">
            <p className="text-xs text-muted-foreground">Ultima acao:</p>
            <p className="mt-0.5 text-sm text-foreground">{lastAction}</p>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={onClick}
          className={cn(
            "mt-4 w-full rounded-lg border py-2 text-sm font-medium transition-colors",
            agent.borderColor,
            "hover:bg-background/50 text-foreground"
          )}
        >
          Acionar Agente
        </button>
      </div>
    </div>
  )
}
