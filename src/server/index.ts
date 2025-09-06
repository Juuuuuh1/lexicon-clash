import express from 'express';
import {
  InitResponse,
  IncrementResponse,
  DecrementResponse,
  NewRoundResponse,
  RevealCardsResponse,
} from '../shared/types/api';
import { redis, reddit, createServer, context, getServerPort } from '@devvit/web/server';
import { createPost } from './core/post';
import { GameEngine } from './services/game-engine';
import { GameState } from '../shared/types/game';

const app = express();

// Middleware for JSON body parsing
app.use(express.json());
// Middleware for URL-encoded body parsing
app.use(express.urlencoded({ extended: true }));
// Middleware for plain text body parsing
app.use(express.text());

const router = express.Router();
const gameEngine = new GameEngine();

router.get<{ postId: string }, InitResponse | { status: string; message: string }>(
  '/api/init',
  async (req, res): Promise<void> => {
    const { postId } = context;

    if (!postId) {
      console.error('API Init Error: postId not found in devvit context');
      res.status(400).json({
        status: 'error',
        message: 'postId is required but missing from context',
      });
      return;
    }

    try {
      const username = await reddit.getCurrentUsername();

      // Check if this is a forced fresh start (for development)
      const forceReset = req.query.reset === 'true';

      // Get or create game state for this post
      const gameStateKey = `game_state_${postId}`;
      const gameStateJson = !forceReset ? await redis.get(gameStateKey) : null;
      let gameState: GameState;

      if (gameStateJson) {
        gameState = JSON.parse(gameStateJson);
        // Convert date strings back to Date objects
        if (gameState.currentRound?.completedAt) {
          gameState.currentRound.completedAt = new Date(gameState.currentRound.completedAt);
        }
        gameState.journal = gameState.journal.map((entry) => ({
          ...entry,
          date: new Date(entry.date),
        }));

        // If the current round is completed, clear it so user can start fresh
        // This handles the case where user launches app after a completed game
        if (gameState.currentRound?.completedAt) {
          gameState.currentRound = null;
          gameState.isLoading = false;
          gameState.error = null;
          await redis.set(gameStateKey, JSON.stringify(gameState));
        }
      } else {
        gameState = gameEngine.initializeGame();
        await redis.set(gameStateKey, JSON.stringify(gameState));
      }

      res.json({
        type: 'init',
        postId: postId,
        gameState,
        username: username ?? 'anonymous',
      });
    } catch (error) {
      console.error(`API Init Error for post ${postId}:`, error);
      let errorMessage = 'Unknown error during initialization';
      if (error instanceof Error) {
        errorMessage = `Initialization failed: ${error.message}`;
      }
      res.status(400).json({ status: 'error', message: errorMessage });
    }
  }
);

router.post<{ postId: string }, IncrementResponse | { status: string; message: string }, unknown>(
  '/api/increment',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    res.json({
      count: await redis.incrBy('count', 1),
      postId,
      type: 'increment',
    });
  }
);

router.post<{ postId: string }, DecrementResponse | { status: string; message: string }, unknown>(
  '/api/decrement',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    res.json({
      count: await redis.incrBy('count', -1),
      postId,
      type: 'decrement',
    });
  }
);

// New Game Endpoints
router.post<{ postId: string }, NewRoundResponse | { status: string; message: string }, unknown>(
  '/api/new-round',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    try {
      const gameStateKey = `game_state_${postId}`;
      const gameStateJson = await redis.get(gameStateKey);

      if (!gameStateJson) {
        res.status(400).json({
          status: 'error',
          message: 'Game state not found. Please refresh the page.',
        });
        return;
      }

      const gameState: GameState = JSON.parse(gameStateJson);
      const newRound = await gameEngine.startNewRound(gameState);

      gameState.currentRound = newRound;
      gameState.isLoading = false;
      gameState.error = null;

      await redis.set(gameStateKey, JSON.stringify(gameState));

      res.json({
        type: 'new_round',
        round: newRound,
      });
    } catch (error) {
      console.error(`Error starting new round for post ${postId}:`, error);
      let errorMessage = 'Failed to start new round';
      if (error instanceof Error) {
        errorMessage = `New round error: ${error.message}`;
        console.error('Stack trace:', error.stack);
      }
      res.status(500).json({
        status: 'error',
        message: errorMessage,
      });
    }
  }
);

router.post<
  { postId: string },
  RevealCardsResponse | { status: string; message: string },
  { choice: 0 | 1 }
>('/api/reveal-cards', async (req, res): Promise<void> => {
  const { postId } = context;
  const { choice } = req.body;

  if (!postId) {
    res.status(400).json({
      status: 'error',
      message: 'postId is required',
    });
    return;
  }

  if (choice !== 0 && choice !== 1) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid choice. Must be 0 or 1.',
    });
    return;
  }

  try {
    const gameStateKey = `game_state_${postId}`;
    const gameStateJson = await redis.get(gameStateKey);

    if (!gameStateJson) {
      res.status(400).json({
        status: 'error',
        message: 'Game state not found. Please refresh the page.',
      });
      return;
    }

    const gameState: GameState = JSON.parse(gameStateJson);

    if (!gameState.currentRound) {
      res.status(400).json({
        status: 'error',
        message: 'No active round found.',
      });
      return;
    }

    // Reveal cards and determine winner
    const completedRound = gameEngine.revealCards(gameState.currentRound, choice);

    // Update stats
    gameState.stats = gameEngine.updateStats(gameState, completedRound);

    // Add to journal
    const journalEntry = gameEngine.createJournalEntry(completedRound);
    gameState.journal.push(journalEntry);

    // Update current round
    gameState.currentRound = completedRound;

    await redis.set(gameStateKey, JSON.stringify(gameState));

    res.json({
      type: 'reveal_cards',
      round: completedRound,
      winner: completedRound.winner!,
      stats: gameState.stats,
    });
  } catch (error) {
    console.error(`Error revealing cards for post ${postId}:`, error);
    let errorMessage = 'Failed to reveal cards';
    if (error instanceof Error) {
      errorMessage = `Reveal cards error: ${error.message}`;
      console.error('Stack trace:', error.stack);
    }
    res.status(500).json({
      status: 'error',
      message: errorMessage,
    });
  }
});

// Reset game endpoint for development/testing
router.post('/api/reset-game', async (_req, res): Promise<void> => {
  const { postId } = context;

  if (!postId) {
    res.status(400).json({
      status: 'error',
      message: 'postId is required',
    });
    return;
  }

  try {
    // Clear the game state from Redis
    const gameStateKey = `game_state_${postId}`;
    await redis.del(gameStateKey);

    // Initialize a fresh game state
    const gameState = gameEngine.initializeGame();
    await redis.set(gameStateKey, JSON.stringify(gameState));

    res.json({
      type: 'reset',
      message: 'Game reset successfully',
      gameState,
    });
  } catch (error) {
    console.error(`Error resetting game for post ${postId}:`, error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to reset game',
    });
  }
});

router.post('/internal/on-app-install', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      status: 'success',
      message: `Post created in subreddit ${context.subredditName} with id ${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

router.post('/internal/menu/post-create', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

// Use router middleware
app.use(router);

// Get port from environment variable with fallback
const port = getServerPort();

const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port);
