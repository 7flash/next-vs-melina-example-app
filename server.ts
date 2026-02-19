import { start } from 'melina';
import path from 'path';

await start({
    port: parseInt(process.env.BUN_PORT || "3000"),
    appDir: path.join(import.meta.dir, 'app'),
    defaultTitle: 'Agent Orchestrator',
});
