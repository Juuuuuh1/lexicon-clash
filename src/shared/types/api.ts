import type { GameRound, GameState } from './game';

// API request/response types
export type StartRoundRequest = {
  // No parameters needed for now
};

export type StartRoundResponse = {
  success: boolean;
  round?: GameRound;
  error?: string;
};

export type RevealCardRequest = {
  roundId: string;
  cardId: string;
};

export type RevealCardResponse = {
  success: boolean;
  gameState?: GameState;
  error?: string;
};

export type GameStateResponse = {
  success: boolean;
  gameState?: GameState;
  error?: string;
};
