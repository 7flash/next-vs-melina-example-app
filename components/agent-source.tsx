"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Code2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AgentSource({ sourceCode, agentName }: { sourceCode: string; agentName: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sourceCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = sourceCode.split("\n")

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Code2 className="size-4 text-primary" />
        <h3 className="text-sm font-medium text-foreground">Source Code</h3>
        <span className="ml-auto mr-2 font-mono text-xs text-muted-foreground">
          {agentName.toLowerCase()}.ts
        </span>
        <Button variant="ghost" size="icon-sm" onClick={handleCopy}>
          {copied ? (
            <Check className="size-3.5 text-success" />
          ) : (
            <Copy className="size-3.5" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          <pre className="font-mono text-xs leading-6">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="inline-block w-8 shrink-0 select-none text-right text-muted-foreground/50">
                  {i + 1}
                </span>
                <span className="ml-4 text-foreground/80">{line || " "}</span>
              </div>
            ))}
          </pre>
        </div>
      </ScrollArea>
    </div>
  )
}
