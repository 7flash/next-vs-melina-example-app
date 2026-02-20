# Agent Orchestrator

A premium dark-themed dashboard for managing AI agents — built with [Melina.js](https://github.com/nicholasgriffintn/melina.js), a lightweight Bun-native web framework.

![Agent Orchestrator](https://img.shields.io/badge/Framework-Melina.js-10b981?style=flat-square) ![Runtime](https://img.shields.io/badge/Runtime-Bun-f472b6?style=flat-square) ![Dependencies](https://img.shields.io/badge/Dependencies-2-blue?style=flat-square)

## Features

- 🤖 **5 Agent Types** — DataPipeline, SentimentBot, DeployBot, ContentWriter, SecurityScanner
- 💬 **Real-time Chat** — Message orchestrator with auto-responses and per-agent history
- 📊 **Multi-tab Detail View** — Chat, Memory, Logs, Source Code, Jobs
- 🔍 **Agent Search** — Instant filtering across all agents
- 🎨 **Premium Dark Theme** — Glassmorphic UI with green accent colors and smooth animations
- ⚡ **Zero React on Client** — Pure vanilla JS with Melina's VDOM runtime

---

## Quick Start

```bash
bun install
bun run server.ts
```

Open [http://localhost:3000](http://localhost:3000)

---

## Next.js vs Melina.js — Side by Side

This app was originally built with Next.js + React + Tailwind + shadcn/ui, then rewritten in Melina.js for comparison. Here's what changed.

### Project Structure

```
NEXT.JS (81 files)                       MELINA.JS (12 files)
─────────────────                        ────────────────────
app/                                     app/
├── globals.css                          ├── globals.css        ← vanilla CSS
├── layout.tsx                           ├── layout.tsx         ← HTML shell
├── page.tsx                             ├── page.tsx           ← SSR (full page)
│                                        └── page.client.tsx    ← interactivity
components/
├── agent-sidebar.tsx    (100 lines)
├── agent-detail.tsx     (150 lines)
├── chat-panel.tsx       (113 lines)
├── agent-jobs.tsx       (77 lines)
├── agent-logs.tsx       (51 lines)
├── agent-memory.tsx     (40 lines)
├── agent-source.tsx     (47 lines)
├── theme-provider.tsx
└── ui/                  (65+ files)
    ├── avatar.tsx
    ├── badge.tsx
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── scroll-area.tsx
    ├── separator.tsx
    ├── sidebar.tsx
    ├── tabs.tsx
    ├── tooltip.tsx
    └── ... 55+ more

hooks/
├── use-mobile.ts
lib/
├── utils.ts             ← cn() helper
styles/
├── globals.css          ← tailwind config
components.json          ← shadcn config
next.config.mjs
postcss.config.mjs
tailwind.config.ts
```

### Dependencies

```
NEXT.JS (~30 packages)                  MELINA.JS (2 packages)
──────────────────────                   ──────────────────────
next                                     melina
react, react-dom                         xstate
@radix-ui/react-avatar
@radix-ui/react-scroll-area
@radix-ui/react-separator
@radix-ui/react-slot
@radix-ui/react-tabs
@radix-ui/react-tooltip
class-variance-authority
clsx
lucide-react
tailwind-merge
tailwindcss
autoprefixer
postcss
tw-animate-css
zod
typescript, @types/node, @types/react
```

### Numbers

| Metric | Next.js | Melina.js | Δ |
|---|---|---|---|
| **Source files** | 81 | 12 | **-85%** |
| **Dependencies** | ~30 | 2 | **-93%** |
| **UI component files** | 65+ | 0 | **-100%** |
| **Application files** | 10 | 5 | **-50%** |
| **Client payload** | ~350KB+ (React+framework) | ~124KB (HTML+CSS+JS) | **-65%** |
| **Config files** | 6 (next, tailwind, postcss, tsconfig, components.json, .eslintrc) | 1 (tsconfig) | **-83%** |
| **Build tool** | Webpack/Turbopack | Bun.build | — |
| **Runtime** | Node.js | Bun | — |

### Developer Experience

#### Routing & Server Setup

```tsx
// ─── NEXT.JS ──────────────────────
// next.config.mjs (required)
const nextConfig = {};
export default nextConfig;

// package.json scripts required:
// "dev": "next dev --turbopack -p 3001"
// "build": "next build"
// "start": "next start"
```

```tsx
// ─── MELINA.JS ────────────────────
// server.ts — the entire server
import { start } from 'melina';
start();
```

#### Components — The Tab System

In Next.js, you need Radix UI primitives + shadcn wrapper + Tailwind utilities:

```tsx
// ─── NEXT.JS ──────────────────────
// First, install: npx shadcn@latest add tabs
// This generates ui/tabs.tsx wrapping @radix-ui/react-tabs
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

function AgentDetail({ agent }: { agent: Agent }) {
  const [activeTab, setActiveTab] = useState("chat");
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="chat">Chat</TabsTrigger>
        <TabsTrigger value="memory">Memory</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
      </TabsList>
      <TabsContent value="chat"><ChatPanel agent={agent} /></TabsContent>
      <TabsContent value="memory"><AgentMemory agent={agent} /></TabsContent>
      <TabsContent value="logs"><AgentLogs agent={agent} /></TabsContent>
    </Tabs>
  );
}
```

In Melina, tabs are just HTML buttons + event delegation:

```tsx
// ─── MELINA.JS ────────────────────
// No install needed. No component library. Just DOM.

// Server: render tab buttons with data attributes
<div id="tab-triggers">
  <button data-tab="chat" className="border-b-2 border-primary">Chat</button>
  <button data-tab="memory" className="border-transparent">Memory</button>
  <button data-tab="logs" className="border-transparent">Logs</button>
</div>

// Client: event delegation in mount()
const tabTriggers = document.getElementById('tab-triggers');
tabTriggers?.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest('[data-tab]');
  if (btn) switchTab(btn.dataset.tab);
});
```

#### Components — Chat Messages

```tsx
// ─── NEXT.JS ──────────────────────
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, User, Bot } from "lucide-react"

function ChatPanel({ agent }: { agent: Agent }) {
  const [messages, setMessages] = useState(agent.messages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea ref={scrollRef}>
        {messages.map(msg => (
          <div key={msg.id} className={cn("flex gap-3", msg.role === 'user' && "flex-row-reverse")}>
            <Avatar><AvatarFallback>{msg.role === 'user' ? <User /> : <Bot />}</AvatarFallback></Avatar>
            <div className={cn("rounded-xl px-4 py-2", msg.role === 'user' ? "bg-primary" : "bg-secondary")}>
              {msg.content}
            </div>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSend}>
        <Input value={input} onChange={e => setInput(e.target.value)} />
        <Button type="submit"><Send /></Button>
      </form>
    </div>
  );
}
```

```tsx
// ─── MELINA.JS ────────────────────
// No imports. No hooks. No component library.
// Just render() + DOM targeting.

function renderChat() {
  const container = document.getElementById('messages-container');
  const msgs = chatMessages.get(selectedId) || [];

  render(
    <>{msgs.map(msg => (
      <div className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
        <div className={`size-7 rounded-full flex items-center justify-center
          ${msg.role === 'user' ? 'bg-primary' : 'bg-secondary'}`}>
          {msg.role === 'user' ? iconUser() : iconBot()}
        </div>
        <div className={`max-w-[80%] rounded-xl px-3.5 py-2.5
          ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
          <p className="text-sm">{msg.content}</p>
        </div>
      </div>
    ))}</>,
    container
  );

  // Auto-scroll — no useEffect/useRef needed
  requestAnimationFrame(() => {
    document.getElementById('chat-scroll').scrollTop = 999999;
  });
}

