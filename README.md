# Lexicon Clash: Battle of Reddit Words

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853d?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Devvit](https://img.shields.io/badge/Devvit-FF4500?logo=reddit&logoColor=white)](https://developers.reddit.com/)

An interactive vocabulary game built on Reddit's developer platform where players test their SAT word knowledge by analyzing real Reddit posts.

## 🌟 Inspiration

Lexicon Clash grew out of a simple childhood game I played with my dad. We’d flip open magazines at random, count the number of people on the page, and celebrate whoever landed the larger crowd. That moment of lighthearted competition stuck with me. As a high school senior preparing for the SAT, I wanted to recreate that spark but give it an educational twist. By blending test prep with the unpredictability of Reddit posts, Lexicon Clash transforms rote vocabulary drills into a playful, social challenge.

## 🎯 Game Features

- **SAT Vocabulary Learning**: Learn challenging SAT words with definitions and synonyms
- **Real Reddit Posts**: Play with curated real Reddit posts containing SAT vocabulary
- **Card Battle System**: Choose between two Reddit post cards to find the one with more word occurrences
- **Wildcard Games**: When word counts tie, winner is determined by Reddit upvotes
- **Statistics Tracking**: Track wins, losses, streaks, and scoring progress
- **Point System**: Earn points with streak bonuses and wildcard multipliers
- **Animated UI**: Smooth card flips, confetti celebrations, and responsive design

## 🛠️ Tech Stack

- [Devvit](https://developers.reddit.com/): Reddit's developer platform for immersive experiences
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/): Modern UI with type safety
- [Tailwind CSS](https://tailwindcss.com/): Utility-first styling
- [Vite](https://vitejs.dev/): Fast build tool and development server
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti): Celebration effects
- **Reddit API**: Real-time post data fetching for upvotes and comments

## Getting Started

### Prerequisites

- **Node.js 22+**
- **Devvit CLI**
- **Reddit developer account**

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/lexicon-clash.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Authenticate with Reddit:

   ```bash
   npm run login
   ```

   This uses the Devvit CLI to open your browser so you can sign in with your Reddit developer account.

4. Start the development environment:

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

For additional setup guidance, see the [official Devvit documentation](https://developers.reddit.com/docs).

## 🎮 How to Play

1. **Start a Game**: Click "Start Playing" to begin a new vocabulary challenge
2. **Learn the Challenge Word**: Study the SAT word displayed at the top with its definition and synonyms
3. **Choose Your Card**: Select which of the two Reddit post cards you think contains more occurrences of the challenge word
4. **Reveal Results**: Watch the cards flip to reveal the real Reddit posts and their word occurrence counts
5. **Wildcard Games**: When both posts have the same word count, the winner is determined by Reddit upvotes
6. **Build Your Streak**: Win consecutive games to earn streak bonuses and higher scores
7. **Track Progress**: View your statistics to see your wins, losses, current streak, and total score

## 🏆 Scoring System

- **Base Points**: 10 points for each win
- **Streak Bonus**: Up to +25 bonus points based on current streak (5 points per streak, max 5 streak)
- **Wildcard Multiplier**: 2x points for wildcard game wins
- **Loss Penalty**: -5 points for normal losses, -10 points for wildcard losses
- **Normal Games**: Winner determined by word occurrence count
- **Wildcard Games**: When word counts are equal, winner determined by Reddit upvotes
- **Statistics**: Track total score, wins, losses, current streak, and games played

## Commands

- `npm run dev`: Starts a development server where you can develop your application live on Reddit.
- `npm run build`: Builds your client and server projects
- `npm run deploy`: Uploads a new version of your app
- `npm run launch`: Publishes your app for review
- `npm run login`: Logs your CLI into Reddit
- `npm run check`: Type checks, lints, and prettifies your app

## Cursor Integration

This project comes with a pre-configured Cursor environment. To get started, [download Cursor](https://www.cursor.com/) and open the project directory.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Code of Conduct

A formal code of conduct has not yet been established. In the meantime, please be respectful and help maintain a welcoming environment for all contributors.

## License

This project is licensed under the [BSD-3-Clause License](LICENSE). See the [LICENSE](LICENSE) file for the full text.
