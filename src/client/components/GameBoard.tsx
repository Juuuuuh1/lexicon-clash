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
  const cardsRevealed = round.cards[0].isRevealed && round.cards[1].isRevealed;

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
    const variants = [
      {
        title: "🎯 Which card has more",
        action: "⚡ Pick your champion and click to battle! ⚡",
        colors: "from-purple-100 to-pink-100 border-purple-200 text-purple-800",
        actionColors: "text-purple-600"
      },
      {
        title: "🔥 Hunt down the word",
        action: "🎮 Choose wisely and claim victory! 🎮",
        colors: "from-orange-100 to-red-100 border-orange-200 text-orange-800",
        actionColors: "text-orange-600"
      },
      {
        title: "⚔️ Battle for",
        action: "🏆 Select your fighter and dominate! 🏆",
        colors: "from-blue-100 to-indigo-100 border-blue-200 text-blue-800",
        actionColors: "text-blue-600"
      },
      {
        title: "🎲 Spot the winner with",
        action: "💫 Trust your instincts and strike! 💫",
        colors: "from-green-100 to-emerald-100 border-green-200 text-green-800",
        actionColors: "text-green-600"
      },
      {
        title: "🚀 Find more",
        action: "⭐ Make your move and conquer! ⭐",
        colors: "from-cyan-100 to-teal-100 border-cyan-200 text-cyan-800",
        actionColors: "text-cyan-600"
      }
    ] as const;

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
      case 'cpu':
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

      <WordDisplay word={round.word} isWildcard={round.isWildcard} />

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
                  {variant.title} <span className="font-extrabold">"{round.word.word}"</span>?
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
        {/* VS Badge */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-4 py-2 rounded-full shadow-lg border-2 border-white"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          >
            ⚔️ VS ⚔️
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Card A */}
          <motion.div
            className="relative"
            initial={{ x: -100, opacity: 0, rotate: -5 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            whileHover={{ rotate: selectedCard === null ? -2 : 0, scale: selectedCard === null ? 1.02 : 1 }}
          >
            <GameCard
              card={round.cards[0]}
              isRevealed={round.cards[0].isRevealed}
              onClick={() => handleCardClick(0)}
              disabled={(!isRoundComplete && selectedCard !== null) || loading}
              className={selectedCard === 0 ? 'ring-4 ring-orange-400 ring-opacity-75 shadow-2xl' : ''}
              cardIndex={0}
              challengeWord={round.word.word}
            />
          </motion.div>

          {/* Card B */}
          <motion.div
            className="relative"
            initial={{ x: 100, opacity: 0, rotate: 5 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
            whileHover={{ rotate: selectedCard === null ? 2 : 0, scale: selectedCard === null ? 1.02 : 1 }}
          >
            <GameCard
              card={round.cards[1]}
              isRevealed={round.cards[1].isRevealed}
              onClick={() => handleCardClick(1)}
              disabled={(!isRoundComplete && selectedCard !== null) || loading}
              className={selectedCard === 1 ? 'ring-4 ring-blue-400 ring-opacity-75 shadow-2xl' : ''}
              cardIndex={1}
              challengeWord={round.word.word}
            />
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
            <div className="text-yellow-600 font-bold mb-2">🃏 Wildcard Round!</div>
            <div className="text-sm text-yellow-700">
              Neither card contained the target word, so the winner was determined by upvotes and
              comment count.
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
