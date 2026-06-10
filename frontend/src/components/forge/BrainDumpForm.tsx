import { Send } from "lucide-react";

interface BrainDumpFormProps {
  content: string;
  setContent: (value: string) => void;
  onSubmit: () => void;
}

export function BrainDumpForm({
  content,
  setContent,
  onSubmit,
}: BrainDumpFormProps) {
  const wordCount =
    content.trim().split(/\s+/).filter(Boolean)
      .length;

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Brain Dump
        </h1>

        <p className="text-muted-foreground text-lg">
          Write freely. Our agents will structure
          everything.
        </p>
      </div>

      <div className="relative">
        <textarea
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          placeholder="What are you trying to build? Don't organize — just write."
          className="w-full h-[400px] rounded-xl border border-border bg-card p-6 text-lg text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {wordCount > 0
            ? "Keep going! The more context, the better the planning."
            : "Start typing your idea..."}
        </p>

        <button
          onClick={onSubmit}
          disabled={!content.trim()}
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          Send to Agents
          <Send className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}