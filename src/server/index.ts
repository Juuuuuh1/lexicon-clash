import express from 'express';
import { createServer, context, getServerPort } from '@devvit/web/server';
import { createNewRound } from './services/game-engine';
import type { StartRoundResponse } from '../shared/types/api';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

const router = express.Router();

// Test endpoint
router.get('/api/test', async (_req, res): Promise<void> => {
  res.json({
    status: 'success',
    message: 'Server is working!',
    postId: context.postId || 'no-post-id'
  });
});


// Start new round endpoint
router.post('/api/start-round', async (_req, res): Promise<void> => {
  try {
    const round = await createNewRound();

    const response: StartRoundResponse = {
      success: true,
      round,
    };

    res.json(response);
  } catch (error) {

    const response: StartRoundResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };

    res.status(500).json(response);
  }
});

// Use router middleware
app.use(router);

// Get port and start server
const port = getServerPort();
const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port);
