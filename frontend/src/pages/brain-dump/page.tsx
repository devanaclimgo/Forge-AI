import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../../components/forge/logo";
import {
  Send,
  Target,
  GitBranch,
  ListTodo,
  Shield,
  Workflow,
  ArrowRight,
  CheckCircle2,
  LogOut,
} from "lucide-react";
import { api } from "../../../lib/api";

const agents = [
  { name: "Planner", icon: Target, message: "Structuring features..." },
  {
    name: "Architect",
    icon: GitBranch,
    message: "Defining technical stack...",
  },
  { name: "Task Manager", icon: ListTodo, message: "Organizing backlog..." },
  {
    name: "Debug Agent",
    icon: Shield,
    message: "Setting up quality checks...",
  },
  { name: "Analyst", icon: Workflow, message: "Analyzing scope..." },
];

export default function BrainDumpPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [processedAgents, setProcessedAgents] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState<string>("");

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;

  const handleSubmit = async () => {
    if (!content.trim() || isProcessing) return;

    setIsProcessing(true);
    setCurrentAgentIndex(0);
    setProcessedAgents([]);

    let index = 0;
    const interval = setInterval(() => {
      setProcessedAgents((prev) => [...prev, index]);
      index++;
      setCurrentAgentIndex(index);
      if (index >= agents.length) clearInterval(interval);
    }, 1200);

    try {
      const firstLine = content.split("\n")[0].trim();
      const name =
        firstLine.length > 50
          ? firstLine.slice(0, 50) + "..."
          : firstLine || "New Project";

      const project = await api.createProject({ name, description: content });

      setTimeout(
        () => {
          setShowResult(true);
          setCreatedProjectId(String(project.id));
        },
        agents.length * 1200 + 500,
      );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      clearInterval(interval);
      setIsProcessing(false);
      alert("Failed to create project. Is the server running?");
    }
  };

  const handleViewProject = () => {
    navigate(`/project/${createdProjectId}`);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Project Created!
            </h1>
            <p className="text-muted-foreground mt-2">
              Our agents have analyzed your idea and created a structured
              project.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Project: FinTrack AI</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Features identified
                </span>
                <span className="font-mono text-foreground">8</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tasks created</span>
                <span className="font-mono text-foreground">24</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Sprints planned</span>
                <span className="font-mono text-foreground">3</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Estimated duration
                </span>
                <span className="font-mono text-foreground">6 weeks</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {agents.map((agent, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card/50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/20 text-accent">
                  <agent.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {agent.name}
                  </p>
                  <p className="text-xs text-success font-mono">Completed</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleViewProject}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View Project
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Logo href="/dashboard" />
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
          >
            <LogOut className="w-5 h-5 rotate-180" />
          </button>
        </div>
        <span className="text-sm text-muted-foreground font-mono">
          {wordCount} words · {charCount} characters
        </span>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {isProcessing ? (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Agents are processing your idea
                </h1>
                <p className="text-muted-foreground">
                  Sit back while our AI team structures your project
                </p>
              </div>

              <div className="space-y-3">
                {agents.map((agent, index) => {
                  const isProcessed = processedAgents.includes(index);
                  const isCurrent = currentAgentIndex === index;

                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                        isProcessed
                          ? "border-success/50 bg-success/5"
                          : isCurrent
                            ? "border-accent/50 bg-accent/5 agent-glow"
                            : "border-border bg-card"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                          isProcessed
                            ? "bg-success/20 text-success"
                            : isCurrent
                              ? "bg-accent/20 text-accent"
                              : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {isProcessed ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <agent.icon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {agent.name}
                        </p>
                        <p
                          className={`text-sm font-mono ${
                            isProcessed
                              ? "text-success"
                              : isCurrent
                                ? "text-accent"
                                : "text-muted-foreground"
                          }`}
                        >
                          {isProcessed
                            ? "Completed"
                            : isCurrent
                              ? agent.message
                              : "Waiting..."}
                        </p>
                      </div>
                      {isCurrent && (
                        <span className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-accent thinking-dot" />
                          <span className="w-2 h-2 rounded-full bg-accent thinking-dot" />
                          <span className="w-2 h-2 rounded-full bg-accent thinking-dot" />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Brain Dump
                </h1>
                <p className="text-muted-foreground text-lg">
                  Write freely. Our agents will structure everything.
                </p>
              </div>

              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What are you trying to build? Don't organize — just write. Describe your idea, the problem you're solving, features you're imagining, technologies you're considering... Let it flow."
                  className="w-full h-[400px] rounded-xl border border-border bg-card p-6 text-lg text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all leading-relaxed"
                  autoFocus
                />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {wordCount > 0
                    ? "Keep going! The more context, the better the planning."
                    : "Start typing your idea..."}
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={!content.trim()}
                  className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed hover:gap-3"
                >
                  Send to Agents
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
