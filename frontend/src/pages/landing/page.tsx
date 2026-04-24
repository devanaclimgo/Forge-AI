import { Link } from "react-router-dom"
import { Logo } from "../../../components/forge/logo"
import { 
  Brain, 
  Workflow, 
  ListTodo, 
  Bot, 
  ArrowRight, 
  Zap,
  Target,
  GitBranch,
  Shield,
  CheckCircle2
} from "lucide-react"

const agents = [
  {
    name: "Planner",
    role: "Feature Architect",
    description: "Structures your features into organized sprints and milestones. Transforms chaos into clear roadmaps.",
    icon: Target
  },
  {
    name: "Architect",
    role: "Technical Advisor",
    description: "Defines your technical stack and makes architectural decisions. Ensures scalability from day one.",
    icon: GitBranch
  },
  {
    name: "Task Manager",
    role: "Priority Master",
    description: "Organizes and reprioritizes your backlog continuously. Keeps your focus on what matters.",
    icon: ListTodo
  },
  {
    name: "Debug Agent",
    role: "Quality Guardian",
    description: "Analyzes bugs and generates comprehensive checklists. Catches issues before they escalate.",
    icon: Shield
  },
  {
    name: "Analyst",
    role: "Progress Tracker",
    description: "Reads task data and provides health reports. Gives you clarity on project status anytime.",
    icon: Workflow
  }
]

const features = [
  {
    title: "Brain Dump",
    description: "Write freely without structure. Our agents extract meaning from your stream of consciousness.",
    icon: Brain
  },
  {
    title: "AI Sprint Planning",
    description: "Agents automatically create sprints, set priorities, and define milestones based on your input.",
    icon: Workflow
  },
  {
    title: "Smart Task Management",
    description: "Tasks that evolve. Agents reprioritize, add context, and break down complex work automatically.",
    icon: ListTodo
  }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </Link>
            <Link to="#agents" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Agents
            </Link>
            <Link to="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start Building
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 mb-6">
            <Bot className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Multi-Agent Development Platform</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance max-w-4xl mx-auto">
            Stop planning.
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Start building.
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Dump your raw ideas, let our AI agents structure everything. Tasks, sprints, and priorities emerge automatically — so you can focus on what you do best: building.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:gap-3"
            >
              Try for Free
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="#how-it-works"
              className="flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">From chaos to clarity in 3 steps</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              No complex setup. No learning curve. Just start writing.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Dump",
                description: "Write your ideas freely. Stream of consciousness, no structure needed. Just get it out of your head.",
                color: "primary"
              },
              {
                step: "02",
                title: "Plan",
                description: "Our agents analyze, structure, and transform your input into organized features, tasks, and sprints.",
                color: "accent"
              },
              {
                step: "03",
                title: "Build",
                description: "Start executing with a clear roadmap. Agents continuously adapt and reprioritize as you progress.",
                color: "success"
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="rounded-xl border border-border bg-card p-8 transition-all duration-200 hover:border-primary/30 hover:scale-[1.02]">
                  <span className={`font-mono text-sm text-${item.color}`}>{item.step}</span>
                  <h3 className="text-2xl font-bold mt-2 mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="py-20 md:py-32 bg-card/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 mb-4">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent">Powered by Multi-Agent AI</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your AI development team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Specialized agents that think like a senior team. Each one focuses on what they do best.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {agents.map((agent, index) => (
              <div
                key={index}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-accent/50 hover:scale-[1.01]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                    <agent.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{agent.name}</h3>
                    <p className="text-sm text-accent font-mono">{agent.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {agent.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to ship</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built for developers who want structure without bureaucracy.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
              Ready to transform how you build?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Join developers who ship faster with AI-powered project management.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="group flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:gap-3"
              >
                Start Building for Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-success" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Free tier available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo size="sm" href="/" />
            <p className="text-sm text-muted-foreground">
              © 2026 Forge AI. Built for developers who ship.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
