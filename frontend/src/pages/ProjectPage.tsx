import { Sidebar } from "../../components/forge/sidebar";
import { Header } from "../../components/forge/header";
import { TaskCard } from "../../components/forge/task-card";
import { SprintCard } from "../../components/forge/sprint-cards";
import { AISuggestionsPanel } from "../../components/forge/ai-suggestions-panel";
import { ActivityFeed } from "../../components/forge/activity-feed";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Plus,
  Filter,
  LayoutGrid,
  List,
  GitBranch,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "../../lib/utils";

const mockTasks = [
  {
    id: "1",
    title: "Implementar autenticacao OAuth",
    description: "Adicionar login com Google e GitHub usando NextAuth.js",
    status: "in-progress" as const,
    priority: "high" as const,
    dueDate: "Amanha",
    tags: ["auth", "backend"],
  },
  {
    id: "2",
    title: "Criar componente de carrinho",
    description: "Desenvolver UI do carrinho de compras com estado global",
    status: "todo" as const,
    priority: "medium" as const,
    dueDate: "Em 3 dias",
    tags: ["frontend", "ui"],
    aiSuggested: true,
  },
  {
    id: "3",
    title: "Configurar webhooks do Stripe",
    description: "Implementar endpoints para receber eventos de pagamento",
    status: "todo" as const,
    priority: "urgent" as const,
    dueDate: "Hoje",
    tags: ["payments", "backend"],
  },
  {
    id: "4",
    title: "Otimizar queries do banco",
    description: "Adicionar indices e melhorar performance das consultas",
    status: "done" as const,
    priority: "high" as const,
    tags: ["database", "performance"],
  },
  {
    id: "5",
    title: "Testes unitarios para checkout",
    description: "Escrever testes para fluxo completo de checkout",
    status: "blocked" as const,
    priority: "medium" as const,
    tags: ["testing"],
    aiSuggested: true,
  },
];

const mockSprints = [
  {
    name: "Sprint 4",
    startDate: "01 Abr",
    endDate: "14 Abr",
    progress: 68,
    tasksTotal: 12,
    tasksDone: 8,
    isActive: true,
  },
  {
    name: "Sprint 3",
    startDate: "18 Mar",
    endDate: "31 Mar",
    progress: 100,
    tasksTotal: 15,
    tasksDone: 15,
  },
  {
    name: "Sprint 2",
    startDate: "04 Mar",
    endDate: "17 Mar",
    progress: 100,
    tasksTotal: 10,
    tasksDone: 10,
  },
];

const mockSuggestions = [
  {
    id: "1",
    type: "task" as const,
    title: "Adicionar rate limiting na API",
    description:
      "Baseado no trafego atual, recomendo implementar rate limiting para proteger os endpoints",
    agent: "Architect Agent",
  },
  {
    id: "2",
    type: "warning" as const,
    title: "Deadline proximo",
    description:
      "3 tarefas do sprint atual estao sem progresso nos ultimos 2 dias",
    agent: "Progress Analyst",
  },
  {
    id: "3",
    type: "insight" as const,
    title: "Padroes repetitivos detectados",
    description:
      "Encontrei codigo duplicado em 5 componentes que pode ser refatorado",
    agent: "Debug Agent",
  },
];

const mockActivities = [
  {
    id: "1",
    agent: "task" as const,
    action: "Tarefa movida para Em Progresso",
    timestamp: "5 min",
    details: "Implementar autenticacao OAuth",
  },
  {
    id: "2",
    agent: "planner" as const,
    action: "Nova subtarefa criada",
    timestamp: "20 min",
  },
  {
    id: "3",
    agent: "debug" as const,
    action: "Bug reportado e categorizado",
    timestamp: "1h",
  },
];

const statusTabs = [
  { value: "all", label: "Todas", count: 24 },
  { value: "todo", label: "A fazer", count: 8, icon: Clock },
  { value: "in-progress", label: "Em progresso", count: 6, icon: GitBranch },
  { value: "done", label: "Concluidas", count: 8, icon: CheckCircle2 },
  { value: "blocked", label: "Bloqueadas", count: 2, icon: AlertCircle },
];

export default function ProjectPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 pl-64">
        <Header
          title="E-commerce Platform"
          subtitle="Sistema completo de loja virtual com pagamentos"
        />

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
            {/* Main Content - Tasks */}
            <div className="xl:col-span-3">
              <Tabs defaultValue="all" className="w-full">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
                    {statusTabs.map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className={cn(
                          "rounded-lg border border-transparent px-3 py-1.5 text-sm data-[state=active]:border-primary/30 data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
                        )}
                      >
                        {tab.icon && (
                          <tab.icon className="mr-1.5 h-3.5 w-3.5" />
                        )}
                        {tab.label}
                        <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-xs">
                          {tab.count}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-1.5 h-4 w-4" />
                      Filtrar
                    </Button>
                    <div className="flex rounded-lg border border-border p-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <List className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 bg-secondary"
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Plus className="mr-1.5 h-4 w-4" />
                      Nova Tarefa
                    </Button>
                  </div>
                </div>

                {/* Tasks List */}
                <TabsContent value="all" className="mt-6">
                  <div className="space-y-3">
                    {mockTasks.map((task) => (
                      <TaskCard key={task.id} {...task} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="todo" className="mt-6">
                  <div className="space-y-3">
                    {mockTasks
                      .filter((t) => t.status === "todo")
                      .map((task) => (
                        <TaskCard key={task.id} {...task} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="in-progress" className="mt-6">
                  <div className="space-y-3">
                    {mockTasks
                      .filter((t) => t.status === "in-progress")
                      .map((task) => (
                        <TaskCard key={task.id} {...task} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="done" className="mt-6">
                  <div className="space-y-3">
                    {mockTasks
                      .filter((t) => t.status === "done")
                      .map((task) => (
                        <TaskCard key={task.id} {...task} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="blocked" className="mt-6">
                  <div className="space-y-3">
                    {mockTasks
                      .filter((t) => t.status === "blocked")
                      .map((task) => (
                        <TaskCard key={task.id} {...task} />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Sprints Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">
                    Sprints
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                  >
                    Ver historico
                  </Button>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {mockSprints.map((sprint) => (
                    <SprintCard key={sprint.name} {...sprint} />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Suggestions */}
              <AISuggestionsPanel suggestions={mockSuggestions} />

              {/* Activity */}
              <div>
                <h3 className="font-semibold text-foreground">
                  Atividade do Projeto
                </h3>
                <div className="mt-3">
                  <ActivityFeed activities={mockActivities} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
