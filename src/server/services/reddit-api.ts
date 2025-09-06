import { RedditPost, SATWord, GAME_CONFIG } from '../../shared/types/game';
import { reddit } from '@devvit/web/server';

// Type definition for Devvit Reddit post object based on actual API response
// Using a more flexible approach to handle different property names
type DevvitPost = {
  id: string;
  title?: string;
  body?: string | undefined;
  subredditName?: string;
  url?: string;
  score?: number;
  nsfw?: boolean;
  // Handle different possible comment count properties
  numComments?: number;
  comments?: number | unknown; // Allow for different comment types
};

// Reddit API service for fetching posts and analyzing content
export class RedditAPIService {
  /**
   * Search Reddit for posts containing the given search terms
   */
  async searchPosts(searchTerms: string[], limit: number = 10): Promise<RedditPost[]> {
    try {
      // Focus on educational and intellectual subreddits for better content
      const subreddits = [
        'askreddit',
        'todayilearned',
        'explainlikeimfive',
        'science',
        'technology',
        'books',
        'philosophy',
        'news',
        'worldnews',
        'history',
        'psychology',
        'askscience',
        'literature',
        'education',
        'sociology',
        'economics',
      ];
      const posts: RedditPost[] = [];

      // Search across multiple subreddits for posts containing our terms (reduced for speed)
      for (const subredditName of subreddits.slice(0, 2)) {
        // Only search 2 subreddits for speed
        try {
          const subredditPosts = await reddit
            .getNewPosts({
              subredditName: subredditName,
              limit: 20, // Reduced for speed
            })
            .all();

          // Filter posts that contain any of our search terms (we'll do deeper comment analysis later)
          const matchingPosts = subredditPosts.filter((post) => {
            if (post.nsfw) return false;

            // Exclude vocabulary-specific subreddits to keep the game challenging
            const subredditName = post.subredditName?.toLowerCase() || '';
            if (
              subredditName.includes('vocabulary') ||
              subredditName.includes('words') ||
              subredditName.includes('language')
            ) {
              return false;
            }

            // Initial filter based on title and body (comments will be checked later for performance)
            const content = `${post.title} ${post.body || ''}`.toLowerCase();
            const hasTermInPost = searchTerms.some((term) => {
              const lowerTerm = term.toLowerCase();
              const rootTerm = lowerTerm.slice(0, Math.max(4, lowerTerm.length - 3)); // Get root word
              // More aggressive matching - check exact, partial, and root forms
              return (
                content.includes(lowerTerm) ||
                content.includes(rootTerm) ||
                content.includes(lowerTerm.slice(0, -1)) ||
                content.includes(lowerTerm.slice(0, -2)) ||
                content.includes(lowerTerm + 's') || // plural
                content.includes(lowerTerm + 'ed') || // past tense
                content.includes(lowerTerm + 'ing')
              ); // present participle
            });

            // Include posts with decent comment count even if no matches in title/body
            // This allows us to find matches in comments
            // Handle both possible property names for comment count
            const getCommentCount = (post: DevvitPost): number => {
              if (post.numComments && typeof post.numComments === 'number') {
                return post.numComments;
              }
              if (post.comments && typeof post.comments === 'number') {
                return post.comments;
              }
              return 0;
            };
            const hasComments = getCommentCount(post) > 3; // Lowered threshold

            return hasTermInPost || hasComments;
          });

          // Convert and add matching posts
          for (const post of matchingPosts.slice(0, Math.ceil(limit / 3))) {
            try {
              const gamePost = await this.convertDevvitPostToGamePost(post, searchTerms);
              posts.push(gamePost);
            } catch (error) {
              // Skip posts that fail to convert (e.g., inaccessible posts)
              console.warn(`Skipping post ${post.id} due to conversion error`);
            }
          }

          if (posts.length >= limit) break;
        } catch (subredditError) {
          console.warn(`Failed to search subreddit ${subredditName}:`, subredditError);
          continue;
        }
      }

      return posts.slice(0, limit);
    } catch (error) {
      console.error('Error searching Reddit:', error);
      return [];
    }
  }

