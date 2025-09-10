import { useState, useCallback, useEffect } from 'react';
import type { GameState, GameRound } from '../../shared/types/game';
import type { StartRoundResponse } from '../../shared/types/api';

const initialGameState: GameState = {
  currentRound: null,
  score: 0,
  streak: 0,
  roundsPlayed: 0,
  totalCorrect: 0,
  totalWrong: 0,
  isLoading: false,
};

// Load game state from localStorage
const loadGameState = (): GameState => {
  try {
    const saved = localStorage.getItem('lexicon-clash-game-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure we have all required properties
      return {
        ...initialGameState,
        ...parsed,
        currentRound: null, // Don't persist rounds
        isLoading: false,
      };
    }
  } catch (error) {
    console.error('Error loading game state:', error);
    // Clear corrupted data
    localStorage.removeItem('lexicon-clash-game-state');
  }
  return initialGameState;
};

// Save game state to localStorage
const saveGameState = (state: GameState): void => {
  try {
    const toSave = {
      score: state.score,
      streak: state.streak,
      roundsPlayed: state.roundsPlayed,
      totalCorrect: state.totalCorrect,
      totalWrong: state.totalWrong,
    };
    localStorage.setItem('lexicon-clash-game-state', JSON.stringify(toSave));
  } catch (error) {
    console.error('Error saving game state:', error);
  }
};

export function useGame() {
  const [gameState, setGameState] = useState<GameState>(loadGameState);

  // Save state changes to localStorage
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState.score, gameState.streak, gameState.roundsPlayed, gameState.totalCorrect, gameState.totalWrong]);

  const startNewRound = useCallback(async (): Promise<void> => {
    setGameState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch('/api/start-round', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: StartRoundResponse = await response.json();

      if (!data.success || !data.round) {
        throw new Error(data.error || 'Failed to start new round');
      }

      setGameState(prev => ({
        ...prev,
        currentRound: data.round!,
        roundsPlayed: prev.roundsPlayed + 1,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to start new round:', error);
      setGameState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const makeGuess = useCallback(async (cardIndex: 0 | 1): Promise<void> => {
    if (!gameState.currentRound || gameState.isLoading) return;

    const round = gameState.currentRound;
    const selectedCard = round.cards[cardIndex];
    const otherCard = round.cards[cardIndex === 0 ? 1 : 0];

    // Reveal both cards
    const updatedCards = round.cards.map((card, index) => ({
      ...card,
      isRevealed: true,
      isWinner: false // Will be set below
    }));

    let playerWon: boolean;
    let winner: 'player' | 'computer' | 'tie';

    if (round.isWildcard) {
      // WILDCARD ROUND: Compare upvotes of the two posts
      const selectedUpvotes = selectedCard.post.upvotes || 0;
      const otherUpvotes = otherCard.post.upvotes || 0;

      if (selectedUpvotes === otherUpvotes) {
        playerWon = false; // Tie counts as loss for simplicity
        winner = 'tie';
      } else {
        playerWon = selectedUpvotes > otherUpvotes;
        winner = playerWon ? 'player' : 'computer';
      }

      // Mark winner card
      if (winner === 'player') {
        updatedCards[cardIndex].isWinner = true;
      } else if (winner === 'computer') {
        updatedCards[cardIndex === 0 ? 1 : 0].isWinner = true;
      }
    } else {
      // NORMAL ROUND: Compare word occurrence counts of the two posts
      const selectedOccurrences = selectedCard.post.occurrenceCount || 0;
      const otherOccurrences = otherCard.post.occurrenceCount || 0;

      if (selectedOccurrences === otherOccurrences) {
        playerWon = false; // Tie counts as loss for simplicity
        winner = 'tie';
      } else {
        playerWon = selectedOccurrences > otherOccurrences;
        winner = playerWon ? 'player' : 'computer';
      }

      // Mark winner card
      if (winner === 'player') {
        updatedCards[cardIndex].isWinner = true;
      } else if (winner === 'computer') {
        updatedCards[cardIndex === 0 ? 1 : 0].isWinner = true;
      }
    }

    // Calculate points - Clear and predictable system
    let pointsEarned = 0;
    if (playerWon) {
      // Base points for winning
      pointsEarned = 10;

      // Streak bonus: +5 points per streak level (max +25 at 5+ streak)
      const streakBonus = Math.min(gameState.streak * 5, 25);
      pointsEarned += streakBonus;

      // Wildcard game bonus: Double all points
      if (round.isWildcard) {
        pointsEarned *= 2;
      }
    } else if (winner === 'computer') {
      // Deduct points for losing (but don't go below 0 total score)
      pointsEarned = -5;

      // Wildcard loss penalty: Double deduction
      if (round.isWildcard) {
        pointsEarned *= 2; // -10 points
      }
    }
    // Ties earn 0 points (no deduction)

    const updatedRound: GameRound = {
      ...round,
      cards: updatedCards,
      winner,
      pointsEarned,
    };

    setGameState(prev => ({
      ...prev,
      currentRound: updatedRound,
      score: Math.max(0, prev.score + pointsEarned), // Don't allow negative scores
      streak: playerWon ? prev.streak + 1 : 0,
      totalCorrect: prev.totalCorrect + (playerWon ? 1 : 0),
      totalWrong: prev.totalWrong + (playerWon ? 0 : 1),
    }));
  }, [gameState.currentRound, gameState.isLoading, gameState.streak]);

  const resetGame = useCallback((): void => {
    setGameState(initialGameState);
    localStorage.removeItem('lexicon-clash-game-state');
  }, []);

  return {
    gameState,
    startNewRound,
    makeGuess,
    resetGame,
  };
}
