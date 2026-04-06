import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import ingestRouter from './server/api/routers/ingest';
import predictRouter from './server/api/routers/predict';
import alertsRouter from './server/api/routers/alerts';
import historyRouter from './server/api/routers/history';
import modelRouter from './server/api/routers/model';
import { createTables } from './server/db/crud';
import { startSimulation } from './server/simulation/engine';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.use('/api/ingest', ingestRouter);
  app.use('/api/predict', predictRouter);
  app.use('/api/alerts', alertsRouter);
  app.use('/api/history', historyRouter);
  app.use('/api/model', modelRouter);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'PetroGuard AI API', version: '1.0.0' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await createTables();
    startSimulation();
  });
}

startServer();
