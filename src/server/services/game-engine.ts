import type { GameRound, GameCard, SATWord } from '../../shared/types/game';
import { getRandomSampleWord } from '../../shared/data/sample-data-loader';
import { getSATWordByString } from '../../shared/data/sat-words';
import { RedditAPIService } from './reddit-api';

function generateUniqueId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function createNewRound(): Promise<GameRound> {
  try {
    const redditAPI = new RedditAPIService();

    // Pick ONE challenge word
    const challengeWord = getRandomSampleWord();

    // Get SAT word data
    const satWord = getSATWordByString(challengeWord);
    if (!satWord) {
      throw new Error(`No SAT word data found for: ${challengeWord}`);
    }

    // Get all 4 posts for this word
    const allPosts = await redditAPI.getAllPostsForWord(satWord);

    if (allPosts.length < 2) {
      throw new Error(`Need at least 2 posts for word "${challengeWord}", found ${allPosts.length}`);
    }

    // Randomly select 2 posts from the available posts
    const shuffledPosts = [...allPosts].sort(() => Math.random() - 0.5);
    const selectedPosts = shuffledPosts.slice(0, 2);

    // Create 2 cards with the same word but different posts
    const cards: GameCard[] = selectedPosts.map((post, index) => ({
      id: generateUniqueId(),
      word: satWord,
      post: post, // Each card shows a different post
      posts: [post], // Single post per card
      isRevealed: false,
    }));

    // Determine if this is a wildcard game (when matching numbers are the same)
    const post1Count = selectedPosts[0]?.occurrenceCount || 0;
    const post2Count = selectedPosts[1]?.occurrenceCount || 0;
    const isWildcard = post1Count === post2Count;
    let wildcardWord: string | undefined;

    if (isWildcard) {
      wildcardWord = satWord.word;
    }

    const round: GameRound = {
      id: generateUniqueId(),
      cards,
      isWildcard,
      wildcardWord,
      winner: null,
      pointsEarned: 0,
    };

    return round;
  } catch (error) {
    throw error;
  }
}
