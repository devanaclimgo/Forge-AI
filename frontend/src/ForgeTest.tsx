import { useState, useRef, useEffect } from "react"

const AGENTS = [
  { id: "planner", label: "Planner", icon: "⬡", color: "#a78bfa", desc: "Breaks ideas into sprints & features" },
  { id: "architect", label: "Architect", icon: "⬡", color: "#38bdf8", desc: "Defines stack & system structure" },
  { id: "taskmanager", label: "Task Manager", icon: "⬡", color: "#34d399", desc: "Organizes & reprioritizes backlog" },
  { id: "debug", label: "Debug / QA", icon: "⬡", color: "#fb923c", desc: "Analyzes bugs & suggests fixes" },
]

type Message = {
  id: string
  agent: string
  input: string
  output: string
  confidence?: number
  ms?: number
  timestamp: Date
}

export default function ForgeTest() {
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0])
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [streamedText, setStreamedText] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  // Scroll output to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [messages, streamedText])

  const handleSubmit = async () => {
    if (!input.trim() || loading) return

    const currentInput = input.trim()
    setInput("")
    setLoading(true)
    setStreamedText("")

    try {
      const res = await fetch("/api/v1/agent_test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({
          agent: selectedAgent.id,
          prompt: currentInput,
        }),
      })

      const data = await res.json()

      // Simulate streaming effect on received text
      const fullText = data.result || data.error || "No response"
      let i = 0
      const interval = setInterval(() => {
        i += 6
        setStreamedText(fullText.slice(0, i))
        if (i >= fullText.length) {
          clearInterval(interval)
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              agent: selectedAgent.label,
              input: currentInput,
              output: fullText,
              confidence: data.confidence,
              ms: data.planning_ms,
              timestamp: new Date(),
            },
          ])
          setStreamedText("")
          setLoading(false)
        }
      }, 16)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          agent: selectedAgent.label,
          input: currentInput,
          output: "Connection error. Is the Rails server running?",
          timestamp: new Date(),
        },
      ])
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F14] text-white font-mono flex flex-col">
      {/* Header */}
      <header className="border-b border-[#1F2937] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
            <span className="text-violet-400 text-xs">⬡</span>
          </div>
          <span className="text-sm text-white/70 tracking-widest uppercase">Forge</span>
          <span className="text-[#1F2937]">/</span>
          <span className="text-sm text-white/30">agent playground</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-white/30">stratus x1 connected</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — agent selector */}
        <aside className="w-56 border-r border-[#1F2937] p-4 flex flex-col gap-1 shrink-0">
          <p className="text-[10px] text-white/20 uppercase tracking-widest mb-3 px-2">Agents</p>
          {AGENTS.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                selectedAgent.id === agent.id
                  ? "bg-[#111827] border border-[#1F2937]"
                  : "hover:bg-[#111827]/50 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="text-xs transition-all"
                  style={{ color: selectedAgent.id === agent.id ? agent.color : "rgba(255,255,255,0.2)" }}
                >
                  ⬡
                </span>
                <span
                  className={`text-sm transition-colors ${
                    selectedAgent.id === agent.id ? "text-white" : "text-white/40"
                  }`}
                >
                  {agent.label}
                </span>
              </div>
              <p className="text-[10px] text-white/20 pl-4 leading-tight">{agent.desc}</p>
            </button>
          ))}
        </aside>

        {/* Main area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Output area */}
          <div ref={outputRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {messages.length === 0 && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
                <div
                  className="w-12 h-12 rounded-xl border flex items-center justify-center mb-2"
                  style={{
                    borderColor: `${selectedAgent.color}30`,
                    backgroundColor: `${selectedAgent.color}10`,
                  }}
                >
                  <span style={{ color: selectedAgent.color }} className="text-xl">
                    ⬡
                  </span>
                </div>
                <p className="text-white/50 text-sm">{selectedAgent.label} Agent</p>
                <p className="text-white/20 text-xs max-w-xs">{selectedAgent.desc}</p>
                <p className="text-white/10 text-xs mt-4">⌘ + Enter to submit</p>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className="flex flex-col gap-3">
                {/* User input */}
                <div className="flex justify-end">
                  <div className="max-w-lg bg-[#111827] border border-[#1F2937] rounded-xl px-4 py-3">
                    <p className="text-white/70 text-sm leading-relaxed">{msg.input}</p>
                  </div>
                </div>

                {/* Agent output */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-medium"
                      style={{ color: AGENTS.find((a) => a.label === msg.agent)?.color }}
                    >
                      ⬡ {msg.agent}
                    </span>
                    {msg.confidence !== undefined && (
                      <span className="text-[10px] text-white/20">
                        confidence {(msg.confidence * 100).toFixed(1)}%
                      </span>
                    )}
                    {msg.ms !== undefined && (
                      <span className="text-[10px] text-white/20">{msg.ms.toFixed(0)}ms planning</span>
                    )}
                    <span className="text-[10px] text-white/10 ml-auto">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="bg-[#0F172A] border border-[#1F2937] rounded-xl px-5 py-4">
                    <pre className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                      {msg.output}
                    </pre>
                  </div>
                </div>
              </div>
            ))}

            {/* Streaming output */}
            {loading && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium" style={{ color: selectedAgent.color }}>
                    ⬡ {selectedAgent.label}
                  </span>
                  <span className="text-[10px] text-white/20 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-white/20 animate-bounce [animation-delay:0ms]" />
                    <span className="inline-block w-1 h-1 rounded-full bg-white/20 animate-bounce [animation-delay:150ms]" />
                    <span className="inline-block w-1 h-1 rounded-full bg-white/20 animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
                <div className="bg-[#0F172A] border border-[#1F2937] rounded-xl px-5 py-4">
                  <pre className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                    {streamedText}
                    <span className="inline-block w-0.5 h-4 bg-violet-400 animate-pulse ml-0.5 align-middle" />
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="border-t border-[#1F2937] p-4">
            <div className="flex gap-3 items-end bg-[#111827] border border-[#1F2937] rounded-xl px-4 py-3 focus-within:border-[#374151] transition-colors">
              <span className="text-xs mb-1 shrink-0" style={{ color: selectedAgent.color }}>
                ⬡
              </span>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask the ${selectedAgent.label} agent...`}
                rows={1}
                disabled={loading}
                className="flex-1 bg-transparent text-white/80 text-sm placeholder-white/20 resize-none outline-none leading-relaxed max-h-40 disabled:opacity-50"
              />
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || loading}
                className="shrink-0 mb-0.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: `${selectedAgent.color}20`,
                  color: selectedAgent.color,
                  border: `1px solid ${selectedAgent.color}30`,
                }}
              >
                {loading ? "running..." : "run ⌘↵"}
              </button>
            </div>
            <p className="text-[10px] text-white/10 mt-2 px-1">
              routed to <span style={{ color: selectedAgent.color }}>{selectedAgent.label} Agent</span> via Stratus X1
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}