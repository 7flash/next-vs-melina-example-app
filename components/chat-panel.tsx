"use client"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { type Agent, type Message } from "@/lib/agents-data"
import { Send, Bot, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary" : "bg-secondary"
        )}
      >
        {isUser ? (
          <User className="size-3.5 text-primary-foreground" />
        ) : (
          <Bot className="size-3.5 text-secondary-foreground" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-xl px-3.5 py-2.5",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p
          className={cn(
            "mt-1 text-[10px]",
            isUser ? "text-primary-foreground/60" : "text-muted-foreground"
          )}
        >
          {message.timestamp}
        </p>
      </div>
    </div>
  )
}

export function ChatPanel({ agent }: { agent: Agent }) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>(agent.messages)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages(agent.messages)
  }, [agent.id, agent.messages])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: Message = {
      id: `m-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    const botMsg: Message = {
      id: `m-${Date.now() + 1}`,
      role: "orchestrator",
      content: `Acknowledged. I'll forward your request to ${agent.name}. To interact with the agent directly and assign jobs, use its Telegram group.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput("")
  }

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center py-4">
            <div className="rounded-full bg-secondary px-3 py-1">
              <p className="text-xs text-muted-foreground">
                Orchestrator chat for {agent.name}
              </p>
            </div>
          </div>
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-border p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message orchestrator about ${agent.name}...`}
            className="flex-1 rounded-lg bg-secondary px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="size-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
