import { Target, GitBranch, ListTodo, Shield, Workflow } from "lucide-react";

export const agents = [
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