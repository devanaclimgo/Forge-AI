import { useState } from "react"
import { Navigation } from "../../../../components/forge/navigation"
import { TaskItem } from "../../../../components/forge/task-item"
import { AgentCard } from "../../../../components/forge/agent-card"
import { 
  ChevronDown, 
  Target, 
  GitBranch, 
  ListTodo, 
  Shield, 
  Workflow,
  Calendar,
  LayoutList,
  Bot,
  Plus,
  MoreHorizontal
} from "lucide-react"
import { cn } from "../../../../lib/src/*/utils"

const tasks = [
  {
    id: "1",
    title: "Set up authentication with NextAuth.js",
    description: "Implement user authentication using NextAuth.js with support for email/password and OAuth providers.",
    priority: "high" as const,
    status: "done" as const,
    assignedAgent: "Architect",
    agentNotes: "Recommended OAuth for faster user adoption. Email/password as fallback.",
    subTasks: [
      { id: "1a", title: "Configure NextAuth.js", completed: true },
      { id: "1b", title: "Add Google OAuth", completed: true },
      { id: "1c", title: "Add email provider", completed: true },
      { id: "1d", title: "Create sign-in page", completed: true }
    ]
  },
  {
    id: "2",
    title: "Design dashboard layout",
    description: "Create the main dashboard layout with responsive sidebar navigation and header components.",
    priority: "high" as const,
    status: "done" as const,
    assignedAgent: "Planner"
  },
  {
    id: "3",
    title: "Implement expense tracking form",
    description: "Build a form to add new expenses with category selection, amount input, and date picker.",
    priority: "medium" as const,
    status: "in-progress" as const,
    assignedAgent: "Task Manager",
    agentNotes: "Consider adding receipt photo upload in v2.",
    subTasks: [
      { id: "3a", title: "Create form component", completed: true },
      { id: "3b", title: "Add category dropdown", completed: true },
      { id: "3c", title: "Implement date picker", completed: false },
      { id: "3d", title: "Add form validation", completed: false }
    ]
  },
  {
    id: "4",
    title: "Create spending analytics charts",
    description: "Build interactive charts to visualize spending patterns by category and time period.",
    priority: "medium" as const,
    status: "in-progress" as const,
    assignedAgent: "Architect"
  },
  {
    id: "5",
    title: "Set up database schema for transactions",
    description: "Design and implement the PostgreSQL schema for storing user transactions and categories.",
    priority: "critical" as const,
    status: "done" as const,
    assignedAgent: "Architect",
    agentNotes: "Using Prisma ORM for type-safe database access. Schema includes soft delete for data recovery."
  },
  {
    id: "6",
    title: "Build AI budget recommendation engine",
    description: "Implement the AI service that analyzes spending patterns and generates personalized budget recommendations.",
    priority: "high" as const,
    status: "todo" as const,
    assignedAgent: "Planner",
    agentNotes: "Scheduled for Sprint 3. Requires transaction history feature first."
  },
  {
    id: "7",
    title: "Add recurring expense support",
    description: "Allow users to set up recurring expenses that automatically generate transactions.",
    priority: "low" as const,
    status: "todo" as const,
    assignedAgent: "Task Manager"
  },
  {
    id: "8",
    title: "Implement export to CSV",
    description: "Add functionality to export transaction data to CSV format for external analysis.",
    priority: "low" as const,
    status: "blocked" as const,
    assignedAgent: "Debug Agent",
    agentNotes: "Blocked by missing data formatting library. Recommend date-fns."
  }
]

const sprints = [
  { id: "sprint-1", name: "Sprint 1", status: "completed", tasks: 8, completed: 8 },
  { id: "sprint-2", name: "Sprint 2", status: "active", tasks: 10, completed: 6 },
  { id: "sprint-3", name: "Sprint 3", status: "planned", tasks: 7, completed: 0 }
]

