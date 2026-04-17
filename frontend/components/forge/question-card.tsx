import { cn } from "../../lib/utils"
import { 
  MessageSquare, 
  ThumbsUp, 
  Eye, 
  CheckCircle2,
  Sparkles,
  Clock,
  User,
} from "lucide-react"

interface QuestionCardProps {
  id: string
  title: string
  excerpt: string
  author: string
  authorAvatar?: string
  votes: number
  answers: number
  views: number
  tags: string[]
  timestamp: string
  hasAcceptedAnswer?: boolean
  aiImproved?: boolean
  onClick?: () => void
}

export function QuestionCard({
  title,
  excerpt,
  author,
  votes,
  answers,
  views,
  tags,
  timestamp,
  hasAcceptedAnswer,
  aiImproved,
  onClick,
}: QuestionCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group cursor-pointer rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        hasAcceptedAnswer && "border-emerald-500/30 bg-emerald-500/5"
      )}
    >
      <div className="flex gap-4">
        {/* Stats Column */}
        <div className="hidden flex-col items-center gap-3 sm:flex">
          <div className={cn(
            "flex flex-col items-center rounded-lg px-3 py-2",
            votes > 0 ? "bg-primary/10" : "bg-secondary"
          )}>
            <span className={cn(
              "text-lg font-bold",
              votes > 0 ? "text-primary" : "text-muted-foreground"
            )}>
              {votes}
            </span>
            <span className="text-xs text-muted-foreground">votos</span>
          </div>
          <div className={cn(
            "flex flex-col items-center rounded-lg px-3 py-2",
            hasAcceptedAnswer ? "bg-emerald-500/10" : "bg-secondary"
          )}>
            <span className={cn(
              "text-lg font-bold",
              hasAcceptedAnswer ? "text-emerald-400" : answers > 0 ? "text-foreground" : "text-muted-foreground"
            )}>
              {answers}
            </span>
            <span className="text-xs text-muted-foreground">respostas</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            {hasAcceptedAnswer && (
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400" />
            )}
            {aiImproved && (
              <div className="flex-shrink-0 rounded-full bg-primary/20 p-1" title="Melhorado pela IA">
                <Sparkles className="h-3 w-3 text-primary" />
              </div>
            )}
          </div>

          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{excerpt}</p>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Meta */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {/* Mobile stats */}
              <div className="flex items-center gap-1 sm:hidden">
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>{votes}</span>
              </div>
              <div className="flex items-center gap-1 sm:hidden">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{answers}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                <span>{views} visualizacoes</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                  <User className="h-3 w-3 text-primary" />
                </div>
                <span className="text-muted-foreground">{author}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
