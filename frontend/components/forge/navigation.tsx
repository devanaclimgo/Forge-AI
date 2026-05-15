import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Logo } from "./logo";
import {
  LayoutDashboard,
  Bot,
  Settings,
  LogOut,
  FolderKanban,
  Plus,
  PenLine,
  X,
  Brain,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/agents", label: "Agents", icon: Bot },
];

export function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-[#0b0f14]80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Logo href="/dashboard" />
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-[#94a3b8] hover:text-foreground hover:bg-[#38bdf8]/50",
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Project
            </button>
            <Link
              to="/settings"
              className="p-2 rounded-md text-[#94a3b8] hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-md text-[#94a3b8] hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Create Project Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-md mx-4 rounded-xl border border-border bg-card p-6 shadow-xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-semibold text-foreground mb-1">
              Create Project
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              How do you want to start?
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/brain-dump");
                }}
                className="flex flex-col items-start gap-3 p-4 rounded-lg border border-border bg-background hover:border-accent/50 hover:bg-accent/5 transition-all duration-150 text-left group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    Brain Dump
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Write freely, AI structures everything for you
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/new-project");
                }}
                className="flex flex-col items-start gap-3 p-4 rounded-lg border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-all duration-150 text-left group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <PenLine className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    Manual Setup
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Set up yourself and add tasks to backlog
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
