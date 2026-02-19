"use client"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { type Job } from "@/lib/agents-data"
import { Layers, Clock } from "lucide-react"

function JobStatusBadge({ status }: { status: Job["status"] }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px] font-medium",
        status === "running" && "border-success/30 text-success bg-success/10",
        status === "completed" && "border-primary/30 text-primary bg-primary/10",
        status === "failed" && "border-destructive/30 text-destructive bg-destructive/10",
        status === "queued" && "border-warning/30 text-warning bg-warning/10"
      )}
    >
      {status}
    </Badge>
  )
}

export function AgentJobs({ jobs }: { jobs: Job[] }) {
  const runningCount = jobs.filter((j) => j.status === "running").length

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Layers className="size-4 text-primary" />
        <h3 className="text-sm font-medium text-foreground">Running Jobs</h3>
        <span className="ml-auto text-xs text-muted-foreground">
          {runningCount} active / {jobs.length} total
        </span>
      </div>
      <ScrollArea className="flex-1">
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Layers className="size-8 mb-3 opacity-40" />
            <p className="text-sm">No jobs running</p>
            <p className="text-xs mt-1">Agent is currently idle</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 p-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-lg border border-border bg-secondary/50 p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {job.name}
                  </span>
                  <JobStatusBadge status={job.status} />
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="size-3" />
                  <span className="text-xs">{job.startedAt}</span>
                </div>
                {job.progress !== undefined && (
                  <div className="mt-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-muted-foreground">Progress</span>
                      <span className="font-mono text-[10px] text-primary">
                        {job.progress}%
                      </span>
                    </div>
                    <Progress value={job.progress} className="h-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
