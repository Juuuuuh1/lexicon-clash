import { RedditPost, SATWord } from '../../shared/types/game';
import { reddit } from '@devvit/web/server';
import { getCuratedPostsForWord, getPostOccurrenceCount } from '../../shared/data/sample-data-loader';


// Minimal Reddit API service - all external calls disabled to fix React error
export class RedditAPIService {

  async searchPosts(_searchTerms: string[], _limit: number = 10): Promise<RedditPost[]> {
    return [];
  }

  async getRandomPosts(_limit: number = 10): Promise<RedditPost[]> {
    return [];
  }

  /**
   * Get sample data posts for a word with actual occurrence counts
   */
  private async getCuratedGamePosts(word: SATWord): Promise<RedditPost[]> {
    const samplePosts = getCuratedPostsForWord(word.word);

    if (samplePosts.length === 0) {
      return [];
    }

    // Fetch real Reddit data and use actual occurrence counts from sample data
    const postsWithRealData = await Promise.all(
      samplePosts.map(async (post) => {
        try {
          const actualCount = getPostOccurrenceCount(word.word, post.id);

          // Simple match examples based on count
          const matchExamples = actualCount > 0
            ? [`"${word.word}" appears ${actualCount} times in this post`]
            : ['No direct matches found'];

          // Fetch real upvotes from Reddit
          const realData = await this.fetchRealPostData(post.url);

          return {
            ...post,
            upvotes: realData.upvotes,
            commentCount: 0, // No longer fetching comment count
            matchCount: actualCount,
            matchExamples: matchExamples,
          };
        } catch (error) {
          // Silently handle errors and return safe defaults
          // Return post with safe defaults if processing fails
          return {
            ...post,
            upvotes: 0,
            commentCount: 0, // No longer fetching comment count
            matchCount: getPostOccurrenceCount(word.word, post.id),
            matchExamples: ['Error loading match examples'],
          };
        }
      })
    );

    return postsWithRealData;
  }

  /**
   * Fetch real upvotes from Reddit API
   */
  private async fetchRealPostData(postUrl: string): Promise<{ upvotes: number }> {
    try {
      // Extract post ID from URL
      const postIdMatch = postUrl.match(/\/comments\/([a-zA-Z0-9]+)\//);
      if (!postIdMatch) {
        return { upvotes: 0 };
      }

      const postId = postIdMatch[1];
      const post = await reddit.getPostById(`t3_${postId}`);
      if (!post) {
        return { upvotes: 0 };
      }

      const upvotes = post.score || 0;
      return { upvotes };

    } catch (error) {
      return { upvotes: 0 };
    }
  }

  /**
   * Get all posts for a word (up to 4 from sample data)
   */
  async getAllPostsForWord(word: SATWord): Promise<RedditPost[]> {
    const samplePosts = await this.getCuratedGamePosts(word);

    if (samplePosts.length === 0) {
      throw new Error(`No posts found for word "${word.word}"`);
    }

    return samplePosts;
  }
}
