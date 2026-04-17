import { Config } from "tailwindcss/types/config";

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],

  theme: {
    extend: {
      colors: {
        background: "oklch(0.08 0.01 280)",
        foreground: "oklch(0.95 0 0)",

        card: "oklch(0.12 0.015 280)",
        border: "oklch(0.22 0.02 280)",
        input: "oklch(0.15 0.015 280)",

        primary: {
          DEFAULT: "oklch(0.65 0.2 280)",
          foreground: "oklch(0.98 0 0)",
        },

        secondary: {
          DEFAULT: "oklch(0.18 0.02 280)",
          foreground: "oklch(0. 9 0 0)",
        },

        muted: {
          DEFAULT: "oklch(0.16 0.015 280)",
          foreground: "oklch(0.6 0 0)",
        },

        accent: {
          DEFAULT: "oklch(0.55 0.2 260)",
          foreground: "oklch(0.98 0 0)",
        },

        destructive: {
          DEFAULT: "oklch(0.55 0.22 25)",
          foreground: "oklch(0.98 0 0)",
        },

        /* 🔥 AGENTS */
        agent: {
          planner: "oklch(0.65 0.2 280)",
          architect: "oklch(0.65 0.2 220)",
          task: "oklch(0.7 0.18 145)",
          debug: "oklch(0.65 0.22 25)",
          progress: "oklch(0.75 0.18 85)",
          community: "oklch(0.6 0.18 320)",
        },
      },

      borderRadius: {
        xl: "0.75rem",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.3)",
      },

      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },

      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },

  plugins: [],
} satisfies Config