import { useState } from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '@devvit/web/client';
import { useGame } from './hooks/useGame';
import { GameBoard } from './components/GameBoard';
import { StatsDisplay } from './components/StatsDisplay';

export const App = () => {
  const { gameState, username, loading, error, startNewRound, revealCards, resetGame } = useGame();
  const [showStats, setShowStats] = useState(false);

  if (loading && !gameState) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading Lexicon Clash...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Initializing game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-3 py-2 sm:px-4 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-xl sm:text-3xl">⚔️</div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Lexicon Clash</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Battle of Reddit Words</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {username && <span className="text-xs sm:text-sm text-gray-600 hidden md:block">Hey {username}! 👋</span>}

              <button
                onClick={() => setShowStats(!showStats)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
              >
                📊 <span className="hidden sm:inline">Stats</span>
              </button>

              <button
                onClick={resetGame}
                className="bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                title="Reset game and start fresh"
              >
                🔄 <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-4 sm:py-8">
        {showStats && (
          <div className="max-w-6xl mx-auto px-4 mb-8">
            <StatsDisplay stats={gameState.stats} />
          </div>
        )}

        {gameState.currentRound ? (
          <GameBoard
            round={gameState.currentRound}
            onCardClick={revealCards}
            onNewRound={startNewRound}
            loading={loading}
          />
        ) : (
          <div className="max-w-4xl mx-auto px-4">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                className="text-8xl mb-4"
              >
                ⚔️
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent mb-4"
              >
                LEXICON CLASH
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto"
              >
                Battle your way through <span className="font-bold text-purple-600">challenging vocabulary</span> by dueling with real Reddit posts!
              </motion.p>

              {/* Call to Action Button - Moved Up */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                onClick={startNewRound}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-110 disabled:transform-none mb-12"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Preparing Battle...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    🚀 START THE CLASH
                    <span className="animate-pulse">⚡</span>
                  </span>
                )}
              </motion.button>
            </div>

            {/* Game Features - Enhanced */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-200"
              >
                <div className="text-4xl mb-3 animate-bounce">📚</div>
                <div className="font-bold text-blue-900 text-lg mb-2">Master Vocabulary</div>
                <div className="text-blue-700">Learn challenging words through interactive gameplay</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-green-200"
              >
                <div className="text-4xl mb-3 animate-pulse">🔍</div>
                <div className="font-bold text-green-900 text-lg mb-2">Duel Real Posts</div>
                <div className="text-green-700">Challenge authentic Reddit content head-to-head</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-purple-200"
              >
                <div className="text-4xl mb-3 animate-bounce" style={{ animationDelay: '0.5s' }}>🏆</div>
                <div className="font-bold text-purple-900 text-lg mb-2">Build Epic Streaks</div>
                <div className="text-purple-700">Chain victories and climb the leaderboard</div>
              </motion.div>
            </div>

            {/* How to Play - Quick Guide */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                ⚡ How to Play
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-3">1</div>
                  <div className="font-semibold text-gray-900 mb-2">Get a Word</div>
                  <div className="text-gray-600 text-sm">Receive a challenging vocabulary word</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-3">2</div>
                  <div className="font-semibold text-gray-900 mb-2">Test Your Luck</div>
                  <div className="text-gray-600 text-sm">Guess which post has more word matches</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-3">3</div>
                  <div className="font-semibold text-gray-900 mb-2">Win & Learn</div>
                  <div className="text-gray-600 text-sm">Build streaks and expand your vocabulary</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Built with ❤️ using Devvit • Powered by Reddit
            </div>

            <div className="flex gap-4 text-sm text-gray-600">
              <button
                className="hover:text-blue-600 transition-colors"
                onClick={() => navigateTo('https://developers.reddit.com/docs')}
              >
                Devvit Docs
              </button>
              <span className="text-gray-300">|</span>
              <button
                className="hover:text-blue-600 transition-colors"
                onClick={() => navigateTo('https://www.reddit.com/r/Devvit')}
              >
                r/Devvit
              </button>
              <span className="text-gray-300">|</span>
              <button
                className="hover:text-blue-600 transition-colors"
                onClick={() => navigateTo('https://discord.com/invite/R7yu2wh9Qz')}
              >
                Discord
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
