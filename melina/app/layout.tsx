export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Manage and orchestrate your AI agents" />
        <title>Agent Orchestrator</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-foreground antialiased font-sans">
        <main id="melina-page-content">{children}</main>
      </body>
    </html>
  );
}
