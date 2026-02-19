"use client"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { type LogEntry } from "@/lib/agents-data"
import { FileText } from "lucide-react"

function LogLevelBadge({ level }: { level: LogEntry["level"] }) {
  return (
    <span
      className={cn(
        "inline-flex w-12 items-center justify-center rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase",
        level === "info" && "bg-primary/15 text-primary",
        level === "warn" && "bg-warning/15 text-warning",
        level === "error" && "bg-destructive/15 text-destructive",
        level === "debug" && "bg-muted text-muted-foreground"
      )}
    >
      {level}
    </span>
  )
}

export function AgentLogs({ logs }: { logs: LogEntry[] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <FileText className="size-4 text-primary" />
        <h3 className="text-sm font-medium text-foreground">Logs</h3>
        <span className="ml-auto text-xs text-muted-foreground">
          {logs.length} entries
        </span>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col p-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 rounded px-3 py-2 hover:bg-secondary/50"
            >
              <span className="shrink-0 font-mono text-[11px] text-muted-foreground pt-0.5">
                {log.timestamp}
              </span>
              <LogLevelBadge level={log.level} />
              <p className="flex-1 font-mono text-xs leading-relaxed text-foreground/80">
                {log.message}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
