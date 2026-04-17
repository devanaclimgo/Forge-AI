import { FolderGit2, GitBranch, Clock, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

interface ProjectCardProps {
  id: string
  name: string
  description: string
  progress: number
  tasksCompleted: number
  totalTasks: number
  lastActivity: string
  techStack?: string[]
}

export function ProjectCard({
  id,
  name,
  description,
  progress,
  tasksCompleted,
  totalTasks,
  lastActivity,
  techStack = [],
}: ProjectCardProps) {
  return (
    <Link to={`/project?id=${id}`}>
      <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
        {/* Progress bar background */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <FolderGit2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </div>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <GitBranch className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">{tasksCompleted}</span>/{totalTasks} tarefas
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{lastActivity}</span>
          </div>
        </div>

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                +{techStack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Progress percentage */}
        <div className="mt-3 text-right">
          <span className="text-sm font-medium text-primary">{progress}%</span>
        </div>
      </div>
    </Link>
  )
}
