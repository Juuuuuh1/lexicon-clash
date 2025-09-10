import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameRound } from '../../shared/types/game';
import { GameCard } from './GameCard';
import { WordDisplay } from './WordDisplay';
import { Confetti } from './Confetti';

type GameBoardProps = {
  round: GameRound;
  onCardClick: (cardIndex: 0 | 1) => void;
  onNewRound: () => void;
  loading: boolean;
};

export function GameBoard({ round, onCardClick, onNewRound, loading }: GameBoardProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedCard, setSelectedCard] = useState<0 | 1 | null>(null);

  const isRoundComplete = round.winner !== null;
  const cardsRevealed = round.cards[0]?.isRevealed && round.cards[1]?.isRevealed;

  // Reset selectedCard when a new round starts
  useEffect(() => {
    if (!isRoundComplete && !cardsRevealed) {
      setSelectedCard(null);
      setShowConfetti(false);
    }
  }, [round.id, isRoundComplete, cardsRevealed]);

  // Show confetti when player wins
  const shouldShowConfetti = isRoundComplete && round.winner === 'player' && !showConfetti;

  if (shouldShowConfetti) {
    setShowConfetti(true);
  }

  const handleCardClick = (cardIndex: 0 | 1) => {
    // If round is complete, let the GameCard component handle the click (for opening links)
    if (isRoundComplete) {
      return;
    }

    if (selectedCard !== null || loading) {
      return;
    }

    setSelectedCard(cardIndex);
    onCardClick(cardIndex);
  };

  const getInstructionVariant = () => {
    const wildcardVariants = [
      {
        title: "💫 WILDCARD! Which has more upvotes?",
        action: "⚡ Special game - compare Reddit upvotes! ⚡",
        colors: "from-yellow-100 to-orange-100 border-yellow-200 text-yellow-800",
        actionColors: "text-yellow-600"
      },
      {
        title: "🌟 WILDCARD! Find the upvote king!",
        action: "🎮 Bonus points for guessing right! 🎮",
        colors: "from-amber-100 to-yellow-100 border-amber-200 text-amber-800",
        actionColors: "text-amber-600"
      }
    ];

    const normalVariants = [
      {
        title: "🎯 Which word appears more often?",
        action: "⚡ Pick the word with higher occurrence count! ⚡",
        colors: "from-purple-100 to-pink-100 border-purple-200 text-purple-800",
        actionColors: "text-purple-600"
      },
      {
        title: "🔥 Choose the more frequent word!",
        action: "🎮 Count the occurrences and choose wisely! 🎮",
        colors: "from-orange-100 to-red-100 border-orange-200 text-orange-800",
        actionColors: "text-orange-600"
      },
      {
        title: "⚔️ Battle of word frequency!",
        action: "🏆 Select the word that appears more! 🏆",
        colors: "from-blue-100 to-indigo-100 border-blue-200 text-blue-800",
        actionColors: "text-blue-600"
      },
      {
        title: "🎲 Spot the frequent winner!",
        action: "💫 Trust your instincts on word counts! 💫",
        colors: "from-green-100 to-emerald-100 border-green-200 text-green-800",
        actionColors: "text-green-600"
      },
      {
        title: "🚀 Find the occurrence champion!",
        action: "⭐ Make your move based on frequency! ⭐",
        colors: "from-cyan-100 to-teal-100 border-cyan-200 text-cyan-800",
        actionColors: "text-cyan-600"
      }
    ] as const;

    // Choose variants based on round type
    const variants = round.isWildcard ? wildcardVariants : normalVariants;

    // Use round ID to ensure consistent variant per round
    const index = Math.abs(round.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % variants.length;
    // Ensure we always return a valid variant, defaulting to first one
    return variants[index] || variants[0];
  };

  const getResultMessage = () => {
    if (!isRoundComplete) return null;

    switch (round.winner) {
      case 'player':
        return (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center mb-6">
            <div className="text-4xl mb-2">🎉</div>
            <div className="text-2xl font-bold text-green-600 mb-1">You Win!</div>
            <div className="text-gray-600 mb-4">Great choice! You picked the winning card.</div>

            {/* New Round Button */}
            {!loading && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={onNewRound}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🎯 New Round
              </motion.button>
            )}
          </motion.div>
        );
      case 'computer':
        return (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center mb-6">
            <div className="text-4xl mb-2">😔</div>
            <div className="text-2xl font-bold text-red-600 mb-1">You Lose</div>
            <div className="text-gray-600 mb-4">Better luck next time!</div>

            {/* New Round Button */}
            {!loading && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={onNewRound}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🎯 New Round
              </motion.button>
            )}
          </motion.div>
        );
      case 'tie':
        return (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center mb-6">
            <div className="text-4xl mb-2">🤝</div>
            <div className="text-2xl font-bold text-yellow-600 mb-1">It's a Tie!</div>
            <div className="text-gray-600 mb-4">Both cards had the same score.</div>

            {/* New Round Button */}
            {!loading && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={onNewRound}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🎯 New Round
              </motion.button>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-pulse">⚔️</div>
        <div className="absolute top-20 right-20 text-4xl animate-bounce">🏆</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-pulse">💯</div>
        <div className="absolute bottom-10 right-10 text-3xl animate-bounce">✨</div>
      </div>

      <Confetti trigger={shouldShowConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Challenge Word Display */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {round.isWildcard ? '💫 WILDCARD GAME 💫' : '🎯 Challenge Word'}
          </h2>
          {round.cards[0] && (
            <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">
                  {round.cards[0].word.word.toLowerCase()}
                </h3>
                <p className="text-base md:text-lg text-gray-700 mb-3 md:mb-4">{round.cards[0].word.definition}</p>
                {round.cards[0].word.synonyms.length > 0 && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Synonyms:</span> {round.cards[0].word.synonyms.slice(0, 5).join(', ')}
                    {round.cards[0].word.synonyms.length > 5 && '...'}
                  </div>
                )}
              </div>
            </div>
          )}
          {round.isWildcard && (
            <div className="mt-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg p-3 inline-block">
              🌟 Special Game: Compare upvotes instead of word frequency! Double points! 🌟
            </div>
          )}
        </div>
      </div>

      {/* Game Instructions */}
      {!isRoundComplete && selectedCard === null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          {(() => {
            const variant = getInstructionVariant();
            return (
              <div className={`bg-gradient-to-r ${variant.colors} rounded-lg p-4 border-2 shadow-sm`}>
                <p className="text-lg font-bold mb-1">
                  {variant.title}
                </p>
                <p className={`text-sm animate-pulse ${variant.actionColors}`}>
                  {variant.action}
                </p>
              </div>
            );
          })()}
        </motion.div>
      )}

      <AnimatePresence mode="wait">{getResultMessage()}</AnimatePresence>

      {/* Battle Arena */}
      <div className="relative mb-8">
        {/* VS Badge / Result Overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          {!isRoundComplete ? (
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-4 py-2 rounded-full shadow-lg border-2 border-white"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
            >
              ⚔️ VS ⚔️
            </motion.div>
          ) : (
            <motion.div
              className={`font-bold px-6 py-3 rounded-full shadow-lg border-2 border-white text-center ${
                round.winner === 'player'
                  ? 'bg-gradient-to-r from-red-200 to-red-300 text-gray-800'
                  : round.winner === 'tie'
                  ? 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800'
                  : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800'
              }`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
            >
              {/* Desktop: Full text */}
              <div className="hidden md:block">
                <div className="text-lg">
                  {round.winner === 'player' ? '🎉 YOU WIN!' : round.winner === 'tie' ? '🤝 TIE!' : '😔 YOU LOSE!'}
                </div>
                {round.pointsEarned !== undefined && (
                  <div className="text-sm">
                    {round.pointsEarned > 0 ? `+${round.pointsEarned}` : round.pointsEarned < 0 ? `${round.pointsEarned}` : '0'} pts
                  </div>
                )}
              </div>

              {/* Mobile: Just icon and points */}
              <div className="md:hidden">
                <div className="text-xl">
                  {round.winner === 'player' ? '🎉' : round.winner === 'tie' ? '🤝' : '😔'}
                </div>
                {round.pointsEarned !== undefined && (
                  <div className="text-xs">
                    {round.pointsEarned > 0 ? `+${round.pointsEarned}` : round.pointsEarned < 0 ? `${round.pointsEarned}` : '0'}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-24">
          {/* Card A */}
          <motion.div
            className="relative"
            initial={{ x: -100, opacity: 0, rotate: -5 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            whileHover={{ rotate: selectedCard === null ? -2 : 0, scale: selectedCard === null ? 1.02 : 1 }}
          >
            {round.cards[0] && (
              <GameCard
                card={round.cards[0]}
                isRevealed={round.cards[0].isRevealed}
                onClick={() => handleCardClick(0)}
                disabled={(!isRoundComplete && selectedCard !== null) || loading}
                className={selectedCard === 0 ? 'ring-4 ring-orange-400 ring-opacity-75 shadow-2xl' : ''}
                cardIndex={0}
                challengeWord={round.cards[0].word.word}
                isSelected={selectedCard === 0}
              />
            )}
          </motion.div>

          {/* Card B */}
          <motion.div
            className="relative"
            initial={{ x: 100, opacity: 0, rotate: 5 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
            whileHover={{ rotate: selectedCard === null ? 2 : 0, scale: selectedCard === null ? 1.02 : 1 }}
          >
            {round.cards[1] && (
              <GameCard
                card={round.cards[1]}
                isRevealed={round.cards[1].isRevealed}
                onClick={() => handleCardClick(1)}
                disabled={(!isRoundComplete && selectedCard !== null) || loading}
                className={selectedCard === 1 ? 'ring-4 ring-blue-400 ring-opacity-75 shadow-2xl' : ''}
                cardIndex={1}
                challengeWord={round.cards[1].word.word}
                isSelected={selectedCard === 1}
              />
            )}
          </motion.div>
        </div>
      </div>


      {/* Loading State */}
      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-6">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
          <p className="text-gray-600">Processing your choice...</p>
        </motion.div>
      )}


      {/* Wildcard Explanation */}
      {round.isWildcard && cardsRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <div className="text-center">
            <div className="text-yellow-600 font-bold mb-2">🃏 Wildcard Game!</div>
            <div className="text-sm text-yellow-700">
              When word counts are equal, we compare upvotes instead for the winner.
            </div>
          </div>
        </motion.div>
      )}

      {/* Next Game Button - Bottom */}
      {isRoundComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
          className="mt-8"
        >
          <div className="flex justify-center">
            <button
              onClick={onNewRound}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🎯 New Round
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
