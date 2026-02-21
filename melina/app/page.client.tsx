import { render } from 'melina/client';
import { agents } from '../lib/agents-data';
import type { Agent, Message } from '../lib/agents-data';

// ── State ────────────────────────────────────────────────────────

let selectedId = agents[0].id;
let activeTab = 'chat';
let searchQuery = '';
let chatMessages: Map<string, Message[]> = new Map();

// Initialize messages from data
agents.forEach(a => chatMessages.set(a.id, [...a.messages]));

function getAgent(): Agent {
    return agents.find(a => a.id === selectedId) ?? agents[0];
}

// ── SVG Icon Helpers ─────────────────────────────────────────────

function iconUser() {
    return (
        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function iconBot() {
    return (
        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
        </svg>
    );
}

function iconSend() {
    return (
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" />
        </svg>
    );
}

function iconClock() {
    return (
        <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

// ── Render Helpers ───────────────────────────────────────────────

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

// ── Sidebar Render ───────────────────────────────────────────────

function renderSidebar() {
    const root = document.getElementById('agent-list');
    if (!root) return;

    const filtered = agents.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    render(
        <>{filtered.map(agent => (
            <button
                key={agent.id}
                data-agent-id={agent.id}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-left transition-all w-full ${selectedId === agent.id
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
        ))}</>,
        root
    );
}

// ── Detail Header Render ─────────────────────────────────────────

function renderDetailHeader() {
    const headerEl = document.querySelector('#detail-root > header');
    if (!headerEl) return;

    const agent = getAgent();

    render(
        <>
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
                <a href={agent.telegramGroup} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                    {iconSend()}
                    <span>Telegram</span>
                    <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                </a>
            </div>
        </>,
        headerEl as HTMLElement
    );
}

// ── Tab System ───────────────────────────────────────────────────

const TAB_IDS = ['chat', 'memory', 'logs', 'source', 'jobs'] as const;

function switchTab(tabId: string) {
    activeTab = tabId;

    // Update tab triggers
    document.querySelectorAll('#tab-triggers [data-tab]').forEach(btn => {
        const id = (btn as HTMLElement).dataset.tab;
        const isActive = id === tabId;
        (btn as HTMLElement).className = `flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors ${isActive ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`;
    });

    // Show/hide panels
    TAB_IDS.forEach(id => {
        const panel = document.getElementById(`tab-${id}`);
        if (panel) {
            panel.className = id === tabId ? 'h-full' : 'hidden h-full';
        }
    });

    // Render chat content if switching to chat
    if (tabId === 'chat') {
        renderChat();
    }
}

// ── Chat Render ──────────────────────────────────────────────────

function renderChat() {
    const container = document.getElementById('messages-container');
    if (!container) return;

    const msgs = chatMessages.get(selectedId) || [];

    render(
        <>
            {msgs.map(msg => {
                const isUser = msg.role === 'user';
                return (
                    <div key={msg.id} className={`flex gap-3 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex size-7 shrink-0 items-center justify-center rounded-full ${isUser ? 'bg-primary' : 'bg-secondary'}`}>
                            {isUser ? <span className="text-primary-foreground">{iconUser()}</span> : <span className="text-secondary-foreground">{iconBot()}</span>}
                        </div>
                        <div className={`max-w-[80%] rounded-xl px-3.5 py-2.5 ${isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                            <p className={`mt-1 text-[10px] ${isUser ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{msg.timestamp}</p>
                        </div>
                    </div>
                );
            })}
        </>,
        container
    );

    // Scroll to bottom
    const scrollEl = document.getElementById('chat-scroll');
    if (scrollEl) {
        requestAnimationFrame(() => { scrollEl.scrollTop = scrollEl.scrollHeight; });
    }

    // Update placeholder
    const input = document.getElementById('chat-input') as HTMLInputElement;
    if (input) {
        input.placeholder = `Message orchestrator about ${getAgent().name}...`;
    }

    // Update chat label
    const chatPanel = document.getElementById('chat-panel');
    if (chatPanel) {
        const label = chatPanel.querySelector('.text-xs.text-muted-foreground');
        if (label) label.textContent = `Orchestrator chat for ${getAgent().name}`;
    }
}

// ── Full Detail Re-render (on agent change) ──────────────────────

function renderDetail() {
    const agent = getAgent();
    const detailRoot = document.getElementById('detail-root');
    if (!detailRoot) return;

    // Re-render the entire detail panel for the new agent
    const runningJobs = agent.jobs.filter(j => j.status === 'running').length;

    // Update header
    renderDetailHeader();

    // Update jobs badge
    const jobsTab = document.querySelector('#tab-triggers [data-tab="jobs"]');
    if (jobsTab) {
        const badge = jobsTab.querySelector('.rounded-full.bg-primary');
        if (badge && runningJobs > 0) {
            badge.textContent = String(runningJobs);
        } else if (badge && runningJobs === 0) {
            badge.remove();
        }
    }

    // Re-render the active tab content
    renderTabContent(agent);
}

function renderTabContent(agent: Agent) {
    // Memory
    const memRoot = document.getElementById('tab-memory');
    if (memRoot) {
        render(
            <div className="flex h-full flex-col">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                    <span className="text-primary">
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" />
                        </svg>
                    </span>
                    <h3 className="text-sm font-medium text-foreground">Agent Memory</h3>
                    <span className="ml-auto text-xs text-muted-foreground">{agent.memory.length} entries</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-2 p-4">
                        {agent.memory.map(entry => (
                            <div key={entry.id} className="rounded-lg border border-border bg-secondary/50 p-3 animate-fade-in">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-xs font-medium text-primary">{entry.key}</span>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        {iconClock()}
                                        <span className="text-[10px]">{entry.updatedAt}</span>
                                    </div>
                                </div>
                                <p className="mt-1.5 font-mono text-xs text-foreground/80 break-all leading-relaxed">{entry.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>,
            memRoot
        );
    }

    // Logs
    const logsRoot = document.getElementById('tab-logs');
    if (logsRoot) {
        render(
            <div className="flex h-full flex-col">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                    <span className="text-primary">
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
                        </svg>
                    </span>
                    <h3 className="text-sm font-medium text-foreground">Logs</h3>
                    <span className="ml-auto text-xs text-muted-foreground">{agent.logs.length} entries</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col p-2">
                        {agent.logs.map(log => {
                            const logStyles: Record<string, string> = {
                                info: 'bg-primary/15 text-primary',
                                warn: 'bg-warning/15 text-warning',
                                error: 'bg-destructive/15 text-destructive',
                                debug: 'bg-muted text-muted-foreground',
                            };
                            return (
                                <div key={log.id} className="flex items-start gap-3 rounded px-3 py-2 hover:bg-secondary/50 transition-colors">
                                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground pt-0.5">{log.timestamp}</span>
                                    <span className={`inline-flex w-12 items-center justify-center rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase ${logStyles[log.level] || ''}`}>{log.level}</span>
                                    <p className="flex-1 font-mono text-xs leading-relaxed text-foreground/80">{log.message}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>,
            logsRoot
        );
    }

    // Source
    const sourceRoot = document.getElementById('tab-source');
    if (sourceRoot) {
        const lines = agent.sourceCode.split('\n');
        render(
            <div className="flex h-full flex-col">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                    <span className="text-primary">
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" />
                        </svg>
                    </span>
                    <h3 className="text-sm font-medium text-foreground">Source Code</h3>
                    <span className="ml-auto mr-2 font-mono text-xs text-muted-foreground">{agent.name.toLowerCase()}.ts</span>
                    <button id="copy-source-btn" data-source={agent.sourceCode} className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
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
            </div>,
            sourceRoot
        );
    }

    // Jobs
    const jobsRoot = document.getElementById('tab-jobs');
    if (jobsRoot) {
        const runningCount = agent.jobs.filter(j => j.status === 'running').length;
        render(
            <div className="flex h-full flex-col">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                    <span className="text-primary">
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" /><path d="m2 12 8.58 3.91a2 2 0 0 0 1.66 0L21 12" /><path d="m2 17 8.58 3.91a2 2 0 0 0 1.66 0L21 17" />
                        </svg>
                    </span>
                    <h3 className="text-sm font-medium text-foreground">Running Jobs</h3>
                    <span className="ml-auto text-xs text-muted-foreground">{runningCount} active / {agent.jobs.length} total</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {agent.jobs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                            <span className="opacity-40 mb-3">
                                <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
                                </svg>
                            </span>
                            <p className="text-sm">No jobs running</p>
                            <p className="text-xs mt-1">Agent is currently idle</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 p-4">
                            {agent.jobs.map(job => {
                                const jobStyles: Record<string, string> = {
                                    running: 'border-success/30 text-success bg-success/10',
                                    completed: 'border-primary/30 text-primary bg-primary/10',
                                    failed: 'border-destructive/30 text-destructive bg-destructive/10',
                                    queued: 'border-warning/30 text-warning bg-warning/10',
                                };
                                return (
                                    <div key={job.id} className="rounded-lg border border-border bg-secondary/50 p-3 animate-fade-in">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-foreground">{job.name}</span>
                                            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${jobStyles[job.status] || ''}`}>{job.status}</span>
                                        </div>
                                        <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                                            {iconClock()}
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
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>,
            jobsRoot
        );
    }

    // Chat (always rendered last to ensure scroll)
    renderChat();
}

// ── Mount ────────────────────────────────────────────────────────

export default function mount() {
    // ── Agent Selection (Event Delegation) ───────────────────────
    const agentList = document.getElementById('agent-list');
    const agentListHandler = (e: Event) => {
        const target = e.target as HTMLElement;
        const btn = target.closest('[data-agent-id]') as HTMLElement;
        if (!btn) return;
        e.preventDefault();
        const id = btn.dataset.agentId;
        if (id && id !== selectedId) {
            selectedId = id;
            activeTab = 'chat'; // reset to chat on agent switch
            switchTab('chat');
            renderSidebar();
            renderDetail();
        }
    };
    agentList?.addEventListener('click', agentListHandler);

    // ── Search ───────────────────────────────────────────────────
    const searchInput = document.getElementById('agent-search') as HTMLInputElement;
    const searchHandler = () => {
        searchQuery = searchInput?.value || '';
        renderSidebar();
    };
    searchInput?.addEventListener('input', searchHandler);

    // ── Tab Switching ────────────────────────────────────────────
    const tabTriggers = document.getElementById('tab-triggers');
    const tabHandler = (e: Event) => {
        const target = e.target as HTMLElement;
        const btn = target.closest('[data-tab]') as HTMLElement;
        if (!btn) return;
        const tabId = btn.dataset.tab;
        if (tabId && tabId !== activeTab) {
            switchTab(tabId);
        }
    };
    tabTriggers?.addEventListener('click', tabHandler);

    // ── Chat Send ────────────────────────────────────────────────
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input') as HTMLInputElement;
    const sendBtn = document.getElementById('chat-send-btn') as HTMLButtonElement;

    const chatInputHandler = () => {
        if (sendBtn) sendBtn.disabled = !(chatInput?.value?.trim());
    };
    chatInput?.addEventListener('input', chatInputHandler);

    const chatSubmitHandler = (e: Event) => {
        e.preventDefault();
        const value = chatInput?.value?.trim();
        if (!value) return;

        const agent = getAgent();
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const msgs = chatMessages.get(selectedId) || [];
        msgs.push({
            id: `m-${Date.now()}`,
            role: 'user',
            content: value,
            timestamp: now,
        });
        msgs.push({
            id: `m-${Date.now() + 1}`,
            role: 'orchestrator',
            content: `Acknowledged. I'll forward your request to ${agent.name}. To interact with the agent directly and assign jobs, use its Telegram group.`,
            timestamp: now,
        });
        chatMessages.set(selectedId, msgs);

        chatInput.value = '';
        if (sendBtn) sendBtn.disabled = true;
        renderChat();
    };
    chatForm?.addEventListener('submit', chatSubmitHandler);

    // ── Copy Source Button ────────────────────────────────────────
    const copyHandler = async (e: Event) => {
        const target = e.target as HTMLElement;
        const btn = target.closest('#copy-source-btn') as HTMLElement;
        if (!btn) return;
        const source = btn.dataset.source || getAgent().sourceCode;
        try {
            await navigator.clipboard.writeText(source);
            btn.innerHTML = '<svg class="size-3.5 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
            setTimeout(() => {
                btn.innerHTML = '<svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
            }, 2000);
        } catch { /* clipboard not available */ }
    };
    document.addEventListener('click', copyHandler);

    // ── Cleanup ──────────────────────────────────────────────────
    return () => {
        agentList?.removeEventListener('click', agentListHandler);
        searchInput?.removeEventListener('input', searchHandler);
        tabTriggers?.removeEventListener('click', tabHandler);
        chatInput?.removeEventListener('input', chatInputHandler);
        chatForm?.removeEventListener('submit', chatSubmitHandler);
        document.removeEventListener('click', copyHandler);
    };
}
