import {
  GameState,
  GameRound,
  GameCard,
  SATWord,
  RedditPost,
  GameStats,
  WordJournalEntry,
} from '../../shared/types/game';
import { getRandomSATWord } from '../../shared/data/sat-words';
import { RedditAPIService } from './reddit-api';

export class GameEngine {
  private redditAPI: RedditAPIService;

  constructor() {
    this.redditAPI = new RedditAPIService();
  }

  /**
   * Initialize a new game state
   */
  initializeGame(): GameState {
    return {
      currentRound: null,
      stats: {
        totalWins: 0,
        totalLosses: 0,
        totalTies: 0,
        longestStreak: 0,
        currentStreak: 0,
        uniqueWords: [],
        roundsPlayed: 0,
      },
      journal: [],
      isLoading: false,
      error: null,
    };
  }

  /**
   * Start a new round
   */
  async startNewRound(gameState: GameState): Promise<GameRound> {
    try {
      const word = getRandomSATWord();

      // Ensure we don't repeat words too often
      if (
        gameState.stats.uniqueWords.includes(word.word) &&
        gameState.stats.uniqueWords.length < 20
      ) {
        // Try to get a different word if we haven't used many yet
        const attempts = 3;
        for (let i = 0; i < attempts; i++) {
          const newWord = getRandomSATWord();
          if (!gameState.stats.uniqueWords.includes(newWord.word)) {
            return this.createRound(newWord);
          }
        }
      }

      return this.createRound(word);
    } catch (error) {
      console.error('GameEngine: Error in startNewRound:', error);
      throw error;
    }
  }

  /**
   * Create a new game round
   */
  private async createRound(word: SATWord): Promise<GameRound> {
    try {
      const [post1, post2] = await this.redditAPI.getGamePosts(word);

      // Determine if this is a wildcard round (both posts have 0 matches)
      const isWildcard = post1.matchCount === 0 && post2.matchCount === 0;

      const cards: [GameCard, GameCard] = [
        {
          id: `card_${post1.id}`,
          post: post1,
          isRevealed: false,
          isWinner: false,
        },
        {
          id: `card_${post2.id}`,
          post: post2,
          isRevealed: false,
          isWinner: false,
        },
      ];

      return {
        id: `round_${Date.now()}`,
        word,
        cards,
        playerChoice: null,
        winner: null,
        isWildcard,
        completedAt: null,
      };
    } catch (error) {
      console.error('Error creating round:', error);
      // Return a fallback round with demo posts
      return this.createFallbackRound(word);
    }
  }

  /**
   * Create a fallback round with demo posts when Reddit API fails
   */
  private createFallbackRound(word: SATWord): GameRound {
    // Create two demo posts with varied match counts
    const rand1 = Math.random();
    const matchCount1 = rand1 < 0.2 ? 1 :
                       rand1 < 0.4 ? 2 :
                       rand1 < 0.6 ? 3 :
                       rand1 < 0.8 ? 4 : 5;

    const rand2 = Math.random();
    const matchCount2 = rand2 < 0.3 ? 0 :
                       rand2 < 0.5 ? 1 :
                       rand2 < 0.7 ? 2 :
                       rand2 < 0.85 ? 3 : 4;

    // Ensure there's always a clear winner (at least 1 match difference)
    const finalMatchCount1 = Math.max(matchCount1, matchCount2 + 1);
    const finalMatchCount2 = matchCount2;

    const synonym = word.synonyms[Math.floor(Math.random() * word.synonyms.length)];

    const post1 = {
      id: `demo_${Date.now()}_1`,
      subreddit: 'vocabulary',
      title: `Discussion about ${word.word} and its implications`,
      url: `https://www.reddit.com/r/vocabulary/comments/${Date.now()}/demo_post_about_${word.word.replace(/\s+/g, '_').toLowerCase()}/`,
      summary: `This is a demonstration post about ${word.word}, which means ${word.definition}. The ${word.word} nature of this topic makes it particularly interesting for vocabulary learners.`,
      upvotes: Math.floor(Math.random() * 500) + 100,
      commentCount: Math.floor(Math.random() * 50) + 10,
      isNsfw: false,
      matchCount: finalMatchCount1,
      matchExamples: this.generateMatchExamples(word.word, synonym, finalMatchCount1),
    };

    const post2 = {
      id: `demo_${Date.now()}_2`,
      subreddit: 'education',
      title: 'General Discussion: Learning and Education',
      url: `https://www.reddit.com/r/education/comments/${Date.now()}/demo_post_about_learning/`,
      summary:
        'This is a demonstration post about learning and education in general. It discusses various methods and approaches to studying effectively.',
      upvotes: Math.floor(Math.random() * 300) + 50,
      commentCount: Math.floor(Math.random() * 30) + 5,
      isNsfw: false,
      matchCount: finalMatchCount2,
      matchExamples: this.generateMatchExamples(word.word, synonym, finalMatchCount2),
    };

    const cards: [GameCard, GameCard] = [
      {
        id: `card_${post1.id}`,
        post: post1,
        isRevealed: false,
        isWinner: false,
      },
      {
        id: `card_${post2.id}`,
        post: post2,
        isRevealed: false,
        isWinner: false,
      },
    ];

    return {
      id: `round_${Date.now()}`,
      word,
      cards,
      playerChoice: null,
      winner: null,
      isWildcard: false, // Not wildcard since one post has matches
      completedAt: null,
    };
  }

