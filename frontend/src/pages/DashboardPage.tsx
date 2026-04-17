import { Sidebar } from "../../components/forge/sidebar"
import { Header } from "../../components/forge/header"
import { StatsCard } from "../../components/forge/stats-card"
import { ProjectCard } from "../../components/forge/project-card"
import { AgentCard } from "../../components/forge/agent-card"
import { ActivityFeed } from "../../components/forge/activity-feed"
import { 
  FolderGit2, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Plus,
  ArrowRight,
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"

const mockProjects = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "Sistema completo de loja virtual com pagamentos",
    progress: 68,
    tasksCompleted: 34,
    totalTasks: 50,
    lastActivity: "2h atras",
    techStack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
  },
  {
    id: "2",
    name: "Mobile App Backend",
    description: "API RESTful para aplicativo mobile",
    progress: 45,
    tasksCompleted: 18,
    totalTasks: 40,
    lastActivity: "5h atras",
    techStack: ["Node.js", "Express", "MongoDB", "Redis"],
  },
  {
    id: "3",
    name: "Analytics Dashboard",
    description: "Painel de metricas em tempo real",
    progress: 82,
    tasksCompleted: 41,
    totalTasks: 50,
    lastActivity: "1h atras",
    techStack: ["React", "D3.js", "WebSocket", "ClickHouse"],
  },
]

const mockActivities = [
  {
    id: "1",
    agent: "planner" as const,
    action: "Criou novo sprint para o projeto E-commerce",
    timestamp: "2 min",
    details: "Sprint 4: Integracao de Pagamentos",
  },
  {
    id: "2",
    agent: "task" as const,
    action: "Sugeriu 3 novas subtarefas para autenticacao",
    timestamp: "15 min",
  },
  {
    id: "3",
    agent: "debug" as const,
    action: "Identificou potencial memory leak",
    timestamp: "32 min",
    details: "useEffect cleanup ausente no componente Dashboard",
  },
  {
    id: "4",
    agent: "architect" as const,
    action: "Recomendou padroes de cache para API",
    timestamp: "1h",
  },
  {
    id: "5",
    agent: "progress" as const,
    action: "Relatorio semanal gerado",
    timestamp: "2h",
    details: "Produtividade aumentou 23% em relacao a semana anterior",
  },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 pl-2">
        <Header 
          title="Dashboard" 
          subtitle="Visao geral dos seus projetos e agentes IA" 
        />

        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Projetos Ativos"
              value={12}
              change="+2 este mes"
              changeType="positive"
              icon={FolderGit2}
              iconColor="text-primary"
              iconBg="bg-primary/10"
            />
            <StatsCard
              title="Tarefas Concluidas"
              value={248}
              change="+18% vs semana anterior"
              changeType="positive"
              icon={CheckCircle2}
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10"
            />
            <StatsCard
              title="Em Progresso"
              value={36}
              change="8 aguardando revisao"
              changeType="neutral"
              icon={Clock}
              iconColor="text-amber-400"
              iconBg="bg-amber-500/10"
            />
            <StatsCard
              title="Acoes de IA"
              value={1847}
              change="+324 esta semana"
              changeType="positive"
              icon={Sparkles}
              iconColor="text-violet-400"
              iconBg="bg-violet-500/10"
            />
          </div>

          {/* Main Content Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Projects Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Projetos Recentes</h2>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
                  <Link to="/project">
                    Ver todos
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-4 grid gap-4">
                {mockProjects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 flex gap-3">
                <Button className="flex-1 bg-primary/10 text-primary hover:bg-primary/20">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Projeto
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/brain-dump">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Brain Dump
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* AI Agents Quick View */}
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Agentes Ativos</h2>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
                    <Link to="/agents">
                      Ver todos
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-4 grid gap-2">
                  <AgentCard type="planner" status="active" compact />
                  <AgentCard type="task" status="thinking" compact />
                  <AgentCard type="debug" status="active" compact />
                </div>
              </div>

              {/* Activity Feed */}
              <div>
                <h2 className="text-lg font-semibold text-foreground">Atividade Recente</h2>
                <p className="text-sm text-muted-foreground">Decisoes e acoes dos agentes IA</p>
                <div className="mt-4 max-h-96 overflow-y-auto pr-2">
                  <ActivityFeed activities={mockActivities} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
