import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../../../components/forge/navigation";
import { ProjectCard } from "../../../components/forge/project-card";
import { Plus, Search, FolderOpen, Loader2 } from "lucide-react";
import { cn } from "../../../lib/utils";
import { api, type Project } from "../../../lib/api";

type StatusFilter = "all" | "active" | "completed";
type SortOption = "recent" | "progress" | "name";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  useEffect(() => {
    api
      .getProjects()
      .then(setProjects)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = [...projects];
    if (searchQuery)
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    if (statusFilter === "completed")
      list = list.filter((p) => p.progress === 100);
    if (statusFilter === "active") list = list.filter((p) => p.progress < 100);
    if (sortBy === "progress") list.sort((a, b) => b.progress - a.progress);
    if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [projects, searchQuery, statusFilter, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-1">
              {projects.length} projects total
            </p>
          </div>
          <Link
            to="/brain-dump"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" /> New Project
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            {(["all", "active", "completed"] as StatusFilter[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
                  statusFilter === s
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="recent">Sort by: Recent</option>
            <option value="progress">Sort by: Progress</option>
            <option value="name">Sort by: Name</option>
          </select>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        )}
        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          (filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <ProjectCard
                  key={p.id}
                  id={String(p.id)}
                  name={p.name}
                  description={p.description}
                  progress={p.progress}
                  status={p.progress === 100 ? "completed" : "active"}
                  lastAgentActivity="—"
                  tasksCompleted={p.tasks_completed}
                  totalTasks={p.total_tasks}
                  activeSprint={p.active_sprint}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary mb-4">
                <FolderOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                No projects found
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery
                  ? `No projects match "${searchQuery}"`
                  : "No projects yet"}
              </p>
              <Link
                to="/brain-dump"
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4" /> Create Your First Project
              </Link>
            </div>
          ))}
      </main>
    </div>
  );
}
