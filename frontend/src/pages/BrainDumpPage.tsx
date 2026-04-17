import { useState } from "react";
import { Sidebar } from "../../components/forge/sidebar";
import { Header } from "../../components/forge/header";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import {
  Sparkles,
  Loader2,
  ChevronRight,
  Plus,
  CheckCircle2,
  Clock,
  Tag,
  FolderKanban,
  ArrowRight,
  Lightbulb,
  Wand2,
} from "lucide-react";

interface GeneratedTask {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  estimatedTime: string;
  tags: string[];
  sprint?: string;
}

const exampleTasks: GeneratedTask[] = [
  {
    id: "1",
    title: "Configurar autenticacao JWT",
    description:
      "Implementar sistema de tokens com refresh token e gerenciamento de sessao",
    priority: "high",
    estimatedTime: "4h",
    tags: ["backend", "auth", "security"],
    sprint: "Sprint 1",
  },
  {
    id: "2",
    title: "Criar pagina de login",
    description:
      "Desenvolver UI responsiva com formulario de email/senha e opcoes OAuth",
    priority: "high",
    estimatedTime: "3h",
    tags: ["frontend", "ui", "auth"],
    sprint: "Sprint 1",
  },
  {
    id: "3",
    title: "Implementar middleware de protecao",
    description:
      "Criar middleware para verificar autenticacao em rotas protegidas",
    priority: "medium",
    estimatedTime: "2h",
    tags: ["backend", "middleware"],
    sprint: "Sprint 1",
  },
  {
    id: "4",
    title: "Setup de banco de dados para usuarios",
    description:
      "Criar schema e migrations para tabela de usuarios com campos necessarios",
    priority: "urgent",
    estimatedTime: "1h",
    tags: ["database", "setup"],
    sprint: "Sprint 1",
  },
  {
    id: "5",
    title: "Testes de integracao para auth",
    description:
      "Escrever testes cobrindo fluxos de login, logout e refresh token",
    priority: "low",
    estimatedTime: "3h",
    tags: ["testing", "qa"],
    sprint: "Sprint 2",
  },
];

const priorityConfig = {
  low: { color: "bg-muted text-muted-foreground", label: "Baixa" },
  medium: { color: "bg-blue-500/20 text-blue-400", label: "Media" },
  high: { color: "bg-amber-500/20 text-amber-400", label: "Alta" },
  urgent: { color: "bg-red-500/20 text-red-400", label: "Urgente" },
};

export default function BrainDumpPage() {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const handleProcess = () => {
    if (!input.trim()) return;
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 2000);
  };

  const toggleTask = (id: string) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const selectAll = () => {
    setSelectedTasks(exampleTasks.map((t) => t.id));
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 pl-64">
        <Header
          title="Brain Dump"
          subtitle="Transforme ideias desorganizadas em tarefas estruturadas"
        />

        <div className="p-6">
          <div className="mx-auto max-w-4xl">
            {/* Input Section */}
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/20 p-3">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Despeje suas ideias
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Escreva tudo o que esta na sua cabeca. A IA vai organizar em
                    tarefas.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Exemplo: Preciso fazer login com Google e GitHub, criar uma pagina bonita pro usuario entrar, proteger as rotas que precisam de autenticacao, nao esquece do banco de dados pra guardar os usuarios, e depois testar tudo isso..."
                  className="min-h-[200px] w-full resize-none rounded-xl border border-border bg-background p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Quick suggestions */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground">
                  Sugestoes:
                </span>
                {[
                  "Sistema de pagamentos",
                  "Dashboard admin",
                  "Notificacoes push",
                  "API REST",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() =>
                      setInput((prev) => prev + (prev ? " " : "") + suggestion)
                    }
                    className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {input.length} caracteres
                </p>
                <Button
                  onClick={handleProcess}
                  disabled={!input.trim() || isProcessing}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Transformar em Tarefas
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Processing Animation */}
            {isProcessing && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-6 py-3">
                  <div className="relative">
                    <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">
                      Planner Agent analisando...
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Identificando tarefas e dependencias
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Results Section */}
            {showResults && !isProcessing && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Tarefas Geradas
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {exampleTasks.length} tarefas identificadas •{" "}
                      {selectedTasks.length} selecionadas
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={selectAll}>
                      Selecionar Todas
                    </Button>
                    <Button
                      size="sm"
                      disabled={selectedTasks.length === 0}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Plus className="mr-1.5 h-4 w-4" />
                      Adicionar ao Projeto
                    </Button>
                  </div>
                </div>

                {/* Sprint Groups */}
                <div className="mt-6 space-y-6">
                  {["Sprint 1", "Sprint 2"].map((sprint) => {
                    const sprintTasks = exampleTasks.filter(
                      (t) => t.sprint === sprint,
                    );
                    if (sprintTasks.length === 0) return null;

                    return (
                      <div key={sprint}>
                        <div className="flex items-center gap-2 text-sm">
                          <FolderKanban className="h-4 w-4 text-primary" />
                          <span className="font-medium text-foreground">
                            {sprint}
                          </span>
                          <span className="text-muted-foreground">
                            ({sprintTasks.length} tarefas)
                          </span>
                        </div>

                        <div className="mt-3 space-y-2">
                          {sprintTasks.map((task) => {
                            const isSelected = selectedTasks.includes(task.id);
                            const priority = priorityConfig[task.priority];

                            return (
                              <div
                                key={task.id}
                                onClick={() => toggleTask(task.id)}
                                className={cn(
                                  "group cursor-pointer rounded-xl border p-4 transition-all duration-200",
                                  isSelected
                                    ? "border-primary/50 bg-primary/10"
                                    : "border-border bg-card hover:border-primary/30",
                                )}
                              >
                                <div className="flex items-start gap-3">
                                  {/* Checkbox */}
                                  <div
                                    className={cn(
                                      "mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors",
                                      isSelected
                                        ? "border-primary bg-primary"
                                        : "border-muted-foreground",
                                    )}
                                  >
                                    {isSelected && (
                                      <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                                    )}
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium text-foreground">
                                        {task.title}
                                      </h4>
                                      <span
                                        className={cn(
                                          "rounded-full px-2 py-0.5 text-xs font-medium",
                                          priority.color,
                                        )}
                                      >
                                        {priority.label}
                                      </span>
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                      {task.description}
                                    </p>

                                    <div className="mt-3 flex items-center gap-3">
                                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        <span>{task.estimatedTime}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Tag className="h-3 w-3 text-muted-foreground" />
                                        {task.tags.map((tag) => (
                                          <span
                                            key={tag}
                                            className="rounded-md bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground"
                                          >
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Arrow */}
                                  <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* AI Insight */}
                <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-blue-500/20 p-2">
                      <Sparkles className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Insight do Planner Agent
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Detectei que a tarefa de banco de dados deve ser
                        priorizada pois e dependencia para autenticacao.
                        Recomendo iniciar pelo setup do banco antes das outras
                        tarefas de auth.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowResults(false)}
                    >
                      Refazer Analise
                    </Button>
                    <Button variant="ghost" size="sm">
                      Exportar JSON
                    </Button>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Criar Projeto com Tarefas
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!showResults && !isProcessing && (
              <div className="mt-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                  <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-foreground">
                  Comece digitando suas ideias
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  O Planner Agent vai analisar seu texto e criar tarefas
                  organizadas automaticamente
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
