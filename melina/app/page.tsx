import { agents } from '../lib/agents-data';
import type { Agent, Job, LogEntry, MemoryEntry, Message } from '../lib/agents-data';

function StatusDot({ status }: { status: Agent['status'] }) {
  const colors: Record<string, string> = {
    running: 'bg-success animate-pulse-dot',
    idle: 'bg-muted-foreground',
    error: 'bg-destructive',
    paused: 'bg-warning',
  };
  return <span className={`size-2 rounded-full shrink-0 ${colors[status] || ''}`} />;
}

function AvatarBadge({ agent, size = 'sm' }: { agent: Agent; size?: 'sm' | 'md' }) {
  const colors: Record<string, string> = {
    running: 'bg-success/15 text-success',
    idle: 'bg-muted text-muted-foreground',
    error: 'bg-destructive/15 text-destructive',
    paused: 'bg-warning/15 text-warning',
  };
  const sz = size === 'md' ? 'size-10 text-sm' : 'size-9 text-xs';
  return (
    <div className={`flex items-center justify-center rounded-lg font-semibold shrink-0 ${sz} ${colors[agent.status] || ''}`}>
      {agent.avatar}
    </div>
  );
}

function StatusBadge({ status }: { status: Agent['status'] }) {
  const styles: Record<string, string> = {
    running: 'border-success/30 text-success bg-success/10',
    idle: 'border-muted-foreground/30 text-muted-foreground bg-muted',
    error: 'border-destructive/30 text-destructive bg-destructive/10',
    paused: 'border-warning/30 text-warning bg-warning/10',
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${styles[status] || ''}`}>
      {status}
    </span>
  );
}

function JobStatusBadge({ status }: { status: Job['status'] }) {
  const styles: Record<string, string> = {
    running: 'border-success/30 text-success bg-success/10',
    completed: 'border-primary/30 text-primary bg-primary/10',
    failed: 'border-destructive/30 text-destructive bg-destructive/10',
    queued: 'border-warning/30 text-warning bg-warning/10',
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${styles[status] || ''}`}>
      {status}
    </span>
  );
}

function LogLevelBadge({ level }: { level: LogEntry['level'] }) {
  const styles: Record<string, string> = {
    info: 'bg-primary/15 text-primary',
    warn: 'bg-warning/15 text-warning',
    error: 'bg-destructive/15 text-destructive',
    debug: 'bg-muted text-muted-foreground',
  };
  return (
    <span className={`inline-flex w-12 items-center justify-center rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase ${styles[level] || ''}`}>
      {level}
    </span>
  );
}

// ── SVG Icons (inline to avoid lucide-react dependency) ──────────

function IconBot() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg className="size-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconBotSmall() {
  return (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
    </svg>
  );
}

