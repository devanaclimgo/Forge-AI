import { Navigation } from "../../../components/forge/navigation";
import { AgentCard } from "../../../components/forge/agent-card";
import {
  Target,
  GitBranch,
  ListTodo,
  Shield,
  Workflow,
  Activity,
  Zap,
  Clock,
} from "lucide-react";
// import { api } from "@/lib/api";
// import { useState } from "react";

const agents = [
  {
    name: "Planner",
    role: "Feature Architect",
    description:
      "Structures your features into organized sprints and milestones. Transforms chaos into clear roadmaps. Analyzes project scope and creates logical feature groupings.",
    status: "active" as const,
    lastAction:
      "Created Sprint 3 backlog for FinTrack AI with 7 prioritized tasks",
    timestamp: "2 hours ago",
    icon: <Target className="w-5 h-5" />,
  },
  {
    name: "Architect",
    role: "Technical Advisor",
    description:
      "Defines your technical stack and makes architectural decisions. Ensures scalability from day one. Recommends libraries, patterns, and best practices.",
    status: "thinking" as const,
    lastAction: "Analyzing chart library options for analytics dashboard",
    timestamp: "Just now",
    icon: <GitBranch className="w-5 h-5" />,
  },
  {
    name: "Task Manager",
    role: "Priority Master",
    description:
      "Organizes and reprioritizes your backlog continuously. Keeps your focus on what matters. Breaks down complex tasks and identifies dependencies.",
    status: "active" as const,
    lastAction:
      "Reprioritized expense tracking form subtasks based on blockers",
    timestamp: "5 min ago",
    icon: <ListTodo className="w-5 h-5" />,
  },
  {
    name: "Debug Agent",
    role: "Quality Guardian",
    description:
      "Analyzes bugs and generates comprehensive checklists. Catches issues before they escalate. Monitors task progress for potential problems.",
    status: "idle" as const,
    lastAction: "Flagged missing date-fns dependency for CSV export feature",
    timestamp: "30 min ago",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    name: "Analyst",
    role: "Progress Tracker",
    description:
      "Reads task data and provides health reports. Gives you clarity on project status anytime. Tracks velocity and predicts completion dates.",
    status: "idle" as const,
    lastAction: "Generated sprint velocity report showing 15% improvement",
    timestamp: "1 hour ago",
    icon: <Workflow className="w-5 h-5" />,
  },
];

const activityLog = [
  {
    agent: "Task Manager",
    action: "Reprioritized expense tracking subtasks",
    project: "FinTrack AI",
    timestamp: "5 min ago",
    type: "priority",
  },
  {
    agent: "Architect",
    action: "Started analyzing chart library options",
    project: "FinTrack AI",
    timestamp: "5 min ago",
    type: "analysis",
  },
  {
    agent: "Debug Agent",
    action: "Flagged missing dependency for CSV export",
    project: "FinTrack AI",
    timestamp: "30 min ago",
    type: "warning",
  },
  {
    agent: "Analyst",
    action: "Generated sprint velocity report",
    project: "FinTrack AI",
    timestamp: "1 hour ago",
    type: "report",
  },
  {
    agent: "Planner",
    action: "Created Sprint 3 backlog with 7 tasks",
    project: "FinTrack AI",
    timestamp: "2 hours ago",
    type: "planning",
  },
  {
    agent: "Task Manager",
    action: "Added 3 subtasks to authentication setup",
    project: "Dev Portfolio",
    timestamp: "3 hours ago",
    type: "task",
  },
  {
    agent: "Architect",
    action: "Recommended Next.js App Router architecture",
    project: "Dev Portfolio",
    timestamp: "4 hours ago",
    type: "architecture",
  },
  {
    agent: "Planner",
    action: "Completed initial feature breakdown",
    project: "API Dashboard",
    timestamp: "5 hours ago",
    type: "planning",
  },
];

export default function AgentsPage() {
  // const [triggerState, setTriggerState] = useState<
  //   Record<string, { loading: boolean; result: string }>
  // >({});

  // const handleTrigger = async (agentName: string) => {
  //   setTriggerState((prev) => ({
  //     ...prev,
  //     [agentName]: { loading: true, result: "" },
  //   }));
  //   try {
  //     const res = await api.runAgent(
  //       agentName.toLowerCase().replace(" ", ""),
  //       `Run a ${agentName} analysis`,
  //     );
  //     setTriggerState((prev) => ({
  //       ...prev,
  //       [agentName]: { loading: false, result: res.result },
  //     }));
  //   } catch (_) {
  //     setTriggerState((prev) => ({
  //       ...prev,
  //       [agentName]: { loading: false, result: "Agent failed to respond." },
  //     }));
  //   }
  // };

  const activeAgents = agents.filter(
    (a) => a.status === "active" || a.status === "thinking",
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">AI Agents</h1>
          <p className="text-muted-foreground mt-1">
            Your multi-agent development team working across all projects
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <Activity className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {activeAgents}
                </p>
                <p className="text-sm text-muted-foreground">
                  Currently Active
                </p>
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
                <p className="text-sm text-muted-foreground">Actions Today</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2.3s</p>
                <p className="text-sm text-muted-foreground">Avg. Response</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Agent Cards */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              All Agents
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {agents.map((agent, index) => (
                <AgentCard key={index} {...agent} showTrigger />
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Activity Log
            </h2>
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="divide-y divide-border">
                {activityLog.map((entry, index) => (
                  <div key={index} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-foreground leading-relaxed">
                          <span className="font-medium text-accent">
                            {entry.agent}
                          </span>{" "}
                          {entry.action}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="text-xs text-muted-foreground font-mono">
                            {entry.timestamp}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            •
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {entry.project}
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
  );
}
