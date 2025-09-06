import { GameState, GameRound, RedditPost, GameStats } from './game';

export type InitResponse = {
  type: 'init';
  postId: string;
  gameState: GameState;
  username: string;
};

export type NewRoundResponse = {
  type: 'new_round';
  round: GameRound;
};

export type RevealCardsResponse = {
  type: 'reveal_cards';
  round: GameRound;
  winner: 'player' | 'cpu' | 'tie';
  stats: GameStats;
};

export type SearchRedditResponse = {
  type: 'search_reddit';
  posts: RedditPost[];
};

export type GameStatsResponse = {
  type: 'game_stats';
  stats: GameState['stats'];
};

export type ResetGameResponse = {
  type: 'reset';
  message: string;
  gameState: GameState;
};

// Legacy counter types (keeping for compatibility)
export type IncrementResponse = {
  type: 'increment';
  postId: string;
  count: number;
};

export type DecrementResponse = {
  type: 'decrement';
  postId: string;
  count: number;
};
