import { useNavigate } from "react-router-dom";

import { Logo } from "../../components/forge/logo";
import { LogOut } from "lucide-react";

import { useBrainDump } from "../../hooks/useBrainDump";

import { BrainDumpForm } from "../../components/brain-dump/BrainDumpForm";
import { ProcessingAgents } from "../../components/brain-dump/ProcessingAgents";
import { ProjectCreated } from "../../components/brain-dump/ProjectCreated";

import { brainDumpAgents } from "../../constants/brainDumpAgents";

export default function BrainDumpPage() {
  const navigate = useNavigate();

  const {
    content,
    setContent,

    isProcessing,

    currentAgentIndex,
    processedAgents,

    showResult,

    createdProject,
    createdProjectId,

    handleSubmit,
  } = useBrainDump();

  const handleViewProject = () => {
    navigate(`/project/${createdProjectId}`);
  };

  if (showResult && createdProject) {
    return (
      <ProjectCreated
        project={createdProject}
        agents={brainDumpAgents}
        onViewProject={handleViewProject}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Logo href="/dashboard" />

          <button onClick={() => navigate("/dashboard")}>
            <LogOut className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {isProcessing ? (
            <ProcessingAgents
              agents={brainDumpAgents}
              currentAgentIndex={currentAgentIndex}
              processedAgents={processedAgents}
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
