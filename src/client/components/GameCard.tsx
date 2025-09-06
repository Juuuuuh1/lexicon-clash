import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GameCard as GameCardType } from '../../shared/types/game';

type GameCardProps = {
  card: GameCardType;
  isRevealed: boolean;
  onClick: () => void;
  disabled: boolean;
  className?: string;
  cardIndex: 0 | 1;
  challengeWord: string;
};

export function GameCard({ card, isRevealed, onClick, disabled, className = '', cardIndex, challengeWord }: GameCardProps) {
  const [showUrl, setShowUrl] = useState<string | null>(null);

  // Use the actual challenge word for search
  const getWordFromCard = (): string => {
    return challengeWord;
  };

  // Generate variety in adjectives and emoticons for each card
  const getCardVariants = (): { text: string; icon: string } => {
    const cardAVariants = [
      { text: 'Fiery Post', icon: '🔥' },
      { text: 'Blazing Post', icon: '🌋' },
      { text: 'Scorching Post', icon: '☀️' },
      { text: 'Heated Post', icon: '🌶️' },
      { text: 'Burning Post', icon: '🔥' },
      { text: 'Sizzling Post', icon: '⚡' },
      { text: 'Flaming Post', icon: '🔥' },
      { text: 'Volcanic Post', icon: '🌋' },
      { text: 'Molten Post', icon: '🌡️' },
      { text: 'Radiant Post', icon: '✨' }
    ];

    const cardBVariants = [
      { text: 'Frozen Post', icon: '❄️' },
      { text: 'Chilled Post', icon: '🧊' },
      { text: 'Arctic Post', icon: '🐧' },
      { text: 'Glacial Post', icon: '🏔️' },
      { text: 'Frosty Post', icon: '❄️' },
      { text: 'Icy Post', icon: '🧊' },
      { text: 'Crystal Post', icon: '💎' },
      { text: 'Polar Post', icon: '🐻‍❄️' },
      { text: 'Frigid Post', icon: '🌨️' },
      { text: 'Snowy Post', icon: '⛄' }
    ];

    // Use card ID to ensure consistent variant per card per round
    const cardHash = Math.abs(card.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0));

    if (cardIndex === 0) {
      return cardAVariants[cardHash % cardAVariants.length]!;
    } else {
      return cardBVariants[cardHash % cardBVariants.length]!;
    }
  };

  // Get the variant for this specific card
  const cardVariant = getCardVariants();

  // Create the theme for this specific card
  const theme = cardIndex === 0 ? {
    // Card A (Left) - Warm theme
    backGradient: 'from-orange-500 via-red-500 to-pink-500',
    backIcon: cardVariant.icon,
    backTitle: 'CARD A',
    backSubtitle: cardVariant.text,
    borderColor: 'border-orange-300',
    accentColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    hoverBorder: 'hover:border-orange-500',
    labelBg: 'bg-orange-500',
  } : {
    // Card B (Right) - Cool theme
    backGradient: 'from-blue-500 via-purple-500 to-indigo-600',
    backIcon: cardVariant.icon,
    backTitle: 'CARD B',
    backSubtitle: cardVariant.text,
    borderColor: 'border-blue-300',
    accentColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    hoverBorder: 'hover:border-blue-500',
    labelBg: 'bg-blue-500',
  };
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      return;
    }

    // Prevent event bubbling
    e.stopPropagation();

    if (isRevealed) {
      // If card is revealed, handle based on post type
      const isDemoPost = card.post.id.startsWith('demo_');

      if (isDemoPost) {
        // For demo posts, search for the word in the subreddit
        const searchUrl = `https://www.reddit.com/r/${card.post.subreddit}/search?q=${encodeURIComponent(getWordFromCard())}&restrict_sr=1&sort=relevance&t=all`;

        // Show URL in UI for manual copying (works in all environments)
        setShowUrl(showUrl === searchUrl ? null : searchUrl);
        return;
      }

      // For real posts, show URL for manual copying
      setShowUrl(showUrl === card.post.url ? null : card.post.url);
    } else {
      // If card is not revealed, flip it
      onClick();
    }
  };

  return (
    <motion.div
      className={`relative w-full max-w-sm mx-auto ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className} ${showUrl ? 'z-50' : ''}`}
      onClick={handleClick}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      title={isRevealed ? (card.post.id.startsWith('demo_') ? `Demo post - click to show search URL for "${getWordFromCard()}" in r/${card.post.subreddit}` : 'Click to show Reddit post URL') : 'Click to reveal'}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }} // Force cursor style
    >
      <motion.div
        className="relative w-full h-80 preserve-3d"
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Back */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-xl border-2 ${theme.borderColor} bg-gradient-to-br ${theme.backGradient} flex flex-col shadow-lg`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Card Label at Top */}
          <div className="flex justify-center pt-4 pb-2">
            <span className={`${theme.labelBg} text-white px-3 py-1 rounded-full text-sm font-bold shadow-md`}>
              {theme.backTitle}
            </span>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4 animate-pulse">{theme.backIcon}</div>
              <div className="text-lg font-bold">{theme.backSubtitle}</div>
              <div className="text-sm opacity-80">Click to reveal</div>
            </div>
          </div>
        </div>

        {/* Card Front */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-xl border-2 ${
            card.isWinner
              ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
              : `${theme.borderColor} ${theme.bgColor} ${theme.hoverBorder}`
          } p-4 flex flex-col shadow-lg hover:shadow-xl transition-all duration-200`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Subreddit Badge */}
          <div className="flex items-center justify-between mb-3">
            <span className={`inline-block ${cardIndex === 0 ? 'bg-orange-500' : 'bg-blue-500'} text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm`}>
              r/{card.post.subreddit}
            </span>
            <div className="flex items-center gap-2">
              {card.isWinner && (
                <div className="text-green-500 text-xl animate-bounce">🏆</div>
              )}
              <div
                className={`${theme.accentColor} text-lg font-bold hover:scale-110 cursor-pointer animate-pulse transition-transform`}
                title={card.post.id.startsWith('demo_') ? `Demo post - click to show search URL for "${getWordFromCard()}" in r/${card.post.subreddit}` : 'Click anywhere on this card to show Reddit post URL'}
              >
                {card.post.id.startsWith('demo_') ? '🎭 DEMO' : '🔗 OPEN'}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-3 flex-shrink-0">
            {card.post.title}
          </h3>

          {/* Summary */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-4 flex-grow">{card.post.summary}</p>

          {/* Stats */}
          <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
            <span>↑ {card.post.upvotes.toLocaleString()}</span>
            <span>💬 {card.post.commentCount}</span>
          </div>

          {/* Match Count */}
          <div
            className={`${cardIndex === 0 ? 'bg-orange-100' : 'bg-blue-100'} rounded-lg p-3 text-center border-2 ${cardIndex === 0 ? 'border-orange-200' : 'border-blue-200'} relative group cursor-help`}
            title={card.post.matchCount > 0 ? `Hover to see matched words for "${challengeWord}"` : 'No matches found'}
          >
            <div className={`text-2xl font-bold ${theme.accentColor} animate-pulse`}>{card.post.matchCount}</div>
            <div className="text-xs text-gray-600 font-medium">
              {card.post.matchCount === 1 ? 'MATCH' : 'MATCHES'}
            </div>
            {card.post.matchCount > 0 && (
              <div className="text-xs mt-1">
                {card.post.matchCount >= 5 ? '🏆 Legendary!' :
                 card.post.matchCount === 4 ? '💯 Perfect!' :
                 card.post.matchCount === 3 ? '🔥 Hot!' :
                 card.post.matchCount === 2 ? '⭐ Great!' : '✨ Good'}
              </div>
            )}

            {/* Hover Tooltip for Match Examples */}
            {card.post.matchCount > 0 && card.post.matchExamples.length > 0 && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg max-w-xs">
                  <div className="font-semibold mb-2 text-yellow-300">Exact matches for "{challengeWord}":</div>
                  {card.post.matchExamples.slice(0, 3).map((example, idx) => {
                    // Convert **word** to highlighted spans
                    const parts = example.split(/\*\*(.*?)\*\*/g);
                    return (
                      <div key={idx} className="mb-1 last:mb-0">
                        <span className="text-gray-300">•</span>{' '}
                        {parts.map((part, partIdx) =>
                          partIdx % 2 === 1 ? (
                            <span key={partIdx} className="bg-yellow-300 text-gray-900 px-1 rounded font-semibold">
                              {part}
                            </span>
                          ) : (
                            <span key={partIdx}>{part}</span>
                          )
                        )}
                      </div>
                    );
                  })}
                  {card.post.matchCount > card.post.matchExamples.length && (
                    <div className="text-gray-400 text-xs mt-1 italic">
                      +{card.post.matchCount - card.post.matchExamples.length} more exact matches...
                    </div>
                  )}
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            )}
          </div>

          {/* Example Sentences */}
          {card.post.matchExamples.length > 0 && (
            <div className="mt-2 text-xs">
              <div className="font-medium text-gray-700 mb-1">Examples:</div>
              {card.post.matchExamples.slice(0, 2).map((example, idx) => (
                <div key={idx} className="text-gray-600 italic truncate">
                  "{example}"
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* URL Display for Manual Copying */}
      {showUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 p-3 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-[100]"
          onClick={(e) => e.stopPropagation()} // Prevent card click when clicking URL box
        >
          <div className="text-xs font-medium text-gray-700 mb-2">
            {card.post.id.startsWith('demo_') ? 'Reddit Search URL:' : 'Reddit Post URL:'}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={showUrl}
              readOnly
              className="flex-1 text-xs p-2 border border-gray-300 rounded bg-gray-50 font-mono select-all"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                const input = e.target as HTMLInputElement;
                input.select();
              }}
              onFocus={(e) => {
                const input = e.target as HTMLInputElement;
                input.select();
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                setShowUrl(null);
              }}
              className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 flex-shrink-0"
              title="Close"
            >
              ✕
            </button>
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Click the URL to select all, then copy (Ctrl+C/Cmd+C) and paste in a new tab
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
