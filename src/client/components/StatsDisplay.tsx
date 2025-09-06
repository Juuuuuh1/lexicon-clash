import { motion } from 'framer-motion';
import { GameStats } from '../../shared/types/game';

type StatsDisplayProps = {
  stats: GameStats;
  className?: string;
};

export function StatsDisplay({ stats, className = '' }: StatsDisplayProps) {
  const winRate =
    stats.roundsPlayed > 0 ? Math.round((stats.totalWins / stats.roundsPlayed) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white rounded-lg shadow-md p-4 ${className}`}
    >
      <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">📊 Your Stats</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.totalWins}</div>
          <div className="text-xs text-gray-600">Wins</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{stats.totalLosses}</div>
          <div className="text-xs text-gray-600">Losses</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.totalTies}</div>
          <div className="text-xs text-gray-600">Ties</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{winRate}%</div>
          <div className="text-xs text-gray-600">Win Rate</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Current Streak:</span>
          <span className="font-bold text-orange-600">🔥 {stats.currentStreak}</span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Best Streak:</span>
          <span className="font-bold text-purple-600">⭐ {stats.longestStreak}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Words Learned:</span>
          <span className="font-bold text-indigo-600">📚 {stats.uniqueWords.length}</span>
        </div>
      </div>
    </motion.div>
  );
}
