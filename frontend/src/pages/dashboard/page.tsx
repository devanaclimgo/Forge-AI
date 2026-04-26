import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Navigation } from "../../../components/forge/navigation"
import { ProjectCard } from "../../../components/forge/project-card"
import { Plus, Activity, CheckCircle2, Zap, Calendar, Loader2 } from "lucide-react"
import { api, type Project } from "../../../lib/api"

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    api.getProjects()
      .then(setProjects)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const totalTasksDone  = projects.reduce((acc, p) => acc + p.tasks_completed, 0)
  const activeSprints   = projects.filter(p => p.active_sprint).length
  const activeProjects  = projects.filter(p => p.progress < 100).length

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Overview of your projects and agent activity</p>
          </div>
          <Link
            to="/brain-dump"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Activity,     color: "primary", value: activeProjects,  label: "Active Projects" },
            { icon: CheckCircle2, color: "success", value: totalTasksDone,  label: "Tasks Done" },
            { icon: Zap,          color: "accent",  value: projects.length, label: "Total Projects" },
            { icon: Calendar,     color: "warning", value: activeSprints,   label: "Active Sprints" },
          ].map(({ icon: Icon, color, value, label }) => (
            <div key={label} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${color}/10`}>
                  <Icon className={`w-5 h-5 text-${color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{loading ? "—" : value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Projects</h2>
          <Link to="/projects" className="text-sm text-primary hover:text-primary/80 transition-colors">
            View all
          </Link>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 6).map(project => (
              <ProjectCard
                key={project.id}
                id={String(project.id)}
                name={project.name}
                description={project.description}
                progress={project.progress}
                status={project.progress === 100 ? "completed" : "active"}
                lastAgentActivity="Agent activity loading..."
                tasksCompleted={project.tasks_completed}
                totalTasks={project.total_tasks}
                activeSprint={project.active_sprint}
              />
            ))}
            {projects.length === 0 && (
              <div className="col-span-3 text-center py-16 text-muted-foreground">
                <p className="mb-4">No projects yet.</p>
                <Link to="/brain-dump" className="text-primary hover:text-primary/80">
                  Create your first project →
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}