// Submit handler in mount() — no useState
chatForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = chatInput.value.trim();
  if (!value) return;
  chatMessages.get(selectedId).push({ role: 'user', content: value });
  chatInput.value = '';
  renderChat();
});
```

### Performance Characteristics

| Aspect | Next.js | Melina.js |
|---|---|---|
| **SSR** | React renderToString (full VDOM tree) | melina/client VDOM (lightweight) |
| **Client hydration** | Full React tree reconciliation | Zero hydration — mount scripts attach to existing DOM |
| **Client framework** | React 19 (~45KB gzipped) | None — vanilla JS with `render()` helper |
| **Navigation** | Client-side router (full VDOM diff) | View Transition API + body swap |
| **State persistence** | Lost on navigation | Fiber tree survives partial navigations |
| **Bundler** | Webpack/Turbopack (complex config) | Bun.build (zero config) |
| **Cold start** | ~2-3s (Node + webpack) | ~200ms (Bun native) |

### Key Architectural Differences

**Next.js** ships the entire React runtime to the client. Every component, hook, context provider, and state manager runs in the browser. The `ui/` folder alone contains 65+ wrapper components around Radix UI primitives.

**Melina.js** renders everything on the server, then sends plain HTML. The client script (`page.client.tsx`) uses event delegation and targeted `render()` calls to update only the parts of the DOM that change. No React, no virtual DOM diffing on the client, no component tree reconciliation.

The result: **same UI, same interactivity, ~65% less JavaScript shipped to the browser.**

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                    Bun Runtime                    │
│                                                   │
│  server.ts ──► melina.start()                     │
│       │                                           │
│       ├── app/layout.tsx      (HTML shell)        │
│       ├── app/page.tsx        (SSR render)         │
│       ├── app/globals.css     (dark theme)        │
│       └── app/page.client.tsx (client mount)      │
│                                                   │
│  lib/agents-data.ts           (shared data)       │
└─────────────────────────────────────────────────┘
         │                    │
         ▼                    ▼
    Server Output         Client Bundle
    (36KB HTML)           (66KB JS + 24KB CSS)
```

## License

MIT