import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import type { Project } from "../../types/project";

interface Agent {
  name: string;
  icon: React.ElementType;
}

interface ProjectCreatedProps {
  project: Project;
  agents: Agent[];
  onViewProject: () => void;
}

export function ProjectCreated({
  project,
  agents,
  onViewProject,
}: ProjectCreatedProps) {
  return (
    <div className="w-full max-w-2xl animate-in fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-4">
          <CheckCircle2 className="w-8 h-8 text-success" />
        </div>

        <h1 className="text-3xl font-bold text-foreground">
          Project Created!
        </h1>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {project.name}
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Tasks completed</span>
            <span>
              {project.tasks_completed}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Total tasks</span>
            <span>
              {project.total_tasks}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Progress</span>
            <span>
              {project.progress}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card"
          >
            <agent.icon className="w-4 h-4 text-accent" />

            <div>
              <p className="text-sm font-medium">
                {agent.name}
              </p>

              <p className="text-xs text-success">
                Completed
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onViewProject}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-primary-foreground"
      >
        View Project

        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}