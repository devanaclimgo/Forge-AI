import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],

  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background:
          "rgb(var(--background) / <alpha-value>)",

        foreground:
          "rgb(var(--foreground) / <alpha-value>)",

        card:
          "rgb(var(--card) / <alpha-value>)",

        "card-foreground":
          "rgb(var(--card-foreground) / <alpha-value>)",

        popover:
          "rgb(var(--popover) / <alpha-value>)",

        "popover-foreground":
          "rgb(var(--popover-foreground) / <alpha-value>)",

        primary:
          "rgb(var(--primary) / <alpha-value>)",

        "primary-foreground":
          "rgb(var(--primary-foreground) / <alpha-value>)",

        secondary:
          "rgb(var(--secondary) / <alpha-value>)",

        "secondary-foreground":
          "rgb(var(--secondary-foreground) / <alpha-value>)",

        muted:
          "rgb(var(--muted) / <alpha-value>)",

        "muted-foreground":
          "rgb(var(--muted-foreground) / <alpha-value>)",

        accent:
          "rgb(var(--accent) / <alpha-value>)",

        "accent-foreground":
          "rgb(var(--accent-foreground) / <alpha-value>)",

        destructive:
          "rgb(var(--destructive) / <alpha-value>)",

        "destructive-foreground":
          "rgb(var(--destructive-foreground) / <alpha-value>)",

        border:
          "rgb(var(--border) / <alpha-value>)",

        input:
          "rgb(var(--input) / <alpha-value>)",

        ring:
          "rgb(var(--ring) / <alpha-value>)",

        success:
          "rgb(var(--success) / <alpha-value>)",

        warning:
          "rgb(var(--warning) / <alpha-value>)",

        agent:
          "rgb(var(--agent) / <alpha-value>)",

        sidebar:
          "rgb(var(--sidebar) / <alpha-value>)",

        "sidebar-foreground":
          "rgb(var(--sidebar-foreground) / <alpha-value>)",

        "sidebar-primary":
          "rgb(var(--sidebar-primary) / <alpha-value>)",

        "sidebar-primary-foreground":
          "rgb(var(--sidebar-primary-foreground) / <alpha-value>)",

        "sidebar-accent":
          "rgb(var(--sidebar-accent) / <alpha-value>)",

        "sidebar-accent-foreground":
          "rgb(var(--sidebar-accent-foreground) / <alpha-value>)",

        "sidebar-border":
          "rgb(var(--sidebar-border) / <alpha-value>)",

        "sidebar-ring":
          "rgb(var(--sidebar-ring) / <alpha-value>)",
      },

      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },

      fontFamily: {
        sans: ["Geist", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },

      boxShadow: {
        glow:
          "0 0 20px rgb(var(--accent) / 0.35)",

        soft:
          "0 8px 30px rgb(0 0 0 / 0.12)",
      },

      animation: {
        glow: "pulse-glow 2s ease-in-out infinite",
      },
    },
  },

  plugins: [],
};

export default config;