  /**
   * Get random posts from popular subreddits
   */
  async getRandomPosts(limit: number = 10): Promise<RedditPost[]> {
    try {
      // Focus on educational and intellectual subreddits for better content
      const subreddits = [
        'askreddit',
        'todayilearned',
        'explainlikeimfive',
        'science',
        'technology',
        'books',
        'philosophy',
        'news',
        'worldnews',
        'history',
        'psychology',
        'askscience',
        'literature',
        'education',
        'sociology',
        'economics',
      ];
      const randomSubreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

      // Use Devvit's Reddit API to get posts from subreddit
      const subredditPosts = await reddit
        .getNewPosts({
          subredditName: randomSubreddit as string,
          limit: Math.min(100, limit * 3), // Get more posts to have variety
        })
        .all();

      const posts: RedditPost[] = [];

      // Filter out NSFW and convert to our format
      const validPosts = subredditPosts.filter((post) => {
        if (post.nsfw) return false;

        // Exclude vocabulary-specific subreddits to keep the game challenging
        const subredditName = post.subredditName?.toLowerCase() || '';
        if (
          subredditName.includes('vocabulary') ||
          subredditName.includes('words') ||
          subredditName.includes('language')
        ) {
          return false;
        }

        return true;
      });

      // Randomly select posts from the valid ones
      const selectedPosts = this.shuffleArray(validPosts).slice(0, limit);

      for (const post of selectedPosts) {
        try {
          const gamePost = await this.convertDevvitPostToGamePost(post, []);
          posts.push(gamePost);
        } catch (error) {
          // Skip posts that fail to convert (e.g., inaccessible posts)
          console.warn(`Skipping post ${post.id} due to conversion error`);
        }
      }

      return posts;
    } catch (error) {
      console.error('Error fetching random posts:', error);
      // Fallback to a different subreddit if one fails
      if (limit > 1) {
        return this.getRandomPosts(Math.max(1, limit - 2));
      }
      return [];
    }
  }

  /**
   * Get posts for a game round with guaranteed hit logic
   */
  async getGamePosts(word: SATWord): Promise<[RedditPost, RedditPost]> {
    // Use only the main word and first synonym for both search AND matching
    const mainSearchTerms = [word.word]; // Just the main word for more reliable matches
    if (word.synonyms.length > 0 && word.synonyms[0]) {
      mainSearchTerms.push(word.synonyms[0]); // Add the first synonym only
    }

    let attempts = 0;

    while (attempts <= GAME_CONFIG.MAX_REROLL_ATTEMPTS) {
      try {

        const [guaranteedPosts, randomPosts] = await Promise.all([
          this.searchPosts(mainSearchTerms, 8), // Increased to find more posts
          this.getRandomPosts(12), // Increased for more variety
        ]);

        // Select posts
        const guaranteedPost =
          guaranteedPosts.length > 0
            ? guaranteedPosts[Math.floor(Math.random() * guaranteedPosts.length)]
            : null;

        const randomPost =
          randomPosts.length > 0
            ? randomPosts[Math.floor(Math.random() * randomPosts.length)]
            : null;

        if (!guaranteedPost && !randomPost) {
          // If both API calls failed, create fallback posts
          attempts++;
          continue;
        }

        // Randomly assign which post gets the guaranteed hit (50/50 chance)
        const guaranteedHitFirst = Math.random() < 0.5;

        let post1, post2;
        if (guaranteedHitFirst) {
          post1 = guaranteedPost || this.createFallbackPost(word, true);
          post2 = randomPost || this.createFallbackPost(word, false);
        } else {
          post1 = randomPost || this.createFallbackPost(word, false);
          post2 = guaranteedPost || this.createFallbackPost(word, true);
        }

        // Calculate match counts using the same focused terms we searched for
        const post1Matches = this.countMatches(post1, mainSearchTerms);
        const post2Matches = this.countMatches(post2, mainSearchTerms);

        post1.matchCount = post1Matches.count;
        post1.matchExamples = post1Matches.examples;
        post2.matchCount = post2Matches.count;
        post2.matchExamples = post2Matches.examples;

        // Ensure both cards have >0 matches for a fair game
        if (post1.matchCount === 0 || post2.matchCount === 0) {
          attempts++;
          if (attempts > GAME_CONFIG.MAX_REROLL_ATTEMPTS) {
            // Create fallback posts with guaranteed matches
            if (post1.matchCount === 0) {
              post1 = this.createFallbackPost(word, true); // Guaranteed match
            }
            if (post2.matchCount === 0) {
              post2 = this.createFallbackPost(word, true); // Guaranteed match
            }
            // Recalculate match counts for fallback posts using focused terms
            const post1Matches = this.countMatches(post1, mainSearchTerms);
            const post2Matches = this.countMatches(post2, mainSearchTerms);
            post1.matchCount = post1Matches.count;
            post1.matchExamples = post1Matches.examples;
            post2.matchCount = post2Matches.count;
            post2.matchExamples = post2Matches.examples;
            break;
          }
          continue;
        }

        return [post1, post2];
      } catch (error) {
        console.error(`Attempt ${attempts + 1} failed:`, error);
        attempts++;
      }
    }

    // Final fallback: create demo posts with random assignment
    const guaranteedHitFirst = Math.random() < 0.5;
    const post1 = this.createFallbackPost(word, guaranteedHitFirst);
    const post2 = this.createFallbackPost(word, !guaranteedHitFirst);

    // Recalculate match counts for final fallback posts using focused terms
    const post1Matches = this.countMatches(post1, mainSearchTerms);
    const post2Matches = this.countMatches(post2, mainSearchTerms);
    post1.matchCount = post1Matches.count;
    post1.matchExamples = post1Matches.examples;
    post2.matchCount = post2Matches.count;
    post2.matchExamples = post2Matches.examples;

    return [post1, post2];
  }

