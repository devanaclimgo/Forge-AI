import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        card: {
          DEFAULT: 'rgb(var(--card))',
          foreground: 'rgb(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          foreground: 'rgb(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary))',
          foreground: 'rgb(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'rgb(var(--muted))',
          foreground: 'rgb(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent))',
          foreground: 'rgb(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'rgb(var(--destructive))',
          foreground: 'rgb(var(--destructive-foreground))',
        },
        border: 'rgb(var(--border))',
        input: 'rgb(var(--input))',
        ring: 'rgb(var(--ring))',
        // Agent colors
        agent: {
          planner: 'rgb(var(--agent-planner))',
          architect: 'rgb(var(--agent-architect))',
          task: 'rgb(var(--agent-task))',
          debug: 'rgb(var(--agent-debug))',
          progress: 'rgb(var(--agent-progress))',
          community: 'rgb(var(--agent-community))',
        },
        // Charts
        chart: {
          '1': 'rgb(var(--chart-1))',
          '2': 'rgb(var(--chart-2))',
          '3': 'rgb(var(--chart-3))',
          '4': 'rgb(var(--chart-4))',
          '5': 'rgb(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'rgb(var(--sidebar))',
          foreground: 'rgb(var(--sidebar-foreground))',
          primary: 'rgb(var(--sidebar-primary))',
          'primary-foreground': 'rgb(var(--sidebar-primary-foreground))',
          accent: 'rgb(var(--sidebar-accent))',
          'accent-foreground': 'rgb(var(--sidebar-accent-foreground))',
          border: 'rgb(var(--sidebar-border))',
          ring: 'rgb(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'sans-serif'],
        mono: ['JetBrains Mono', 'Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config