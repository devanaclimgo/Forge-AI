import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../../../components/forge/navigation";
import { ProjectCard } from "../../../components/forge/project-card";
import {
  Plus,
  Activity,
  CheckCircle2,
  Zap,
  Calendar,
  Loader2,
} from "lucide-react";
import { api, type AgentLog, type Project } from "../../../lib/api";

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([]);

  useEffect(() => {
    api
      .getProjects()
      .then(setProjects)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

    api.getAgentLogs().then(setAgentLogs).catch(console.error);
  }, []);

  const totalTasksDone = projects.reduce(
    (acc, p) => acc + p.tasks_completed,
    0,
  );
  const activeSprints = projects.filter((p) => p.active_sprint).length;
  const activeProjects = projects.filter((p) => p.progress < 100).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-[#94a3b8] mt-1">
              Overview of your projects and agent activity
            </p>
          </div>
          <Link
            to="/brain-dump"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[#38bdf8]/90"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: Activity,
              color: "primary",
              value: activeProjects,
              label: "Active Projects",
            },
            {
              icon: CheckCircle2,
              color: "success",
              value: totalTasksDone,
              label: "Tasks Done",
            },
            {
              icon: Zap,
              color: "accent",
              value: projects.length,
              label: "Total Projects",
            },
            {
              icon: Calendar,
              color: "warning",
              value: activeSprints,
              label: "Active Sprints",
            },
          ].map(({ icon: Icon, color, value, label }) => (
            <div
              key={label}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${color}/10`}
                >
                  <Icon className={`w-5 h-5 text-${color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {loading ? "—" : value}
                  </p>
                  <p className="text-sm text-[#94a3b8]">{label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Projects — 2 colunas */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Projects
              </h2>
              <Link
                to="/projects"
                className="text-sm text-primary hover:text-[#38bdf8]/80 transition-colors"
              >
                View all
              </Link>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-[#94a3b8]" />
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-[#fb923c]/30 bg-[#fb923c]/10 p-4 text-sm text-destructive">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="grid md:grid-cols-2 gap-4">
                {projects.slice(0, 4).map((project) => (
                  <ProjectCard
                    key={project.id}
                    id={String(project.id)}
                    name={project.name}
                    description={project.description}
                    summary={project.summary}
                    progress={project.progress}
                    status={project.progress === 100 ? "completed" : "active"}
                    lastAgentActivity="—"
                    tasksCompleted={project.tasks_completed}
                    totalTasks={project.total_tasks}
                    activeSprint={project.active_sprint}
                  />
                ))}
                {projects.length === 0 && (
                  <div className="col-span-2 text-center py-16 text-[#94a3b8]">
                    <p className="mb-4">No projects yet.</p>
                    <Link
                      to="/brain-dump"
                      className="text-primary hover:text-[#38bdf8]/80"
                    >
                      Create your first project →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Agent Activity — 1 coluna */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Agent Activity
            </h2>
            <div className="rounded-lg border border-border bg-card">
              {agentLogs.length === 0 ? (
                <p className="p-6 text-center text-sm text-[#94a3b8]">
                  No agent activity yet. Create a project to get started.
                </p>
              ) : (
                <div className="divide-y divide-border">
                  {agentLogs.map((log) => (
                    <div key={log.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-foreground leading-relaxed">
                            <span className="font-medium text-accent capitalize">
                              {log.agent_name.replace(/_/g, " ")}
                            </span>{" "}
                            ran analysis
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-xs text-[#94a3b8] font-mono">
                              {new Date(log.created_at).toLocaleTimeString()}
                            </span>
                            <span className="text-xs text-[#94a3b8]">•</span>
                            <span className="text-xs text-[#94a3b8]">
                              {log.project_name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
