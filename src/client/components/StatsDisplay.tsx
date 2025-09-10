import { motion } from 'framer-motion';

type StatsDisplayProps = {
  score: number;
  streak: number;
  roundsPlayed: number;
  totalCorrect: number;
  totalWrong: number;
  className?: string;
};

export function StatsDisplay({ score, streak, roundsPlayed, totalCorrect, totalWrong, className = '' }: StatsDisplayProps) {
  const winRate =
    roundsPlayed > 0 ? Math.round((totalCorrect / roundsPlayed) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white rounded-lg shadow-md p-4 ${className}`}
    >
      <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">📊 Your Stats</h3>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{score}</div>
          <div className="text-xs text-gray-600">Score</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{streak}</div>
          <div className="text-xs text-gray-600">Streak</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{roundsPlayed}</div>
          <div className="text-xs text-gray-600">Games</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Correct:</span>
          <span className="font-bold text-green-600">✅ {totalCorrect}</span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Wrong:</span>
          <span className="font-bold text-red-600">❌ {totalWrong}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Win Rate:</span>
          <span className="font-bold text-blue-600">📈 {winRate}%</span>
        </div>
      </div>
    </motion.div>
  );
}
