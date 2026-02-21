"use client"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { type Agent } from "@/lib/agents-data"
import { Bot, Search } from "lucide-react"
import { useState } from "react"

function StatusDot({ status }: { status: Agent["status"] }) {
  return (
    <span
      className={cn(
        "size-2 rounded-full shrink-0",
        status === "running" && "bg-success animate-pulse",
        status === "idle" && "bg-muted-foreground",
        status === "error" && "bg-destructive",
        status === "paused" && "bg-warning"
      )}
    />
  )
}

export function AgentSidebar({
  agents,
  selectedId,
  onSelect,
}: {
  agents: Agent[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  const [search, setSearch] = useState("")

  const filtered = agents.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
          <Bot className="size-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-sidebar-foreground">Agent Orchestrator</h1>
          <p className="text-xs text-muted-foreground">5 agents</p>
        </div>
      </div>

      <div className="px-3 py-2">
        <div className="flex items-center gap-2 rounded-md bg-sidebar-accent px-3 py-1.5">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-sidebar-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-0.5 p-2">
          {filtered.map((agent) => (
            <button
              key={agent.id}
              onClick={() => onSelect(agent.id)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
                selectedId === agent.id
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg text-xs font-semibold",
                  agent.status === "running" && "bg-success/15 text-success",
                  agent.status === "idle" && "bg-muted text-muted-foreground",
                  agent.status === "error" && "bg-destructive/15 text-destructive",
                  agent.status === "paused" && "bg-warning/15 text-warning"
                )}
              >
                {agent.avatar}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium">{agent.name}</span>
                  <StatusDot status={agent.status} />
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {agent.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-border px-4 py-3">
        <p className="text-xs text-muted-foreground">
          Chat with orchestrator to manage agents. Use Telegram to assign jobs directly.
        </p>
      </div>
    </aside>
  )
}
