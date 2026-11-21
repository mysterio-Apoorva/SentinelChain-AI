import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { handleApi } from './api/_lib/handler';
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));
app.all('/api/:route', (req, res) => handleApi(req.params.route, req, res));
app.use('/api', (_req, res) => { res.status(404).json({ error: 'Unknown API endpoint.' }); });
app.use((error: any, _req: any, res: any, next: any) => {
  if (error) return res.status(error.status || 400).json({ error: 'Invalid request body.' });
  next();
});
async function start() {
  if (process.env.NODE_ENV === 'production') {
    const dist = path.resolve('dist');
    app.use(express.static(dist));
    app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  }
  app.listen(Number(process.env.PORT) || 3000, '0.0.0.0', () => console.log(`SentinelChain listening on ${process.env.PORT || 3000}`));
}
start().catch(error => { console.error(error); process.exitCode = 1; });
