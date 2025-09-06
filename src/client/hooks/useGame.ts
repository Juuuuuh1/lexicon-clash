import { useState, useEffect, useCallback } from 'react';
import { GameState } from '../../shared/types/game';
import { InitResponse, NewRoundResponse, RevealCardsResponse } from '../../shared/types/api';

export function useGame() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize game
  useEffect(() => {
    const initGame = async () => {
      try {
        setLoading(true);
        // Check URL parameters for reset flag (useful for development)
        const urlParams = new URLSearchParams(window.location.search);
        const shouldReset = urlParams.get('reset') === 'true';
        const response = await fetch(`/api/init${shouldReset ? '?reset=true' : ''}`);

        if (!response.ok) {
          throw new Error(`Failed to initialize game: ${response.status}`);
        }

        const data: InitResponse = await response.json();
        setGameState(data.gameState);
        setUsername(data.username);
        setError(null);
      } catch (err) {
        console.error('Failed to initialize game:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize game');
      } finally {
        setLoading(false);
      }
    };

    void initGame();
  }, []);

  // Start new round
  const startNewRound = useCallback(async () => {
    if (!gameState) {
      console.error('No game state available');
      return;
    }

    console.log('Starting new round...');
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/new-round', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('New round response status:', response.status);

      if (!response.ok) {
        throw new Error(`Failed to start new round: ${response.status}`);
      }

      const data: NewRoundResponse = await response.json();
      console.log('New round data received:', data);

      setGameState((prev) =>
        prev
          ? {
              ...prev,
              currentRound: data.round,
              isLoading: false,
              error: null,
            }
          : null
      );

      console.log('Game state updated with new round');
    } catch (err) {
      console.error('Failed to start new round:', err);
      setError(err instanceof Error ? err.message : 'Failed to start new round');
    } finally {
      setLoading(false);
    }
  }, [gameState]);

  // Reveal cards
  const revealCards = useCallback(
    async (choice: 0 | 1) => {
      if (!gameState?.currentRound) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/reveal-cards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ choice }),
        });

        if (!response.ok) {
          throw new Error(`Failed to reveal cards: ${response.status}`);
        }

        const data: RevealCardsResponse = await response.json();

        setGameState((prev) => {
          if (!prev) return null;

          return {
            ...prev,
            currentRound: data.round,
            stats: data.stats, // Use server-provided stats instead of calculating locally
            isLoading: false,
            error: null,
          };
        });
      } catch (err) {
        console.error('Failed to reveal cards:', err);
        setError(err instanceof Error ? err.message : 'Failed to reveal cards');
      } finally {
        setLoading(false);
      }
    },
    [gameState]
  );

  // Save game state to localStorage (for leaderboard persistence)
  useEffect(() => {
    if (gameState && !loading) {
      localStorage.setItem('lexicon-clash-stats', JSON.stringify(gameState.stats));
      localStorage.setItem('lexicon-clash-journal', JSON.stringify(gameState.journal));
    }
  }, [gameState, loading]);

  // Load saved stats from localStorage on init
  useEffect(() => {
    if (gameState && gameState.stats.roundsPlayed === 0) {
      const savedStats = localStorage.getItem('lexicon-clash-stats');
      const savedJournal = localStorage.getItem('lexicon-clash-journal');

      if (savedStats || savedJournal) {
        setGameState((prev) => {
          if (!prev) return null;

          return {
            ...prev,
            stats: savedStats ? JSON.parse(savedStats) : prev.stats,
            journal: savedJournal
              ? JSON.parse(savedJournal).map((entry: { date: string; [key: string]: unknown }) => ({
                  ...entry,
                  date: new Date(entry.date),
                }))
              : prev.journal,
          };
        });
      }
    }
  }, [gameState]);

  // Reset game
  const resetGame = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/reset-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to reset game: ${response.status}`);
      }

      const data = await response.json();
      setGameState(data.gameState);
    } catch (err) {
      console.error('Failed to reset game:', err);
      setError(err instanceof Error ? err.message : 'Failed to reset game');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    gameState,
    username,
    loading,
    error,
    startNewRound,
    revealCards,
    resetGame,
  };
}
