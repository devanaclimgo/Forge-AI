/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background:  "var(--background)",
        foreground:  "var(--foreground)",
        card:        "var(--card)",
        popover:     "var(--popover)",
        primary:     "var(--primary)",
        secondary:   "var(--secondary)",
        muted:       "var(--muted)",
        accent:      "var(--accent)",
        destructive: "var(--destructive)",
        border:      "var(--border)",
        input:       "var(--input)",
        ring:        "var(--ring)",
        success:     "var(--success)",
        warning:     "var(--warning)",
        agent:       "var(--agent)",
        sidebar:     "var(--sidebar)",
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      fontFamily: {
        sans: ["Geist", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
    },
  },
  plugins: [],
}