/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "../../../components/forge/navigation";
import { TaskItem, type Task } from "../../../components/forge/task-item";
import { AgentCard } from "../../../components/forge/agent-card";
import type { Project } from "../../../types/project";
import type { Sprint } from "../../../types/sprint";
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
  Copy,
  FileText,
  Trash2,
  Pencil,
  Check,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { taskService } from "../../../services/task.service";
import { sprintService } from "../../../services/sprint.service";
import { projectService } from "../../../services/project.service";

const agentDefs = [
  {
    name: "Planner",
    role: "Feature Architect",
    description: "Structures features into sprints",
    status: "idle" as const,
    icon: <Target className="w-5 h-5" />,
  },
  {
    name: "Architect",
    role: "Technical Advisor",
    description: "Defines technical stack",
    status: "thinking" as const,
    icon: <GitBranch className="w-5 h-5" />,
  },
  {
    name: "Task Manager",
    role: "Priority Master",
    description: "Organizes backlog",
    status: "active" as const,
    icon: <ListTodo className="w-5 h-5" />,
  },
  {
    name: "Debug Agent",
    role: "Quality Guardian",
    description: "Catches issues early",
    status: "idle" as const,
    icon: <Shield className="w-5 h-5" />,
  },
  {
    name: "Analyst",
    role: "Progress Tracker",
    description: "Provides health reports",
    status: "idle" as const,
    icon: <Workflow className="w-5 h-5" />,
  },
];

type ViewType = "tasks" | "sprints";