  /**
   * Convert Devvit Post object to our RedditPost format
   */
  private async convertDevvitPostToGamePost(
    post: DevvitPost,
    searchTerms: string[]
  ): Promise<RedditPost> {
    const summary = this.createSummary(post.title || 'Untitled', post.body || '');

    // Try to fetch comments to expand search scope, but don't fail if it doesn't work
    let commentsText = '';
    try {
      // Add a timeout and more robust error handling
      const comments = await Promise.race([
        reddit
          .getComments({
            postId: `t3_${post.id}` as `t3_${string}`,
            limit: 10, // Reduced further for reliability
            sort: 'top',
          })
          .all(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Comment fetch timeout')), 5000)
        )
      ]);

      // Extract text from comments (limit to prevent performance issues)
      const commentTexts = comments
        .filter((comment) => comment.body && comment.body.length > 10)
        .slice(0, 5) // Reduced further for reliability
        .map((comment) => comment.body);

      commentsText = commentTexts.join(' ');
    } catch (error) {
      // Silently handle all comment fetching failures
      // This is common and doesn't affect core game functionality
      // Comments are just used to improve word matching accuracy
    }

    const matches = this.countMatches(
      {
        title: post.title || 'Untitled',
        summary,
        fullBody: post.body || '', // Include full post body for better matching
        comments: commentsText, // Will be empty string if comment fetching failed
      },
      searchTerms
    );


    return {
      id: post.id,
      subreddit: post.subredditName || 'unknown',
      title: post.title || 'Untitled Post',
      url: post.url || `https://www.reddit.com/r/${post.subredditName}/comments/${post.id}`,
      summary,
      upvotes: post.score || 0,
      commentCount: post.numComments || (typeof post.comments === 'number' ? post.comments : 0),
      isNsfw: post.nsfw || false,
      matchCount: matches.count,
      matchExamples: matches.examples,
    };
  }

  /**
   * Count exact word matches in post content
   */
  private countMatches(
    post: { title: string; summary: string; fullBody?: string; comments?: string },
    searchTerms: string[]
  ): { count: number; examples: string[] } {
    // Don't include summary since it's just the first 200 chars of fullBody (would cause duplicates)
    const content = `${post.title} ${post.fullBody || ''} ${post.comments || ''}`.toLowerCase();
    const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 10);

    let totalCount = 0;
    const examples: string[] = [];
    const foundMatches = new Set<string>(); // Track unique matches to avoid duplicates

