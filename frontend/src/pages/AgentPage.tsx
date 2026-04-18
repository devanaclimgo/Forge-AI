import { useState } from "react";
import { Sidebar } from "../../components/forge/sidebar";
import { Header } from "../../components/forge/header";
import { AgentCard } from "../../components/forge/agent-card";
import { DecisionHistory } from "../../components/forge/decision-history";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import type { AgentStatus, AgentType } from "../../components/forge/agent-card";
import {
  Layers,
  GitBranch,
  ListTodo,
  Bug,
  TrendingUp,
  Users,
  Play,
  Pause,
  RotateCcw,
  Settings2,
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

const mockDecisions = [
  {
    id: "1",
    timestamp: "Agora",
    action: "Criou novo sprint com 12 tarefas",
    reasoning:
      "Baseado na velocidade do time e prioridades do backlog, otimizei a distribuicao de tarefas",
    outcome: "success" as const,
    impact: "Sprint estimado para 2 semanas",
  },
  {
    id: "2",
    timestamp: "2h atras",
    action: "Reorganizou prioridades do backlog",
    reasoning: "Detectei dependencias criticas que exigiam reordenacao",
    outcome: "success" as const,
  },
  {
    id: "3",
    timestamp: "5h atras",
    action: "Sugeriu divisao de tarefa complexa",
    reasoning:
      "Tarefa original estimada em 8+ horas foi dividida em 3 subtarefas",
    outcome: "pending" as const,
  },
  {
    id: "4",
    timestamp: "1 dia atras",
    action: "Previu atraso no sprint anterior",
    reasoning: "Analise de velocidade indicou risco de nao conclusao",
    outcome: "success" as const,
    impact: "Alerta preventivo evitou atraso",
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
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 pl-64">
        <Header
          title="Agentes IA"
          subtitle="Gerencie e monitore seus agentes inteligentes"
        />

        <div className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-emerald-500/10 p-2">
                  <Activity className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Agentes Ativos
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">4/6</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Acoes Hoje
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">71</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-emerald-500/10 p-2">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Taxa de Sucesso
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">94.5%</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-amber-500/10 p-2">
                  <ListTodo className="h-4 w-4 text-amber-400" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Decisoes Pendentes
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">3</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Agents Grid */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-foreground">
                Todos os Agentes
              </h2>
              <p className="text-sm text-muted-foreground">
                Clique em um agente para ver detalhes
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {agents.map((agent) => (
                  <div
                    key={agent.type}
                    className={cn(
                      "cursor-pointer transition-all duration-200",
                      selectedAgent === agent.type && "scale-[1.02]",
                    )}
                    onClick={() => setSelectedAgent(agent.type)}
                  >
                    <AgentCard
                      type={agent.type}
                      status={agent.status}
                      lastAction={agent.lastAction}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Detail Panel */}
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/20 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {agentNames[selectedAgent]}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full",
                          currentAgent.status === "active" && "bg-emerald-500",
                          currentAgent.status === "idle" &&
                            "bg-muted-foreground",
                          currentAgent.status === "thinking" &&
                            "bg-amber-500 animate-pulse",
                        )}
                      />
                      <span className="text-xs text-muted-foreground capitalize">
                        {currentAgent.status === "thinking"
                          ? "Processando..."
                          : currentAgent.status === "active"
                            ? "Ativo"
                            : "Inativo"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agent Stats */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-background/50 p-3">
                  <p className="text-xs text-muted-foreground">Acoes Hoje</p>
                  <p className="mt-1 text-xl font-bold text-foreground">
                    {currentAgent.actionsToday}
                  </p>
                </div>
                <div className="rounded-lg bg-background/50 p-3">
                  <p className="text-xs text-muted-foreground">
                    Taxa de Sucesso
                  </p>
                  <p className="mt-1 text-xl font-bold text-emerald-400">
                    {currentAgent.successRate}%
                  </p>
                </div>
              </div>

              {/* Agent Controls */}
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-primary/20 text-primary hover:bg-primary/30"
                >
                  <Play className="mr-1.5 h-4 w-4" />
                  Acionar
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Pause className="mr-1.5 h-4 w-4" />
                  Pausar
                </Button>
              </div>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="ghost" className="flex-1">
                  <RotateCcw className="mr-1.5 h-4 w-4" />
                  Reiniciar
                </Button>
                <Button size="sm" variant="ghost" className="flex-1">
                  <Settings2 className="mr-1.5 h-4 w-4" />
                  Configurar
                </Button>
              </div>

              {/* Decision History */}
              <div className="mt-6">
                <DecisionHistory
                  agent={selectedAgent}
                  decisions={mockDecisions}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
