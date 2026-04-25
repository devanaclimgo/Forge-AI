import { useState } from "react"
import { Navigation } from "../../../../components/forge/navigation"
import { TaskItem, type Task } from "../../../../components/forge/task-item"
import { AgentCard } from "../../../../components/forge/agent-card"
import { 
  ChevronDown,
  ChevronRight,
  Target, 
  GitBranch, 
  ListTodo, 
  Shield, 
  Workflow,
  Calendar,
  LayoutList,
  Bot,
  Plus,
  MoreHorizontal,
  X,
  Download,
  Archive,
  Copy
} from "lucide-react"
import { cn } from "../../../../lib/src/*/utils"

const initialTasks: Task[] = [
  // TODO: replace this with actual API call to fetch tasks for the active sprint of the project
  {
    id: "1",
    title: "Set up authentication with NextAuth.js",
    description: "Implement user authentication using NextAuth.js with support for email/password and OAuth providers.",
    priority: "high",
    status: "done",
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
    priority: "high",
    status: "done",
    assignedAgent: "Planner"
  },
  {
    id: "3",
    title: "Implement expense tracking form",
    description: "Build a form to add new expenses with category selection, amount input, and date picker.",
    priority: "medium",
    status: "in-progress",
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
    priority: "medium",
    status: "in-progress",
    assignedAgent: "Architect"
  },
  {
    id: "5",
    title: "Set up database schema for transactions",
    description: "Design and implement the PostgreSQL schema for storing user transactions and categories.",
    priority: "critical",
    status: "done",
    assignedAgent: "Architect",
    agentNotes: "Using Prisma ORM for type-safe database access. Schema includes soft delete for data recovery."
  },
  {
    id: "6",
    title: "Build AI budget recommendation engine",
    description: "Implement the AI service that analyzes spending patterns and generates personalized budget recommendations.",
    priority: "high",
    status: "todo",
    assignedAgent: "Planner",
    agentNotes: "Scheduled for Sprint 3. Requires transaction history feature first."
  },
  {
    id: "7",
    title: "Add recurring expense support",
    description: "Allow users to set up recurring expenses that automatically generate transactions.",
    priority: "low",
    status: "todo",
    assignedAgent: "Task Manager"
  },
  {
    id: "8",
    title: "Implement export to CSV",
    description: "Add functionality to export transaction data to CSV format for external analysis.",
    priority: "low",
    status: "blocked",
    assignedAgent: "Debug Agent",
    agentNotes: "Blocked by missing data formatting library. Recommend date-fns."
  }
]

const backlogTasks: Task[] = [
  {
    id: "b1",
    title: "Add multi-currency support",
    description: "Support multiple currencies with automatic conversion rates.",
    priority: "medium",
    status: "todo",
    assignedAgent: "Architect"
  },
  {
    id: "b2",
    title: "Implement budget alerts",
    description: "Notify users when they exceed budget thresholds.",
    priority: "high",
    status: "todo",
    assignedAgent: "Planner"
  },
  {
    id: "b3",
    title: "Add receipt OCR scanning",
    description: "Automatically extract transaction details from receipt photos.",
    priority: "low",
    status: "todo"
  },
  {
    id: "b4",
    title: "Create mobile app",
    description: "Build a React Native mobile companion app.",
    priority: "low",
    status: "todo"
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
  const [showBacklog, setShowBacklog] = useState(false)
  const [tasks, setTasks] = useState(initialTasks)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as Task["priority"],
    status: "todo" as Task["status"]
  })

  const completedTasks = tasks.filter(t => t.status === "done").length
  const progress = Math.round((completedTasks / tasks.length) * 100)

  const handleStatusChange = (id: string, newStatus: Task["status"]) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))
  }

  const handleAddTask = () => {
    if (!newTask.title.trim()) return
    const task: Task = {
      id: `new-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      status: newTask.status
    }
    setTasks(prev => [...prev, task])
    setNewTask({ title: "", description: "", priority: "medium", status: "todo" })
    setShowAddTaskModal(false)
  }

  const handleAddToSprint = (taskId: string) => {
    // In a real app, this would move the task from backlog to the active sprint
    console.log(`Adding task ${taskId} to sprint`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-border bg-card p-4 hidden lg:block overflow-auto">
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
            <div>
              <button 
                onClick={() => setShowBacklog(!showBacklog)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                {showBacklog ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                Backlog
                <span className="ml-auto font-mono text-xs">{backlogTasks.length}</span>
              </button>
              
              {showBacklog && (
                <div className="mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {backlogTasks.map(task => (
                    <div
                      key={task.id}
                      className="px-3 py-2 rounded-md bg-secondary/50 border border-border"
                    >
                      <p className="text-sm text-foreground truncate">{task.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className={cn(
                          "text-xs font-mono",
                          task.priority === "high" ? "text-warning" :
                          task.priority === "critical" ? "text-destructive" :
                          "text-muted-foreground"
                        )}>
                          {task.priority}
                        </span>
                        <button
                          onClick={() => handleAddToSprint(task.id)}
                          className="text-xs text-primary hover:text-primary/80 font-medium"
                        >
                          + Sprint
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
                <button 
                  onClick={() => setShowAddTaskModal(true)}
                  className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <Plus className="w-4 h-4" />
                  Add Task
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                  
                  {showMoreMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setShowMoreMenu(false)}
                      />
                      <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-border bg-card shadow-lg z-50 py-1 animate-in fade-in zoom-in-95 duration-150">
                        <button
                          onClick={() => setShowMoreMenu(false)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Export tasks
                        </button>
                        <button
                          onClick={() => setShowMoreMenu(false)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                        >
                          <Archive className="w-4 h-4" />
                          Archive project
                        </button>
                        <button
                          onClick={() => setShowMoreMenu(false)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                          Duplicate sprint
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Task List */}
            {activeView === "tasks" && (
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                {tasks.map((task) => (
                  <TaskItem 
                    key={task.id} 
                    {...task} 
                    onStatusChange={handleStatusChange}
                  />
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
          <aside className="w-80 border-l border-border bg-card p-4 overflow-auto hidden xl:block">
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

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setShowAddTaskModal(false)}
        >
          <div 
            className="relative w-full max-w-md mx-4 rounded-lg border border-border bg-card p-6 shadow-xl animate-in zoom-in-95 duration-150"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddTaskModal(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-semibold text-foreground mb-4">Add New Task</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Task title..."
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Task description..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={e => setNewTask(prev => ({ ...prev, priority: e.target.value as Task["priority"] }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Status
                  </label>
                  <select
                    value={newTask.status}
                    onChange={e => setNewTask(prev => ({ ...prev, status: e.target.value as Task["status"] }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleAddTask}
                disabled={!newTask.title.trim()}
                className={cn(
                  "w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  newTask.title.trim()
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-muted-foreground cursor-not-allowed"
                )}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
