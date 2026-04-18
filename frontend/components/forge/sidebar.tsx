import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Brain,
  Sparkles,
  MessageSquare,
  Settings,
  ChevronRight,
  Zap,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Projetos", href: "/project", icon: FolderKanban },
  { name: "Agentes IA", href: "/agents", icon: Sparkles },
  { name: "Brain Dump", href: "/brain-dump", icon: Brain },
  { name: "Comunidade", href: "/community", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
          <Zap className="h-5 w-5 text-primary" />
        </div>
        <span className="text-lg font-semibold text-foreground">Forge AI</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              <span>{item.name}</span>
              {isActive && (
                <ChevronRight className="ml-auto h-4 w-4 text-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* AI Status */}
      <div className="border-t border-border p-4">
        <div className="rounded-lg bg-secondary/50 p-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-emerald-500 opacity-75" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              Sistema Ativo
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">6 agentes online</p>
        </div>
      </div>

      {/* Settings */}
      <div className="border-t border-border p-3">
        <Link
          to="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Settings className="h-5 w-5" />
          <span>Configuracoes</span>
        </Link>
      </div>
    </aside>
  );
}