  /**
   * Process player's card choice and determine winner
   */
  revealCards(round: GameRound, playerChoice: 0 | 1): GameRound {
    const updatedRound = { ...round };
    updatedRound.playerChoice = playerChoice;
    updatedRound.cards[0].isRevealed = true;
    updatedRound.cards[1].isRevealed = true;
    updatedRound.completedAt = new Date();

    // Determine winner
    const card1 = updatedRound.cards[0];
    const card2 = updatedRound.cards[1];

    let winner: 'player' | 'cpu' | 'tie';

    if (updatedRound.isWildcard) {
      // Use wildcard rules: highest upvotes, then comment count
      winner = this.determineWildcardWinner(card1.post, card2.post, playerChoice);
    } else {
      // Normal rules: highest match count
      if (card1.post.matchCount > card2.post.matchCount) {
        winner = playerChoice === 0 ? 'player' : 'cpu';
        card1.isWinner = true;
      } else if (card2.post.matchCount > card1.post.matchCount) {
        winner = playerChoice === 1 ? 'player' : 'cpu';
        card2.isWinner = true;
      } else {
        winner = 'tie';
        card1.isWinner = true;
        card2.isWinner = true;
      }
    }

    updatedRound.winner = winner;
    return updatedRound;
  }

  /**
   * Generate match examples for demo posts
   */
  private generateMatchExamples(word: string, synonym: string, matchCount: number): string[] {
    if (matchCount === 0) return [];

    const examples = [
      `This discussion explores the concept of ${word} in detail.`,
      `Many people struggle with ${synonym} behavior in daily life.`,
      `The ${word} nature of this topic makes it fascinating.`,
      `Research shows that ${synonym} tendencies vary by culture.`,
      `Understanding ${word} can help improve communication.`,
      `Some argue that being ${synonym} is actually beneficial.`,
      `The psychology behind ${word} behavior is complex.`,
      `How do you handle ${synonym} situations at work?`,
    ];

    return examples.slice(0, Math.min(matchCount, 3));
  }

  /**
   * Determine winner using wildcard rules
   */
  private determineWildcardWinner(
    post1: RedditPost,
    post2: RedditPost,
    playerChoice: 0 | 1
  ): 'player' | 'cpu' | 'tie' {
    // First check upvotes
    if (post1.upvotes > post2.upvotes) {
      return playerChoice === 0 ? 'player' : 'cpu';
    } else if (post2.upvotes > post1.upvotes) {
      return playerChoice === 1 ? 'player' : 'cpu';
    }

    // If upvotes are tied, check comment count
    if (post1.commentCount > post2.commentCount) {
      return playerChoice === 0 ? 'player' : 'cpu';
    } else if (post2.commentCount > post1.commentCount) {
      return playerChoice === 1 ? 'player' : 'cpu';
    }

    // If both are tied, it's a tie
    return 'tie';
  }

  /**
   * Update game statistics after a round
   */
  updateStats(gameState: GameState, round: GameRound): GameStats {
    const newStats = { ...gameState.stats };

    newStats.roundsPlayed++;

    // Add word to unique words if not already present
    if (!newStats.uniqueWords.includes(round.word.word)) {
      newStats.uniqueWords.push(round.word.word);
    }

    // Update win/loss/tie counts and streak
    switch (round.winner) {
      case 'player':
        newStats.totalWins++;
        newStats.currentStreak++;
        if (newStats.currentStreak > newStats.longestStreak) {
          newStats.longestStreak = newStats.currentStreak;
        }
        break;
      case 'cpu':
        newStats.totalLosses++;
        newStats.currentStreak = 0;
        break;
      case 'tie':
        newStats.totalTies++;
        // Ties don't break streak but don't extend it either
        break;
    }

    return newStats;
  }

  /**
   * Create a journal entry for the completed round
   */
  createJournalEntry(round: GameRound): WordJournalEntry {
    const playerCard = round.cards[round.playerChoice!];
    const cpuCard = round.cards[round.playerChoice === 0 ? 1 : 0];

    return {
      id: `journal_${round.id}`,
      word: round.word,
      date: round.completedAt!,
      playerWon: round.winner === 'player',
      playerCard: playerCard.post,
      cpuCard: cpuCard.post,
    };
  }

  /**
   * Export journal entries as CSV
   */
  exportJournalAsCSV(journal: WordJournalEntry[]): string {
    const headers = [
      'Date',
      'Word',
      'Definition',
      'Player Won',
      'Player Card Title',
      'Player Card Subreddit',
      'Player Card Matches',
      'CPU Card Title',
      'CPU Card Subreddit',
      'CPU Card Matches',
    ];

    const rows = journal.map((entry) => [
      entry.date.toISOString().split('T')[0],
      entry.word.word,
      `"${entry.word.definition}"`,
      entry.playerWon ? 'Yes' : 'No',
      `"${entry.playerCard.title}"`,
      entry.playerCard.subreddit,
      entry.playerCard.matchCount.toString(),
      `"${entry.cpuCard.title}"`,
      entry.cpuCard.subreddit,
      entry.cpuCard.matchCount.toString(),
    ]);

    return [headers, ...rows].map((row) => row.join(',')).join('\n');
  }
}
