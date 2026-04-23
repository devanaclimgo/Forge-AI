import { Link } from "react-router-dom"
import { Navigation } from "../../../components/forge/navigation"
import { ProjectCard } from "../../../components/forge/project-card"
import { Plus, Activity, CheckCircle2, Zap, Calendar } from "lucide-react"

const projects = [
  {
    id: "fintrack-ai",
    name: "FinTrack AI",
    description: "Personal finance tracker with AI-powered insights and budget recommendations",
    progress: 68,
    status: "active" as const,
    lastAgentActivity: "Task Manager reprioritized sprint backlog",
    tasksCompleted: 17,
    totalTasks: 25,
    activeSprint: "Sprint 2"
  },
  {
    id: "dev-portfolio",
    name: "Dev Portfolio",
    description: "Interactive developer portfolio with 3D elements and project showcase",
    progress: 45,
    status: "active" as const,
    lastAgentActivity: "Architect suggested component structure",
    tasksCompleted: 9,
    totalTasks: 20,
    activeSprint: "Sprint 1"
  },
  {
    id: "api-dashboard",
    name: "API Dashboard",
    description: "Real-time monitoring dashboard for REST APIs with analytics",
    progress: 15,
    status: "planning" as const,
    lastAgentActivity: "Planner created initial feature breakdown",
    tasksCompleted: 3,
    totalTasks: 18,
    activeSprint: "Planning"
  },
  {
    id: "chat-app",
    name: "TeamChat",
    description: "Real-time team communication platform with channels and threads",
    progress: 100,
    status: "completed" as const,
    lastAgentActivity: "Analyst generated final project report",
    tasksCompleted: 32,
    totalTasks: 32
  }
]

const recentActivity = [
  {
    agent: "Task Manager",
    action: "Reprioritized 3 tasks in FinTrack AI based on dependencies",
    timestamp: "2 min ago",
    project: "FinTrack AI"
  },
  {
    agent: "Architect",
    action: "Recommended Next.js App Router for Dev Portfolio",
    timestamp: "15 min ago",
    project: "Dev Portfolio"
  },
  {
    agent: "Planner",
    action: "Created Sprint 1 with 8 user stories",
    timestamp: "1 hour ago",
    project: "API Dashboard"
  },
  {
    agent: "Debug Agent",
    action: "Generated test checklist for authentication flow",
    timestamp: "2 hours ago",
    project: "FinTrack AI"
  },
  {
    agent: "Analyst",
    action: "Flagged potential scope creep in current sprint",
    timestamp: "3 hours ago",
    project: "Dev Portfolio"
  }
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Overview of your projects and agent activity
            </p>
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
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">61</p>
                <p className="text-sm text-muted-foreground">Tasks Done</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">127</p>
                <p className="text-sm text-muted-foreground">Agent Actions</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <Calendar className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Active Sprints</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Projects */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Projects</h2>
              <Link
                to="/projects"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Agent Activity</h2>
            <div className="rounded-lg border border-border bg-card">
              <div className="divide-y divide-border">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-foreground leading-relaxed">
                          <span className="font-medium text-accent">{activity.agent}</span>{" "}
                          {activity.action}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-muted-foreground font-mono">
                            {activity.timestamp}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {activity.project}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
