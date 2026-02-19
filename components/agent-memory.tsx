"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { type MemoryEntry } from "@/lib/agents-data"
import { Database, Clock } from "lucide-react"

export function AgentMemory({ memory }: { memory: MemoryEntry[] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Database className="size-4 text-primary" />
        <h3 className="text-sm font-medium text-foreground">Agent Memory</h3>
        <span className="ml-auto text-xs text-muted-foreground">
          {memory.length} entries
        </span>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-4">
          {memory.map((entry) => (
            <div
              key={entry.id}
              className="rounded-lg border border-border bg-secondary/50 p-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-medium text-primary">
                  {entry.key}
                </span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="size-3" />
                  <span className="text-[10px]">{entry.updatedAt}</span>
                </div>
              </div>
              <p className="mt-1.5 font-mono text-xs text-foreground/80 break-all leading-relaxed">
                {entry.value}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