function IconExternalLink() {
  return (
    <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function IconMessage() {
  return (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
    </svg>
  );
}

function IconDatabase() {
  return (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" />
    </svg>
  );
}

function IconFileText() {
  return (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" /><path d="m2 12 8.58 3.91a2 2 0 0 0 1.66 0L21 12" /><path d="m2 17 8.58 3.91a2 2 0 0 0 1.66 0L21 17" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconCopy() {
  return (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function IconTelegram() {
  return (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" />
    </svg>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────

function AgentSidebarItem({ agent, isSelected }: { agent: Agent; isSelected: boolean }) {
  return (
    <button
      data-agent-id={agent.id}
      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-left transition-all w-full ${isSelected
          ? 'bg-sidebar-accent text-sidebar-foreground'
          : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
        }`}
    >
      <AvatarBadge agent={agent} />
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-medium">{agent.name}</span>
          <StatusDot status={agent.status} />
        </div>
        <p className="truncate text-xs text-muted-foreground">{agent.description}</p>
      </div>
    </button>
  );
}

// ── Chat Message ─────────────────────────────────────────────────

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex size-7 shrink-0 items-center justify-center rounded-full ${isUser ? 'bg-primary' : 'bg-secondary'}`}>
        {isUser ? <span className="text-primary-foreground"><IconUser /></span> : <span className="text-secondary-foreground"><IconBotSmall /></span>}
      </div>
      <div className={`max-w-[80%] rounded-xl px-3.5 py-2.5 ${isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p className={`mt-1 text-[10px] ${isUser ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{message.timestamp}</p>
      </div>
    </div>
  );
}

// ── Tab panels ───────────────────────────────────────────────────

function ChatPanel({ agent }: { agent: Agent }) {
  return (
    <div className="flex h-full flex-col" id="chat-panel">
      <div className="flex-1 overflow-y-auto p-4" id="chat-scroll">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center py-4">
            <div className="rounded-full bg-secondary px-3 py-1">
              <p className="text-xs text-muted-foreground">Orchestrator chat for {agent.name}</p>
            </div>
          </div>
          <div id="messages-container">
            {agent.messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          </div>
        </div>
      </div>
      <div className="border-t border-border p-3">
        <form id="chat-form" className="flex items-center gap-2">
          <input
            id="chat-input"
            type="text"
            placeholder={`Message orchestrator about ${agent.name}...`}
            className="flex-1 rounded-lg bg-secondary px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
          />
          <button type="submit" id="chat-send-btn" className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50" disabled>
            <IconSend />
          </button>
        </form>
      </div>
    </div>
  );
}

function MemoryPanel({ memory }: { memory: MemoryEntry[] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="text-primary"><IconDatabase /></span>
        <h3 className="text-sm font-medium text-foreground">Agent Memory</h3>
        <span className="ml-auto text-xs text-muted-foreground">{memory.length} entries</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2 p-4">
          {memory.map((entry) => (
            <div key={entry.id} className="rounded-lg border border-border bg-secondary/50 p-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-medium text-primary">{entry.key}</span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <IconClock />
                  <span className="text-[10px]">{entry.updatedAt}</span>
                </div>
              </div>
              <p className="mt-1.5 font-mono text-xs text-foreground/80 break-all leading-relaxed">{entry.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LogsPanel({ logs }: { logs: LogEntry[] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="text-primary"><IconFileText /></span>
        <h3 className="text-sm font-medium text-foreground">Logs</h3>
        <span className="ml-auto text-xs text-muted-foreground">{logs.length} entries</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col p-2">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 rounded px-3 py-2 hover:bg-secondary/50 transition-colors">
              <span className="shrink-0 font-mono text-[11px] text-muted-foreground pt-0.5">{log.timestamp}</span>
              <LogLevelBadge level={log.level} />
              <p className="flex-1 font-mono text-xs leading-relaxed text-foreground/80">{log.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SourcePanel({ sourceCode, agentName }: { sourceCode: string; agentName: string }) {
  const lines = sourceCode.split('\n');
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="text-primary"><IconCode /></span>
        <h3 className="text-sm font-medium text-foreground">Source Code</h3>
        <span className="ml-auto mr-2 font-mono text-xs text-muted-foreground">{agentName.toLowerCase()}.ts</span>
        <button id="copy-source-btn" data-source={sourceCode} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <IconCopy />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <pre className="font-mono text-xs leading-6">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="code-line-number">{i + 1}</span>
                <span className="code-line-content">{line || ' '}</span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}

function JobsPanel({ jobs }: { jobs: Job[] }) {
  const runningCount = jobs.filter((j) => j.status === 'running').length;
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="text-primary"><IconLayers /></span>
        <h3 className="text-sm font-medium text-foreground">Running Jobs</h3>
        <span className="ml-auto text-xs text-muted-foreground">{runningCount} active / {jobs.length} total</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <span className="opacity-40 mb-3"><IconLayers /></span>
            <p className="text-sm">No jobs running</p>
            <p className="text-xs mt-1">Agent is currently idle</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 p-4">
            {jobs.map((job) => (
              <div key={job.id} className="rounded-lg border border-border bg-secondary/50 p-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{job.name}</span>
                  <JobStatusBadge status={job.status} />
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                  <IconClock />
                  <span className="text-xs">{job.startedAt}</span>
                </div>
                {job.progress !== undefined && (
                  <div className="mt-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-muted-foreground">Progress</span>
                      <span className="font-mono text-[10px] text-primary">{job.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={`width: ${job.progress}%`} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Tab System ───────────────────────────────────────────────────

function TabTrigger({ id, label, icon, isActive, badge }: { id: string; label: string; icon: any; isActive: boolean; badge?: number }) {
  return (
    <button
      data-tab={id}
      className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors ${isActive
          ? 'border-primary text-foreground'
          : 'border-transparent text-muted-foreground hover:text-foreground'
        }`}
    >
      {icon}
      {label}
      {badge !== undefined && badge > 0 && (
        <span className="ml-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {badge}
        </span>
      )}
    </button>
  );
}

// ── Main Content (Detail) ────────────────────────────────────────

function AgentDetail({ agent }: { agent: Agent }) {
  const runningJobs = agent.jobs.filter((j) => j.status === 'running').length;
  return (
    <div className="flex h-full flex-col" id="detail-root">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-3">
          <AvatarBadge agent={agent} size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-foreground">{agent.name}</h2>
              <StatusBadge status={agent.status} />
            </div>
            <p className="text-xs text-muted-foreground">{agent.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Active {agent.lastActive}</span>
          <a
            href={agent.telegramGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            <IconTelegram />
            <span>Telegram</span>
            <IconExternalLink />
          </a>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border px-4">
        <div className="flex gap-0" id="tab-triggers">
          <TabTrigger id="chat" label="Chat" icon={<IconMessage />} isActive={true} />
          <TabTrigger id="memory" label="Memory" icon={<IconDatabase />} isActive={false} />
          <TabTrigger id="logs" label="Logs" icon={<IconFileText />} isActive={false} />
          <TabTrigger id="source" label="Source" icon={<IconCode />} isActive={false} />
          <TabTrigger id="jobs" label="Jobs" icon={<IconLayers />} isActive={false} badge={runningJobs} />
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden" id="tab-content">
        <div id="tab-chat"><ChatPanel agent={agent} /></div>
        <div id="tab-memory" className="hidden h-full"><MemoryPanel memory={agent.memory} /></div>
        <div id="tab-logs" className="hidden h-full"><LogsPanel logs={agent.logs} /></div>
        <div id="tab-source" className="hidden h-full"><SourcePanel sourceCode={agent.sourceCode} agentName={agent.name} /></div>
        <div id="tab-jobs" className="hidden h-full"><JobsPanel jobs={agent.jobs} /></div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────

export default function Page() {
  const defaultAgent = agents[0];
  return (
    <div className="flex h-dvh bg-background">
      {/* Sidebar */}
      <aside className="flex h-full w-72 shrink-0 flex-col border-r border-border bg-sidebar" id="sidebar-root">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <IconBot />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-sidebar-foreground">Agent Orchestrator</h1>
            <p className="text-xs text-muted-foreground">{agents.length} agents</p>
          </div>
        </div>

        <div className="px-3 py-2">
          <div className="flex items-center gap-2 rounded-md bg-sidebar-accent px-3 py-1.5">
            <IconSearch />
            <input
              type="text"
              id="agent-search"
              placeholder="Search agents..."
              className="flex-1 bg-transparent text-sm text-sidebar-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-0.5 p-2" id="agent-list">
            {agents.map((agent) => (
              <AgentSidebarItem key={agent.id} agent={agent} isSelected={agent.id === defaultAgent.id} />
            ))}
          </div>
        </div>

        <div className="border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">
            Chat with orchestrator to manage agents. Use Telegram to assign jobs directly.
          </p>
        </div>
      </aside>

      {/* Detail Panel */}
      <div className="flex-1 overflow-hidden">
        <AgentDetail agent={defaultAgent} />
      </div>
    </div>
  );
}