interface SprintEditState {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
}

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<ViewType>("tasks");
  const [activeSprint, setActiveSprint] = useState<number | null>(null);
  const [showAgentPanel, setShowAgentPanel] = useState(true);
  const [showBacklog, setShowBacklog] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddSprintModal, setShowAddSprintModal] = useState(false);
  const [editingSprint, setEditingSprint] = useState<SprintEditState | null>(null);
  const [deletingSprint, setDeletingSprint] = useState<Sprint | null>(null);
  const [newSprint, setNewSprint] = useState({ name: "", start_date: "", end_date: "" });
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as Task["priority"],
    status: "todo" as Task["status"],
  });

  useEffect(() => {
    if (!id) return;

    const loadProject = async () => {
      try {
        const [proj, taskList, sprintList] = await Promise.all([
          projectService.getProject(id),
          taskService.getTasks(id),
          sprintService.getSprints(id),
        ]);

        setProject(proj);
        setSprints(sprintList);

        if (proj.summary && taskList.length === 0) {
          return false;
        }

        setTasks(
          taskList.map((t) => ({
            ...t,
            id: String(t.id),
            sprint_id: t.sprint_id ?? null,
          })),
        );
        const active = sprintList.find((s) => s.status === "active");
        if (active) setActiveSprint(active.id);
        return true;
      } catch {
        return true;
      }
    };

    let attempts = 0;
    const maxAttempts = 12;

    const poll = async () => {
      const done = await loadProject();
      attempts++;
      if (!done && attempts < maxAttempts) {
        setTimeout(poll, 5000);
      } else {
        setLoading(false);
      }
    };

    poll();
  }, [id]);

  const sprintTasks =
    activeSprint === null
      ? tasks
      : tasks.filter((t) => t.sprint_id === activeSprint);

  const backlogTasks = tasks.filter((t) => t.sprint_id == null);
  const done = tasks.filter((t) => t.status === "done").length;
  const progress = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0;

  const handleStatusChange = async (taskId: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );
    await taskService.updateTask(id!, taskId, { status: newStatus }).catch(console.error);
  };

  const handleEditTask = async (
    taskId: string,
    updates: Partial<Pick<Task, "title" | "description" | "priority" | "status">>,
  ) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
    );
    await taskService.updateTask(id!, taskId, updates).catch(console.error);
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim() || !id) return;
    try {
      const created = await taskService.createTask(id, newTask);
      setTasks((prev) => [...prev, { ...created, id: String(created.id) }]);
      setNewTask({ title: "", description: "", priority: "medium", status: "todo" });
      setShowAddTaskModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await projectService.deleteProject(project!.id);
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      alert("Failed to delete project.");
    }
  };

  const handleAddSprint = async () => {
    if (!newSprint.name.trim() || !id) return;
    try {
      const created = await sprintService.createSprint(id, newSprint);
      setSprints((prev) => [...prev, created]);
      setNewSprint({ name: "", start_date: "", end_date: "" });
      setShowAddSprintModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditSprint = async () => {
    if (!editingSprint || !id) return;
    try {
      const updated = await sprintService.updateSprint(id, String(editingSprint.id), {
        name: editingSprint.name,
        start_date: editingSprint.start_date,
        end_date: editingSprint.end_date,
      });
      setSprints((prev) => prev.map((s) => (s.id === editingSprint.id ? { ...s, ...updated } : s)));
      setEditingSprint(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteSprint = async () => {
    if (!deletingSprint || !id) return;
    try {
      await sprintService.deleteSprint(id, String(deletingSprint.id));
      setSprints((prev) => prev.filter((s) => s.id !== deletingSprint.id));
      if (activeSprint === deletingSprint.id) setActiveSprint(null);
      setDeletingSprint(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyPrompt = () => {
    if (!project?.description) return;
    navigator.clipboard.writeText(project.description).then(() => {
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 2000);
    });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-accent/20 flex items-center justify-center">
              <span className="text-accent text-xl">⬡</span>
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
          <div>
            <p className="text-foreground font-medium">Agents are working</p>
            <p className="text-sm text-muted-foreground mt-1">
              Structuring tasks and sprints for your project...
            </p>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent thinking-dot" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent thinking-dot" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent thinking-dot" />
          </div>
        </div>
      </div>
    );

  if (!project)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Project not found.</p>
      </div>
    );

  // TODO: add "last agent activity" info to project card and project page
  // TODO: add ability to click on agent in sidebar to show only tasks related to that agent
  // TODO: add ability to click on task to open a detail view with activity log and comments

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex h-[calc(100vh-64px)]">

        {/* Left Sidebar */}
        <aside className="w-64 border-r border-border bg-card p-4 hidden lg:block overflow-auto">
          <div className="space-y-6">
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">
                {project.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {project.summary || project.description || "No description."}
              </p>
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

            <div className="space-y-1">
              {[
                { view: "tasks" as ViewType, icon: LayoutList, label: "Task List" },
                { view: "sprints" as ViewType, icon: Calendar, label: "Sprints" },
              ].map(({ view, icon: Icon, label }) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    activeView === view
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
              <button
                onClick={() => setShowAgentPanel(!showAgentPanel)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  showAgentPanel
                    ? "bg-background20 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                )}
              >
                <Bot className="w-4 h-4" />
                Agent Panel
              </button>
            </div>

            {sprints.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Sprints
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveSprint(null)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                      activeSprint === null
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                    )}
                  >
                    <span>All Tasks</span>
                    <span className="font-mono text-xs">{tasks.length}</span>
                  </button>
                  {sprints.map((sprint) => (
                    <button
                      key={sprint.id}
                      onClick={() => setActiveSprint(sprint.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                        activeSprint === sprint.id
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                      )}
                    >
                      <span className="truncate">{sprint.name}</span>
                      <span className="font-mono text-xs shrink-0 ml-1">
                        {sprint.completed}/{sprint.tasks}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <button
                onClick={() => setShowBacklog(!showBacklog)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                {showBacklog ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                Backlog
                <span className="ml-auto font-mono text-xs">{backlogTasks.length}</span>
              </button>
              {showBacklog && (
                <div className="mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {backlogTasks.length === 0 ? (
                    <p className="px-3 text-xs text-muted-foreground">No backlog tasks.</p>
                  ) : (
                    backlogTasks.map((task) => (
                      <div key={task.id} className="px-3 py-2 rounded-md bg-secondary/50 border border-border">
                        <p className="text-sm text-foreground truncate">{task.title}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span
                            className={cn(
                              "text-xs font-mono",
                              task.priority === "high"
                                ? "text-warning"
                                : task.priority === "critical"
                                  ? "text-destructive"
                                  : "text-muted-foreground",
                            )}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {project.description && project.description.length > 100 && (
              <div>
                <button
                  onClick={() => setShowPromptModal(true)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors border border-border/50 mt-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  View original prompt
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">

          {/* Fixed Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {activeView === "tasks" ? "Task List" : "Sprint Overview"}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {activeView === "tasks"
                  ? `${done} of ${tasks.length} tasks completed`
                  : "Manage your sprint cycles"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {activeView === "sprints" && (
                <button
                  onClick={() => setShowAddSprintModal(true)}
                  className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <Plus className="w-4 h-4" />
                  New Sprint
                </button>
              )}
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
                    <div className="fixed inset-0 z-40" onClick={() => setShowMoreMenu(false)} />
                    <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-border bg-card shadow-lg z-50 py-1 animate-in fade-in zoom-in-95 duration-150">
                      {[
                        { icon: Download, label: "Export tasks", danger: false, action: () => setShowMoreMenu(false) },
                        { icon: Archive, label: "Archive project", danger: false, action: () => setShowMoreMenu(false) },
                        { icon: Copy, label: "Duplicate sprint", danger: false, action: () => setShowMoreMenu(false) },
                        {
                          icon: Trash2,
                          label: "Delete project",
                          danger: true,
                          action: () => { setShowMoreMenu(false); setShowDeleteModal(true); },
                        },
                      ].map(({ icon: Icon, label, danger, action }) => (
                        <button
                          key={label}
                          onClick={action}
                          className={cn(
                            "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                            danger ? "text-destructive hover:bg-destructive/10" : "text-foreground hover:bg-secondary",
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Task List View */}
          {activeView === "tasks" && (
            <div className="p-6">
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                {sprintTasks.length === 0 ? (
                  <p className="p-6 text-center text-muted-foreground text-sm">
                    No tasks in this sprint yet.
                  </p>
                ) : (
                  sprintTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      {...task}
                      onStatusChange={handleStatusChange}
                      onEdit={handleEditTask}
                    />
                  ))
                )}
              </div>
            </div>
          )}

          {/* Sprint Overview View */}
          {activeView === "sprints" && (
            <div className="p-6 space-y-4">
              {sprints.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm py-8">
                  No sprints yet. Click "New Sprint" to create one.
                </p>
              ) : (
                sprints.map((sprint) => (
                  <div
                    key={sprint.id}
                    className="rounded-lg border border-border bg-card p-5 group"
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
                                : "bg-muted text-muted-foreground",
                          )}
                        >
                          {sprint.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-muted-foreground">
                          {sprint.completed}/{sprint.tasks} tasks
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() =>
                              setEditingSprint({
                                id: sprint.id,
                                name: sprint.name,
                                start_date: (sprint as any).start_date ?? "",
                                end_date: (sprint as any).end_date ?? "",
                              })
                            }
                            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                            title="Edit sprint"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingSprint(sprint)}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            title="Delete sprint"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                        style={{
                          width: `${sprint.tasks > 0 ? (sprint.completed / sprint.tasks) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>

        {/* Agent Panel */}
        {showAgentPanel && (
          <aside className="w-80 border-l border-border bg-card p-4 overflow-auto hidden xl:block">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">AI Agents</h2>
              <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-xs font-medium">
                Live
              </span>
            </div>
            <div className="space-y-3">
              {agentDefs.map((agent, i) => (
                <AgentCard key={i} {...agent} showTrigger compact />
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* Original Prompt Modal */}
      {showPromptModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/80 backdrop-blur-sm"
          onClick={() => setShowPromptModal(false)}
        >
          <div
            className="relative w-full max-w-lg mx-4 rounded-lg border border-border bg-card p-6 shadow-xl max-h-[70vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Original Prompt</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyPrompt}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors",
                    promptCopied
                      ? "bg-success/20 text-success"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                  )}
                >
                  {promptCopied ? (
                    <><Check className="w-3.5 h-3.5" />Copied!</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" />Copy</>
                  )}
                </button>
                <button
                  onClick={() => setShowPromptModal(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Delete Project Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="relative w-full max-w-sm mx-4 rounded-lg border border-border bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">Delete Project</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete{" "}
              <span className="text-foreground font-medium">"{project.name}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProject}
                className="flex-1 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-destructive/90 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setShowAddTaskModal(false)}
        >
          <div
            className="relative w-full max-w-md mx-4 rounded-lg border border-border bg-card p-6 shadow-xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
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
                <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Task title..."
                  autoFocus
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Task description..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask((p) => ({ ...p, priority: e.target.value as Task["priority"] }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
                  <select
                    value={newTask.status}
                    onChange={(e) => setNewTask((p) => ({ ...p, status: e.target.value as Task["status"] }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                    : "bg-secondary text-muted-foreground cursor-not-allowed",
                )}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Sprint Modal */}
      {showAddSprintModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setShowAddSprintModal(false)}
        >
          <div
            className="relative w-full max-w-sm mx-4 rounded-lg border border-border bg-card p-6 shadow-xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddSprintModal(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-semibold text-foreground mb-4">New Sprint</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                <input
                  type="text"
                  value={newSprint.name}
                  onChange={(e) => setNewSprint((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Sprint 1"
                  autoFocus
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Start date</label>
                  <input
                    type="date"
                    value={newSprint.start_date}
                    onChange={(e) => setNewSprint((p) => ({ ...p, start_date: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">End date</label>
                  <input
                    type="date"
                    value={newSprint.end_date}
                    onChange={(e) => setNewSprint((p) => ({ ...p, end_date: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
              </div>
              <button
                onClick={handleAddSprint}
                disabled={!newSprint.name.trim()}
                className={cn(
                  "w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  newSprint.name.trim()
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-muted-foreground cursor-not-allowed",
                )}
              >
                Create Sprint
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Sprint Modal */}
      {editingSprint && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setEditingSprint(null)}
        >
          <div
            className="relative w-full max-w-sm mx-4 rounded-lg border border-border bg-card p-6 shadow-xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditingSprint(null)}
              className="absolute top-4 right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-semibold text-foreground mb-4">Edit Sprint</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                <input
                  type="text"
                  value={editingSprint.name}
                  onChange={(e) => setEditingSprint((p) => p && ({ ...p, name: e.target.value }))}
                  autoFocus
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Start date</label>
                  <input
                    type="date"
                    value={editingSprint.start_date}
                    onChange={(e) => setEditingSprint((p) => p && ({ ...p, start_date: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">End date</label>
                  <input
                    type="date"
                    value={editingSprint.end_date}
                    onChange={(e) => setEditingSprint((p) => p && ({ ...p, end_date: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setEditingSprint(null)}
                  className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSprint}
                  disabled={!editingSprint.name.trim()}
                  className={cn(
                    "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    editingSprint.name.trim()
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-muted-foreground cursor-not-allowed",
                  )}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Sprint Modal */}
      {deletingSprint && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={() => setDeletingSprint(null)}
        >
          <div
            className="relative w-full max-w-sm mx-4 rounded-lg border border-border bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">Delete Sprint</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete{" "}
              <span className="text-foreground font-medium">"{deletingSprint.name}"</span>?
              Tasks in this sprint will be moved to the backlog.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingSprint(null)}
                className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSprint}
                className="flex-1 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-destructive/90 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}