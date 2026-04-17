import { useState } from "react";
import { Sidebar } from "../../components/forge/sidebar";
import { Header } from "../../components/forge/header";
import { QuestionCard } from "../../components/forge/question-card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import {
  Search,
  Plus,
  Filter,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Users,
  Award,
} from "lucide-react";

const mockQuestions = [
  {
    id: "1",
    title:
      "Como implementar autenticacao JWT com refresh tokens no Next.js 14?",
    excerpt:
      "Estou tendo dificuldade em manter a sessao do usuario ativa sem pedir login novamente. Qual a melhor abordagem para implementar refresh tokens?",
    author: "Marina Silva",
    votes: 24,
    answers: 5,
    views: 342,
    tags: ["next.js", "auth", "jwt"],
    timestamp: "2h atras",
    hasAcceptedAnswer: true,
    aiImproved: true,
  },
  {
    id: "2",
    title: "Erro de hidratacao no React 18 com SSR - como resolver?",
    excerpt:
      "Meu componente esta gerando um erro de hidratacao porque o HTML do servidor nao bate com o do cliente. Ja tentei useEffect mas continua acontecendo.",
    author: "Pedro Costa",
    votes: 18,
    answers: 3,
    views: 189,
    tags: ["react", "ssr", "hydration"],
    timestamp: "4h atras",
    hasAcceptedAnswer: false,
    aiImproved: true,
  },
  {
    id: "3",
    title: "Melhor forma de estruturar projeto monorepo com Turborepo",
    excerpt:
      "Qual a estrutura de pastas recomendada para um monorepo com frontend Next.js, backend Node.js e pacotes compartilhados?",
    author: "Ana Santos",
    votes: 31,
    answers: 7,
    views: 456,
    tags: ["turborepo", "monorepo", "architecture"],
    timestamp: "1d atras",
    hasAcceptedAnswer: true,
  },
  {
    id: "4",
    title: "Performance de queries no Prisma com relacoes grandes",
    excerpt:
      "Minhas queries estao ficando muito lentas quando pego dados com muitas relacoes. Como otimizar sem perder a facilidade do Prisma?",
    author: "Lucas Mendes",
    votes: 12,
    answers: 2,
    views: 98,
    tags: ["prisma", "database", "performance"],
    timestamp: "6h atras",
    hasAcceptedAnswer: false,
  },
  {
    id: "5",
    title: "Estrategia de cache com Redis para API de alta carga",
    excerpt:
      "Preciso implementar cache para uma API que recebe milhares de requisicoes por minuto. Quais patterns usar com Redis?",
    author: "Julia Ferreira",
    votes: 45,
    answers: 8,
    views: 678,
    tags: ["redis", "cache", "api", "scalability"],
    timestamp: "2d atras",
    hasAcceptedAnswer: true,
    aiImproved: true,
  },
];

const techFilters = [
  { name: "Todos", count: 124 },
  { name: "Next.js", count: 45 },
  { name: "React", count: 38 },
  { name: "Node.js", count: 29 },
  { name: "TypeScript", count: 52 },
  { name: "Database", count: 21 },
];

const sortOptions = [
  { id: "trending", label: "Em alta", icon: TrendingUp },
  { id: "recent", label: "Recentes", icon: Clock },
  { id: "answered", label: "Respondidas", icon: CheckCircle2 },
  { id: "ai-improved", label: "Melhoradas por IA", icon: Sparkles },
];

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [activeSort, setActiveSort] = useState("trending");

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 pl-64">
        <Header
          title="Comunidade"
          subtitle="Perguntas e respostas da comunidade de desenvolvedores"
        />

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search & Actions */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar perguntas..."
                    className="bg-secondary/50 pl-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-1.5 h-4 w-4" />
                    Filtrar
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus className="mr-1.5 h-4 w-4" />
                    Nova Pergunta
                  </Button>
                </div>
              </div>

              {/* Sort Tabs */}
              <div className="mt-6 flex flex-wrap gap-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setActiveSort(option.id)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      activeSort === option.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    <option.icon className="h-4 w-4" />
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Questions List */}
              <div className="mt-6 space-y-4">
                {mockQuestions.map((question) => (
                  <QuestionCard key={question.id} {...question} />
                ))}
              </div>

              {/* Load More */}
              <div className="mt-6 text-center">
                <Button variant="outline">Carregar mais perguntas</Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tech Stack Filter */}
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-semibold text-foreground">
                  Filtrar por Tecnologia
                </h3>
                <div className="mt-4 space-y-2">
                  {techFilters.map((filter) => (
                    <button
                      key={filter.name}
                      onClick={() => setActiveFilter(filter.name)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                        activeFilter === filter.name
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      )}
                    >
                      <span>{filter.name}</span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                        {filter.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Community Agent */}
              <div className="rounded-xl border border-pink-500/30 bg-pink-500/10 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-pink-500/20 p-2">
                    <Users className="h-5 w-5 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Community Agent
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-xs text-muted-foreground">
                        Ativo
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Melhorando perguntas e respostas para maior clareza e
                  qualidade.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-lg bg-background/50 p-2">
                    <p className="text-lg font-bold text-foreground">156</p>
                    <p className="text-xs text-muted-foreground">
                      Perguntas melhoradas
                    </p>
                  </div>
                  <div className="rounded-lg bg-background/50 p-2">
                    <p className="text-lg font-bold text-foreground">89</p>
                    <p className="text-xs text-muted-foreground">
                      Respostas sugeridas
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Contributors */}
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-400" />
                  <h3 className="font-semibold text-foreground">
                    Top Contribuidores
                  </h3>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { name: "Marina Silva", score: 2450, rank: 1 },
                    { name: "Pedro Costa", score: 1890, rank: 2 },
                    { name: "Ana Santos", score: 1654, rank: 3 },
                    { name: "Lucas Mendes", score: 1420, rank: 4 },
                    { name: "Julia Ferreira", score: 1280, rank: 5 },
                  ].map((user) => (
                    <div key={user.name} className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                          user.rank === 1 && "bg-amber-500/20 text-amber-400",
                          user.rank === 2 && "bg-slate-400/20 text-slate-400",
                          user.rank === 3 && "bg-orange-500/20 text-orange-400",
                          user.rank > 3 && "bg-muted text-muted-foreground",
                        )}
                      >
                        {user.rank}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.score} pontos
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-semibold text-foreground">Estatisticas</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      <span>Total de Perguntas</span>
                    </div>
                    <span className="font-medium text-foreground">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Respondidas</span>
                    </div>
                    <span className="font-medium text-emerald-400">89%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4" />
                      <span>Melhoradas por IA</span>
                    </div>
                    <span className="font-medium text-primary">34%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
