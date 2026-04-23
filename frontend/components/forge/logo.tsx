import { Link } from "react-router-dom"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  href?: string
}

export function Logo({ size = "md", href = "/" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  }

  const content = (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 text-background"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
      </div>
      <span className={`font-bold ${sizeClasses[size]} tracking-tight`}>
        Forge<span className="text-accent">AI</span>
      </span>
    </div>
  )

  if (href) {
    return (
      <Link to={href} className="hover:opacity-80 transition-opacity">
        {content}
      </Link>
    )
  }

  return content
}
