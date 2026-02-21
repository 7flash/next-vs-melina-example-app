# Next.js vs Melina.js — Same App, Side by Side

Both folders contain the **exact same application** — an Agent Orchestrator dashboard with 5 AI agents, chat, tabs, search, and a dark theme. One is built with Next.js + React + shadcn/ui. The other with [Melina.js](https://github.com/nicholasgriffintn/melina.js).

Browse them yourself: [`next/`](next/) and [`melina/`](melina/).

---

## The Numbers

| | Next.js | Melina.js |
|---|---|---|
| **Dependencies** | [49 packages](next/package.json#L11-L71) | [2 packages](melina/package.json#L5-L8) |
| **UI component files** | [57 files](next/components/ui/) | 0 |
| **Feature components** | [7 files](next/components/) (584 lines) | [1 file](melina/app/page.client.tsx) (558 lines) |
| **Config files** | 6 (next.config, tailwind, postcss, tsconfig, components.json, eslint) | [1](melina/tsconfig.json) (tsconfig) |
| **Total source files** | 79 | 10 |
| **Server setup** | [4 npm scripts](next/package.json#L5-L9) + next.config + postcss.config | [8 lines](melina/server.ts) |

---

## 1. Server — 4 Config Files vs 8 Lines

**Next.js** requires a config file, PostCSS config, Tailwind config, and npm scripts to start:

```ts
// next/package.json — L5-L9
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint ."
}
```

```ts
// next/next.config.mjs
const nextConfig = {};
export default nextConfig;

// next/postcss.config.mjs
export default { plugins: { "@tailwindcss/postcss": {} } };
```

**Melina.js** — the entire server is [8 lines](melina/server.ts):

```ts
// melina/server.ts — the entire file
import { start } from 'melina';
start();
```

Run it: `bun run server.ts`. That's it. No config files, no build step, no plugins.

---

## 2. Dependencies — 49 vs 2

**Next.js** pulls in [49 packages](next/package.json#L11-L71):

```
29 × @radix-ui/* primitives    ← UI primitives for every element
     lucide-react              ← icon library
     class-variance-authority  ← variant helper
     clsx + tailwind-merge     ← className merging
     react + react-dom         ← framework
     next + next-themes        ← meta-framework
     tailwindcss + postcss     ← styling
     recharts, sonner, vaul    ← charts, toasts, drawers
     react-hook-form + zod     ← form validation
     ... and more
```

**Melina.js** has [2 dependencies](melina/package.json):

```json
{
  "dependencies": {
    "melina": "latest",
    "xstate": "^5"
  }
}
```

---

## 3. Component Architecture — 7 Files vs 1

In **Next.js**, each UI section is a separate React component with its own imports, hooks, and state:

```
next/components/
├── agent-sidebar.tsx    109 lines — useState, ScrollArea, Search icon, cn()
├── agent-detail.tsx     157 lines — Tabs, TabsList, TabsTrigger, TabsContent, Badge, Button...
├── chat-panel.tsx       126 lines — useState, useRef, useEffect, ScrollArea, Button, Send icon
├── agent-jobs.tsx        82 lines — Badge, Clock icon, Progress bar
├── agent-logs.tsx        55 lines — Badge, ScrollArea
├── agent-memory.tsx      43 lines — Database icon, Clock icon
└── agent-source.tsx      53 lines — Button, Copy icon, Code2 icon
```

Each one starts with a wall of imports. For example, [agent-detail.tsx](next/components/agent-detail.tsx#L1-L21) needs **12 imports** just to render:

```tsx
// next/components/agent-detail.tsx — L1-L21
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
import { MessageSquare, Database, FileText, Code2, Layers, ExternalLink, Send as TelegramIcon } from "lucide-react"
```

In **Melina.js**, all client interactivity lives in [one file](melina/app/page.client.tsx) with **1 import**:

```tsx
// melina/app/page.client.tsx — L1
import { render } from 'melina/client';
```

---

## 4. Tabs — Radix Primitives vs HTML Buttons

**Next.js** uses `@radix-ui/react-tabs` → wrapped in a [shadcn component](next/components/ui/tabs.tsx) → consumed in [agent-detail.tsx](next/components/agent-detail.tsx#L92-L136). Each trigger repeats the same 3-line className string:

```tsx
// next/components/agent-detail.tsx — L92-L136
<Tabs defaultValue="chat" className="flex flex-1 flex-col overflow-hidden">
  <TabsList className="h-10 bg-transparent p-0 gap-0">
    <TabsTrigger
      value="chat"
      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary
                 data-[state=active]:bg-transparent data-[state=active]:shadow-none gap-1.5 px-3"
    >
      <MessageSquare className="size-3.5" />
      Chat
    </TabsTrigger>
    {/* ... repeat 4 more times with identical className */}
  </TabsList>
  <TabsContent value="chat"><ChatPanel agent={agent} /></TabsContent>
  <TabsContent value="memory"><AgentMemory memory={agent.memory} /></TabsContent>
  {/* ... */}
</Tabs>
```

**Melina.js** — tabs are plain `<button>` elements with `data-tab` attributes. The tab switching is [6 lines of event delegation](melina/app/page.client.tsx#L480-L491):

```tsx
// melina/app/page.client.tsx — L480-L491
const tabTriggers = document.getElementById('tab-triggers');
tabTriggers?.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest('[data-tab]');
  if (btn) switchTab(btn.dataset.tab);
});
```

No Radix dependency. No `TabsList` wrapper. No `data-[state=active]` selectors. Just DOM.

---

## 5. Chat — 3 Hooks + 5 Imports vs Plain Functions

**Next.js** [chat-panel.tsx](next/components/chat-panel.tsx) needs `useState`, `useRef`, `useEffect`, `ScrollArea`, `Button`, `Send`, `Bot`, `User`, and the `cn` utility:

```tsx
// next/components/chat-panel.tsx — L49-L62
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
```

**Melina.js** — a [plain function](melina/app/page.client.tsx#L195-L238) that calls `render()` and scrolls. No hooks, no refs, no effects:

```tsx
// melina/app/page.client.tsx — L195-L225
function renderChat() {
  const container = document.getElementById('messages-container');
  const msgs = chatMessages.get(selectedId) || [];

  render(
    <>{msgs.map(msg => (
      <div className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
        {/* ... message content ... */}
      </div>
    ))}</>,
    container
  );

  // Auto-scroll — one line, no useEffect/useRef
  requestAnimationFrame(() => {
    document.getElementById('chat-scroll').scrollTop = 999999;
  });
}
```

---

## 6. The Hidden Cost — 57 UI Component Files

The Next.js version has a [`components/ui/`](next/components/ui/) directory with **57 auto-generated files** from shadcn/ui. These are boilerplate wrappers around Radix primitives that the app needs just to use basic UI elements:

```
next/components/ui/
├── accordion.tsx   ├── drawer.tsx        ├── popover.tsx      ├── sonner.tsx
├── alert.tsx       ├── dropdown-menu.tsx ├── progress.tsx     ├── switch.tsx
├── avatar.tsx      ├── form.tsx          ├── radio-group.tsx  ├── table.tsx
├── badge.tsx       ├── hover-card.tsx    ├── resizable.tsx    ├── tabs.tsx
├── breadcrumb.tsx  ├── input-otp.tsx     ├── scroll-area.tsx  ├── textarea.tsx
├── button.tsx      ├── input.tsx         ├── select.tsx       ├── toast.tsx
├── calendar.tsx    ├── label.tsx         ├── separator.tsx    ├── toaster.tsx
├── card.tsx        ├── menubar.tsx       ├── sheet.tsx        ├── toggle.tsx
├── carousel.tsx    ├── navigation-menu.tsx ├── sidebar.tsx    ├── toggle-group.tsx
├── chart.tsx       ├── pagination.tsx    ├── skeleton.tsx     └── tooltip.tsx
├── checkbox.tsx    ├── ... and more
└── collapsible.tsx
```

Of these 57 files, the app actually uses **5**: `badge.tsx`, `button.tsx`, `scroll-area.tsx`, `tabs.tsx`, `tooltip.tsx`. The rest are dead weight generated by `npx shadcn@latest init`.

**Melina.js** has zero UI component files. A `<button>` is a `<button>`. A scroll area is `overflow-y-auto`. A badge is a `<span>` with classes.

---

## 7. Page Entry Point — "use client" vs SSR

**Next.js** marks the entire page as `"use client"` ([page.tsx L1](next/app/page.tsx#L1)), meaning the full page is client-rendered with React:

```tsx
// next/app/page.tsx — 26 lines, fully client-side
"use client"
import { useState } from "react"
// ...
export default function Home() {
  const [selectedId, setSelectedId] = useState(agents[0].id)
  // ... renders everything client-side
}
```

**Melina.js** renders the entire page on the server ([page.tsx](melina/app/page.tsx) — 515 lines of pure SSR), then a separate [page.client.tsx](melina/app/page.client.tsx) attaches interactivity to the existing HTML:

```tsx
// melina/app/page.client.tsx — L453
export default function mount() {
  // Attaches event listeners to server-rendered HTML
  // No re-rendering of the page structure
  agentList?.addEventListener('click', agentListHandler);
  searchInput?.addEventListener('input', searchHandler);
  tabTriggers?.addEventListener('click', tabHandler);
  chatForm?.addEventListener('submit', chatSubmitHandler);
  // ...
  return () => { /* cleanup */ };
}
```

The browser receives fully-rendered HTML immediately. JavaScript adds interactivity — it doesn't rebuild the page.

---

## Running Both

### Next.js
```bash
cd next
npm install    # installs 49 packages
npm run dev    # starts dev server (requires Node.js)
```

### Melina.js
```bash
cd melina
bun install    # installs 2 packages
bun run server.ts
```

---

## License

MIT