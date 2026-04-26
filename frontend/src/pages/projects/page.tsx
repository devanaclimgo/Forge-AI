"use client";

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../../../components/forge/navigation";
import { ProjectCard } from "../../../components/forge/project-card";
import { Plus, Search, FolderOpen } from "lucide-react";
import { cn } from "../../../lib/utils";

const allProjects = [
  // TODO: replace this with actual API call to fetch projects for the logged in user
  {
    id: "fintrack-ai",
    name: "FinTrack AI",
    description:
      "Personal finance tracker with AI-powered insights and budget recommendations",
    progress: 68,
    status: "active" as const,
    lastAgentActivity: "Task Manager reprioritized sprint backlog",
    tasksCompleted: 17,
    totalTasks: 25,
    activeSprint: "Sprint 2",
  },
  {
    id: "dev-portfolio",
    name: "Dev Portfolio",
    description:
      "Interactive developer portfolio with 3D elements and project showcase",
    progress: 45,
    status: "active" as const,
    lastAgentActivity: "Architect suggested component structure",
    tasksCompleted: 9,
    totalTasks: 20,
    activeSprint: "Sprint 1",
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
    activeSprint: "Planning",
  },
  {
    id: "chat-app",
    name: "TeamChat",
    description:
      "Real-time team communication platform with channels and threads",
    progress: 100,
    status: "completed" as const,
    lastAgentActivity: "Analyst generated final project report",
    tasksCompleted: 32,
    totalTasks: 32,
  },
  {
    id: "ecommerce-platform",
    name: "ShopFlow",
    description: "Headless e-commerce platform with inventory management",
    progress: 0,
    status: "paused" as const,
    lastAgentActivity: "Project paused - awaiting requirements",
    tasksCompleted: 0,
    totalTasks: 15,
  },
  {
    id: "crm-system",
    name: "ClientHub CRM",
    description: "Customer relationship management system for small businesses",
    progress: 82,
    status: "active" as const,
    lastAgentActivity: "Debug Agent flagged potential security issue",
    tasksCompleted: 28,
    totalTasks: 34,
    activeSprint: "Sprint 4",
  },
];

type StatusFilter = "all" | "active" | "planning" | "completed" | "paused";
type SortOption = "recent" | "progress" | "name";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const filteredProjects = useMemo(() => {
    let projects = [...allProjects];

    // Filter by search
    if (searchQuery) {
      projects = projects.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      projects = projects.filter((p) => p.status === statusFilter);
    }

    // Sort
    switch (sortBy) {
      case "progress":
        projects.sort((a, b) => b.progress - a.progress);
        break;
      case "name":
        projects.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "recent":
      default:
        // Keep original order (mock "recent")
        break;
    }

    return projects;
  }, [searchQuery, statusFilter, sortBy]);

  const statusOptions: { value: StatusFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "planning", label: "Planning" },
    { value: "completed", label: "Completed" },
    { value: "paused", label: "Paused" },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "recent", label: "Recent" },
    { value: "progress", label: "Progress" },
    { value: "name", label: "Name" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-1">
              {allProjects.length} projects total
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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
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

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  statusFilter === option.value
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                Sort by: {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
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
                : "No projects with the selected filter"}
            </p>
            <Link
              to="/brain-dump"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Create Your First Project
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
