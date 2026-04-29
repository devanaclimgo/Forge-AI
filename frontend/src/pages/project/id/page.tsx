import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "../../../../components/forge/navigation";
import { TaskItem, type Task } from "../../../../components/forge/task-item";
import { AgentCard } from "../../../../components/forge/agent-card";
import { api, type Project, type Sprint } from "../../../../lib/api";
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
  Loader2,
  FileText,
  Trash2,
} from "lucide-react";
import { cn } from "../../../../lib/utils";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as Task["priority"],
    status: "todo" as Task["status"],
  });

  useEffect(() => {
    if (!id) return;
    Promise.all([api.getProject(id), api.getTasks(id), api.getSprints(id)])
      .then(([proj, taskList, sprintList]) => {
        setProject(proj);
        setTasks(
          taskList.map((t) => ({
            ...t,
            id: String(t.id),
            sprint_id: t.sprint_id ?? null,
          })),
        );
        setSprints(sprintList);
        const active = sprintList.find((s) => s.status === "active");
        if (active) setActiveSprint(active.id);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const sprintTasks = activeSprint
    ? tasks.filter((t) => t.sprint_id === activeSprint)
    : tasks.filter((t) => t.sprint_id != null);

  const backlogTasks = tasks.filter((t) => t.sprint_id == null);
  const done = tasks.filter((t) => t.status === "done").length;
  const progress =
    tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0;

  const handleStatusChange = async (
    taskId: string,
    newStatus: Task["status"],
  ) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );
    await api
      .updateTask(id!, taskId, { status: newStatus })
      .catch(console.error);
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim() || !id) return;
    try {
      const created = await api.createTask(id, newTask);
      setTasks((prev) => [...prev, { ...created, id: String(created.id) }]);
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
      });
      setShowAddTaskModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );

  if (!project)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Project not found.</p>
      </div>
    );

  const handleDeleteProject = async () => {
    try {
      await api.deleteProject(project.id);
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      alert("Failed to delete project.");
    }
  };

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
                {project.summary || project.description?.slice(0, 80) + "..."}
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
                {
                  view: "tasks" as ViewType,
                  icon: LayoutList,
                  label: "Task List",
                },
                {
                  view: "sprints" as ViewType,
                  icon: Calendar,
                  label: "Sprints",
                },
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
                    ? "bg-accent/20 text-accent"
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
                      <span>{sprint.name}</span>
                      <span className="font-mono text-xs">
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
                {showBacklog ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                Backlog
                <span className="ml-auto font-mono text-xs">
                  {backlogTasks.length}
                </span>
              </button>
              {showBacklog && (
                <div className="mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {backlogTasks.length === 0 ? (
                    <p className="px-3 text-xs text-muted-foreground">
                      No backlog tasks.
                    </p>
                  ) : (
                    backlogTasks.map((task) => (
                      <div
                        key={task.id}
                        className="px-3 py-2 rounded-md bg-secondary/50 border border-border"
                      >
                        <p className="text-sm text-foreground truncate">
                          {task.title}
                        </p>
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

            <div>
              <button
                onClick={() => setShowPromptModal(true)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors border border-border/50 mt-2"
              >
                <FileText className="w-3.5 h-3.5" />
                View original prompt
              </button>
              {showPromptModal && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
                  onClick={() => setShowPromptModal(false)}
                >
                  <div
                    className="relative w-full max-w-lg mx-4 rounded-lg border border-border bg-card p-6 shadow-xl max-h-[70vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-foreground">
                        Original Prompt
                      </h3>
                      <button
                        onClick={() => setShowPromptModal(false)}
                        className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="overflow-y-auto flex-1">
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
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
                        {[
                          {
                            icon: Download,
                            label: "Export tasks",
                            danger: false,
                            action: () => setShowMoreMenu(false),
                          },
                          {
                            icon: Archive,
                            label: "Archive project",
                            danger: false,
                            action: () => setShowMoreMenu(false),
                          },
                          {
                            icon: Copy,
                            label: "Duplicate sprint",
                            danger: false,
                            action: () => setShowMoreMenu(false),
                          },
                          {
                            icon: Trash2,
                            label: "Delete project",
                            danger: true,
                            action: () => {
                              setShowMoreMenu(false);
                              setShowDeleteModal(true);
                            },
                          },
                        ].map(({ icon: Icon, label, danger, action }) => (
                          <button
                            key={label}
                            onClick={action}
                            className={cn(
                              "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                              danger
                                ? "text-destructive hover:bg-destructive/10"
                                : "text-foreground hover:bg-secondary",
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

            {activeView === "tasks" && (
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
                    />
                  ))
                )}
              </div>
            )}

            {activeView === "sprints" && (
              <div className="space-y-6">
                {sprints.map((sprint) => (
                  <div
                    key={sprint.id}
                    className="rounded-lg border border-border bg-card p-5"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-foreground">
                          {sprint.name}
                        </h3>
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
                      <span className="font-mono text-sm text-muted-foreground">
                        {sprint.completed}/{sprint.tasks} tasks
                      </span>
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
                ))}
                {sprints.length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-8">
                    No sprints yet.
                  </p>
                )}
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

      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="relative w-full max-w-sm mx-4 rounded-lg border border-border bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Delete Project
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete{" "}
              <span className="text-foreground font-medium">
                "{project.name}"
              </span>
              ? This action cannot be undone.
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
                className="flex-1 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors"
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
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Add New Task
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Task title..."
                  autoFocus
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask((p) => ({ ...p, description: e.target.value }))
                  }
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
                    onChange={(e) =>
                      setNewTask((p) => ({
                        ...p,
                        priority: e.target.value as Task["priority"],
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                    onChange={(e) =>
                      setNewTask((p) => ({
                        ...p,
                        status: e.target.value as Task["status"],
                      }))
                    }
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
    </div>
  );
}
