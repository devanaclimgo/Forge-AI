// src/pages/new-project/page.tsx
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Navigation } from "../../../components/forge/navigation"
import { api } from "../../../lib/api"
import { Plus, X, ArrowRight, Loader2, Tag } from "lucide-react"
import { cn } from "../../../lib/utils"

type Category = "feature" | "bug" | "refactor" | "design" | "devops" | "testing"
type Priority  = "low" | "medium" | "high" | "critical"

interface BacklogTask {
  tempId:   string
  title:    string
  category: Category
  priority: Priority
}

const categoryConfig: Record<Category, { label: string; className: string }> = {
  feature:  { label: "Feature",  className: "bg-primary/20 text-primary" },
  bug:      { label: "Bug",      className: "bg-destructive/20 text-destructive" },
  refactor: { label: "Refactor", className: "bg-accent/20 text-accent" },
  design:   { label: "Design",   className: "bg-warning/20 text-warning" },
  devops:   { label: "DevOps",   className: "bg-muted text-muted-foreground" },
  testing:  { label: "Testing",  className: "bg-success/20 text-success" },
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  low:      { label: "Low",      className: "text-muted-foreground" },
  medium:   { label: "Medium",   className: "text-primary" },
  high:     { label: "High",     className: "text-warning" },
  critical: { label: "Critical", className: "text-destructive" },
}

export default function NewProjectPage() {
  const navigate = useNavigate()

  const [name, setName]               = useState("")
  const [description, setDescription] = useState("")
  const [tasks, setTasks]             = useState<BacklogTask[]>([])
  const [loading, setLoading]         = useState(false)
  const [newTaskTitle, setNewTaskTitle]       = useState("")
  const [newTaskCategory, setNewTaskCategory] = useState<Category>("feature")
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>("medium")

  const addTask = () => {
    if (!newTaskTitle.trim()) return
    setTasks(prev => [...prev, {
      tempId:   crypto.randomUUID(),
      title:    newTaskTitle.trim(),
      category: newTaskCategory,
      priority: newTaskPriority,
    }])
    setNewTaskTitle("")
  }

  const removeTask = (tempId: string) => {
    setTasks(prev => prev.filter(t => t.tempId !== tempId))
  }

  const handleSubmit = async () => {
    if (!name.trim()) return
    setLoading(true)
    try {
      const project = await api.createProject({
        name:        name.trim(),
        description: description.trim(),
        summary:     description.trim(),
      })

      await Promise.all(tasks.map(t =>
        api.createTask(project.id, {
          title:    t.title,
          category: t.category,
          priority: t.priority,
          status:   "todo",
        })
      ))

      navigate(`/project/${project.id}`)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      alert("Failed to create project.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <div className="flex-1 flex flex-col items-center justify-start py-12 px-4">
        <div className="w-full max-w-2xl space-y-8">

          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">New Project</h1>
              <p className="text-muted-foreground mt-1">
                Set up your project and add items to your backlog.
              </p>
            </div>
          </div>

          {/* Project info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Project name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Âncora, My SaaS, Portfolio v2..."
                autoFocus
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#38bdf8]/50 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Description <span className="text-muted-foreground text-xs">(optional)</span>
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="What is this project about?"
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-[#38bdf8]/50 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Backlog */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground">
                Backlog
                <span className="ml-2 text-muted-foreground font-normal">
                  ({tasks.length} items)
                </span>
              </h2>
            </div>

            {/* Add task row */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addTask()}
                placeholder="Add a feature, bug, or task..."
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#38bdf8]/50 focus:border-primary transition-colors"
              />
              <select
                value={newTaskCategory}
                onChange={e => setNewTaskCategory(e.target.value as Category)}
                className="px-2 py-2 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#38bdf8]/50"
              >
                {(Object.keys(categoryConfig) as Category[]).map(c => (
                  <option key={c} value={c}>{categoryConfig[c].label}</option>
                ))}
              </select>
              <select
                value={newTaskPriority}
                onChange={e => setNewTaskPriority(e.target.value as Priority)}
                className="px-2 py-2 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#38bdf8]/50"
              >
                {(Object.keys(priorityConfig) as Priority[]).map(p => (
                  <option key={p} value={p}>{priorityConfig[p].label}</option>
                ))}
              </select>
              <button
                onClick={addTask}
                disabled={!newTaskTitle.trim()}
                className="px-3 py-2 rounded-lg bg-secondary border border-border text-foreground hover:bg-secondary/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Task list */}
            {tasks.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-8 text-center">
                <Tag className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No backlog items yet. Add your first task above.
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  You can also add tasks after creating the project.
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                {tasks.map((task, i) => (
                  <div
                    key={task.tempId}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary/20",
                      i < tasks.length - 1 && "border-b border-border"
                    )}
                  >
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium shrink-0",
                      categoryConfig[task.category].className
                    )}>
                      {categoryConfig[task.category].label}
                    </span>
                    <span className="flex-1 text-sm text-foreground">{task.title}</span>
                    <span className={cn(
                      "text-xs font-mono shrink-0",
                      priorityConfig[task.priority].className
                    )}>
                      {priorityConfig[task.priority].label}
                    </span>
                    <button
                      onClick={() => removeTask(task.tempId)}
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!name.trim() || loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating project...
              </>
            ) : (
              <>
                Create Project
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            You can add sprints and more tasks after creating the project.{" "}
            <Link to="/dashboard" className="text-primary hover:text-primary/80">
              Cancel
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}