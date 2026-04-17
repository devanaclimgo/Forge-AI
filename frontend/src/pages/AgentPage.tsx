import { useState } from "react";
import { Sidebar } from "../../components/forge/sidebar";
import { Header } from "../../components/forge/header";
import {
  AgentCard,
} from "../../components/forge/agent-card";
import type { AgentType, AgentStatus } from "../../components/forge/agent-card";
import { DecisionHistory } from "../../components/forge/decision-history";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

import {
  Layers,
  GitBranch,
  ListTodo,
  Bug,
  TrendingUp,
  Users,
  Play,
  Pause,
  Activity,
  Zap,
} from "lucide-react";

interface Agent {
  type: AgentType;
  status: AgentStatus;
  lastAction: string;
  actionsToday: number;
  successRate: number;
}

const agents: Agent[] = [
  {
    type: "planner",
    status: "active",
    lastAction: "Criou estrutura do Sprint 5",
    actionsToday: 12,
    successRate: 98,
  },
  {
    type: "architect",
    status: "idle",
    lastAction: "Revisou arquitetura de microservices",
    actionsToday: 5,
    successRate: 95,
  },
  {
    type: "task",
    status: "thinking",
    lastAction: "Analisando dependencias entre tarefas",
    actionsToday: 28,
    successRate: 92,
  },
  {
    type: "debug",
    status: "active",
    lastAction: "Identificou memory leak no componente Dashboard",
    actionsToday: 8,
    successRate: 89,
  },
  {
    type: "progress",
    status: "active",
    lastAction: "Gerou relatorio semanal de produtividade",
    actionsToday: 3,
    successRate: 100,
  },
  {
    type: "community",
    status: "idle",
    lastAction: "Melhorou 5 respostas no forum",
    actionsToday: 15,
    successRate: 94,
  },
];

const agentIcons = {
  planner: Layers,
  architect: GitBranch,
  task: ListTodo,
  debug: Bug,
  progress: TrendingUp,
  community: Users,
};

const agentNames = {
  planner: "Planner Agent",
  architect: "Architect Agent",
  task: "Task Manager",
  debug: "Debug Agent",
  progress: "Progress Analyst",
  community: "Community Agent",
};

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>("planner");

  const currentAgent = agents.find((a) => a.type === selectedAgent)!;
  const Icon = agentIcons[selectedAgent];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="flex-1 pl-64">
        <Header
          title="Agentes IA"
          subtitle="Gerencie e monitore seus agentes inteligentes"
        />

        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard
              icon={Activity}
              label="Agentes Ativos"
              value="4/6"
              color="emerald"
            />
            <StatCard
              icon={Zap}
              label="Ações Hoje"
              value="71"
              color="primary"
            />
            <StatCard
              icon={TrendingUp}
              label="Taxa de Sucesso"
              value="94.5%"
              color="emerald"
            />
            <StatCard
              icon={ListTodo}
              label="Decisões Pendentes"
              value="3"
              color="amber"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Agents */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold">Todos os Agentes</h2>
              <p className="text-sm text-muted-foreground">
                Clique em um agente para ver detalhes
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {agents.map((agent) => (
                  <div
                    key={agent.type}
                    onClick={() => setSelectedAgent(agent.type)}
                    className={cn(
                      "cursor-pointer transition-all",
                      selectedAgent === agent.type && "scale-[1.02]",
                    )}
                  >
                    <AgentCard {...agent} />
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Panel */}
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/20 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold">{agentNames[selectedAgent]}</h3>
                  <span className="text-xs text-muted-foreground">
                    {currentAgent.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <MiniStat
                  label="Ações Hoje"
                  value={currentAgent.actionsToday}
                />
                <MiniStat
                  label="Sucesso"
                  value={`${currentAgent.successRate}%`}
                />
              </div>

              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1">
                  <Play className="mr-1 h-4 w-4" />
                  Acionar
                </Button>

                <Button size="sm" variant="outline" className="flex-1">
                  <Pause className="mr-1 h-4 w-4" />
                  Pausar
                </Button>
              </div>

              <DecisionHistory agent={selectedAgent} decisions={[]} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: any) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function MiniStat({ label, value }: any) {
  return (
    <div className="rounded-lg bg-background/50 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
