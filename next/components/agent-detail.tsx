"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type Agent } from "@/lib/agents-data"
import { ChatPanel } from "@/components/chat-panel"
import { AgentMemory } from "@/components/agent-memory"
import { AgentLogs } from "@/components/agent-logs"
import { AgentSource } from "@/components/agent-source"
import { AgentJobs } from "@/components/agent-jobs"
import {
  MessageSquare,
  Database,
  FileText,
  Code2,
  Layers,
  ExternalLink,
  Send as TelegramIcon,
} from "lucide-react"

function StatusBadge({ status }: { status: Agent["status"] }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium",
        status === "running" && "border-success/30 text-success bg-success/10",
        status === "idle" && "border-muted-foreground/30 text-muted-foreground bg-muted",
        status === "error" && "border-destructive/30 text-destructive bg-destructive/10",
        status === "paused" && "border-warning/30 text-warning bg-warning/10"
      )}
    >
      {status}
    </Badge>
  )
}

export function AgentDetail({ agent }: { agent: Agent }) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-lg text-sm font-bold",
              agent.status === "running" && "bg-success/15 text-success",
              agent.status === "idle" && "bg-muted text-muted-foreground",
              agent.status === "error" && "bg-destructive/15 text-destructive",
              agent.status === "paused" && "bg-warning/15 text-warning"
            )}
          >
            {agent.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-foreground">
                {agent.name}
              </h2>
              <StatusBadge status={agent.status} />
            </div>
            <p className="text-xs text-muted-foreground">{agent.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Active {agent.lastActive}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            asChild
          >
            <a
              href={agent.telegramGroup}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TelegramIcon className="size-3.5" />
              <span>Telegram</span>
              <ExternalLink className="size-3" />
            </a>
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <Tabs defaultValue="chat" className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b border-border px-4">
          <TabsList className="h-10 bg-transparent p-0 gap-0">
            <TabsTrigger
              value="chat"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-1.5 px-3"
            >
              <MessageSquare className="size-3.5" />
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="memory"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-1.5 px-3"
            >
              <Database className="size-3.5" />
              Memory
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-1.5 px-3"
            >
              <FileText className="size-3.5" />
              Logs
            </TabsTrigger>
            <TabsTrigger
              value="source"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-1.5 px-3"
            >
              <Code2 className="size-3.5" />
              Source
            </TabsTrigger>
            <TabsTrigger
              value="jobs"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-1.5 px-3"
            >
              <Layers className="size-3.5" />
              Jobs
              {agent.jobs.filter((j) => j.status === "running").length > 0 && (
                <span className="ml-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {agent.jobs.filter((j) => j.status === "running").length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="mt-0 flex-1 overflow-hidden">
          <ChatPanel agent={agent} />
        </TabsContent>
        <TabsContent value="memory" className="mt-0 flex-1 overflow-hidden">
          <AgentMemory memory={agent.memory} />
        </TabsContent>
        <TabsContent value="logs" className="mt-0 flex-1 overflow-hidden">
          <AgentLogs logs={agent.logs} />
        </TabsContent>
        <TabsContent value="source" className="mt-0 flex-1 overflow-hidden">
          <AgentSource sourceCode={agent.sourceCode} agentName={agent.name} />
        </TabsContent>
        <TabsContent value="jobs" className="mt-0 flex-1 overflow-hidden">
          <AgentJobs jobs={agent.jobs} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
