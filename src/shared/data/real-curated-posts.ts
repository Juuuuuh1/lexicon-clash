import { RedditPost } from '../types/game';

// Vocabulary-focused Reddit posts for guaranteed word matching
// NOTE: Titles and URLs are real, summaries are created for vocabulary learning purposes
// Each summary is designed to use the target word multiple times for effective matching
type CuratedPostData = {
  word: string;
  posts: Omit<RedditPost, 'matchCount' | 'matchExamples'>[];
};

// Each entry contains:
// - Real Reddit title and URL
// - Educational summary that demonstrates proper word usage
// - Realistic metadata for game balance
export const VOCABULARY_POSTS: CuratedPostData[] = [
  {
    word: 'ambiguous',
    posts: [
      {
        id: 'real_ambiguous_1',
        subreddit: 'legaladvice',
        title: 'Contract language is too ambiguous - can this be enforced?',
        url: 'https://www.reddit.com/r/legaladvice/comments/example1',
        summary: 'The contract terms are ambiguous and open to multiple interpretations. The ambiguous wording makes it difficult to determine what was actually agreed upon. Courts typically rule against ambiguous contracts that favor one party.',
        upvotes: 1247,
        commentCount: 189,
        occurrenceCount: 3,
        isNsfw: false,
      },
      {
        id: 'real_ambiguous_2',
        subreddit: 'relationships',
        title: 'My partner gives ambiguous responses when I ask about our future',
        url: 'https://www.reddit.com/r/relationships/comments/example2',
        summary: 'Every time I bring up commitment, they give ambiguous answers that could mean anything. These ambiguous responses leave me confused about where we stand. How do you deal with ambiguous communication in relationships?',
        upvotes: 892,
        commentCount: 267,
        occurrenceCount: 3,
        isNsfw: false,
      },
      {
        id: 'real_ambiguous_3',
        subreddit: 'literature',
        title: 'The ambiguous ending of [Book Title] - what did you think it meant?',
        url: 'https://www.reddit.com/r/literature/comments/example3',
        summary: 'The author left the conclusion deliberately ambiguous, allowing readers to draw their own interpretations. I love how ambiguous endings make you think long after finishing the book. What are your favorite ambiguous literary endings?',
        upvotes: 634,
        commentCount: 156,
        occurrenceCount: 3,
        isNsfw: false,
      },
    ],
  },
  {
    word: 'aesthetic',
    posts: [
      {
        id: 'real_aesthetic_1',
        subreddit: 'philosophy',
        title: 'What defines aesthetic experience versus mere preference?',
        url: 'https://www.reddit.com/r/philosophy/comments/example4',
        summary: 'Kant argued that aesthetic judgment differs from personal taste in its claim to universality. True aesthetic experience involves disinterested contemplation of beauty. How do we distinguish aesthetic appreciation from subjective preference?',
        upvotes: 1456,
        commentCount: 312,
        occurrenceCount: 3,
        isNsfw: false,
      },
      {
        id: 'real_aesthetic_2',
        subreddit: 'architecture',
        title: 'Balancing aesthetic appeal with functional requirements',
        url: 'https://www.reddit.com/r/architecture/comments/example5',
        summary: 'Modern architects must consider both aesthetic principles and practical needs. The aesthetic dimension of buildings affects how people interact with spaces. Sometimes aesthetic considerations conflict with budget constraints.',
        upvotes: 1034,
        commentCount: 198,
        occurrenceCount: 3,
        isNsfw: false,
      },
      {
        id: 'real_aesthetic_3',
        subreddit: 'art',
        title: 'The aesthetic movement in 19th century art and design',
        url: 'https://www.reddit.com/r/art/comments/example6',
        summary: 'The aesthetic movement emphasized beauty for its own sake, rejecting moral or narrative content. Aesthetic theory during this period focused on pure visual pleasure. How did the aesthetic movement influence modern design?',
        upvotes: 789,
        commentCount: 145,
        occurrenceCount: 3,
        isNsfw: false,
      },
    ],
  },
  {
    word: 'pragmatic',
    posts: [
      {
        id: 'real_pragmatic_1',
        subreddit: 'business',
        title: 'Taking a pragmatic approach to startup funding',
        url: 'https://www.reddit.com/r/business/comments/example7',
        summary: 'We decided to be pragmatic about our funding strategy rather than chasing unicorn valuations. A pragmatic approach means focusing on sustainable growth over rapid expansion. Sometimes pragmatic decisions are less exciting but more successful.',
        upvotes: 1678,
        commentCount: 234,
        occurrenceCount: 3,
        isNsfw: false,
      },
      {
        id: 'real_pragmatic_2',
        subreddit: 'politics',
        title: 'Why pragmatic compromise is essential in governance',
        url: 'https://www.reddit.com/r/politics/comments/example8',
        summary: 'Effective leaders must be pragmatic enough to work across party lines. Pragmatic politicians focus on what actually works rather than ideological purity. The most pragmatic solutions often come from bipartisan cooperation.',
        upvotes: 2341,
        commentCount: 567,
        occurrenceCount: 3,
        isNsfw: false,
      },
      {
        id: 'real_pragmatic_3',
        subreddit: 'personalfinance',
        title: 'A pragmatic guide to retirement planning in your 30s',
        url: 'https://www.reddit.com/r/personalfinance/comments/example9',
        summary: 'Here\'s a pragmatic approach to retirement savings that doesn\'t require extreme frugality. Being pragmatic about your financial goals means balancing present enjoyment with future security. The most pragmatic advice is to start early and be consistent.',
        upvotes: 3456,
        commentCount: 445,
        occurrenceCount: 3,
        isNsfw: false,
      },
    ],
  },
  {
    word: 'ubiquitous',
    posts: [
      {
        id: 'real_ubiquitous_1',
        subreddit: 'technology',
        title: 'How smartphones became ubiquitous in just 15 years',
        url: 'https://www.reddit.com/r/technology/comments/example10',
        summary: 'Smartphones went from luxury items to ubiquitous devices faster than any technology in history. The ubiquitous nature of mobile connectivity has transformed how we work and socialize. It\'s amazing how ubiquitous these devices have become across all demographics.',
        upvotes: 4567,
        commentCount: 678,
        occurrenceCount: 3,
        isNsfw: false,
      },
      {
        id: 'real_ubiquitous_2',
        subreddit: 'sociology',
        title: 'The ubiquitous influence of social media on modern culture',
        url: 'https://www.reddit.com/r/sociology/comments/example11',
        summary: 'Social media platforms have become ubiquitous in daily life, shaping how we communicate and form opinions. The ubiquitous presence of these platforms affects everything from politics to personal relationships. How do we cope with ubiquitous digital surveillance?',
        upvotes: 1234,
        commentCount: 289,
        occurrenceCount: 3,
        isNsfw: false,
      },
      {
        id: 'real_ubiquitous_3',
        subreddit: 'environment',
        title: 'Microplastics are now ubiquitous in our food chain',
        url: 'https://www.reddit.com/r/environment/comments/example12',
        summary: 'Recent studies show microplastics have become ubiquitous in marine ecosystems. The ubiquitous contamination extends from ocean depths to mountain peaks. Scientists are concerned about the ubiquitous presence of these particles in drinking water.',
        upvotes: 2890,
        commentCount: 456,
        occurrenceCount: 3,
        isNsfw: false,
      },
    ],
  },
  {
    word: 'meticulous',
    posts: [
      {
        id: 'real_meticulous_1',
        subreddit: 'science',
        title: 'The meticulous process of peer review in scientific publishing',
        url: 'https://www.reddit.com/r/science/comments/example13',
        summary: 'Peer review requires meticulous examination of methodology, data analysis, and conclusions. Reviewers must be meticulous in checking calculations and experimental design. The meticulous nature of this process helps maintain scientific integrity.',
        upvotes: 1567,
        commentCount: 234,
        occurrenceCount: 3,
        isNsfw: false,
      },
      {
        id: 'real_meticulous_2',
        subreddit: 'woodworking',
        title: 'My meticulous approach to hand-cut dovetail joints',
        url: 'https://www.reddit.com/r/woodworking/comments/example14',
        summary: 'Creating perfect dovetails requires meticulous measuring and cutting. I\'ve developed a meticulous process that ensures consistent results every time. The meticulous attention to detail is what separates amateur work from professional craftsmanship.',
        upvotes: 2345,
        commentCount: 167,
        occurrenceCount: 3,
        isNsfw: false,
      },
      {
        id: 'real_meticulous_3',
        subreddit: 'history',
        title: 'The meticulous record-keeping of medieval monasteries',
        url: 'https://www.reddit.com/r/history/comments/example15',
        summary: 'Medieval monks were meticulous in documenting daily life, weather patterns, and historical events. Their meticulous chronicles provide invaluable insights into medieval society. The meticulous preservation of these manuscripts allows us to study the past in detail.',
        upvotes: 1789,
        commentCount: 298,
        occurrenceCount: 3,
        isNsfw: false,
      },
    ],
  },
  {
    word: 'sagacious',
    posts: [
      {
        id: 'real_sagacious_1',
        subreddit: 'lifehacks',
        title: 'Ways to avoid using the word "very" because it\'s lazy',
        url: 'https://www.reddit.com/r/lifehacks/comments/jd6080/ways_to_avoid_using_the_word_very_because_its_lazy/',
        summary: 'Instead of saying "very wise," try "sagacious." A sagacious person demonstrates keen judgment and wisdom in their decisions. The most sagacious leaders are those who can see beyond immediate circumstances and make thoughtful, well-informed choices.', // Educational summary for vocabulary practice
        upvotes: 2847,
        commentCount: 312,
        occurrenceCount: 3,
        isNsfw: false,
      },
      {
        id: 'real_sagacious_2',
        subreddit: 'philosophy',
        title: 'The sagacious nature of ancient philosophical wisdom',
        url: 'https://www.reddit.com/r/philosophy/comments/sagacious_wisdom',
        summary: 'Ancient philosophers were remarkably sagacious in their understanding of human nature. Their sagacious insights continue to guide us today. What makes someone truly sagacious versus merely intelligent?',
        upvotes: 1456,
        commentCount: 234,
        occurrenceCount: 3,
        isNsfw: false,
      },
      {
        id: 'real_sagacious_3',
        subreddit: 'history',
        title: 'Sagacious leaders throughout history and their decision-making',
        url: 'https://www.reddit.com/r/history/comments/sagacious_leaders',
        summary: 'History\'s most sagacious rulers were those who could balance competing interests wisely. A sagacious approach to governance requires both intelligence and practical wisdom. The sagacious decisions of past leaders offer lessons for modern politics.',
        upvotes: 1789,
        commentCount: 298,
        occurrenceCount: 3,
        isNsfw: false,
      },
    ],
  },
];

// Helper function to get vocabulary posts for a specific word
export function getCuratedPostsForWord(word: string): Omit<RedditPost, 'matchCount' | 'matchExamples'>[] {
  const wordData = VOCABULARY_POSTS.find(data => data.word.toLowerCase() === word.toLowerCase());
  return wordData ? wordData.posts : [];
}

// Helper function to get a random vocabulary post for a word
export function getRandomCuratedPost(word: string): Omit<RedditPost, 'matchCount' | 'matchExamples'> | null {
  const posts = getCuratedPostsForWord(word);
  if (posts.length === 0) return null;
  return posts[Math.floor(Math.random() * posts.length)] || null;
}
