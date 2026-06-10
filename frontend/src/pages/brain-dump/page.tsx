import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Logo } from "../../components/forge/logo";

import { LogOut } from "lucide-react";

import {
  Target,
  GitBranch,
  ListTodo,
  Shield,
  Workflow,
} from "lucide-react";

import { BrainDumpForm } from "../../components/brain-dump/BrainDumpForm";
import { ProcessingAgents } from "../../components/brain-dump/ProcessingAgents";
import { ProjectCreated } from "../../components/brain-dump/ProjectCreated";

import { useBrainDump } from "../../hooks/useBrainDump";

const agents = [
  {
    name: "Planner",
    icon: Target,
    message: "Structuring features...",
  },
  {
    name: "Architect",
    icon: GitBranch,
    message: "Defining technical stack...",
  },
  {
    name: "Task Manager",
    icon: ListTodo,
    message: "Organizing backlog...",
  },
  {
    name: "Debug Agent",
    icon: Shield,
    message: "Setting up quality checks...",
  },
  {
    name: "Analyst",
    icon: Workflow,
    message: "Analyzing scope...",
  },
];

export default function BrainDumpPage() {
  const navigate = useNavigate();

  const {
    createFromContent,
    createdProject,
  } = useBrainDump();

  const [content, setContent] =
    useState("");

  const [showResult, setShowResult] =
    useState(false);

  const [currentAgentIndex, setCurrentAgentIndex] =
    useState(0);

  const [processedAgents, setProcessedAgents] =
    useState<number[]>([]);

  const handleSubmit = async () => {
    let index = 0;

    const interval = setInterval(() => {
      setProcessedAgents((prev) => [
        ...prev,
        index,
      ]);

      index++;

      setCurrentAgentIndex(index);

      if (index >= agents.length) {
        clearInterval(interval);
      }
    }, 1200);

    await createFromContent(content);

    setTimeout(() => {
      setShowResult(true);
    }, agents.length * 1200);
  };

  if (showResult && createdProject) {
    return (
      <ProjectCreated
        project={createdProject}
        agents={agents}
        onViewProject={() =>
          navigate(
            `/project/${createdProject.id}`,
          )
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Logo href="/dashboard" />

          <button
            onClick={() =>
              navigate("/dashboard")
            }
          >
            <LogOut className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {createdProject ? (
            <ProjectCreated
              project={createdProject}
              agents={agents}
              onViewProject={() =>
                navigate(
                  `/project/${createdProject.id}`,
                )
              }
            />
          ) : processedAgents.length > 0 ? (
            <ProcessingAgents
              agents={agents}
              currentAgentIndex={
                currentAgentIndex
              }
              processedAgents={
                processedAgents
              }
            />
          ) : (
            <BrainDumpForm
              content={content}
              setContent={setContent}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}