const agents = [
  {
    name: "Planner",
    role: "Feature Architect",
    description: "Structures features into sprints",
    status: "idle" as const,
    lastAction: "Created Sprint 3 backlog with 7 tasks",
    timestamp: "2 hours ago",
    icon: <Target className="w-5 h-5" />
  },
  {
    name: "Architect",
    role: "Technical Advisor",
    description: "Defines technical stack",
    status: "thinking" as const,
    lastAction: "Analyzing chart library options",
    timestamp: "Just now",
    icon: <GitBranch className="w-5 h-5" />
  },
  {
    name: "Task Manager",
    role: "Priority Master",
    description: "Organizes backlog",
    status: "active" as const,
    lastAction: "Reprioritized expense form subtasks",
    timestamp: "5 min ago",
    icon: <ListTodo className="w-5 h-5" />
  },
  {
    name: "Debug Agent",
    role: "Quality Guardian",
    description: "Catches issues early",
    status: "idle" as const,
    lastAction: "Flagged missing dependency for CSV export",
    timestamp: "30 min ago",
    icon: <Shield className="w-5 h-5" />
  },
  {
    name: "Analyst",
    role: "Progress Tracker",
    description: "Provides health reports",
    status: "idle" as const,
    lastAction: "Generated sprint velocity report",
    timestamp: "1 hour ago",
    icon: <Workflow className="w-5 h-5" />
  }
]

type ViewType = "tasks" | "sprints"

export default function ProjectPage() {
  const [activeView, setActiveView] = useState<ViewType>("tasks")
  const [activeSprint, setActiveSprint] = useState("sprint-2")
  const [showAgentPanel, setShowAgentPanel] = useState(true)

  const completedTasks = tasks.filter(t => t.status === "done").length
  const progress = Math.round((completedTasks / tasks.length) * 100)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-border bg-sidebar p-4 hidden lg:block">
          <div className="space-y-6">
            {/* Project Info */}
            <div>
              <h1 className="text-lg font-bold text-foreground">FinTrack AI</h1>
              <p className="text-sm text-muted-foreground mt-1">Personal finance tracker</p>
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-mono text-foreground">{progress}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-1">
              <button
                onClick={() => setActiveView("tasks")}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  activeView === "tasks"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <LayoutList className="w-4 h-4" />
                Task List
              </button>
              <button
                onClick={() => setActiveView("sprints")}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  activeView === "sprints"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <Calendar className="w-4 h-4" />
                Sprints
              </button>
              <button
                onClick={() => setShowAgentPanel(!showAgentPanel)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  showAgentPanel
                    ? "bg-accent/20 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <Bot className="w-4 h-4" />
                Agent Panel
              </button>
            </div>

            {/* Sprints */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Sprints
              </h3>
              <div className="space-y-1">
                {sprints.map((sprint) => (
                  <button
                    key={sprint.id}
                    onClick={() => setActiveSprint(sprint.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                      activeSprint === sprint.id
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    <span>{sprint.name}</span>
                    <span className="font-mono text-xs">
                      {sprint.completed}/{sprint.tasks}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Backlog */}
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
              <ChevronDown className="w-4 h-4" />
              Backlog
              <span className="ml-auto font-mono text-xs">12</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {activeView === "tasks" ? "Task List" : "Sprint Overview"}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {activeView === "tasks"
                    ? `${completedTasks} of ${tasks.length} tasks completed`
                    : "Manage your sprint cycles"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                  <Plus className="w-4 h-4" />
                  Add Task
                </button>
                <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Task List */}
            {activeView === "tasks" && (
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                {tasks.map((task) => (
                  <TaskItem key={task.id} {...task} />
                ))}
              </div>
            )}

            {/* Sprint View */}
            {activeView === "sprints" && (
              <div className="space-y-6">
                {sprints.map((sprint) => (
                  <div
                    key={sprint.id}
                    className="rounded-lg border border-border bg-card p-5"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-foreground">{sprint.name}</h3>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            sprint.status === "active"
                              ? "bg-success/20 text-success"
                              : sprint.status === "completed"
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {sprint.status.charAt(0).toUpperCase() + sprint.status.slice(1)}
                        </span>
                      </div>
                      <span className="font-mono text-sm text-muted-foreground">
                        {sprint.completed}/{sprint.tasks} tasks
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                        style={{ width: `${(sprint.completed / sprint.tasks) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Agent Panel */}
        {showAgentPanel && (
          <aside className="w-80 border-l border-border bg-sidebar p-4 overflow-auto hidden xl:block">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">AI Agents</h2>
              <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-xs font-medium">
                3 Active
              </span>
            </div>
            <div className="space-y-3">
              {agents.map((agent, index) => (
                <AgentCard key={index} {...agent} showTrigger compact />
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
