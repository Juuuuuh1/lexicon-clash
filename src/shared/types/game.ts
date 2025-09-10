// Basic game types - clean and simple
export type SATWord = {
  word: string;
  definition: string;
  synonyms: string[];
  lemmas: string[];
};

export type RedditPost = {
  id: string;
  title: string;
  url: string;
  subreddit?: string;
  upvotes: number;
  commentCount: number;
  occurrenceCount: number;
  matchCount?: number;
  matchExamples?: string[];
  summary?: string;
  isNsfw?: boolean;
};

export type GameCard = {
  id: string;
  word: SATWord;
  post: RedditPost;
  posts: RedditPost[];
  isRevealed: boolean;
  isWinner?: boolean;
};

export type GameRound = {
  id: string;
  cards: GameCard[];
  isWildcard: boolean;
  wildcardWord?: string;
  winner?: 'player' | 'computer' | 'tie' | null;
  pointsEarned?: number;
};

export type GameState = {
  currentRound: GameRound | null;
  score: number;
  streak: number;
  roundsPlayed: number;
  totalCorrect: number;
  totalWrong: number;
  isLoading: boolean;
};

export const GAME_CONFIG = {
  CARDS_PER_ROUND: 4,
  POSTS_PER_CARD: 4,
  MAX_REROLL_ATTEMPTS: 5,
  WILDCARD_PROBABILITY: 0.2,
} as const;
