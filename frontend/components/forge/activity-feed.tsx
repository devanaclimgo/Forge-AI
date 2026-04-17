"use client"

import { cn } from "../../lib/utils"
import { 
  Layers, 
  GitBranch, 
  ListTodo, 
  Bug, 
  TrendingUp, 
  Users,
  Clock,
} from "lucide-react"
import type { AgentType } from "./agent-card"

interface ActivityItem {
  id: string
  agent: AgentType
  action: string
  timestamp: string
  details?: string
}

interface ActivityFeedProps {
  activities: ActivityItem[]
  className?: string
}

const agentIcons = {
  planner: Layers,
  architect: GitBranch,
  task: ListTodo,
  debug: Bug,
  progress: TrendingUp,
  community: Users,
}

const agentColors = {
  planner: "text-violet-400 bg-violet-500/10",
  architect: "text-blue-400 bg-blue-500/10",
  task: "text-emerald-400 bg-emerald-500/10",
  debug: "text-red-400 bg-red-500/10",
  progress: "text-amber-400 bg-amber-500/10",
  community: "text-pink-400 bg-pink-500/10",
}

const agentNames = {
  planner: "Planner",
  architect: "Architect",
  task: "Task Manager",
  debug: "Debug",
  progress: "Progress",
  community: "Community",
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {activities.map((activity, index) => {
        const Icon = agentIcons[activity.agent]
        const colors = agentColors[activity.agent]
        const [iconColor, bgColor] = colors.split(" ")

        return (
          <div
            key={activity.id}
            className={cn(
              "group relative flex gap-3 rounded-lg border border-border/50 bg-card/50 p-3 transition-all duration-200 hover:border-border hover:bg-card",
              index === 0 && "border-primary/30 bg-primary/5"
            )}
          >
            {/* Agent Icon */}
            <div className={cn("flex-shrink-0 rounded-lg p-2", bgColor)}>
              <Icon className={cn("h-4 w-4", iconColor)} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={cn("text-sm font-medium", iconColor)}>
                  {agentNames[activity.agent]}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{activity.timestamp}</span>
                </div>
              </div>
              <p className="mt-0.5 text-sm text-foreground">{activity.action}</p>
              {activity.details && (
                <p className="mt-1 text-xs text-muted-foreground truncate">
                  {activity.details}
                </p>
              )}
            </div>

            {/* Pulse indicator for latest */}
            {index === 0 && (
              <div className="absolute -right-1 -top-1">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
