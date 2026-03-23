'use client';

/**
 * Usage progress bar — "X of 5 remaining today".
 * Source: 07 §4 Phase 3 任务 3.17, 06-数据库设计 §5.3
 */

import { USAGE_LIMITS } from '@/lib/types';

interface UsageBarProps {
  used: number;
}

export function UsageBar({ used }: UsageBarProps) {
  const limit = USAGE_LIMITS.LOGGED_IN_DAILY;
  const remaining = Math.max(0, limit - used);
  const percentage = Math.min(100, (used / limit) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-900">Today&apos;s Usage</h3>
        <span className={`text-sm font-medium ${remaining === 0 ? 'text-red-600' : 'text-gray-700'}`}>
          {remaining} of {limit} remaining
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            percentage >= 100 ? 'bg-red-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-blue-600'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-400">
        PDF and Word conversions. Resets daily at midnight UTC. HTML is always free.
      </p>
    </div>
  );
}
