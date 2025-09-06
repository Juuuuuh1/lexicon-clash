// Game Types for Lexicon Clash

export type SATWord = {
  word: string;
  definition: string;
  synonyms: string[];
  lemmas: string[]; // Base forms for matching
};

export type RedditPost = {
  id: string;
  subreddit: string;
  title: string;
  url: string;
  summary: string;
  upvotes: number;
  commentCount: number;
  isNsfw: boolean;
  matchCount: number;
  matchExamples: string[]; // Up to 3 example sentences
};

export type GameCard = {
  id: string;
  post: RedditPost;
  isRevealed: boolean;
  isWinner: boolean;
};

export type GameRound = {
  id: string;
  word: SATWord;
  cards: [GameCard, GameCard];
  playerChoice: 0 | 1 | null;
  winner: 'player' | 'cpu' | 'tie' | null;
  isWildcard: boolean; // True when both cards had 0 matches
  completedAt: Date | null;
};

export type GameStats = {
  totalWins: number;
  totalLosses: number;
  totalTies: number;
  longestStreak: number;
  currentStreak: number;
  uniqueWords: string[];
  roundsPlayed: number;
};

export type WordJournalEntry = {
  id: string;
  word: SATWord;
  date: Date;
  playerWon: boolean;
  playerCard: RedditPost;
  cpuCard: RedditPost;
  notes?: string;
};

export type GameState = {
  currentRound: GameRound | null;
  stats: GameStats;
  journal: WordJournalEntry[];
  isLoading: boolean;
  error: string | null;
};

// Note: Using Devvit's built-in Reddit API types instead of raw JSON API types

// Game Configuration
export const GAME_CONFIG = {
  MAX_REROLL_ATTEMPTS: 2,
  MAX_EXAMPLE_SENTENCES: 3,
  GUARANTEED_HIT_PROBABILITY: 0.5, // 50% chance one card is guaranteed hit
  WILDCARD_FALLBACK_ORDER: ['upvotes', 'commentCount'] as const,
} as const;
