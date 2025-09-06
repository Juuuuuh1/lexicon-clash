# Lexicon Clash: Battle of Reddit Words

An interactive vocabulary game built on Reddit's developer platform where players test their SAT word knowledge by analyzing real Reddit posts.

## 🎯 Game Features

- **SAT Vocabulary Learning**: Learn challenging SAT words with definitions and synonyms
- **Reddit Content Analysis**: Analyze real Reddit posts to find word patterns
- **Card Battle System**: Choose between two mystery Reddit posts to find the one with more word matches
- **Anti-0-0 System**: Guaranteed hit logic ensures engaging gameplay with fallback wildcard rules
- **Statistics Tracking**: Track wins, losses, streaks, and vocabulary progress
- **Word Journal**: Keep a record of learned words with example sentences
- **Animated UI**: Smooth card flips, confetti celebrations, and responsive design

## 🛠️ Tech Stack

- [Devvit](https://developers.reddit.com/): Reddit's developer platform for immersive experiences
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/): Modern UI with type safety
- [Framer Motion](https://www.framer.com/motion/): Smooth animations and card flip effects
- [Tailwind CSS](https://tailwindcss.com/): Utility-first styling
- [Express](https://expressjs.com/): Backend API server
- [Redis](https://redis.io/): Game state persistence
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti): Celebration effects

## Getting Started

### Prerequisites

- **Node 22**
- **Devvit CLI**
- **Reddit developer account**
- **Redis**

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/lexicon-clash.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Authenticate with Reddit:
   ```bash
   npm run login
   ```
4. Set environment variables for Redis (e.g., `REDIS_URL`) to connect to your Redis instance.
5. Start the development environment:
   ```bash
   npm run dev
   ```

To build the project for production, run:

```bash
npm run build
```

To deploy the project, run:

```bash
npm run deploy
```

For additional setup guidance, see the [official Devvit documentation](https://developers.reddit.com/docs/devvit).

## 🎮 How to Play

1. **Start a Round**: Click "Start Playing" to begin a new vocabulary challenge
2. **Learn the Word**: Study the SAT word, its definition, and synonyms
3. **Choose Your Card**: Select which of the two face-down Reddit post cards you think contains more instances of the target word and its synonyms
4. **Reveal Results**: Watch the cards flip to reveal the Reddit posts and see the match counts
5. **Build Your Streak**: Win consecutive rounds to build your longest streak
6. **Track Progress**: View your statistics and word journal to see your vocabulary growth

## 🏆 Scoring System

- **Normal Rounds**: The card with more word/synonym matches wins
- **Wildcard Rounds**: When both cards have the same number of matches, winner is determined by upvotes, then comment count
- **Statistics**: Track wins, losses, ties, current streak, longest streak, and unique words learned

## Commands

- `npm run dev`: Starts a development server where you can develop your application live on Reddit.
- `npm run build`: Builds your client and server projects
- `npm run deploy`: Uploads a new version of your app
- `npm run launch`: Publishes your app for review
- `npm run login`: Logs your CLI into Reddit
- `npm run check`: Type checks, lints, and prettifies your app

## Cursor Integration

This template comes with a pre-configured cursor environment. To get started, [download cursor](https://www.cursor.com/downloads) and enable the `devvit-mcp` when prompted.
