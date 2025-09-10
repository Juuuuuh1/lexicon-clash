import { useState } from 'react';
import { useGame } from './hooks/useGame';
import { GameBoard } from './components/GameBoard';
import { StatsDisplay } from './components/StatsDisplay';

export const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const { gameState, startNewRound, makeGuess, resetGame } = useGame();

  const handleStartGame = async () => {
    setGameStarted(true);
    try {
      await startNewRound();
    } catch (error) {
      console.error('Failed to start game:', error);
      alert('Failed to start game. Please try again.');
      setGameStarted(false);
    }
  };

  const handleBackToStart = () => {
    setGameStarted(false);
    setShowStats(false);
  };

  const handleResetGame = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    resetGame();
    setShowStats(false);
    setShowResetConfirm(false);
  };

  const cancelReset = () => {
    setShowResetConfirm(false);
  };

  const handleCardClick = async (cardIndex: 0 | 1) => {
    try {
      await makeGuess(cardIndex);
    } catch (error) {
      console.error('Failed to make guess:', error);
    }
  };

  const handleNewRound = async () => {
    try {
      await startNewRound();
    } catch (error) {
      console.error('Failed to start new round:', error);
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center relative overflow-hidden pt-8 md:pt-12">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-pulse">⚔️</div>
          <div className="absolute top-20 right-20 text-4xl animate-bounce">🏆</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-pulse">💯</div>
          <div className="absolute bottom-10 right-10 text-3xl animate-bounce">✨</div>
          <div className="absolute top-1/2 left-1/4 text-2xl animate-ping">🎯</div>
          <div className="absolute top-1/3 right-1/3 text-3xl animate-pulse">🔥</div>
          <div className="absolute bottom-1/3 left-1/2 text-4xl animate-bounce">🚀</div>
        </div>

        <div className="text-center z-10 max-w-2xl mx-auto px-6">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-4 animate-pulse">
              ⚔️ LEXICON CLASH
            </h1>
            <p className="text-2xl text-gray-700 font-medium mb-2">Battle of Reddit Words</p>
            <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
              🎯 Guess which vocabulary word appears more times in Reddit posts!
              <br />
              📚 Learn SAT words while having fun!
            </p>
          </div>

          {/* Game Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="text-3xl mb-2">🎮</div>
              <div className="text-sm font-semibold text-gray-700">Interactive</div>
              <div className="text-xs text-gray-500">Gameplay</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-sm font-semibold text-gray-700">Real Data</div>
              <div className="text-xs text-gray-500">From Reddit</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-sm font-semibold text-gray-700">Score</div>
              <div className="text-xs text-gray-500">& Streaks</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="text-3xl mb-2">📚</div>
              <div className="text-sm font-semibold text-gray-700">Learn</div>
              <div className="text-xs text-gray-500">Vocabulary</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleStartGame}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-xl text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              🚀 START THE CLASH
            </button>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowStats(!showStats)}
                className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                📊 {showStats ? 'Hide' : 'Show'} Stats
              </button>

              {(gameState.score > 0 || gameState.roundsPlayed > 0) && (
                <button
                  onClick={handleResetGame}
                  className="bg-red-500/80 backdrop-blur-sm hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  🔄 Reset Stats
                </button>
              )}
            </div>
          </div>

          {/* Stats Display */}
          {showStats && (
            <div className="mt-8 animate-in slide-in-from-bottom duration-300">
              <StatsDisplay
                score={gameState.score}
                streak={gameState.streak}
                roundsPlayed={gameState.roundsPlayed}
                totalCorrect={gameState.totalCorrect}
                totalWrong={gameState.totalWrong}
                className="max-w-md mx-auto"
              />
            </div>
          )}

          {/* How to Play */}
          <div className="mt-8 text-sm text-gray-600">
            <p className="mb-2">🎯 <strong>How to Play:</strong></p>
            <p>1. Two vocabulary words appear • 2. Guess which appears more times in posts • 3. Build your streak!</p>
            <p className="mt-1 text-xs">💫 <strong>Wildcard games:</strong> Compare upvotes instead for bonus points!</p>
          </div>
        </div>
      </div>
    );
  }

  if (gameState.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">⚔️</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Preparing Battle...</h2>
          <div className="animate-pulse text-lg text-gray-600">Loading vocabulary words from Reddit</div>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!gameState.currentRound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">No Round Available</h2>
          <p className="text-gray-600 mb-6">Something went wrong loading the game round.</p>
          <button
            onClick={handleBackToStart}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg"
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-6 md:py-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Stats and Controls */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">⚔️ LEXICON CLASH</h1>

          {/* Quick Stats */}
          <div className="flex justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-600 bg-white/80 backdrop-blur-sm rounded-lg py-2 px-4 md:px-6 inline-flex mb-4">
            <span className="flex items-center gap-1">
              <span className="text-blue-600">🏆</span>
              <span className="hidden sm:inline">Score:</span> <strong>{gameState.score}</strong>
            </span>
            <span className="flex items-center gap-1">
              <span className="text-orange-600">🔥</span>
              <span className="hidden sm:inline">Streak:</span> <strong>{gameState.streak}</strong>
            </span>
            <span className="flex items-center gap-1">
              <span className="text-purple-600">🎯</span>
              <span className="hidden sm:inline">Games:</span> <strong>{gameState.roundsPlayed}</strong>
            </span>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <button
              onClick={handleBackToStart}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 md:px-6 rounded-lg transition-colors text-sm"
            >
              🏠 Home
            </button>

            <button
              onClick={() => setShowStats(!showStats)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 md:px-6 rounded-lg transition-colors text-sm"
            >
              📊 {showStats ? 'Hide' : 'Show'}
            </button>

            {gameState.currentRound?.winner && (
              <button
                onClick={handleNewRound}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 md:px-6 rounded-lg transition-colors text-sm"
              >
                🎯 New
              </button>
            )}

            {(gameState.score > 0 || gameState.roundsPlayed > 0) && (
              <button
                onClick={handleResetGame}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 md:px-6 rounded-lg transition-colors text-sm"
              >
                🔄 Reset
              </button>
            )}
          </div>
        </div>

        {/* Stats Display Below Header */}
        {showStats && (
          <div className="mb-8 flex justify-center animate-in slide-in-from-top duration-300">
            <StatsDisplay
              score={gameState.score}
              streak={gameState.streak}
              roundsPlayed={gameState.roundsPlayed}
              totalCorrect={gameState.totalCorrect}
              totalWrong={gameState.totalWrong}
              className="max-w-md"
            />
          </div>
        )}

        {/* Game Board */}
        <GameBoard
          round={gameState.currentRound}
          onCardClick={handleCardClick}
          onNewRound={handleNewRound}
          loading={gameState.isLoading}
        />


        {/* Bottom Spacing for Mobile */}
        <div className="h-8 md:h-4"></div>

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm mx-auto shadow-2xl">
              <div className="text-center">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Reset Stats?</h3>
                <p className="text-gray-600 mb-6">
                  This will reset your score, streak, and all game statistics. This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={cancelReset}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmReset}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
