import { motion } from 'framer-motion';
import { SATWord } from '../../shared/types/game';

type WordDisplayProps = {
  word: SATWord;
  isWildcard?: boolean;
};

export function WordDisplay({ word, isWildcard = false }: WordDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      {isWildcard && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-block bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-2"
        >
          🃏 WILDCARD ROUND
        </motion.div>
      )}

      <h1 className="text-4xl font-bold text-gray-900 mb-2 capitalize">{word.word}</h1>

      <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">{word.definition}</p>

      <div className="flex flex-wrap justify-center gap-2">
        <span className="text-sm text-gray-500 font-medium">Synonyms:</span>
        {word.synonyms.slice(0, 4).map((synonym, idx) => (
          <span
            key={idx}
            className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-md"
          >
            {synonym}
          </span>
        ))}
        {word.synonyms.length > 4 && (
          <div className="relative group">
            <span
              className="text-sm text-gray-400 cursor-help hover:text-gray-600 transition-colors"
              title="Hover to see additional synonyms"
            >
              +{word.synonyms.length - 4} more
            </span>

            {/* Hover Tooltip for Additional Synonyms */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
              <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg max-w-xs whitespace-nowrap">
                <div className="font-semibold mb-2 text-blue-300">Additional synonyms:</div>
                <div className="flex flex-wrap gap-1">
                  {word.synonyms.slice(4).map((synonym, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-md"
                    >
                      {synonym}
                    </span>
                  ))}
                </div>
                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
