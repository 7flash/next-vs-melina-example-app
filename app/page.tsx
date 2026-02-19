"use client"

import { useState } from "react"
import { agents } from "@/lib/agents-data"
import { AgentSidebar } from "@/components/agent-sidebar"
import { AgentDetail } from "@/components/agent-detail"

export default function Home() {
  const [selectedId, setSelectedId] = useState(agents[0].id)

  const selectedAgent = agents.find((a) => a.id === selectedId) ?? agents[0]

  return (
    <main className="flex h-dvh bg-background">
      <AgentSidebar
        agents={agents}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <div className="flex-1 overflow-hidden">
        <AgentDetail agent={selectedAgent} />
      </div>
    </main>
  )
}