    for (const term of searchTerms) {
      const lowerTerm = term.toLowerCase();

      // Only search for exact word matches (no partial matching)
      const escapedTerm = lowerTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedTerm}\\b`, 'gi');
      const matches = content.match(regex);

      if (matches) {
        totalCount += matches.length;

        // Find example sentences containing this exact term
        for (const sentence of sentences) {
          const lowerSentence = sentence.toLowerCase();
          if (
            lowerSentence.includes(lowerTerm) &&
            examples.length < GAME_CONFIG.MAX_EXAMPLE_SENTENCES
          ) {
            const cleanSentence = sentence.trim().replace(/^\W+|\W+$/g, '');
            if (cleanSentence.length > 15 && cleanSentence.length < 200) {
              // Highlight the matched word in the example
              const highlightedSentence = cleanSentence.replace(
                new RegExp(`\\b${escapedTerm}\\b`, 'gi'),
                (match) => `**${match}**`
              );
              const finalSentence = highlightedSentence.charAt(0).toUpperCase() + highlightedSentence.slice(1) + '.';

              // Avoid duplicate examples
              if (!foundMatches.has(finalSentence.toLowerCase())) {
                examples.push(finalSentence);
                foundMatches.add(finalSentence.toLowerCase());
              }
            }
          }
        }
      }
    }
    return {
      count: totalCount,
      examples: examples.slice(0, GAME_CONFIG.MAX_EXAMPLE_SENTENCES),
    };
  }

  /**
   * Create a summary from title and content
   */
  private createSummary(title: string, selftext: string): string {
    if (!selftext || selftext.trim() === '') {
      return title;
    }

    // Take first 200 characters of selftext
    const summary = selftext.substring(0, 200);
    const lastSpace = summary.lastIndexOf(' ');

    if (lastSpace > 100) {
      return summary.substring(0, lastSpace) + '...';
    }

    return summary + '...';
  }

  /**
   * Shuffle an array using Fisher-Yates algorithm
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j]!;
      shuffled[j] = temp!;
    }
    return shuffled;
  }

  /**
   * Create a fallback post when API fails
   */
  private createFallbackPost(word?: SATWord, shouldContainWord: boolean = false): RedditPost {
    const timestamp = Date.now();
    const randomUpvotes = Math.floor(Math.random() * 1000) + 50;
    const randomComments = Math.floor(Math.random() * 100) + 10;

    if (word && shouldContainWord) {
      // More varied match count distribution (1-5 matches with different probabilities)
      const rand = Math.random();
      const matchCount = rand < 0.3 ? 1 :
                        rand < 0.5 ? 2 :
                        rand < 0.7 ? 3 :
                        rand < 0.85 ? 4 : 5;
      const synonymToUse = word.synonyms[Math.floor(Math.random() * word.synonyms.length)];

      // More realistic, varied titles that don't scream "generated"
      const realisticTitles = [
        `What are your thoughts on ${word.word}?`,
        `Discussion: ${word.word} in today's world`,
        `Has anyone else noticed ${word.word} trends lately?`,
        `ELI5: Why is ${word.word} important?`,
        `TIL about ${word.word} and its impact`,
        `Question about ${synonymToUse} behavior`,
        `Looking for advice on ${word.word} situations`,
        `Interesting article about ${synonymToUse} research`,
        `${word.word}: What's your experience?`,
        `Study shows ${synonymToUse} effects on society`,
        `How do you deal with ${word.word} people?`,
        `Is ${word.word} becoming more common?`,
        `Why is ${synonymToUse} behavior so prevalent?`,
        `Can someone explain ${word.word} to me?`,
        `${word.word} in the workplace - your stories?`,
        `Unpopular opinion: ${word.word} isn't always bad`,
        `${synonymToUse} people are everywhere these days`,
        `How to handle ${word.word} situations gracefully`,
        `${word.word}: blessing or curse?`,
        `Anyone else tired of ${synonymToUse} attitudes?`,
        `The psychology behind ${word.word} behavior`,
        `${word.word} vs ${synonymToUse}: what's the difference?`,
        `Growing up with ${word.word} parents`,
        `${word.word} friends - how do you cope?`,
        `Is being ${synonymToUse} a personality trait?`,
        `${word.word} culture in different countries`,
        `How to stop being so ${synonymToUse}`,
        `${word.word} people in relationships`,
        `The benefits of ${synonymToUse} thinking`,
        `${word.word} behavior in social media`,
        `Why are some people naturally ${synonymToUse}?`,
        `${word.word} tendencies in myself`,
        `Dealing with ${synonymToUse} coworkers`,
        `${word.word} parenting styles`,
        `Is ${synonymToUse} behavior learned or innate?`,
        `${word.word} people make the best leaders?`,
        `How ${synonymToUse} are you on a scale of 1-10?`,
        `${word.word} behavior in academic settings`,
        `The dark side of being ${synonymToUse}`,
        `${word.word} people and social anxiety`,
        `Why ${synonymToUse} behavior triggers me`,
        `${word.word} traits in successful people`,
        `How to embrace your ${synonymToUse} nature`,
        `${word.word} behavior across generations`,
        `The fine line between ${word.word} and helpful`,
        `${synonymToUse} people in customer service`,
        `${word.word} behavior during arguments`,
        `Why being ${synonymToUse} isn't always wrong`,
        `${word.word} tendencies in perfectionism`,
        `How ${synonymToUse} behavior affects relationships`,
      ];

      const randomTitle = realisticTitles[Math.floor(Math.random() * realisticTitles.length)];

      const examples = [
        `This discussion explores ${word.word} behavior in modern society.`,
        `The ${synonymToUse} approach has gained popularity recently.`,
        `Researchers have noted ${word.word} patterns in their studies.`,
        `Many experts consider this ${synonymToUse} methodology effective.`,
      ];

      // Create more natural content that doesn't over-emphasize the target word
      let content = `This post discusses various aspects of modern life and society. `;
      if (matchCount >= 1) {
        content += `Some people find ${word.word} concepts particularly interesting. `;
      }
      if (matchCount >= 2) {
        content += `The ${synonymToUse} nature of certain topics makes them worth exploring. `;
      }
      if (matchCount >= 3) {
        content += `Understanding ${word.word} can provide valuable insights. `;
      }

      // Use a variety of realistic subreddits for fallback posts
      const fallbackSubreddits = [
        'askreddit',
        'todayilearned',
        'science',
        'philosophy',
        'books',
        'news',
        'explainlikeimfive',
        'askscience',
        'history',
        'psychology',
        'literature',
        'education',
        'linguistics',
        'sociology',
        'anthropology',
        'economics',
        'politicalscience',
        'biology',
        'chemistry',
        'physics',
        'mathematics',
      ];
      const randomSubreddit =
        fallbackSubreddits[Math.floor(Math.random() * fallbackSubreddits.length)];

      return {
        id: `demo_${timestamp}_with_word`,
        subreddit: randomSubreddit!,
        title: randomTitle!,
        url: `https://www.reddit.com/r/${randomSubreddit}/comments/${timestamp}/demo_post_about_${word.word.toLowerCase().replace(/\s+/g, '_')}/`, // Demo post - realistic post URL format
        summary: content,
        upvotes: randomUpvotes,
        commentCount: randomComments,
        isNsfw: false,
        matchCount: matchCount, // Will be recalculated
        matchExamples: examples.slice(0, Math.min(matchCount, 3)),
      };
    }

    // Create a neutral post that might occasionally have 1-2 matches by coincidence
    const coincidentalMatches = Math.random() < 0.3 ? Math.floor(Math.random() * 2) + 1 : 0;

    const neutralTopics = [
      'Technology and Innovation in Modern Society',
      'Environmental Challenges and Solutions',
      'Education Reform and Student Success',
      'Healthcare Accessibility and Quality',
      'Economic Trends and Market Analysis',
      'Social Media Impact on Communication',
      'Urban Planning and Sustainable Development',
    ];

    const randomTopic = neutralTopics[Math.floor(Math.random() * neutralTopics.length)]!;

    // Use educational subreddits for neutral posts too
    const neutralSubreddits = [
      'askreddit',
      'news',
      'worldnews',
      'technology',
      'science',
      'history',
      'todayilearned',
      'explainlikeimfive',
      'psychology',
      'philosophy',
      'education',
      'literature',
      'sociology',
      'economics',
      'biology',
    ];
    const randomNeutralSubreddit =
      neutralSubreddits[Math.floor(Math.random() * neutralSubreddits.length)];

    return {
      id: `demo_${timestamp}_neutral`,
      subreddit: randomNeutralSubreddit!,
      title: randomTopic,
      url: `https://www.reddit.com/r/${randomNeutralSubreddit}/comments/${timestamp}/demo_post_${randomTopic.toLowerCase().replace(/\s+/g, '_')}/`, // Demo post - realistic post URL format
      summary: `This post discusses ${randomTopic.toLowerCase()} and its implications for society. The analysis covers various perspectives and potential outcomes.`,
      upvotes: randomUpvotes,
      commentCount: randomComments,
      isNsfw: false,
      matchCount: coincidentalMatches,
      matchExamples: coincidentalMatches > 0 ? ['This analysis provides clear insights.'] : [],
    };
  }
}
